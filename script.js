// script.js
function delegateAddToCart() {
  document.body.addEventListener('click', async e => {
    const btn = e.target.closest('button');
    if (!btn || btn.textContent.trim() !== 'Add to Cart') return;
    const user = firebase.auth().currentUser;
    if (!user) { alert('Login first'); return; }
    const card = btn.closest('.card');
    const title = card.querySelector('.card-title').textContent;
    const author = card.querySelector('.card-text').textContent;
    const price = parseFloat(card.querySelector('.fw-bold').textContent.replace('$',''));
    await firebase.firestore().collection('carts').doc(user.uid).collection('items').add({ title, author, price });
    loadCartCount();
    btn.textContent = 'Added!';
    setTimeout(() => btn.textContent = 'Add to Cart', 1500);
  });
}

function loadTrendingBooks() {
  const container = document.getElementById('trending-books-container');
  if (!container) return;
  container.innerHTML = '';
  firebase.firestore().collection('listings').orderBy('createdAt','desc').limit(4)
    .get().then(snap => snap.forEach(doc => {
      const d = doc.data();
      const badge = d.condition === 'Like New' ? 'bg-success' : d.condition === 'Very Good'? 'bg-info':'bg-warning';
      const col = document.createElement('div'); col.className='col-md-3 mb-4';
      col.innerHTML = `
        <div class="card h-100">
          <div class="badge ${badge} position-absolute" style="top:.5rem;right:.5rem">${d.condition}</div>
          <img src="${d.coverUrl}" class="card-img-top"><div class="card-body">
            <h5 class="card-title">${d.title}</h5><p class="card-text text-muted">${d.author}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-bold">$${d.price.toFixed(2)}</span>
              <span class="badge bg-light text-dark"><i class="bi bi-geo-alt"></i> —</span>
            </div></div>
          <div class="card-footer bg-transparent"><button class="btn btn-sm btn-outline-primary w-100">Add to Cart</button></div>
        </div>`;
      container.appendChild(col);
    })).then(delegateAddToCart);
}

async function loadCatalog() {
  const container = document.getElementById('catalog-listings');
  container.innerHTML = '';
  const snap = await firebase.firestore().collection('listings').orderBy('createdAt','desc').get();
  snap.forEach(doc => {
    const d = doc.data();
    const badge = d.condition==='Like New'?'bg-success':d.condition==='Very Good'?'bg-info':'bg-warning';
    const col = document.createElement('div'); col.className='col-lg-3 col-md-4 mb-4';
    col.innerHTML = `
      <div class="card h-100">
        <div class="badge ${badge} position-absolute" style="top:.5rem;right:.5rem">${d.condition}</div>
        <img src="${d.coverUrl}" class="card-img-top"><div class="card-body">
          <h5 class="card-title">${d.title}</h5><p class="card-text text-muted">${d.author}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold">$${d.price.toFixed(2)}</span>
            <span class="badge bg-light text-dark"><i class="bi bi-geo-alt"></i> —</span>
          </div></div>
        <div class="card-footer bg-transparent"><button class="btn btn-sm btn-outline-primary w-100">Add to Cart</button></div>
      </div>`;
    container.appendChild(col);
  });
  delegateAddToCart();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount = loadCartCount;
  loadTrendingBooks();
  if (document.getElementById('catalog-listings')) loadCatalog();
});
