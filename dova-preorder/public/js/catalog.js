'use strict';

let allProducts = [];
let activeCategory = '';
let searchQuery = '';

async function init() {
  await loadBanner();
  await loadProducts();
  bindFilters();
  const urlCat = new URLSearchParams(location.search).get('category');
  if (urlCat) setCategory(urlCat);
}

async function loadBanner() {
  const res = await fetch('/api/active');
  const data = await res.json();
  const banner = document.getElementById('window-banner');
  if (!data.active) {
    banner.textContent = 'Preorder window is currently closed. Browse to see available products.';
    banner.classList.add('closed');
    return;
  }
  const end = new Date(data.preorder.end_date);
  function updateBanner() {
    const diff = end - new Date();
    if (diff <= 0) { banner.textContent = 'Preorder window has closed.'; banner.classList.add('closed'); return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    banner.innerHTML = `Preorder window: <strong>${data.preorder.title}</strong> — Closes in <span id="banner-countdown">${d}d ${h}h ${m}m</span>`;
  }
  updateBanner();
  setInterval(updateBanner, 60000);
}

async function loadProducts() {
  const res = await fetch('/api/products');
  allProducts = await res.json();
  buildCategoryChips();
  renderProducts();
}

function buildCategoryChips() {
  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];
  const chips = document.getElementById('filter-chips');
  chips.innerHTML = `<button class="filter-chip active" data-cat="" onclick="setCategory('')">All</button>`;
  categories.forEach((cat) => {
    chips.innerHTML += `<button class="filter-chip" data-cat="${cat}" onclick="setCategory('${cat}')">${cat}</button>`;
  });
}

function setCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll('.filter-chip').forEach((el) => {
    el.classList.toggle('active', el.dataset.cat === cat);
  });
  renderProducts();
}

function bindFilters() {
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderProducts();
  });
}

function renderProducts() {
  let filtered = allProducts;
  if (activeCategory) filtered = filtered.filter((p) => p.category === activeCategory);
  if (searchQuery) filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery) || (p.description || '').toLowerCase().includes(searchQuery));

  const grid = document.getElementById('products-grid');
  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state"><h3>No products found</h3><p>Try a different category or search term.</p></div>`;
    return;
  }
  grid.innerHTML = filtered.map((p) => productCard(p)).join('');
}

function productCard(p) {
  const imgHtml = p.image_urls && p.image_urls[0]
    ? `<img class="product-img" src="${p.image_urls[0]}" alt="${p.name}" loading="lazy">`
    : `<div class="product-img-placeholder">📦</div>`;
  const soldOut = p.stock_limit !== null && p.stock_limit === 0;
  return `
    <div class="product-card" onclick="openModal(${p.id})">
      ${imgHtml}
      <div class="product-info">
        <div class="product-cat">${p.category || 'General'}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">₦${(p.price_naira / 100).toLocaleString('en-NG')}</div>
        ${soldOut ? '<span class="sold-out-badge">Sold Out</span>' : `<button class="btn btn-primary btn-sm" onclick="quickAdd(event,${p.id})">Add to Cart</button>`}
      </div>
    </div>`;
}

function quickAdd(e, productId) {
  e.stopPropagation();
  const p = allProducts.find((x) => x.id === productId);
  if (!p) return;
  addToCart(p, 1);
  showToast(`${p.name} added to cart`);
}

function openModal(productId) {
  const p = allProducts.find((x) => x.id === productId);
  if (!p) return;
  const images = p.image_urls && p.image_urls.length ? p.image_urls : [];
  const mainImg = images[0] ? `<img class="modal-img" src="${images[0]}" alt="${p.name}">` : `<div class="modal-img" style="display:flex;align-items:center;justify-content:center;font-size:60px">📦</div>`;
  document.getElementById('modal-body').innerHTML = `
    ${mainImg}
    <div class="product-cat">${p.category || 'General'}</div>
    <h2 style="font-size:22px;margin-bottom:var(--space-3)">${p.name}</h2>
    <div style="font-family:var(--font-display);font-size:28px;color:var(--green-800);margin-bottom:var(--space-3)">₦${(p.price_naira / 100).toLocaleString('en-NG')}</div>
    ${p.description ? `<p style="color:var(--ink-700);font-size:14px;margin-bottom:var(--space-4)">${p.description}</p>` : ''}
    <div class="qty-stepper">
      <button class="qty-btn" onclick="changeQty(-1)">−</button>
      <span class="qty-val" id="modal-qty">1</span>
      <button class="qty-btn" onclick="changeQty(1)">+</button>
      <span style="font-size:13px;color:var(--ink-500)">× ₦${(p.price_naira / 100).toLocaleString('en-NG')} = <span id="modal-line-total">₦${(p.price_naira / 100).toLocaleString('en-NG')}</span></span>
    </div>
    <button class="btn btn-primary" style="width:100%" onclick="addFromModal(${p.id})">Add to Cart</button>`;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function changeQty(delta) {
  const el = document.getElementById('modal-qty');
  const newVal = Math.max(1, parseInt(el.textContent) + delta);
  el.textContent = newVal;
  // Update line total if possible (product from modal body context)
}

function addFromModal(productId) {
  const p = allProducts.find((x) => x.id === productId);
  const qty = parseInt(document.getElementById('modal-qty').textContent);
  addToCart(p, qty);
  showToast(`${p.name} (×${qty}) added to cart`);
  closeModal();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnBg(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

init();
