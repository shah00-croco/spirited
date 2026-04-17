// ============================================================
// State
// ============================================================
let allProducts = [];
let currentPage = 1;
const PRODUCTS_PER_PAGE = 6;
let activeCategory = 'all';
let activeType = 'all';

// ============================================================
// Products Data (inline fallback — works with file:// and server)
// ============================================================
const PRODUCTS_DATA = [
    {
        "id": 1,
        "name": "ECHIGO IGARASHIGAWA\nDAIGINJO - GENSHU",
        "category": "NAGAHAMA",
        "type": "WHISKEY",
        "image": "assets/images/bottles/product_ECHIGO IGARASHIGAWA DAIGINJO - GENSHU 1.png",
        "salePrice": 245.00,
        "originalPrice": 659.00,
        "badge": "10%",
        "inStock": true
    },
    {
        "id": 2,
        "name": "ECHIGO IGARASHIGAWA\nDAIGINJO",
        "category": "NAGAHAMA",
        "type": "WHISKEY",
        "image": "assets/images/bottles/product_ECHIGO IGARASHIGAWA DAIGINJO 1.png",
        "salePrice": 162.00,
        "originalPrice": 659.00,
        "badge": "10%",
        "inStock": true
    },
    {
        "id": 3,
        "name": "FAR EAST OF PEAT\n6th BATCH",
        "category": "FAR EAST OF PEAT",
        "type": "WHISKEY",
        "image": "assets/images/bottles/product_FAR EAST OF PEAT 6th BATCH 1.png",
        "salePrice": 502.00,
        "originalPrice": 659.00,
        "badge": "10%",
        "inStock": true
    },
    {
        "id": 4,
        "name": "AMAHAGAN WORLD MALT\nEDITION 3",
        "category": "AMAHAGAN",
        "type": "WHISKEY",
        "image": "assets/images/bottles/product_AMAHAGAN WORLD MALT EDITION 3 1.png",
        "salePrice": 423.00,
        "originalPrice": 659.00,
        "badge": "10%",
        "inStock": true
    },
    {
        "id": 5,
        "name": "AMAHAGAN WORLD MALT\nEDITION 2",
        "category": "AMAHAGAN",
        "type": "WHISKEY",
        "image": "assets/images/bottles/product_AMAHAGAN WORLD MALT EDITION 2 1.png",
        "salePrice": 490.50,
        "originalPrice": 659.00,
        "badge": "10%",
        "inStock": true
    },
    {
        "id": 6,
        "name": "AMAHAGAN WORLD MALT\nEDITION 1",
        "category": "AMAHAGAN",
        "type": "WHISKEY",
        "image": "assets/images/bottles/product_AMAHAGAN WORLD MALT EDITION 1 1.png",
        "salePrice": 396.40,
        "originalPrice": 659.00,
        "badge": "10%",
        "inStock": true
    }
];

// ============================================================
// Load Products (tries fetch first, falls back to inline data)
// ============================================================
async function loadProducts() {
    try {
        const res = await fetch('data/products.json');
        if (!res.ok) throw new Error('fetch failed');
        allProducts = await res.json();
    } catch (e) {
        // Fallback to inline data (works with file:// protocol)
        allProducts = PRODUCTS_DATA;
    }
    renderProducts();
}

// ============================================================
// Product Rendering
// ============================================================
function getFilteredProducts() {
    return allProducts.filter(p => {
        const matchType  = activeType === 'all'     || p.type.toUpperCase()     === activeType.toUpperCase();
        const matchCat   = activeCategory === 'all' || p.category.toUpperCase() === activeCategory.toUpperCase();
        return matchType && matchCat;
    });
}

function renderProducts() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    const filtered   = getFilteredProducts();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
    currentPage      = Math.min(currentPage, totalPages);

    const start     = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginated = filtered.slice(start, start + PRODUCTS_PER_PAGE);

    grid.innerHTML = paginated.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div class="product-badge">${p.badge || '10%'}</div>
            <div class="product-image">
                <img src="${p.image}" alt="${p.name.replace(/\n/g, ' ')}">
            </div>
            <h3 class="product-name">${p.name.replace(/\n/g, '<br>')}</h3>
            <div class="product-price">
                <span class="sale-price">RM ${p.salePrice.toFixed(2)}</span>
                <span class="original-price">RM ${p.originalPrice.toFixed(2)}</span>
            </div>
            <div class="quantity-control">
                <button class="qty-btn minus">-</button>
                <input type="number" value="1" min="1" max="99">
                <button class="qty-btn plus">+</button>
                <button class="add-to-cart-btn" data-id="${p.id}">ADD TO CART</button>
            </div>
            <button class="read-more-btn">READ MORE</button>
        </div>
    `).join('');

    // Update pagination UI
    const pageInfo = document.querySelector('.page-info');
    const prevBtn  = document.querySelector('.pagination-btn.prev');
    const nextBtn  = document.querySelector('.pagination-btn.next');
    if (pageInfo) pageInfo.textContent = `${currentPage}/${totalPages}`;
    if (prevBtn)  prevBtn.disabled = currentPage === 1;
    if (nextBtn)  nextBtn.disabled = currentPage >= totalPages;

    bindProductEvents();
}

function bindProductEvents() {
    // Quantity buttons
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input[type="number"]');
            let val = parseInt(input.value) || 1;
            if (this.classList.contains('plus'))  input.value = val + 1;
            if (this.classList.contains('minus') && val > 1) input.value = val - 1;
        });
    });

    // Add to cart
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const id      = parseInt(this.dataset.id);
            const product = allProducts.find(p => p.id === id);
            const qty     = parseInt(this.closest('.product-card').querySelector('input[type="number"]').value) || 1;
            addToCart(product, qty);
            this.textContent = 'ADDED!';
            this.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                this.textContent = 'ADD TO CART';
                this.style.backgroundColor = '';
            }, 1500);
        });
    });
}

// ============================================================
// Cart (localStorage)
// ============================================================
let cart = JSON.parse(localStorage.getItem('spirit_cart') || '[]');

function saveCart() {
    localStorage.setItem('spirit_cart', JSON.stringify(cart));
}

function addToCart(product, qty = 1) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.salePrice, image: product.image, qty });
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    const badge         = document.getElementById('cart-badge');
    const body          = document.getElementById('cart-dropdown-body');
    const footer        = document.getElementById('cart-dropdown-footer');
    const startShopping = document.getElementById('cart-start-shopping');
    const totalEl       = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    if (badge) badge.textContent = totalItems;

    if (!body) return;

    if (cart.length === 0) {
        body.innerHTML = '<p class="cart-empty-msg">Your cart is empty</p>';
        if (footer)        footer.style.display = 'none';
        if (startShopping) startShopping.style.display = 'block';
    } else {
        body.innerHTML = cart.map(item => `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name.replace(/\n/g, ' ')}</div>
                    <div class="cart-item-qty-price">x${item.qty} &nbsp; RM ${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-times"></i></button>
            </div>
        `).join('');
        if (footer)  { footer.style.display = 'block'; }
        if (startShopping) startShopping.style.display = 'none';
        if (totalEl) totalEl.textContent = `RM ${totalPrice.toFixed(2)}`;

        body.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
        });
    }
}

// ============================================================
// Cart Dropdown Toggle
// ============================================================
function initCartToggle() {
    const toggle   = document.getElementById('cart-toggle');
    const dropdown = document.getElementById('cart-dropdown');
    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', e => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    document.addEventListener('click', e => {
        if (dropdown && !dropdown.contains(e.target) && toggle && !toggle.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    const startShopping = document.getElementById('cart-start-shopping');
    if (startShopping) {
        startShopping.addEventListener('click', () => window.location.href = 'shop.html');
    }
}

// ============================================================
// Category Filter
// ============================================================
function initCategories() {
    document.addEventListener('click', function (e) {
        const item = e.target.closest('.category-item');
        if (!item) return;

        // Dropdown toggle
        if (item.classList.contains('has-dropdown')) {
            item.classList.toggle('open');
            const subList = item.nextElementSibling;
            if (subList && subList.classList.contains('category-sub-list')) {
                subList.classList.toggle('show');
            }
        }

        // Active highlight
        document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Filter logic
        const filter = item.dataset.filter || 'all';
        if (item.classList.contains('sub-item')) {
            activeType     = 'all';
            activeCategory = filter;
        } else {
            activeCategory = 'all';
            activeType     = filter;
        }
        currentPage = 1;
        renderProducts();
    });
}

// ============================================================
// Pagination
// ============================================================
function initPagination() {
    document.addEventListener('click', function (e) {
        if (e.target.closest('.pagination-btn.next')) {
            const total = Math.max(1, Math.ceil(getFilteredProducts().length / PRODUCTS_PER_PAGE));
            if (currentPage < total) { currentPage++; renderProducts(); }
        }
        if (e.target.closest('.pagination-btn.prev')) {
            if (currentPage > 1) { currentPage--; renderProducts(); }
        }
    });
}

// ============================================================
// Find Out More Button
// ============================================================
function initFindMore() {
    const btn = document.querySelector('.find-more-btn');
    if (btn) btn.addEventListener('click', () => window.location.href = 'shop.html');
}

// ============================================================
// Newsletter
// ============================================================
function initNewsletter() {
    const btn   = document.querySelector('.footer-subscribe-btn');
    const input = document.querySelector('.footer-email-input');
    if (btn && input) {
        btn.addEventListener('click', () => {
            const email = input.value.trim();
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Thank you for subscribing!');
                input.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initCategories();
    initPagination();
    initFindMore();
    initNewsletter();
});

// Re-init cart after header.html is injected by layout.js
document.addEventListener('headerLoaded', () => {
    initCartToggle();
    updateCartUI();
});

// Dummy placeholder so old references don't crash
const categoryItems = [];
const productCards  = [];

categoryItems.forEach(category => {
    category.addEventListener('click', function() {
        // Handle dropdown toggle
        if (this.classList.contains('has-dropdown')) {
            this.classList.toggle('open');
            const subList = this.nextElementSibling;
            if (subList && subList.classList.contains('category-sub-list')) {
                subList.classList.toggle('show');
            }
        }
        
        // Handle active state only for main categories (not sub-items)
        if (!this.classList.contains('sub-item')) {
            // Remove active class from all main categories
            categoryItems.forEach(item => {
                if (!item.classList.contains('sub-item')) {
                    item.classList.remove('active');
                }
            });
            // Add active class to clicked category
            this.classList.add('active');
        } else {
            // For sub-items, remove active from other sub-items
            const allSubItems = document.querySelectorAll('.category-item.sub-item');
            allSubItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        }
        
        // Filter animation
        productCards.forEach(card => {
            card.style.animation = 'fadeIn 0.5s ease-in-out';
        });
    });
});

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        
        // Visual feedback
        this.textContent = 'ADDED!';
        this.style.backgroundColor = '#4CAF50';
        
        // Reset button after 1.5 seconds
        setTimeout(() => {
            this.textContent = 'ADD TO CART';
            this.style.backgroundColor = '';
        }, 1500);
        
        // Show notification
        showNotification('Product added to cart!');
    });
});

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Newsletter Subscription
const subscribeBtn = document.querySelector('.subscribe-btn');
const newsletterInput = document.querySelector('.newsletter-input');

if (subscribeBtn && newsletterInput) {
    subscribeBtn.addEventListener('click', function() {
        const email = newsletterInput.value.trim();
        
        if (email && validateEmail(email)) {
            showNotification('Thank you for subscribing!');
            newsletterInput.value = '';
        } else {
            showNotification('Please enter a valid email address.');
        }
    });
}

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Product Card Hover Animation
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Search Icon Click (placeholder)
const searchIcon = document.querySelector('.fa-search');
if (searchIcon) {
    searchIcon.addEventListener('click', function() {
        // You can implement a search modal here
        showNotification('Search functionality coming soon!');
    });
}

// Shopping Cart Icon Click
const cartIcon = document.querySelector('.fa-shopping-cart');
if (cartIcon) {
    cartIcon.addEventListener('click', function() {
        if (cartCount > 0) {
            showNotification(`You have ${cartCount} item(s) in your cart.`);
        } else {
            showNotification('Your cart is empty.');
        }
    });
}

// User Icon Click
const userIcon = document.querySelector('.fa-user');
if (userIcon) {
    userIcon.addEventListener('click', function() {
        showNotification('Login functionality coming soon!');
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// View All Products Button
const viewAllBtn = document.querySelector('.view-all-btn');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function() {
        showNotification('Loading all products...');
        // You can implement navigation to a products page here
    });
}

// Quantity Controls
document.querySelectorAll('.quantity-control').forEach(control => {
    const minusBtn = control.querySelector('.qty-btn.minus');
    const plusBtn = control.querySelector('.qty-btn.plus');
    const input = control.querySelector('input[type="number"]');
    
    if (minusBtn) {
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value) || 1;
            if (currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    }
    
    if (plusBtn) {
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value) || 1;
            input.value = currentValue + 1;
        });
    }
});

// Pagination for Products
let currentPage = 1;
const totalPages = 1; // Only 1 page with 6 products (2 rows)
const productsGrid = document.querySelector('.products-grid');
const prevBtn = document.querySelector('.pagination-btn.prev');
const nextBtn = document.querySelector('.pagination-btn.next');
const pageInfo = document.querySelector('.page-info');

if (prevBtn && nextBtn && productsGrid && pageInfo) {
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    function updatePagination() {
        productsGrid.setAttribute('data-page', currentPage);
        pageInfo.textContent = `${currentPage}/${totalPages}`;
        
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        
        // Add fade animation
        productCards.forEach(card => {
            card.style.animation = 'fadeIn 0.5s ease-in-out';
        });
    }
    
    // Initialize
    updatePagination();
}

// Find Out More Button
const findMoreBtn = document.querySelector('.find-more-btn');
if (findMoreBtn) {
    findMoreBtn.addEventListener('click', function() {
        // Navigate to shop page or show more products
        window.location.href = 'shop.html';
    });
}

// Lazy Loading for Images (if needed)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Spirit Website - JavaScript Loaded Successfully!');
