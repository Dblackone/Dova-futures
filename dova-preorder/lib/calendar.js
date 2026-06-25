'use strict';

const MILESTONE_LABELS = {
  start_date:           'Preorder Opens',
  end_date:             'Order Window Closes',
  forex_date:           'Currency Conversion (₦ → ¥)',
  payment_china_date:   'Payment to Chinese Suppliers',
  ship_china_date:      'Expected Ship Date from China',
  arrival_nigeria_date: 'Expected Arrival — Nigerian Port',
  customs_clear_date:   'Expected Customs Clearance',
  arrival_akure_date:   'Expected Arrival — Akure Warehouse',
  stage2_invoice_date:  'Shipping Fee Invoices Sent',
  stage2_deadline_date: 'Shipping Fee Payment Deadline',
  waybill_date:         'Expected Waybill Dispatch'
};

const MILESTONE_KEYS = Object.keys(MILESTONE_LABELS);

function buildCalendar(preorder) {
  return MILESTONE_KEYS.map((key) => ({
    key,
    label: MILESTONE_LABELS[key],
    date: preorder[key] || null
  })).filter((m) => m.date !== null);
}

function milestoneStatus(dateStr) {
  if (!dateStr) return 'not-set';
  const d = new Date(dateStr);
  const now = new Date();
  if (d < now) return 'done';
  const diff = d - now;
  if (diff < 86400000 * 3) return 'imminent';
  return 'upcoming';
}

module.exports = { buildCalendar, milestoneStatus, MILESTONE_LABELS, MILESTONE_KEYS };
