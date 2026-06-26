'use strict';

const orderId = location.pathname.split('/').pop();
let currentOrder = null;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

function formatNaira(kobo) {
  if (!kobo && kobo !== 0) return '—';
  return '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-NG', { day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit' });
}

const STATUS_BADGE = {
  pending_payment:'grey', goods_paid:'green', window_closed:'blue',
  sourcing:'blue', shipped_china:'blue', customs_nigeria:'amber',
  arrived_akure:'amber', stage2_invoiced:'amber', stage2_paid:'green',
  waybilled:'blue', delivered:'green', forfeited:'red'
};

async function load() {
  const res = await fetch(`/api/admin/orders/${orderId}`);
  if (res.status === 401) { window.location.href = '/admin/login'; return; }
  if (!res.ok) { document.querySelector('.admin-main').innerHTML = '<p>Order not found.</p>'; return; }

  const data = await res.json();
  const { order, items, payments } = data;
  currentOrder = order;

  document.getElementById('page-title').textContent = `Order ${order.order_ref}`;
  document.getElementById('status-badge').textContent = order.status.replace(/_/g,' ');
  document.getElementById('status-badge').className = `badge badge-${STATUS_BADGE[order.status] || 'grey'}`;
  document.getElementById('status-select').value = order.status;

  document.getElementById('buyer-info').innerHTML = `
    <h3>Buyer Information</h3>
    <div class="info-row"><span class="info-label">Name</span><span class="info-val">${order.buyer_name}</span></div>
    <div class="info-row"><span class="info-label">Phone</span><span class="info-val">${order.buyer_phone}</span></div>
    <div class="info-row"><span class="info-label">Email</span><span class="info-val">${order.buyer_email || '—'}</span></div>
    <div class="info-row"><span class="info-label">Address</span><span class="info-val">${order.buyer_address}, ${order.buyer_city}, ${order.buyer_state}</span></div>
    <div class="info-row"><span class="info-label">T&C Accepted</span><span class="info-val">${order.tc_accepted ? '✅ Yes — ' + fmtDate(order.tc_accepted_at) : '❌ No'}</span></div>
    <div class="info-row"><span class="info-label">Ordered At</span><span class="info-val">${fmtDate(order.created_at)}</span></div>
    ${order.waybill_number ? `<div class="info-row"><span class="info-label">Waybill</span><span class="info-val">${order.delivery_agent} — ${order.waybill_number}</span></div>` : ''}
    ${order.forfeited ? `<div class="alert alert-danger" style="margin-top:var(--space-3)">⚠️ FORFEITED — ${fmtDate(order.forfeited_at)}: ${order.forfeiture_reason || 'Non-payment'}</div>` : ''}
  `;

  document.getElementById('items-section').innerHTML = `
    <h3>Items (Total: ${formatNaira(order.total_naira)})</h3>
    <table class="data-table">
      <thead><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Line Total</th></tr></thead>
      <tbody>${items.map((i) => `
        <tr>
          <td>${i.name} <span style="color:var(--ink-500);font-size:12px">${i.category || ''}</span></td>
          <td>${i.quantity}</td>
          <td>${formatNaira(i.unit_price)}</td>
          <td>${formatNaira(i.line_total)}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;

  document.getElementById('payment-history').innerHTML = `
    <h3>Payment History</h3>
    ${payments.length ? `<table class="data-table">
      <thead><tr><th>Stage</th><th>Amount</th><th>Paystack Ref</th><th>Verified</th><th>Date</th></tr></thead>
      <tbody>${payments.map((p) => `
        <tr>
          <td>Stage ${p.stage}</td>
          <td>${formatNaira(p.amount)}</td>
          <td style="font-size:12px">${p.paystack_ref || '—'}</td>
          <td>${p.verified ? '✅' : '⏳'}</td>
          <td>${fmtDate(p.verified_at || p.created_at)}</td>
        </tr>`).join('')}
      </tbody></table>` : '<p style="color:var(--ink-500);font-size:14px">No payments recorded yet.</p>'}
    ${order.stage2_amount ? `<div class="info-row" style="margin-top:var(--space-3)"><span class="info-label">Stage 2 Amount</span><span class="info-val">${formatNaira(order.stage2_amount)} — Due: ${fmtDate(order.stage2_due_at)}</span></div>` : ''}
    ${order.stage3_amount ? `<div class="info-row"><span class="info-label">Stage 3 Amount</span><span class="info-val">${formatNaira(order.stage3_amount)}</span></div>` : ''}
  `;

  // Pre-fill existing values
  if (order.stage2_amount) document.getElementById('s2-amount').value = (order.stage2_amount / 100).toFixed(2);
  if (order.stage3_amount) document.getElementById('s3-amount').value = (order.stage3_amount / 100).toFixed(2);
  if (order.delivery_agent) document.getElementById('s3-agent').value = order.delivery_agent;
  if (order.waybill_number) document.getElementById('s3-waybill').value = order.waybill_number;
  if (order.tracking_notes) document.getElementById('notes-input').value = order.tracking_notes;
}

async function updateStatus() {
  const status = document.getElementById('status-select').value;
  const notes = document.getElementById('notes-input').value;
  const res = await fetch(`/api/admin/orders/${orderId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, tracking_notes: notes })
  });
  const data = await res.json();
  if (res.ok) {
    showToast('Status updated to: ' + status.replace(/_/g,' '));
    if (data.whatsappLink) showWaLink('status-wa-link', data.whatsappLink);
    load();
  }
}

async function sendStage2() {
  const amount = document.getElementById('s2-amount').value;
  if (!amount) return showToast('Enter shipping fee amount');
  const res = await fetch(`/api/admin/orders/${orderId}/stage2-invoice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount_naira: amount })
  });
  const data = await res.json();
  if (res.ok) {
    showToast('Stage 2 invoice sent');
    if (data.whatsappLink) showWaLink('s2-wa-link', data.whatsappLink);
    load();
  }
}

async function sendStage3() {
  const amount = document.getElementById('s3-amount').value;
  const agent = document.getElementById('s3-agent').value;
  const waybill = document.getElementById('s3-waybill').value;
  if (!amount) return showToast('Enter waybill fee amount');
  const res = await fetch(`/api/admin/orders/${orderId}/stage3-invoice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount_naira: amount, delivery_agent: agent, waybill_number: waybill })
  });
  if (res.ok) { showToast('Stage 3 waybill details saved'); load(); }
}

async function forfeitOrder() {
  const reason = document.getElementById('forfeit-reason').value;
  if (!confirm(`Mark this order as FORFEITED? This cannot be undone. Reason: "${reason}"`)) return;
  const res = await fetch(`/api/admin/orders/${orderId}/forfeit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason })
  });
  const data = await res.json();
  if (res.ok) {
    showToast('Order marked as forfeited');
    if (data.whatsappLink) showWaLink('forfeit-wa-link', data.whatsappLink);
    load();
  }
}

function showWaLink(containerId, url) {
  const el = document.getElementById(containerId);
  el.style.display = 'block';
  el.innerHTML = `<a href="${url}" target="_blank" class="wa-link">💬 Send WhatsApp Message to Buyer</a>`;
}

function logout() {
  fetch('/api/admin/logout', { method: 'POST' }).then(() => { window.location.href = '/admin/login'; });
}

load();
