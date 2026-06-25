'use strict';

const CART_KEY = 'dova-cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product, quantity) {
  const cart = getCart();
  const existing = cart.find((i) => i.productId === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price_naira,
      priceDisplay: product.price_naira_display,
      image: (product.image_urls && product.image_urls[0]) || null,
      category: product.category,
      quantity
    });
  }
  saveCart(cart);
}

function updateCartItem(productId, quantity) {
  const cart = getCart();
  const idx = cart.findIndex((i) => i.productId === productId);
  if (idx === -1) return;
  if (quantity <= 0) {
    cart.splice(idx, 1);
  } else {
    cart[idx].quantity = quantity;
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter((i) => i.productId !== productId));
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

function formatNaira(kobo) {
  return '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
}

function updateCartBadge() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = cartCount();
}

function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

updateCartBadge();
