CREATE TABLE IF NOT EXISTS preorders (
  id                         INTEGER PRIMARY KEY AUTOINCREMENT,
  title                      TEXT NOT NULL,
  description                TEXT,
  start_date                 TEXT NOT NULL,
  end_date                   TEXT NOT NULL,
  status                     TEXT NOT NULL DEFAULT 'draft',
  shipping_fee_deadline_days INTEGER DEFAULT 7,
  waybill_deadline_days      INTEGER DEFAULT 14,
  forex_date                 TEXT,
  payment_china_date         TEXT,
  ship_china_date            TEXT,
  arrival_nigeria_date       TEXT,
  customs_clear_date         TEXT,
  arrival_akure_date         TEXT,
  stage2_invoice_date        TEXT,
  stage2_deadline_date       TEXT,
  waybill_date               TEXT,
  created_at                 TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  preorder_id  INTEGER NOT NULL REFERENCES preorders(id),
  name         TEXT NOT NULL,
  description  TEXT,
  category     TEXT,
  price_naira  INTEGER NOT NULL,
  stock_limit  INTEGER,
  image_urls   TEXT DEFAULT '[]',
  supplier_ref TEXT,
  is_active    INTEGER DEFAULT 1,
  created_at   TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS orders (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  order_ref              TEXT NOT NULL UNIQUE,
  preorder_id            INTEGER NOT NULL REFERENCES preorders(id),
  buyer_name             TEXT NOT NULL,
  buyer_phone            TEXT NOT NULL,
  buyer_email            TEXT,
  buyer_address          TEXT NOT NULL,
  buyer_state            TEXT NOT NULL,
  buyer_city             TEXT NOT NULL,
  total_naira            INTEGER NOT NULL,
  tc_accepted            INTEGER DEFAULT 0,
  tc_accepted_at         TEXT,
  stage1_paid            INTEGER DEFAULT 0,
  stage1_paid_at         TEXT,
  stage2_amount          INTEGER,
  stage2_invoice_sent_at TEXT,
  stage2_due_at          TEXT,
  stage2_paid            INTEGER DEFAULT 0,
  stage2_paid_at         TEXT,
  stage3_amount          INTEGER,
  stage3_invoice_sent_at TEXT,
  stage3_paid            INTEGER DEFAULT 0,
  stage3_paid_at         TEXT,
  status                 TEXT NOT NULL DEFAULT 'pending_payment',
  tracking_notes         TEXT,
  waybill_number         TEXT,
  delivery_agent         TEXT,
  forfeited              INTEGER DEFAULT 0,
  forfeited_at           TEXT,
  forfeiture_reason      TEXT,
  created_at             TEXT DEFAULT (datetime('now')),
  updated_at             TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS order_items (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id   INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity   INTEGER NOT NULL CHECK (quantity > 0),
  unit_price INTEGER NOT NULL,
  line_total INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id        INTEGER NOT NULL REFERENCES orders(id),
  stage           INTEGER NOT NULL CHECK (stage IN (1, 2, 3)),
  amount          INTEGER NOT NULL,
  paystack_ref    TEXT UNIQUE,
  paystack_status TEXT,
  verified        INTEGER DEFAULT 0,
  created_at      TEXT DEFAULT (datetime('now')),
  verified_at     TEXT
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  token      TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_phone   ON orders(buyer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_ref     ON orders(order_ref);
CREATE INDEX IF NOT EXISTS idx_payments_ref   ON payments(paystack_ref);
CREATE INDEX IF NOT EXISTS idx_products_pre   ON products(preorder_id);
CREATE INDEX IF NOT EXISTS idx_orders_pre     ON orders(preorder_id);
