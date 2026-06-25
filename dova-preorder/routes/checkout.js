'use strict';
const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const { initializeTransaction, verifyTransaction } = require('../lib/paystack');
const { sendOrderConfirmation } = require('../lib/notify');
const router = express.Router();

router.post('/init', async (req, res) => {
  const { orderId, orderRef, stage } = req.body;
  if (!orderId && !orderRef) return res.status(400).json({ error: 'orderId or orderRef required' });

  const order = orderId
    ? db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId)
    : db.prepare('SELECT * FROM orders WHERE order_ref = ?').get(orderRef);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const payStage = stage || 1;
  let amountKobo;
  let reference;

  if (payStage === 1) {
    if (order.stage1_paid) return res.status(400).json({ error: 'Stage 1 already paid' });
    amountKobo = order.total_naira;
    reference = order.order_ref;
  } else if (payStage === 2) {
    if (!order.stage2_amount) return res.status(400).json({ error: 'Shipping fee not yet set' });
    if (order.stage2_paid) return res.status(400).json({ error: 'Stage 2 already paid' });
    amountKobo = order.stage2_amount;
    reference = `${order.order_ref}-S2`;
  } else if (payStage === 3) {
    if (!order.stage3_amount) return res.status(400).json({ error: 'Waybill fee not yet set' });
    if (order.stage3_paid) return res.status(400).json({ error: 'Stage 3 already paid' });
    amountKobo = order.stage3_amount;
    reference = `${order.order_ref}-S3`;
  } else {
    return res.status(400).json({ error: 'Invalid stage' });
  }

  const baseUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 3001}`;
  const callbackUrl = `${baseUrl}/checkout?status=success&ref=${order.order_ref}&stage=${payStage}`;

  try {
    const result = await initializeTransaction({
      email: order.buyer_email || 'buyer@dovafutures.com',
      amountKobo,
      reference,
      callbackUrl,
      metadata: { orderId: order.id, orderRef: order.order_ref, stage: payStage }
    });

    if (!result.status) return res.status(502).json({ error: 'Paystack initialization failed' });

    db.prepare('INSERT OR IGNORE INTO payments (order_id, stage, amount, paystack_ref) VALUES (?, ?, ?, ?)')
      .run(order.id, payStage, amountKobo, reference);

    res.json({ authorization_url: result.data.authorization_url, reference });
  } catch (err) {
    console.error('[checkout] Paystack init error:', err.message);
    res.status(502).json({ error: 'Payment gateway error' });
  }
});

// Paystack webhook — must receive raw body for HMAC verification
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-paystack-signature'];
  const rawBody = req.body;

  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '')
    .update(rawBody)
    .digest('hex');

  if (hash !== signature) {
    console.warn('[webhook] Invalid signature');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  let event;
  try { event = JSON.parse(rawBody); }
  catch { return res.status(400).json({ error: 'Bad JSON' }); }

  res.status(200).json({ received: true });

  if (event.event !== 'charge.success') return;

  const ref = event.data.reference;
  const existing = db.prepare('SELECT * FROM payments WHERE paystack_ref = ?').get(ref);
  if (!existing || existing.verified) return;

  // Determine stage from reference suffix
  let stage = 1;
  if (ref.endsWith('-S2')) stage = 2;
  else if (ref.endsWith('-S3')) stage = 3;

  const now = new Date().toISOString();

  db.prepare('UPDATE payments SET verified = 1, paystack_status = ?, verified_at = ? WHERE paystack_ref = ?')
    .run('success', now, ref);

  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(existing.order_id);
  if (!order) return;

  if (stage === 1 && !order.stage1_paid) {
    db.prepare(`UPDATE orders SET stage1_paid = 1, stage1_paid_at = ?, status = 'goods_paid', updated_at = ? WHERE id = ?`)
      .run(now, now, order.id);
    const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(order.id);
    sendOrderConfirmation(updatedOrder).catch(console.error);
  } else if (stage === 2 && !order.stage2_paid) {
    db.prepare(`UPDATE orders SET stage2_paid = 1, stage2_paid_at = ?, status = 'stage2_paid', updated_at = ? WHERE id = ?`)
      .run(now, now, order.id);
  } else if (stage === 3 && !order.stage3_paid) {
    db.prepare(`UPDATE orders SET stage3_paid = 1, stage3_paid_at = ?, updated_at = ? WHERE id = ?`)
      .run(now, now, order.id);
  }
});

module.exports = router;
