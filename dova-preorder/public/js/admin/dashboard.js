'use strict';

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function formatNaira(kobo) {
  return '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 0 });
}

async function guardAuth(res) {
  if (res.status === 401) { window.location.href = '/admin/login'; return false; }
  return true;
}

async function loadStats() {
  const res = await fetch('/api/admin/stats');
  if (!await guardAuth(res)) return;
  const data = await res.json();
  if (!data.active) { document.getElementById('batch-badge').textContent = 'No active batch'; return; }
  document.getElementById('batch-badge').className = 'badge badge-green';
  document.getElementById('batch-badge').textContent = data.preorder.title + ' — ACTIVE';
  const s = data.stats;
  document.getElementById('s-total').textContent = s.total_orders;
  document.getElementById('s-paid').textContent = s.paid_orders;
  document.getElementById('s-collected').textContent = formatNaira(s.total_collected || 0);
  document.getElementById('s-stage2').textContent = s.awaiting_stage2;
  document.getElementById('s-forfeited').textContent = s.forfeited;
}

async function loadBatches() {
  const res = await fetch('/api/admin/preorders');
  if (!await guardAuth(res)) return;
  const batches = await res.json();
  const STATUS_COLORS = { draft:'grey', active:'green', closed:'blue', sourcing:'amber', complete:'green' };
  document.getElementById('batches-list').innerHTML = batches.length
    ? `<table class="data-table">
        <thead><tr><th>Title</th><th>Opens</th><th>Closes</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>${batches.map((b) => `
          <tr>
            <td>${b.title}</td>
            <td>${new Date(b.start_date).toLocaleDateString('en-NG')}</td>
            <td>${new Date(b.end_date).toLocaleDateString('en-NG')}</td>
            <td><span class="badge badge-${STATUS_COLORS[b.status] || 'grey'}">${b.status}</span></td>
            <td>
              <button class="btn btn-sm btn-secondary" onclick="activateBatch(${b.id})">Set Active</button>
              <button class="btn btn-sm btn-secondary" onclick="closeBatch(${b.id})">Close</button>
            </td>
          </tr>`).join('')}
        </tbody></table>`
    : '<p style="color:var(--ink-500);font-size:14px">No batches yet. Create one below.</p>';
}

async function createBatch() {
  const title = document.getElementById('b-title').value.trim();
  const start = document.getElementById('b-start').value;
  const end = document.getElementById('b-end').value;
  if (!title || !start || !end) return showToast('All fields required');
  const res = await fetch('/api/admin/preorders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, start_date: start, end_date: end })
  });
  if (res.ok) { showToast('Batch created'); loadBatches(); loadStats(); }
  else showToast('Error creating batch');
}

async function activateBatch(id) {
  const res = await fetch(`/api/admin/preorders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'active' })
  });
  if (res.ok) { showToast('Batch set to active'); loadBatches(); loadStats(); }
}

async function closeBatch(id) {
  if (!confirm('Close this preorder window? Buyers will no longer be able to order.')) return;
  const res = await fetch(`/api/admin/preorders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'closed' })
  });
  if (res.ok) { showToast('Batch closed'); loadBatches(); loadStats(); }
}

function exportCsv() {
  window.location.href = '/api/admin/export';
}

async function sendReminders() {
  const res = await fetch('/api/admin/orders/reminders/check', { method: 'POST' });
  const data = await res.json();
  showToast(`Reminders checked. ${data.sent.length} sent.`);
  if (data.sent.length) {
    data.sent.forEach((s) => {
      if (s.whatsappLink) window.open(s.whatsappLink, '_blank');
    });
  }
}

async function logout() {
  await fetch('/api/admin/logout', { method: 'POST' });
  window.location.href = '/admin/login';
}

loadStats();
loadBatches();
