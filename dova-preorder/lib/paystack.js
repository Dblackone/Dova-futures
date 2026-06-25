'use strict';
const https = require('https');

function paystackRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path,
      method,
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };

    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (chunk) => { raw += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(new Error('Paystack response parse error')); }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function initializeTransaction({ email, amountKobo, reference, callbackUrl, metadata }) {
  return paystackRequest('POST', '/transaction/initialize', {
    email: email || 'buyer@dovafutures.com',
    amount: amountKobo,
    reference,
    callback_url: callbackUrl,
    metadata
  });
}

function verifyTransaction(reference) {
  return paystackRequest('GET', `/transaction/verify/${encodeURIComponent(reference)}`);
}

module.exports = { initializeTransaction, verifyTransaction };
