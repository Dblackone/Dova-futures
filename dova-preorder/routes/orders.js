'use strict';
const express = require('express');
const db = require('../db');
const { validateCheckout } = require('../middleware/validate');
const { generateOrderRef } = require('../lib/order-ref');
const router = express.Router();

router.post('/', (req, res) => {
  if (req.body.website) return res.status(200).json({ success: true });

  const errors = validateCheckout(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const preorder = db.prepare(
    `SELECT * FROM preorders WHERE status = 'active' ORDER BY id DESC LIMIT 1`
  ).get();
  if (!preorder) return res.status(400).json({ error: 'No active preorder window' });

  const now = new Date().toISOString();
  if (now > preorder.end_date) return res.status(400).json({ error: 'Preorder window has closed' });

  const { buyer_name, buyer_phone, buyer_email, buyer_address, buyer_state, buyer_city, items } = req.body;

  let totalKobo = 0;
  const resolvedItems = [];

  for (const item of items) {
    const product = db.prepare(
      `SELECT * FROM products WHERE id = ? AND preorder_id = ? AND is_active = 1`
    ).get(item.productId, preorder.id);

    if (!product) return res.status(400).json({ error: `Product ${item.productId} not found or inactive` });
    if (item.quantity < 1) return res.status(400).json({ error: 'Quantity must be at least 1' });

    if (product.stock_limit !== null) {
      const sold = db.prepare(
        `SELECT COALESCE(SUM(oi.quantity), 0) AS total
         FROM order_items oi
         JOIN orders o ON o.id = oi.order_id
         WHERE oi.product_id = ? AND o.status != 'pending_payment'`
      ).get(product.id).total;

      if (sold + item.quantity > product.stock_limit) {
        return res.status(400).json({ error: `Insufficient stock for "${product.name}"` });
      }
    }

    const lineTotal = product.price_naira * item.quantity;
    totalKobo += lineTotal;
    resolvedItems.push({ product, quantity: item.quantity, lineTotal });
  }

  const orderRef = generateOrderRef();

  const insertOrder = db.transaction(() => {
    const { lastInsertRowid } = db.prepare(`
      INSERT INTO orders (order_ref, preorder_id, buyer_name, buyer_phone, buyer_email,
        buyer_address, buyer_state, buyer_city, total_naira, tc_accepted, tc_accepted_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'pending_payment')
    `).run(orderRef, preorder.id, buyer_name.trim(), buyer_phone.trim(), buyer_email?.trim() || null,
        buyer_address.trim(), buyer_state, buyer_city.trim(), totalKobo, now);

    for (const { product, quantity, lineTotal } of resolvedItems) {
      db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
        VALUES (?, ?, ?, ?, ?)
      `).run(lastInsertRowid, product.id, quantity, product.price_naira, lineTotal);
    }

    return lastInsertRowid;
  });

  const orderId = insertOrder();
  res.json({ orderId, orderRef, totalKobo });
});

module.exports = router;
