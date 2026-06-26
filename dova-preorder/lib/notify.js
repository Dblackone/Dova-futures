'use strict';
const nodemailer = require('nodemailer');

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function formatNaira(kobo) {
  return '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
}

function whatsappLink(phone, message) {
  const cleaned = phone.replace(/\D/g, '').replace(/^0/, '234');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

async function sendMail(to, subject, html) {
  if (!process.env.SMTP_HOST) return;
  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@dovafutures.com',
      to,
      subject,
      html
    });
  } catch (err) {
    console.error('[notify] email failed:', err.message);
  }
}

function brandWrap(content) {
  return `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#F5EFE8;border-radius:8px;overflow:hidden">
      <div style="background:#1C4636;padding:24px 32px">
        <h1 style="color:#F5EFE8;font-size:22px;margin:0;letter-spacing:1px">DOVA FUTURES</h1>
        <p style="color:#DCEBE2;margin:4px 0 0;font-size:13px">Preorder Platform</p>
      </div>
      <div style="padding:32px;color:#1a1a1a;line-height:1.6">${content}</div>
      <div style="background:#1C4636;padding:16px 32px;text-align:center">
        <p style="color:#DCEBE2;font-size:12px;margin:0">Dova Futures &bull; Akure, Ondo State, Nigeria</p>
      </div>
    </div>`;
}

async function sendOrderConfirmation(order) {
  if (order.buyer_email) {
    const html = brandWrap(`
      <h2>Order Confirmed!</h2>
      <p>Hi <strong>${order.buyer_name}</strong>, your preorder has been received.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:8px 0;color:#666">Order Reference</td><td><strong>${order.order_ref}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Total Paid</td><td><strong>${formatNaira(order.total_naira)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Status</td><td><span style="color:#1C4636;font-weight:600">Goods Payment Received</span></td></tr>
      </table>
      <p>We will notify you when your goods are shipped from China. A separate shipping fee will be invoiced based on the actual weight of your goods.</p>
      <p><a href="${process.env.APP_URL || ''}/track?ref=${order.order_ref}" style="background:#B85C38;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;margin-top:8px">Track My Order</a></p>
    `);
    await sendMail(order.buyer_email, `Order Confirmed — ${order.order_ref}`, html);
  }
  return whatsappLink(order.buyer_phone,
    `Hello ${order.buyer_name}, your Dova Futures order ${order.order_ref} has been confirmed! Total paid: ${formatNaira(order.total_naira)}. Track your order at ${process.env.APP_URL || 'your order tracking link'}/track?ref=${order.order_ref}`
  );
}

async function sendStage2Invoice(order, amount, dueDate) {
  if (order.buyer_email) {
    const html = brandWrap(`
      <h2>Shipping Fee Invoice</h2>
      <p>Hi <strong>${order.buyer_name}</strong>, your goods have arrived in Nigeria and are being processed.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:8px 0;color:#666">Order Reference</td><td><strong>${order.order_ref}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Shipping Fee</td><td><strong style="font-size:20px;color:#B85C38">${formatNaira(amount)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Payment Deadline</td><td><strong>${dueDate}</strong></td></tr>
      </table>
      <p style="background:#fff3cd;padding:12px;border-radius:4px;border-left:4px solid #B85C38"><strong>Important:</strong> Non-payment by the deadline will result in forfeiture of your goods with no refund, as per our Terms & Conditions.</p>
      <p><a href="${process.env.APP_URL || ''}/track?ref=${order.order_ref}" style="background:#B85C38;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;margin-top:8px">Pay Shipping Fee</a></p>
    `);
    await sendMail(order.buyer_email, `Shipping Fee Invoice — ${order.order_ref}`, html);
  }
  return whatsappLink(order.buyer_phone,
    `Hello ${order.buyer_name}, your Dova Futures goods (Order ${order.order_ref}) have arrived in Nigeria. Shipping fee: ${formatNaira(amount)}. Payment deadline: ${dueDate}. Please pay at ${process.env.APP_URL || ''}/track?ref=${order.order_ref} — failure to pay will result in forfeiture.`
  );
}

async function sendStage2Reminder(order, daysRemaining) {
  if (order.buyer_email) {
    const html = brandWrap(`
      <h2>Shipping Fee Reminder</h2>
      <p>Hi <strong>${order.buyer_name}</strong>, this is a reminder that your shipping fee for order <strong>${order.order_ref}</strong> is due in <strong>${daysRemaining} day${daysRemaining === 1 ? '' : 's'}</strong>.</p>
      <p>Amount due: <strong style="color:#B85C38">${formatNaira(order.stage2_amount)}</strong></p>
      <p>Deadline: <strong>${order.stage2_due_at}</strong></p>
      <p style="background:#fff3cd;padding:12px;border-radius:4px;border-left:4px solid #B85C38">Non-payment will result in forfeiture of your goods with no refund.</p>
      <p><a href="${process.env.APP_URL || ''}/track?ref=${order.order_ref}" style="background:#B85C38;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;margin-top:8px">Pay Now</a></p>
    `);
    await sendMail(order.buyer_email, `Reminder: Shipping Fee Due in ${daysRemaining} Day${daysRemaining === 1 ? '' : 's'} — ${order.order_ref}`, html);
  }
  return whatsappLink(order.buyer_phone,
    `REMINDER: Dova Futures order ${order.order_ref} — shipping fee of ${formatNaira(order.stage2_amount)} is due in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'} (${order.stage2_due_at}). Pay at ${process.env.APP_URL || ''}/track?ref=${order.order_ref}`
  );
}

async function sendWaybillNotification(order) {
  if (order.buyer_email) {
    const html = brandWrap(`
      <h2>Your Goods Are On the Way!</h2>
      <p>Hi <strong>${order.buyer_name}</strong>, great news! Your order has been dispatched.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:8px 0;color:#666">Order Reference</td><td><strong>${order.order_ref}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Delivery Agent</td><td><strong>${order.delivery_agent}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Waybill Number</td><td><strong>${order.waybill_number}</strong></td></tr>
      </table>
      <p>Please track your waybill with <strong>${order.delivery_agent}</strong> using waybill number <strong>${order.waybill_number}</strong>.</p>
    `);
    await sendMail(order.buyer_email, `Order Dispatched — ${order.order_ref}`, html);
  }
  return whatsappLink(order.buyer_phone,
    `Good news ${order.buyer_name}! Your Dova Futures order ${order.order_ref} has been dispatched via ${order.delivery_agent}. Waybill: ${order.waybill_number}.`
  );
}

async function sendForfeitureNotice(order) {
  if (order.buyer_email) {
    const html = brandWrap(`
      <h2>Order Forfeited</h2>
      <p>Hi <strong>${order.buyer_name}</strong>, we regret to inform you that your order <strong>${order.order_ref}</strong> has been forfeited.</p>
      <p>Reason: ${order.forfeiture_reason || 'Non-payment of shipping fee by the deadline'}</p>
      <p>As stated in our Terms & Conditions, goods are forfeited and Stage 1 payment is non-refundable when the shipping fee is not paid by the specified deadline.</p>
      <p>If you believe this is in error, please contact us immediately via WhatsApp.</p>
    `);
    await sendMail(order.buyer_email, `Order Forfeited — ${order.order_ref}`, html);
  }
  return whatsappLink(order.buyer_phone,
    `Dova Futures: Unfortunately, your order ${order.order_ref} has been forfeited due to non-payment of the shipping fee. Please contact us if you have questions.`
  );
}

async function sendStatusUpdate(order, message) {
  if (order.buyer_email) {
    const html = brandWrap(`
      <h2>Order Update</h2>
      <p>Hi <strong>${order.buyer_name}</strong>, here is an update on your order <strong>${order.order_ref}</strong>:</p>
      <p style="font-size:16px;background:#fff;padding:16px;border-radius:4px;border-left:4px solid #1C4636">${message}</p>
      <p><a href="${process.env.APP_URL || ''}/track?ref=${order.order_ref}" style="background:#1C4636;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;margin-top:8px">Track Order</a></p>
    `);
    await sendMail(order.buyer_email, `Order Update — ${order.order_ref}`, html);
  }
  return whatsappLink(order.buyer_phone,
    `Dova Futures update for order ${order.order_ref}: ${message}. Track at ${process.env.APP_URL || ''}/track?ref=${order.order_ref}`
  );
}

module.exports = {
  sendOrderConfirmation,
  sendStage2Invoice,
  sendStage2Reminder,
  sendWaybillNotification,
  sendForfeitureNotice,
  sendStatusUpdate,
  whatsappLink,
  formatNaira
};
