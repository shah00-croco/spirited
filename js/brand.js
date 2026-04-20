// Brand Page JavaScript
console.log('=== BRAND.JS FILE LOADED ===');

// Brands data inline fallback
const BRANDS_DATA = [
    {
        id: "nagahama",
        name: "NAGAHAMA DISTILLERY",
        heroTitle: "NAGAHAMA\nDISTILLERY",
        icon: "assets/svg/distillery-icon.svg",
        mainImage: "assets/images/brands/nagahama-distillery-1.jpg",
        storyText: "The Nagahama brewery is located in the north shore of Lake Biwa. In 2016 having utilized the long years of old Japanese sake making techniques, Nagahama distillery installed a unique whiskey still and crafted a unique high quality whiskey. They aim for a soft smooth quality unique high quality whiskey that tastes of rice.",
        detailImages: [
            "assets/images/brands/nagahama-detail-1.jpg",
            "assets/images/brands/nagahama-detail-2.jpg",
            "assets/images/brands/nagahama-detail-3.jpg"
        ],
        detailText: "The Nagahama brewery is located in the north shore of Lake Biwa. In 2016 having utilized the long years of old Japanese sake making techniques, Nagahama distillery installed a unique whiskey still and crafted a unique high quality whiskey. They aim for a soft smooth quality unique high quality whiskey that tastes of rice.",
        landscapeImage: "assets/images/brands/nagahama-landscape.jpg",
        landscapeText: "BUILT AT THE SHORES OF LAKE BIWA IN JULY, located at the northern shores bicentennial history Sugihara Sake Brewery has produced sake and shochu using the soft water of Lake Biwa. As we embark to the Japanese whisky business journey, we have made full use of our sake-making technology to challenge the \"soft and smooth whisky\"",
        category: "NAGAHAMA"
    },
    {
        id: "kaikyo",
        name: "KAIKYO DISTILLERY",
        heroTitle: "KAIKYO\nDISTILLERY",
        icon: "assets/svg/distillery-icon.svg",
        mainImage: "assets/images/brands/kaikyo-distillery-1.jpg",
        storyText: "Kaikyo Distillery is renowned for its exceptional sake production, combining traditional Japanese brewing techniques with modern innovation. Located in a region blessed with pure mountain water, the distillery has been crafting premium sake for generations, earning recognition both domestically and internationally.",
        category: "KAIKYO"
    },
    {
        id: "saburomaru",
        name: "SABUROMARU DISTILLERY",
        heroTitle: "SABUROMARU\nDISTILLERY",
        icon: "assets/svg/distillery-icon.svg",
        mainImage: "assets/images/brands/saburomaru-distillery-1.jpg",
        storyText: "Saburomaru Distillery specializes in premium gin production, blending traditional botanicals with unique Japanese ingredients. With a commitment to quality and craftsmanship, the distillery creates distinctive spirits that capture the essence of Japanese gin-making artistry.",
        category: "SABUROMARU"
    }
];

// Note: PRODUCTS_DATA is already declared in script.js, no need to redeclare

let allProducts = [];
let allBrands = [];
let brandCategory = 'NAGAHAMA'; // Default category

// Load brand content from JSON or fallback
async function loadBrandContent() {
    console.log('loadBrandContent called');
    try {
        const response = await fetch('data/brands.json');
        allBrands = await response.json();
        console.log('Brands loaded from JSON:', allBrands.length);
    } catch (error) {
        console.log('Using inline brand data, error:', error);
        allBrands = BRANDS_DATA;
        console.log('Brands loaded from fallback:', allBrands.length);
    }
    
    renderBrandContent();
}

// Render brand content
function renderBrandContent() {
    console.log('renderBrandContent called');
    const brandId = getBrandFromURL();
    console.log('Brand ID from URL:', brandId);
    const brand = allBrands.find(b => b.id === brandId);
    
    if (!brand) {
        console.error('Brand not found:', brandId, 'Available brands:', allBrands.map(b => b.id));
        return;
    }
    
    console.log('Loading brand:', brand.name);
    
    // Update page title
    document.title = `${brand.name} - Spirited`;
    
    // Update hero title
    const heroTitle = document.getElementById('brand-hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = brand.heroTitle.replace(/\n/g, '<br>');
        console.log('Hero title updated');
    }
    
    // Build brand content HTML
    const container = document.getElementById('brand-container');
    if (!container) {
        console.error('Container not found!');
        return;
    }
    
    console.log('Container found, building HTML...');
    let contentHTML = '';
    
    // Story Section
    console.log('Adding story section with image:', brand.mainImage);
    contentHTML += `
        <section class="brand-story-section">
            <div class="brand-story-grid">
                <div class="brand-story-images">
                    <img src="${brand.mainImage}" alt="${brand.name}" class="brand-main-img lazy">
                </div>
                <div class="brand-story-content">
                    <div class="brand-icon">
                        <img src="${brand.icon}" alt="Distillery Icon" class="distillery-icon">
                    </div>
                    <h2 class="brand-story-name">${brand.name}</h2>
                    <p class="brand-story-text">${brand.storyText}</p>
                </div>
            </div>
        </section>
    `;
    
    console.log('Story section added, HTML length:', contentHTML.length);
    
    // Detail Section (if images exist)
    if (brand.detailImages && brand.detailImages.length > 0) {
        contentHTML += `
            <section class="brand-detail-section">
                <div class="brand-detail-grid">
                    <div class="brand-detail-left">
                        <img src="${brand.detailImages[0]}" alt="${brand.name}" class="brand-detail-img lazy">
                        ${brand.detailText ? `<p class="brand-detail-text">${brand.detailText}</p>` : ''}
                    </div>
                    <div class="brand-detail-right">
                        ${brand.detailImages.slice(1).map(img => 
                            `<img src="${img}" alt="${brand.name}" class="brand-detail-img lazy">`
                        ).join('')}
                    </div>
                </div>
        `;
        
        // Landscape section (if exists)
        if (brand.landscapeImage) {
            contentHTML += `
                <div class="brand-landscape">
                    <img src="${brand.landscapeImage}" alt="${brand.name}" class="brand-landscape-img lazy">
                    ${brand.landscapeText ? `<p class="brand-landscape-text">${brand.landscapeText}</p>` : ''}
                </div>
            `;
        }
        
        contentHTML += `</section>`;
    }
    
    // Products Section
    contentHTML += `
        <section class="brand-products-section">
            <h2 class="brand-products-title">RELATED PRODUCT</h2>
            <div class="brand-products-grid" id="brand-products-grid">
                <!-- Products will be loaded from JSON -->
            </div>
            <div class="brand-products-link">
                <a href="shop.html" class="view-more-btn">VIEW MORE</a>
            </div>
        </section>
    `;
    
    console.log('Setting container innerHTML, length:', contentHTML.length);
    container.innerHTML = contentHTML;
    console.log('Container innerHTML set successfully');
    
    // Re-init lazy loading
    if (typeof initLazyLoad === 'function') {
        initLazyLoad();
        console.log('Lazy load re-initialized');
    }
}

// Load products from JSON or fallback
async function loadBrandProducts() {
    console.log('loadBrandProducts called');
    try {
        const response = await fetch('data/products.json');
        allProducts = await response.json();
        console.log('Products loaded from JSON:', allProducts.length);
    } catch (error) {
        console.log('Using inline product data, error:', error);
        allProducts = PRODUCTS_DATA;
        console.log('Products loaded from fallback:', allProducts.length);
    }
    
    renderBrandProducts();
}

// Render products filtered by brand category
function renderBrandProducts() {
    console.log('renderBrandProducts called');
    const grid = document.getElementById('brand-products-grid');
    if (!grid) {
        console.error('brand-products-grid not found!');
        return;
    }
    console.log('Products grid found');
    
    // Check if brands are loaded
    if (!allBrands || allBrands.length === 0) {
        console.error('Brands data not loaded yet');
        return;
    }
    
    // Get brand ID from URL
    const brandId = getBrandFromURL();
    console.log('Rendering products for brand:', brandId);
    
    // Find the brand to get its category
    const brand = allBrands.find(b => b.id === brandId);
    if (!brand) {
        console.error('Brand not found:', brandId);
        grid.innerHTML = '<p style="color: #fff; grid-column: 1/-1;">Brand not found.</p>';
        return;
    }
    
    console.log('Brand found:', brand.name, 'Category:', brand.category);
    
    // Filter products by brand category
    const filteredProducts = allProducts.filter(product => 
        product.category.toUpperCase() === brand.category.toUpperCase()
    );
    
    console.log('Filtered products:', filteredProducts.length);
    
    // Take only first 4 products for related section
    const displayProducts = filteredProducts.slice(0, 4);
    
    if (displayProducts.length === 0) {
        grid.innerHTML = '<p style="color: #fff; grid-column: 1/-1;">No products found for this brand.</p>';
        return;
    }
    
    grid.innerHTML = displayProducts.map(product => `
        <div class="brand-product-card">
            ${product.badge ? `<span class="brand-product-badge">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="brand-product-img lazy">
            <h3 class="brand-product-name">${product.name.replace(/\n/g, '<br>')}</h3>
            <div class="brand-product-prices">
                <span class="brand-product-sale-price">RM ${product.salePrice.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="brand-product-original-price">RM ${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="brand-add-to-cart" data-product-id="${product.id}">ADD TO CART</button>
        </div>
    `).join('');
    
    // Bind add to cart events
    bindBrandCartEvents();
    
    // Re-init lazy loading for new images
    if (typeof initLazyLoad === 'function') {
        initLazyLoad();
    }
}

// Get brand category from URL
function getBrandFromURL() {
    const path = window.location.pathname;
    
    if (path.includes('nagahama')) return 'nagahama';
    if (path.includes('kaikyo')) return 'kaikyo';
    if (path.includes('saburomaru')) return 'saburomaru';
    
    return 'nagahama'; // Default
}

// Bind add to cart events
function bindBrandCartEvents() {
    const addButtons = document.querySelectorAll('.brand-add-to-cart');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            const product = allProducts.find(p => p.id === productId);
            
            if (product && typeof addToCart === 'function') {
                addToCart(product, 1);
            }
        });
    });
}

// Initialize when DOM is ready
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded fired on brand page');
    const container = document.getElementById('brand-container');
    console.log('Container found:', !!container);
    
    if (container) {
        console.log('Starting brand content load...');
        await loadBrandContent();
        console.log('Brand content loaded, loading products...');
        await loadBrandProducts();
        console.log('All loading complete');
    } else {
        console.error('brand-container not found!');
    }
});
