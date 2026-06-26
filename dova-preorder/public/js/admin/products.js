'use strict';

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function formatNaira(kobo) {
  return '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
}

async function loadBatches() {
  const res = await fetch('/api/admin/preorders');
  if (res.status === 401) { window.location.href = '/admin/login'; return; }
  const batches = await res.json();
  const sel = document.getElementById('preorder-select');
  sel.innerHTML = batches.map((b) => `<option value="${b.id}">${b.title} (${b.status})</option>`).join('') || '<option value="">No batches — create one first</option>';
  if (batches.length) loadProducts(batches[0].id);
}

async function loadProducts(preorderId) {
  const res = await fetch(`/api/admin/products?preorder_id=${preorderId || ''}`);
  if (!res.ok) return;
  const products = await res.json();

  if (!products.length) {
    document.getElementById('products-table').innerHTML = '<p style="color:var(--ink-500)">No products yet. Add one above.</p>';
    return;
  }

  document.getElementById('products-table').innerHTML = `
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Active</th><th>Actions</th></tr></thead>
      <tbody>${products.map((p) => {
        const imgs = JSON.parse(p.image_urls || '[]');
        return `<tr>
          <td>${imgs[0] ? `<img src="${imgs[0]}" class="product-thumb" alt="">` : '📦'}</td>
          <td><strong>${p.name}</strong>${p.supplier_ref ? `<br><span style="font-size:11px;color:var(--ink-500)">${p.supplier_ref}</span>` : ''}</td>
          <td>${p.category || '—'}</td>
          <td>${formatNaira(p.price_naira)}</td>
          <td>${p.stock_limit !== null ? p.stock_limit : '∞'}</td>
          <td><label style="cursor:pointer"><input type="checkbox" ${p.is_active ? 'checked' : ''} onchange="toggleActive(${p.id}, this.checked)"> Active</label></td>
          <td><button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Remove</button></td>
        </tr>`;
      }).join('')}
      </tbody>
    </table></div>`;
}

async function addProduct(e) {
  e.preventDefault();
  const btn = document.getElementById('add-btn');
  btn.disabled = true;
  btn.textContent = 'Adding...';

  const form = e.target;
  const formData = new FormData(form);

  // Map file input correctly
  const fileInput = form.querySelector('input[type=file]');
  if (fileInput.files.length) {
    formData.delete('images');
    for (const f of fileInput.files) formData.append('images', f);
  }

  const res = await fetch('/api/admin/products', { method: 'POST', body: formData });
  if (res.ok) {
    showToast('Product added');
    form.reset();
    const preorderId = document.getElementById('preorder-select').value;
    loadProducts(preorderId);
  } else {
    const d = await res.json();
    showToast('Error: ' + (d.error || 'Unknown'));
  }
  btn.disabled = false;
  btn.textContent = 'Add Product';
}

async function toggleActive(id, active) {
  await fetch(`/api/admin/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_active: active ? 1 : 0 })
  });
  showToast(active ? 'Product activated' : 'Product deactivated');
}

async function deleteProduct(id) {
  if (!confirm('Remove this product from the catalog? (It will be hidden from buyers but kept in existing orders)')) return;
  const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
  if (res.ok) { showToast('Product removed'); const pid = document.getElementById('preorder-select').value; loadProducts(pid); }
}

function logout() {
  fetch('/api/admin/logout', { method: 'POST' }).then(() => { window.location.href = '/admin/login'; });
}

document.getElementById('preorder-select').addEventListener('change', (e) => loadProducts(e.target.value));
loadBatches();
