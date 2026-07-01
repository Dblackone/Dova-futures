'use strict';
const express = require('express');
const path = require('path');
const fs = require('fs');
const busboy = require('busboy');
const crypto = require('crypto');
const db = require('../db');
const { requireAdmin, createSession, destroySession, verifyPassword, parseCookies } = require('../middleware/auth');
const { buildCalendar, MILESTONE_KEYS } = require('../lib/calendar');
const {
  sendStage2Invoice, sendStage2Reminder, sendWaybillNotification,
  sendForfeitureNotice, sendStatusUpdate, whatsappLink, formatNaira
} = require('../lib/notify');
const router = express.Router();

// ── Auth ──────────────────────────────────────────────────────────────────────

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (!password || !verifyPassword(password)) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const { token, expiresAt } = createSession();
  res.setHeader('Set-Cookie', `dova-admin-token=${token}; HttpOnly; SameSite=Strict; Path=/; Expires=${new Date(expiresAt).toUTCString()}`);
  res.json({ success: true });
});

router.post('/logout', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  if (cookies['dova-admin-token']) destroySession(cookies['dova-admin-token']);
  res.setHeader('Set-Cookie', 'dova-admin-token=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
  res.json({ success: true });
});

// All routes below require auth
router.use(requireAdmin);

// ── Preorders ─────────────────────────────────────────────────────────────────

router.get('/preorders', (req, res) => {
  const rows = db.prepare('SELECT * FROM preorders ORDER BY id DESC').all();
  res.json(rows);
});

router.post('/preorders', (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  if (!title || !start_date || !end_date) return res.status(400).json({ error: 'title, start_date, end_date required' });
  const { lastInsertRowid } = db.prepare(
    `INSERT INTO preorders (title, description, start_date, end_date) VALUES (?, ?, ?, ?)`
  ).run(title, description || null, start_date, end_date);
  res.json({ id: lastInsertRowid });
});

router.put('/preorders/:id', (req, res) => {
  const allowed = ['title', 'description', 'status', 'start_date', 'end_date',
    'shipping_fee_deadline_days', 'waybill_deadline_days', ...MILESTONE_KEYS];
  const fields = Object.keys(req.body).filter((k) => allowed.includes(k));
  if (!fields.length) return res.status(400).json({ error: 'No valid fields' });
  const sets = fields.map((f) => `${f} = ?`).join(', ');
  const vals = fields.map((f) => req.body[f]);
  db.prepare(`UPDATE preorders SET ${sets} WHERE id = ?`).run(...vals, req.params.id);
  res.json({ success: true });
});

// ── Products ──────────────────────────────────────────────────────────────────

router.get('/products', (req, res) => {
  const { preorder_id } = req.query;
  let products;
  if (preorder_id) {
    products = db.prepare('SELECT * FROM products WHERE preorder_id = ? ORDER BY id DESC').all(preorder_id);
  } else {
    products = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
  }
  res.json(products.map((p) => ({ ...p, image_urls: JSON.parse(p.image_urls || '[]') })));
});

router.post('/products', (req, res) => {
  if (!req.headers['content-type']?.includes('multipart/form-data')) {
    return res.status(400).json({ error: 'multipart/form-data required' });
  }

  const bb = busboy({ headers: req.headers, limits: { files: 5, fileSize: 5 * 1024 * 1024 } });
  const fields = {};
  const imageUrls = [];
  const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  bb.on('field', (name, val) => { fields[name] = val; });
  bb.on('file', (name, file, info) => {
    const ext = path.extname(info.filename) || '.jpg';
    const fname = `${crypto.randomBytes(12).toString('hex')}${ext}`;
    const dest = path.join(uploadDir, fname);
    const stream = fs.createWriteStream(dest);
    file.pipe(stream);
    imageUrls.push(`/uploads/${fname}`);
  });
  bb.on('finish', () => {
    const { preorder_id, name, description, category, price_naira, stock_limit, supplier_ref } = fields;
    if (!preorder_id || !name || !price_naira) {
      return res.status(400).json({ error: 'preorder_id, name, price_naira required' });
    }
    const priceKobo = Math.round(parseFloat(price_naira) * 100);
    const { lastInsertRowid } = db.prepare(`
      INSERT INTO products (preorder_id, name, description, category, price_naira, stock_limit, image_urls, supplier_ref)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(parseInt(preorder_id), name, description || null, category || null, priceKobo,
        stock_limit ? parseInt(stock_limit) : null, JSON.stringify(imageUrls), supplier_ref || null);
    res.json({ id: lastInsertRowid });
  });
  bb.on('error', (err) => res.status(500).json({ error: err.message }));
  req.pipe(bb);
});

router.put('/products/:id', (req, res) => {
  const allowed = ['name', 'description', 'category', 'price_naira', 'stock_limit', 'is_active', 'supplier_ref'];
  const fields = Object.keys(req.body).filter((k) => allowed.includes(k));
  if (!fields.length) return res.status(400).json({ error: 'No valid fields' });
  const vals = fields.map((f) => f === 'price_naira' ? Math.round(parseFloat(req.body[f]) * 100) : req.body[f]);
  const sets = fields.map((f) => `${f} = ?`).join(', ');
  db.prepare(`UPDATE products SET ${sets} WHERE id = ?`).run(...vals, req.params.id);
  res.json({ success: true });
});

router.delete('/products/:id', (req, res) => {
  db.prepare('UPDATE products SET is_active = 0 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ── Orders ────────────────────────────────────────────────────────────────────

router.get('/orders', (req, res) => {
  const { status, preorder_id, search } = req.query;
  let sql = 'SELECT * FROM orders WHERE 1=1';
  const params = [];
  if (status) { sql += ' AND status = ?'; params.push(status); }
  if (preorder_id) { sql += ' AND preorder_id = ?'; params.push(preorder_id); }
  if (search) {
    sql += ' AND (buyer_name LIKE ? OR buyer_phone LIKE ? OR order_ref LIKE ?)';
    const like = `%${search}%`;
    params.push(like, like, like);
  }
  sql += ' ORDER BY id DESC LIMIT 200';
  const orders = db.prepare(sql).all(...params);
  res.json(orders);
});

router.get('/orders/:id', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  const items = db.prepare(`
    SELECT oi.*, p.name, p.category FROM order_items oi
    JOIN products p ON p.id = oi.product_id WHERE oi.order_id = ?
  `).all(order.id);
  const payments = db.prepare('SELECT * FROM payments WHERE order_id = ? ORDER BY id').all(order.id);
  res.json({ order, items, payments });
});

router.put('/orders/:id/status', async (req, res) => {
  const { status, tracking_notes } = req.body;
  const now = new Date().toISOString();
  db.prepare('UPDATE orders SET status = ?, tracking_notes = ?, updated_at = ? WHERE id = ?')
    .run(status, tracking_notes || null, now, req.params.id);

  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  const statusMessages = {
    shipped_china:   'Your goods have been shipped from China and are on the way to Nigeria.',
    customs_nigeria: 'Your goods have arrived in Nigeria and are currently being processed through customs.',
    arrived_akure:   'Your goods have cleared customs and arrived at our Akure warehouse.'
  };

  let waLink = null;
  if (statusMessages[status]) {
    waLink = await sendStatusUpdate(order, statusMessages[status]);
  }

  res.json({ success: true, whatsappLink: waLink });
});

router.post('/orders/:id/stage2-invoice', async (req, res) => {
  const { amount_naira } = req.body;
  if (!amount_naira) return res.status(400).json({ error: 'amount_naira required' });
  const amountKobo = Math.round(parseFloat(amount_naira) * 100);
  const now = new Date();
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });

  const preorder = db.prepare('SELECT * FROM preorders WHERE id = ?').get(order.preorder_id);
  const deadlineDays = preorder?.shipping_fee_deadline_days || 7;
  const dueAt = new Date(now.getTime() + deadlineDays * 86400000).toISOString();
  const dueDisplay = new Date(dueAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });

  db.prepare(`
    UPDATE orders SET stage2_amount = ?, stage2_invoice_sent_at = ?, stage2_due_at = ?,
    status = 'stage2_invoiced', updated_at = ? WHERE id = ?
  `).run(amountKobo, now.toISOString(), dueAt, now.toISOString(), order.id);

  const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(order.id);
  const waLink = await sendStage2Invoice(updatedOrder, amountKobo, dueDisplay);

  res.json({ success: true, whatsappLink: waLink });
});

router.post('/orders/:id/stage3-invoice', async (req, res) => {
  const { amount_naira, delivery_agent, waybill_number } = req.body;
  if (!amount_naira) return res.status(400).json({ error: 'amount_naira required' });
  const amountKobo = Math.round(parseFloat(amount_naira) * 100);
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE orders SET stage3_amount = ?, stage3_invoice_sent_at = ?,
    delivery_agent = ?, waybill_number = ?, updated_at = ? WHERE id = ?
  `).run(amountKobo, now, delivery_agent || null, waybill_number || null, now, req.params.id);

  res.json({ success: true });
});

router.post('/orders/:id/forfeit', async (req, res) => {
  const { reason } = req.body;
  const now = new Date().toISOString();
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });

  db.prepare(`
    UPDATE orders SET forfeited = 1, forfeited_at = ?, forfeiture_reason = ?,
    status = 'forfeited', updated_at = ? WHERE id = ?
  `).run(now, reason || 'Non-payment of shipping fee', now, order.id);

  const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(order.id);
  const waLink = await sendForfeitureNotice(updatedOrder);
  res.json({ success: true, whatsappLink: waLink });
});

router.post('/orders/:id/notes', (req, res) => {
  const { tracking_notes } = req.body;
  db.prepare('UPDATE orders SET tracking_notes = ?, updated_at = ? WHERE id = ?')
    .run(tracking_notes, new Date().toISOString(), req.params.id);
  res.json({ success: true });
});

// Stage 2 reminders — check all stage2_invoiced orders nearing deadline
router.post('/orders/reminders/check', async (req, res) => {
  const now = new Date();
  const orders = db.prepare(`
    SELECT * FROM orders WHERE status = 'stage2_invoiced' AND stage2_paid = 0 AND stage2_due_at IS NOT NULL
  `).all();

  const sent = [];
  for (const order of orders) {
    const due = new Date(order.stage2_due_at);
    const daysLeft = Math.ceil((due - now) / 86400000);
    if (daysLeft === 3 || daysLeft === 1) {
      const waLink = await sendStage2Reminder(order, daysLeft);
      sent.push({ order_ref: order.order_ref, daysLeft, whatsappLink: waLink });
    }
  }
  res.json({ sent });
});

// ── Dashboard stats ───────────────────────────────────────────────────────────

router.get('/stats', (req, res) => {
  const preorder = db.prepare(`SELECT * FROM preorders WHERE status = 'active' ORDER BY id DESC LIMIT 1`).get();
  if (!preorder) return res.json({ active: false });

  const stats = db.prepare(`
    SELECT
      COUNT(*) AS total_orders,
      SUM(stage1_paid) AS paid_orders,
      SUM(CASE WHEN stage1_paid = 1 THEN total_naira ELSE 0 END) AS total_collected,
      SUM(CASE WHEN status = 'stage2_invoiced' AND stage2_paid = 0 THEN 1 ELSE 0 END) AS awaiting_stage2,
      SUM(CASE WHEN forfeited = 1 THEN 1 ELSE 0 END) AS forfeited
    FROM orders WHERE preorder_id = ?
  `).get(preorder.id);

  res.json({ active: true, preorder, stats });
});

// ── Calendar ──────────────────────────────────────────────────────────────────

router.get('/calendar', (req, res) => {
  const preorder = db.prepare(`SELECT * FROM preorders WHERE status = 'active' ORDER BY id DESC LIMIT 1`).get();
  if (!preorder) return res.json({ milestones: [] });
  res.json({ preorder, milestones: buildCalendar(preorder) });
});

// ── CSV export ────────────────────────────────────────────────────────────────

router.get('/export', (req, res) => {
  const { preorder_id } = req.query;
  let orders;
  if (preorder_id) {
    orders = db.prepare('SELECT * FROM orders WHERE preorder_id = ? ORDER BY id').all(preorder_id);
  } else {
    orders = db.prepare('SELECT * FROM orders ORDER BY id').all();
  }

  const headers = ['order_ref','buyer_name','buyer_phone','buyer_email','buyer_address',
    'buyer_state','buyer_city','total_naira_kobo','status','stage1_paid','stage2_amount',
    'stage2_paid','stage3_amount','stage3_paid','waybill_number','delivery_agent','forfeited','created_at'];

  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = [headers.join(','), ...orders.map((o) => headers.map((h) => esc(o[h])).join(','))];

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="orders.csv"');
  res.send(rows.join('\r\n'));
});

module.exports = router;
