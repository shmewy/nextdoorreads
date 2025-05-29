// In script.js (after loadTrendingBooks, etc.)

async function loadCatalog() {
  const container = document.getElementById('catalog-listings');
  container.innerHTML = '';  // clear any placeholders

  try {
    const snapshot = await firebase.firestore()
      .collection('listings')
      .orderBy('createdAt', 'desc')
      .get();

    snapshot.forEach(doc => {
      const data = doc.data();
      // Only show listings that match current filters/within 5 mi if you implement geo
      const badgeClass = data.condition === 'Like New'
        ? 'bg-success'
        : data.condition === 'Very Good'
          ? 'bg-info'
          : 'bg-warning';

      const card = document.createElement('div');
      card.className = 'col-lg-3 col-md-4 mb-4';
      card.innerHTML = `
        <div class="card h-100">
          <div class="badge ${badgeClass} position-absolute" style="top: .5rem; right: .5rem">
            ${data.condition}
          </div>
          <img src="${data.coverUrl}" class="card-img-top" alt="${data.title}">
          <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text text-muted">${data.author}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-bold">$${data.price.toFixed(2)}</span>
              <span class="badge bg-light text-dark">
                <i class="bi bi-geo-alt"></i> ${data.distance || '—'}  
              </span>
            </div>
          </div>
          <div class="card-footer bg-transparent">
            <button class="btn btn-sm btn-outline-primary w-100">Add to Cart</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // re-delegate cart buttons
    delegateAddToCart();

  } catch (err) {
    console.error('Error loading catalog:', err);
    container.innerHTML = '<p class="text-danger">Failed to load listings. Please try again later.</p>';
  }
}
