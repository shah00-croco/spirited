// ============================================================
// Preloader
// ============================================================
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
}

// Hide preloader once everything is loaded
window.addEventListener('load', () => {
    setTimeout(hidePreloader, 300);
});

// Fallback: hide after 4s even if something stalls
setTimeout(hidePreloader, 4000);

// ============================================================
// Lazy Loading Images
// ============================================================
function initLazyLoad() {
    const images = document.querySelectorAll('img');
    if (!images.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '100px' });

        images.forEach(img => {
            img.classList.add('lazy');
            observer.observe(img);
        });
    } else {
        // Fallback for old browsers
        images.forEach(img => img.classList.add('loaded'));
    }
}

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
    initLazyLoad();
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
    initLazyLoad();
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
