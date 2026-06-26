'use strict';

let currentOrderId = null;

const STATUS_ORDER = [
  'pending_payment','goods_paid','window_closed','sourcing',
  'shipped_china','customs_nigeria','arrived_akure',
  'stage2_invoiced','stage2_paid','waybilled','delivered'
];

async function trackOrder() {
  const ref = document.getElementById('track-input').value.trim();
  if (!ref) return showToast('Enter your order reference or phone number');

  const res = await fetch(`/api/track/${encodeURIComponent(ref)}`);
  document.getElementById('no-result').style.display = 'none';
  document.getElementById('result-view').style.display = 'none';

  if (!res.ok) {
    document.getElementById('no-result').style.display = 'block';
    return;
  }

  const data = await res.json();
  renderResult(data);
  document.getElementById('result-view').style.display = 'block';
}

function renderResult(data) {
  const { order, items, milestones } = data;
  currentOrderId = null; // set via ref

  document.getElementById('res-ref').textContent = order.order_ref;
  document.getElementById('res-name').textContent = `For: ${order.buyer_name}`;
  document.getElementById('res-status').textContent = order.status_label;

  // Stage 2 prompt
  if (order.status === 'stage2_invoiced' && !order.stage2_paid && order.stage2_amount) {
    document.getElementById('s2-amount').textContent = formatNaira(order.stage2_amount);
    document.getElementById('s2-deadline').textContent = order.stage2_due_at
      ? `Payment deadline: ${new Date(order.stage2_due_at).toLocaleDateString('en-NG', { day:'numeric',month:'long',year:'numeric' })}`
      : '';
    document.getElementById('stage2-prompt').style.display = 'block';
    document.getElementById('pay-s2-btn').onclick = () => initiatePayment(order.order_ref, 2);
  } else {
    document.getElementById('stage2-prompt').style.display = 'none';
  }

  // Stage 3 prompt
  if (order.stage2_paid && order.stage3_amount && !order.stage3_paid) {
    document.getElementById('s3-amount').textContent = formatNaira(order.stage3_amount);
    document.getElementById('stage3-prompt').style.display = 'block';
    document.getElementById('pay-s3-btn').onclick = () => initiatePayment(order.order_ref, 3);
  } else {
    document.getElementById('stage3-prompt').style.display = 'none';
  }

  // Timeline
  const currentIdx = STATUS_ORDER.indexOf(order.status);
  const milestoneMap = {};
  (milestones || []).forEach((m) => { milestoneMap[m.key] = m; });

  document.getElementById('timeline').innerHTML = STATUS_ORDER.map((status, i) => {
    const labels = {
      pending_payment: 'Awaiting Payment',
      goods_paid: 'Goods Payment Received',
      window_closed: 'Order Window Closed',
      sourcing: 'Sourcing from Supplier',
      shipped_china: 'Shipped from China',
      customs_nigeria: 'At Nigerian Customs',
      arrived_akure: 'Arrived at Akure Warehouse',
      stage2_invoiced: 'Shipping Fee Invoice Sent',
      stage2_paid: 'Shipping Fee Paid',
      waybilled: 'Dispatched to You',
      delivered: 'Delivered ✓'
    };
    const cls = i < currentIdx ? 'done' : i === currentIdx ? 'current' : '';
    return `
      <div class="timeline-item ${cls}">
        <div class="timeline-dot"></div>
        <div>
          <div class="timeline-label">${labels[status] || status}</div>
        </div>
      </div>`;
  }).join('');

  // Items
  document.getElementById('items-list').innerHTML = items.map((i) => `
    <div class="order-item-row">
      <span>${i.name} ×${i.quantity}</span>
      <span>${formatNaira(i.unit_price * i.quantity)}</span>
    </div>`).join('') + `
    <div class="order-item-row" style="font-weight:700;border-bottom:none">
      <span>Total Paid</span><span>${formatNaira(order.total_naira)}</span>
    </div>`;

  // WhatsApp
  const waNumber = '2348000000000'; // replace with real business number
  document.getElementById('wa-link').href = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello, I need help with my Dova Futures order ${order.order_ref}.`)}`;
}

function toggleItems() {
  const el = document.getElementById('items-list');
  el.classList.toggle('open');
}

async function initiatePayment(orderRef, stage) {
  const btn = stage === 2 ? document.getElementById('pay-s2-btn') : document.getElementById('pay-s3-btn');
  btn.disabled = true;
  btn.textContent = 'Redirecting to payment...';

  try {
    // We need orderId — fetch it from the track API
    const trackRes = await fetch(`/api/track/${encodeURIComponent(orderRef)}`);
    const trackData = await trackRes.json();

    // Find orderId via a lookup from order_ref — we'll pass it via checkout/init using ref directly
    // For simplicity, track page sends orderRef to a special endpoint
    const initRes = await fetch('/api/checkout/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderRef, stage })
    });
    const initData = await initRes.json();
    if (!initRes.ok) throw new Error(initData.error || 'Payment init failed');
    window.location.href = initData.authorization_url;
  } catch (err) {
    showToast('Payment error: ' + err.message);
    btn.disabled = false;
    btn.textContent = stage === 2 ? 'Pay Shipping Fee →' : 'Pay Waybill Fee →';
  }
}

// Auto-track from URL params
const urlRef = new URLSearchParams(location.search).get('ref');
if (urlRef) {
  document.getElementById('track-input').value = urlRef;
  trackOrder();
}

document.getElementById('track-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') trackOrder();
});
