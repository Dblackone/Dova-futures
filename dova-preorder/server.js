'use strict';
require('dotenv').config();
require('./db'); // initialise DB and run schema migrations

const express = require('express');
const path = require('path');

const app = express();

// Raw body for Paystack webhook (must be before express.json)
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files (shared.css, page JS, uploads)
app.use(express.static(path.join(__dirname, 'public')));

// Uploaded product images — served from UPLOAD_DIR if set to a location
// outside public/ (e.g. a mounted persistent disk), falling back to public/uploads
if (process.env.UPLOAD_DIR) {
  app.use('/uploads', express.static(process.env.UPLOAD_DIR));
}

// API routes
app.use('/api', require('./routes/catalog'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/track', require('./routes/track'));
app.use('/api/admin', require('./routes/admin'));

// HTML page routes
const pub = path.join(__dirname, 'public');
const page = (file) => (req, res) => res.sendFile(path.join(pub, file));

app.get('/', page('landing.html'));
app.get('/catalog', page('catalog.html'));
app.get('/cart', page('cart.html'));
app.get('/checkout', page('checkout.html'));
app.get('/track', page('track.html'));
app.get('/terms', page('terms.html'));
app.get('/admin', page('admin/dashboard.html'));
app.get('/admin/login', page('admin/login.html'));
app.get('/admin/products', page('admin/products.html'));
app.get('/admin/orders', page('admin/orders.html'));
app.get('/admin/orders/:id', page('admin/order-detail.html'));
app.get('/admin/calendar', page('admin/calendar.html'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[dova-preorder] running on http://localhost:${PORT}`);
});
