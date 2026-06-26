'use strict';
const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/active', (req, res) => {
  const preorder = db.prepare(
    `SELECT * FROM preorders WHERE status = 'active' ORDER BY id DESC LIMIT 1`
  ).get();
  if (!preorder) return res.json({ active: false });
  res.json({ active: true, preorder });
});

router.get('/products', (req, res) => {
  const preorder = db.prepare(
    `SELECT id FROM preorders WHERE status = 'active' ORDER BY id DESC LIMIT 1`
  ).get();
  if (!preorder) return res.json([]);

  const { category } = req.query;
  let stmt;
  let products;

  if (category) {
    stmt = db.prepare(
      `SELECT * FROM products WHERE preorder_id = ? AND is_active = 1 AND category = ? ORDER BY id`
    );
    products = stmt.all(preorder.id, category);
  } else {
    stmt = db.prepare(
      `SELECT * FROM products WHERE preorder_id = ? AND is_active = 1 ORDER BY id`
    );
    products = stmt.all(preorder.id);
  }

  products = products.map((p) => ({
    ...p,
    image_urls: JSON.parse(p.image_urls || '[]'),
    price_naira_display: (p.price_naira / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 })
  }));

  res.json(products);
});

module.exports = router;
