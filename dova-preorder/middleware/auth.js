'use strict';
const crypto = require('crypto');
const db = require('../db');

function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  header.split(';').forEach((part) => {
    const [k, ...v] = part.trim().split('=');
    cookies[k.trim()] = decodeURIComponent(v.join('='));
  });
  return cookies;
}

function requireAdmin(req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies['dova-admin-token'];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const now = new Date().toISOString();
  const session = db.prepare(
    'SELECT id FROM admin_sessions WHERE token = ? AND expires_at > ?'
  ).get(token, now);

  if (!session) return res.status(401).json({ error: 'Session expired' });
  next();
}

function createSession() {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
  db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').run(new Date().toISOString());
  db.prepare('INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)').run(token, expiresAt);
  return { token, expiresAt };
}

function destroySession(token) {
  db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
}

function verifyPassword(input) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(expected));
  } catch {
    return false;
  }
}

module.exports = { requireAdmin, createSession, destroySession, verifyPassword, parseCookies };
