'use strict';

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara'
];

function isValidPhone(phone) {
  return /^(\+234|0)[789]\d{9}$/.test(phone.trim());
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateCheckout(body) {
  const errors = [];
  if (!body.buyer_name || body.buyer_name.trim().length < 2) errors.push('Full name is required');
  if (!body.buyer_phone || !isValidPhone(body.buyer_phone)) errors.push('Valid Nigerian phone number required');
  if (body.buyer_email && !isValidEmail(body.buyer_email)) errors.push('Invalid email address');
  if (!body.buyer_address || body.buyer_address.trim().length < 5) errors.push('Delivery address is required');
  if (!body.buyer_state || !NIGERIAN_STATES.includes(body.buyer_state)) errors.push('Valid Nigerian state required');
  if (!body.buyer_city || body.buyer_city.trim().length < 2) errors.push('City is required');
  if (!body.tc_accepted) errors.push('You must accept the Terms and Conditions');
  if (!Array.isArray(body.items) || body.items.length === 0) errors.push('Cart is empty');
  return errors;
}

module.exports = { validateCheckout, isValidPhone, isValidEmail, NIGERIAN_STATES };
