'use strict';

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function formatNaira(kobo) {
  if (!kobo) return '—';
  return '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
}

const STATUS_BADGE = {
  pending_payment:'grey', goods_paid:'green', window_closed:'blue',
  sourcing:'blue', shipped_china:'blue', customs_nigeria:'amber',
  arrived_akure:'amber', stage2_invoiced:'amber', stage2_paid:'green',
  waybilled:'blue', delivered:'green', forfeited:'red'
};

async function loadOrders() {
  const search = document.getElementById('search-input').value;
  const status = document.getElementById('status-filter').value;
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status) params.set('status', status);

  const res = await fetch('/api/admin/orders?' + params);
  if (res.status === 401) { window.location.href = '/admin/login'; return; }
  const orders = await res.json();

  if (!orders.length) {
    document.getElementById('orders-table').innerHTML = '<p style="color:var(--ink-500)">No orders found.</p>';
    return;
  }

  document.getElementById('orders-table').innerHTML = `
    <table class="data-table">
      <thead><tr>
        <th>Ref</th><th>Buyer</th><th>Phone</th>
        <th>Total</th><th>Status</th><th>Stage 2</th><th>Action</th>
      </tr></thead>
      <tbody>${orders.map((o) => `
        <tr>
          <td><a href="/admin/orders/${o.id}">${o.order_ref}</a></td>
          <td>${o.buyer_name}</td>
          <td>${o.buyer_phone}</td>
          <td>${formatNaira(o.total_naira)}</td>
          <td><span class="badge badge-${STATUS_BADGE[o.status] || 'grey'}">${o.status.replace(/_/g,' ')}</span></td>
          <td>${o.stage2_paid ? '<span class="badge badge-green">Paid</span>' : o.stage2_amount ? '<span class="badge badge-amber">Invoiced</span>' : '—'}</td>
          <td><a href="/admin/orders/${o.id}" class="btn btn-sm btn-secondary">View</a></td>
        </tr>`).join('')}
      </tbody>
    </table>`;
}

function logout() {
  fetch('/api/admin/logout', { method: 'POST' }).then(() => { window.location.href = '/admin/login'; });
}

// Auto-apply status filter from URL
const urlStatus = new URLSearchParams(location.search).get('status');
if (urlStatus) document.getElementById('status-filter').value = urlStatus;

document.getElementById('search-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') loadOrders(); });
loadOrders();
