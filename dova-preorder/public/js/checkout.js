'use strict';

function renderOrderSummary() {
  const cart = getCart();
  if (!cart.length) {
    window.location.href = '/cart';
    return;
  }
  document.getElementById('order-items-list').innerHTML = cart.map((i) => `
    <div class="order-item">
      ${i.image ? `<img src="${i.image}" alt="${i.name}">` : '<div style="width:40px;height:40px;background:var(--sand);border-radius:4px;display:flex;align-items:center;justify-content:center">📦</div>'}
      <div style="flex:1;font-size:14px"><strong>${i.name}</strong> ×${i.quantity}</div>
      <div style="font-weight:600">${formatNaira(i.price * i.quantity)}</div>
    </div>`).join('');
  document.getElementById('order-total-amount').textContent = formatNaira(cartTotal());
}

async function submitOrder(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('pay-btn');
  const errBox = document.getElementById('errors-box');
  errBox.style.display = 'none';

  if (form.website.value) return; // honeypot

  const cart = getCart();
  if (!cart.length) { window.location.href = '/cart'; return; }

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Processing...';

  const payload = {
    buyer_name:    form.buyer_name.value.trim(),
    buyer_phone:   form.buyer_phone.value.trim(),
    buyer_email:   form.buyer_email.value.trim() || null,
    buyer_address: form.buyer_address.value.trim(),
    buyer_state:   form.buyer_state.value,
    buyer_city:    form.buyer_city.value.trim(),
    tc_accepted:   form.tc_accepted.checked,
    website:       form.website.value,
    items: cart.map((i) => ({ productId: i.productId, quantity: i.quantity }))
  };

  try {
    const orderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const orderData = await orderRes.json();
    if (!orderRes.ok) {
      const msgs = orderData.errors || [orderData.error || 'Order creation failed'];
      errBox.innerHTML = `<ul>${msgs.map((m) => `<li>${m}</li>`).join('')}</ul>`;
      errBox.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Pay Now with Paystack';
      return;
    }

    const initRes = await fetch('/api/checkout/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: orderData.orderId, stage: 1 })
    });
    const initData = await initRes.json();
    if (!initRes.ok) throw new Error(initData.error || 'Payment init failed');

    window.location.href = initData.authorization_url;
  } catch (err) {
    errBox.innerHTML = err.message;
    errBox.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Pay Now with Paystack';
  }
}

function handleReturn() {
  const params = new URLSearchParams(location.search);
  if (params.get('status') !== 'success') return;

  const ref = params.get('ref');
  document.getElementById('checkout-view').style.display = 'none';
  document.getElementById('confirmation').style.display = 'block';
  document.getElementById('conf-ref').textContent = ref || '—';
  document.getElementById('conf-track-btn').href = `/track?ref=${ref}`;
  document.getElementById('conf-wa-btn').href =
    `https://wa.me/?text=${encodeURIComponent(`I just placed a preorder on Dova Futures! Order ref: ${ref}. Track at ${location.origin}/track?ref=${ref}`)}`;
  clearCart();
}

handleReturn();
if (document.getElementById('checkout-view').style.display !== 'none') {
  renderOrderSummary();
}
