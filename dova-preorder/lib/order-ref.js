'use strict';
const db = require('../db');

function generateOrderRef() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const prefix = `DF-${yy}${mm}${dd}-`;

  const row = db.prepare(
    `SELECT order_ref FROM orders WHERE order_ref LIKE ? ORDER BY id DESC LIMIT 1`
  ).get(prefix + '%');

  let seq = 1;
  if (row) {
    const last = parseInt(row.order_ref.split('-').pop(), 10);
    seq = last + 1;
  }
  return prefix + String(seq).padStart(4, '0');
}

module.exports = { generateOrderRef };
