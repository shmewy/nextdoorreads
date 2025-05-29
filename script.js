// Sample JavaScript for NextDoorReads functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
    
    // Load trending books on homepage
    if (document.getElementById('trending-books-container')) {
        loadTrendingBooks();
    }
    
    // Add event listeners for cart buttons
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', addToCart);
        }
    });
});

function updateCartCount() {
    // In a real app, this would come from your cart system
    const cartCount = localStorage.getItem('nextdoorreads-cart-count') || 0;
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = cartCount;
    });
}

function addToCart(e) {
    e.preventDefault();
    
    // Get book info from the card
    const card = e.target.closest('.card');
    const title = card.querySelector('.card-title').textContent;
    const author = card.querySelector('.card-text').textContent;
    const price = card.querySelector('.fw-bold').textContent;
    const distance = card.querySelector('.badge').textContent;
    
    // In a real app, you would add this to your cart system
    console.log(`Added to cart: ${title} by ${author} for ${price} (${distance})`);
    
    // Update cart count
    let currentCount = parseInt(localStorage.getItem('nextdoorreads-cart-count') || 0;
    currentCount += 1;
    localStorage.setItem('nextdoorreads-cart-count', currentCount);
    updateCartCount();
    
    // Show feedback to user
    const originalText = e.target.textContent;
    e.target.textContent = 'Added!';
    e.target.classList.remove('btn-outline-primary');
    e.target.classList.add('btn-success');
    
    setTimeout(() => {
        e.target.textContent = originalText;
        e.target.classList.remove('btn-success');
        e.target.classList.add('btn-outline-primary');
    }, 2000);
}

function loadTrendingBooks() {
    // In a real app, this would come from an API
    const trendingBooks = [
        {
            title: "The Silent Patient",
            author: "Alex Michaelides",
            price: "$7.99",
            distance: "0.3 mi",
            image: "trending1.jpg",
            condition: "Like New"
        },
        {
            title: "Project Hail Mary",
            author: "Andy Weir",
            price: "$9.50",
            distance: "1.8 mi",
            image: "trending2.jpg",
            condition: "Very Good"
        },
        {
            title: "The Vanishing Half",
            author: "Brit Bennett",
            price: "$6.75",
            distance: "0.9 mi",
            image: "trending3.jpg",
            condition: "Good"
        },
        {
            title: "Crying in H Mart",
            author: "Michelle Zauner",
            price: "$8.25",
            distance: "2.3 mi",
            image: "trending4.jpg",
            condition: "Like New"
        }
    ];
    
    const container = document.getElementById('trending-books-container');
    
    trendingBooks.forEach(book => {
        const bookHtml = `
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    <div class="badge ${book.condition === 'Like New' ? 'bg-success' : book.condition === 'Very Good' ? 'bg-info' : 'bg-warning'} position-absolute" style="top: 0.5rem; right: 0.5rem">${book.condition}</div>
                    <img src="${book.image}" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text text-muted">${book.author}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold">${book.price}</span>
                            <span class="badge bg-light text-dark"><i class="bi bi-geo-alt"></i> ${book.distance}</span>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-sm btn-outline-primary w-100">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += bookHtml;
    });
    
    // Reattach event listeners to new cart buttons
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', addToCart);
        }
    });
}

// In a real application, you would have more functions for:
// - User authentication
// - Location services
// - Payment processing
// - Seller communication
// - Book search and filtering