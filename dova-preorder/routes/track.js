'use strict';
const express = require('express');
const db = require('../db');
const { buildCalendar } = require('../lib/calendar');
const router = express.Router();

const STATUS_LABELS = {
  pending_payment:  'Awaiting Payment',
  goods_paid:       'Goods Payment Received',
  window_closed:    'Order Window Closed — Sourcing Started',
  sourcing:         'Sourcing Goods from Supplier',
  shipped_china:    'Shipped from China',
  customs_nigeria:  'At Nigerian Customs',
  arrived_akure:    'Arrived at Akure Warehouse',
  stage2_invoiced:  'Shipping Fee Invoice Sent',
  stage2_paid:      'Shipping Fee Paid',
  waybilled:        'Dispatched to Delivery Address',
  delivered:        'Delivered',
  forfeited:        'Forfeited'
};

const STATUS_ORDER = Object.keys(STATUS_LABELS);

router.get('/:ref', (req, res) => {
  const { ref } = req.params;

  let order;
  if (/^\d{10,11}$/.test(ref.replace(/^\+234/, '0'))) {
    // Lookup by phone — return most recent order
    const phone = ref.replace(/^\+234/, '0');
    order = db.prepare(
      `SELECT * FROM orders WHERE buyer_phone = ? OR buyer_phone = ? ORDER BY id DESC LIMIT 1`
    ).get(phone, '+234' + phone.slice(1));
  } else {
    order = db.prepare('SELECT * FROM orders WHERE order_ref = ?').get(ref);
  }

  if (!order) return res.status(404).json({ error: 'Order not found' });

  const items = db.prepare(`
    SELECT oi.*, p.name, p.image_urls, p.category
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    WHERE oi.order_id = ?
  `).all(order.id).map((i) => ({
    ...i,
    image_urls: JSON.parse(i.image_urls || '[]')
  }));

  const preorder = db.prepare('SELECT * FROM preorders WHERE id = ?').get(order.preorder_id);
  const milestones = preorder ? buildCalendar(preorder) : [];

  const currentStep = STATUS_ORDER.indexOf(order.status);

  res.json({
    order: {
      order_ref: order.order_ref,
      status: order.status,
      status_label: STATUS_LABELS[order.status] || order.status,
      buyer_name: order.buyer_name,
      total_naira: order.total_naira,
      stage1_paid: order.stage1_paid,
      stage2_amount: order.stage2_amount,
      stage2_due_at: order.stage2_due_at,
      stage2_paid: order.stage2_paid,
      stage3_amount: order.stage3_amount,
      stage3_paid: order.stage3_paid,
      waybill_number: order.waybill_number,
      delivery_agent: order.delivery_agent,
      forfeited: order.forfeited,
      forfeiture_reason: order.forfeiture_reason,
      created_at: order.created_at
    },
    items,
    milestones,
    statusFlow: STATUS_LABELS,
    currentStep
  });
});

module.exports = router;
