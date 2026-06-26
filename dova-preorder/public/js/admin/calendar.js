'use strict';

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function logout() {
  fetch('/api/admin/logout', { method: 'POST' }).then(() => { window.location.href = '/admin/login'; });
}

const MILESTONE_LABELS = {
  forex_date:          'Naira → Yuan Conversion',
  payment_china_date:  'Payment to Chinese Supplier',
  ship_china_date:     'Goods Shipped from China',
  arrival_nigeria_date:'Goods Arrive in Nigeria',
  customs_clear_date:  'Customs Clearance Complete',
  arrival_akure_date:  'Goods Arrive at Akure',
  stage2_invoice_date: 'Stage 2 Invoices Sent',
  stage2_deadline_date:'Stage 2 Payment Deadline',
  waybill_date:        'Waybills Dispatched',
};

const MILESTONE_ICONS = {
  forex_date:          '💱',
  payment_china_date:  '🏦',
  ship_china_date:     '🚢',
  arrival_nigeria_date:'⚓',
  customs_clear_date:  '🛃',
  arrival_akure_date:  '🏭',
  stage2_invoice_date: '📨',
  stage2_deadline_date:'⏰',
  waybill_date:        '📦',
};

let currentPreorderId = null;
let currentDates = {};

function milestoneStatus(dateStr) {
  if (!dateStr) return 'not-set';
  const d = new Date(dateStr);
  const now = new Date();
  const diff = (d - now) / (1000 * 60 * 60 * 24);
  if (diff < 0) return 'done';
  if (diff <= 3) return 'imminent';
  return 'upcoming';
}

function statusBadge(status) {
  const map = {
    'done':    '<span class="badge badge-green">Done</span>',
    'imminent':'<span class="badge badge-amber">Soon</span>',
    'upcoming':'<span class="badge badge-blue">Upcoming</span>',
    'not-set': '<span class="badge badge-grey">Not Set</span>',
  };
  return map[status] || '';
}

async function loadCalendar() {
  const res = await fetch('/api/admin/calendar');
  if (res.status === 401) { window.location.href = '/admin/login'; return; }
  if (!res.ok) {
    document.getElementById('calendar-content').innerHTML = '<p style="color:var(--ink-500)">No active preorder batch found. Create one first.</p>';
    return;
  }
  const data = await res.json();
  currentPreorderId = data.id;
  currentDates = {};

  Object.keys(MILESTONE_LABELS).forEach(k => {
    currentDates[k] = data[k] || '';
  });

  renderCalendar(data);
}

function renderCalendar(data) {
  const rows = Object.keys(MILESTONE_LABELS).map(key => {
    const label  = MILESTONE_LABELS[key];
    const icon   = MILESTONE_ICONS[key];
    const val    = currentDates[key] || '';
    const status = milestoneStatus(val);
    const dateDisplay = val ? new Date(val).toLocaleDateString('en-NG', { day:'numeric', month:'short', year:'numeric' }) : '—';

    return `
    <div class="milestone-row">
      <div class="milestone-icon">${icon}</div>
      <div class="milestone-info">
        <div class="milestone-label">${label}</div>
        <div class="milestone-date" id="display-${key}">${dateDisplay}</div>
      </div>
      <input type="date" class="milestone-input" id="input-${key}" value="${val ? val.substring(0,10) : ''}" onchange="handleDateChange('${key}', this.value)">
      <div class="milestone-status">${statusBadge(status)}</div>
    </div>`;
  }).join('');

  const batchInfo = `<p style="font-size:13px;color:var(--ink-500);margin-bottom:var(--space-5)">
    Batch: <strong>${data.title}</strong> &nbsp;|&nbsp;
    Window: ${data.start_date ? data.start_date.substring(0,10) : '—'} → ${data.end_date ? data.end_date.substring(0,10) : '—'} &nbsp;|&nbsp;
    Status: <strong>${data.status}</strong>
  </p>`;

  document.getElementById('calendar-content').innerHTML = `
    ${batchInfo}
    <div class="calendar-table">
      <h3>Milestone Dates</h3>
      ${rows}
      <div class="save-btn">
        <button class="btn btn-primary" onclick="saveDates()">Save Dates</button>
      </div>
    </div>`;
}

function handleDateChange(key, value) {
  currentDates[key] = value;
  const display = document.getElementById(`display-${key}`);
  if (display) {
    display.textContent = value
      ? new Date(value).toLocaleDateString('en-NG', { day:'numeric', month:'short', year:'numeric' })
      : '—';
  }
}

async function saveDates() {
  if (!currentPreorderId) return showToast('No preorder loaded');

  const payload = {};
  Object.keys(MILESTONE_LABELS).forEach(k => {
    payload[k] = currentDates[k] || null;
  });

  const res = await fetch(`/api/admin/preorders/${currentPreorderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    showToast('Milestone dates saved');
    loadCalendar();
  } else {
    const d = await res.json();
    showToast('Error: ' + (d.error || 'Save failed'));
  }
}

loadCalendar();
