// Brand Page JavaScript
console.log('=== BRAND.JS FILE LOADED ===');

// Brands data inline fallback
const BRANDS_DATA = [
    {
        id: "nagahama",
        name: "NAGAHAMA DISTILLERY",
        heroTitle: "NAGAHAMA\nDISTILLERY",
        heroTitleAlign: "center",
        heroBackground: "assets/images/backgrounds/cover-03.png",
        icon: "assets/images/brand-logo/nagahama.png",
        mainImage: "assets/images/branch-story/nagahama-story-1.png",
        storyText: "The Nagahama brewery is located in the north shore of Lake Biwa. In 2016 having utilized the long years of old Japanese sake making techniques, Nagahama distillery installed a unique whiskey still and crafted a unique high quality whiskey. They aim for a soft smooth quality unique high quality whiskey that tastes of rice.",
        detailImages: [
            "assets/images/branch-story/nagahama-story-2-0.png",
            "assets/images/branch-story/nagahama-story-2-1.png",
            "assets/images/branch-story/nagahama-story-2-2.png"
        ],
        detailText: "The Nagahama brewery is located in the north shore of Lake Biwa. In 2016 having utilized the long years of old Japanese sake making techniques, Nagahama distillery installed a unique whiskey still and crafted a unique high quality whiskey. They aim for a soft smooth quality unique high quality whiskey that tastes of rice.",
        landscapeImage: "assets/images/branch-story/nagahama-story-3.png",
        landscapeText: "BUILT AT THE SHORES OF LAKE BIWA IN JULY, located at the northern shores bicentennial history Sugihara Sake Brewery has produced sake and shochu using the soft water of Lake Biwa. As we embark to the Japanese whisky business journey, we have made full use of our sake-making technology to challenge the \"soft and smooth whisky\"",
        category: "NAGAHAMA",
        storySectionBackground: "#231F20",
        layout: [
            { type: "story", imagePosition: "left" },
            { type: "details" },
            { type: "landscape" },
            { type: "products" }
        ]
    },
    {
        id: "kaikyo",
        name: "AKASHI SAKE BREWERY\nKAIKYO DISTILLERY",
        heroTitle: "KAIKYO\nDISTILLERY",
        heroTitleAlign: "center",
        heroBackground: "assets/images/backgrounds/cover-09.png",
        icon: "assets/images/brand-logo/akashi.png",
        mainImage: "assets/images/branch-story/kaikyo-story-1.png",
        storyText: "Inspired by the great gin and whisky stillhouses of the United Kingdom, the Kaikyo Distillery contributes to a vibrant and evolving culture of Japanese spirit making. The Akashi Sake Brewery has been producing fine sake for 100 years, and until recently its only products was shochu, a traditional, refined beverage with around 25% alcohol content, made from wheat, rice and other ingredients.",
        detailImages: [
            "assets/images/branch-story/kaikyo-story-2.png"
        ],
        detailText: "A 100 years later, to honour his family heritage and to celebrate the centennial of the family distilling business, Master Distiller and Blender Kimio Yonezawa decided for the Kaikyo Distillery to launch his own gin and whiskies.",
        landscapeImage: "assets/images/branch-story/kaikyo-story-3.jpg",
        landscapeText: "Named after the Akashi Kaikyo bridge, the longest suspension bridge in the world, the Kaikyo Distillery stands along the coast of the Seto Inland sea as a proud expansion of the Akashi Sake Brewery. Refreshed by the maritime winds and the straits, it thrives in the cool damp Springs of its mild winters, and hot, humid summers that offer excellent facilities for the ageing of spirits.\n\nThe Kaikyo Distillery now houses a rich and diverse cellar of casks made from several types of wood, including American oak, Japanese mizunara oak and sakura cherry wood, once used for several types of alcohol such as bourbon, sherry and port - all holding the unique flavours of our spirits flourish.",
        category: "KAIKYO",
        storySectionBackground: "#231F20",
        layout: [
            { type: "story", imagePosition: "right" },
            { type: "details" },
            { type: "landscape", imagePosition: "right" },
            { type: "products" }
        ]
    },
    {
        id: "saburomaru",
        name: "WAKATSURU SABUROMARU\nDISTILLERY",
        heroTitle: "SABUROMARU\nDISTILLERY",
        heroTitleAlign: "right",
        heroBackground: "assets/images/backgrounds/cover-08.png",
        icon: "assets/images/brand-logo/soburomaru.png",
        mainImage: "assets/images/branch-story/saburomaru-story-1.png",
        storyText: "The story of Saburomaru Distillery begins in 1862 with Wakatsuru Shuzo, which originally focused on brewing traditional sake. After World War II, the company needed to adapt to changing market conditions. In 1952, they started producing whisky, mainly under the \"Sunshine Whisky\" label. However, production remained small and relatively unknown, often operating only part of the year and focusing on affordable blended whisky rather than premium products. the distillery was",
        detailImages: [
            "assets/images/branch-story/saburomaru-story-2.png"
        ],
        detailText: "By the 2010s, the distillery was aging and at risk of shutting down, but instead of closing, it underwent a major revival. Around 2016, the company launched a modernization and rebranding effort, celebrating its sake-making heritage, successfully raising funds to modernize the facility. In 2017, the distillery was revamped with modern equipment and techniques, combining traditional methods with innovative techniques.",
        landscapeImage: "assets/images/branch-story/saburomaru-story-3.png",
        landscapeText: "Today, Saburomaru Distillery is recognized for its distinctive Japanese whisky, especially its use of unique cast iron pot stills, symbolizing a successful transformation from a struggling small producer into a respected name in the whisky industry.",
        category: "SABUROMARU",
        storySectionBackground: "transparent",
        layout: [
            { type: "story", imagePosition: "left" },
            { type: "details", imagePosition: "right" },
            { type: "landscape", imagePosition: "left" },
            { type: "products" }
        ]
    }
];

// Note: PRODUCTS_DATA and allProducts are already declared in script.js, no need to redeclare

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
    
    // Update hero alignment
    const heroContent = document.querySelector('.brand-hero-content');
    const heroSection = document.getElementById('brand-hero');
    if (heroContent && brand.heroTitleAlign) {
        const alignment = brand.heroTitleAlign || 'center';
        if (alignment === 'left') {
            heroContent.style.alignItems = 'flex-start';
            heroContent.style.textAlign = 'left';
            heroContent.style.paddingLeft = '100px';
        } else if (alignment === 'right') {
            heroContent.style.alignItems = 'flex-end';
            heroContent.style.textAlign = 'right';
            heroContent.style.paddingRight = '100px';
        } else {
            heroContent.style.alignItems = 'center';
            heroContent.style.textAlign = 'center';
        }
        console.log('Hero alignment set to:', alignment);
    }
    
    // Update hero background
    if (heroSection && brand.heroBackground) {
        heroSection.style.backgroundImage = `url('${brand.heroBackground}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.backgroundRepeat = 'no-repeat';
        console.log('Hero background updated:', brand.heroBackground);
    }
    
    // Build brand content HTML
    const container = document.getElementById('brand-container');
    const productsContainer = document.getElementById('brand-products-container');
    
    if (!container) {
        console.error('Container not found!');
        return;
    }
    
    console.log('Container found, building HTML...');
    
    // Use layout configuration if available, otherwise fallback to default
    const layout = brand.layout || [
        { type: 'story', imagePosition: 'left' },
        { type: 'details' },
        { type: 'landscape' },
        { type: 'products' }
    ];
    
    // Separate story content sections from products
    const storySections = layout.filter(s => s.type !== 'products');
    const productSections = layout.filter(s => s.type === 'products');
    
    // Render story sections with background wrapper
    let storyHTML = '';
    storySections.forEach(section => {
        storyHTML += renderSection(section, brand);
    });
    
    // Get background color and text color
    const bgColor = brand.storySectionBackground || 'transparent';
    const textColor = bgColor.toLowerCase() === '#f5f5f5' || bgColor === 'transparent' ? '#333' : '#fff';
    
    // Wrap story content with background
    if (storyHTML) {
        container.innerHTML = `
            <div class="brand-story-wrapper" style="background-color: ${bgColor}; color: ${textColor}; padding: 0;">
                ${storyHTML}
            </div>
        `;
    }
    
    // Render products separately
    if (productsContainer && productSections.length > 0) {
        let productsHTML = '';
        productSections.forEach(section => {
            productsHTML += renderSection(section, brand);
        });
        productsContainer.innerHTML = productsHTML;
    }
    
    console.log('Container innerHTML set successfully');
    
    // Re-init lazy loading
    if (typeof initLazyLoad === 'function') {
        initLazyLoad();
        console.log('Lazy load re-initialized');
    }
}

// Render individual sections based on type
function renderSection(section, brand) {
    const type = section.type;
    
    switch(type) {
        case 'story':
            return renderStorySection(brand, section);
        case 'details':
            return renderDetailSection(brand, section);
        case 'landscape':
            return renderLandscapeSection(brand, section);
        case 'products':
            return renderProductsSection(brand, section);
        default:
            console.warn('Unknown section type:', type);
            return '';
    }
}

// Render story section
function renderStorySection(brand, config = {}) {
    const imagePosition = config.imagePosition || 'left';
    
    if (imagePosition === 'left') {
        // Image LEFT, Text RIGHT (default - Nagahama style)
        return `
            <section class="brand-story-section">
                <div class="brand-story-grid">
                    <div class="brand-story-image-col">
                        <img src="${brand.mainImage}" alt="${brand.name}" class="brand-main-img">
                    </div>
                    <div class="brand-story-text-col">
                        <div class="brand-icon-title">
                            <img src="${brand.icon}" alt="Distillery Icon" class="distillery-icon">
                            <h2 class="brand-story-title">${brand.name}</h2>
                            <p class="brand-story-description">${brand.storyText}</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    } else {
        // Text LEFT, Image RIGHT (Kaikyo style)
        return `
            <section class="brand-story-section">
                <div class="brand-story-grid-reverse">
                    <div class="brand-story-text-col">
                        <div class="brand-icon-title">
                            <img src="${brand.icon}" alt="Distillery Icon" class="distillery-icon">
                            <h2 class="brand-story-title">${brand.name}</h2>
                            <p class="brand-story-description">${brand.storyText}</p>
                        </div>
                    </div>
                    <div class="brand-story-image-col">
                        <img src="${brand.mainImage}" alt="${brand.name}" class="brand-main-img">
                    </div>
                </div>
            </section>
        `;
    }
}

// Render detail section
function renderDetailSection(brand, config = {}) {
    if (!brand.detailImages || brand.detailImages.length === 0) {
        return '';
    }
    
    const detailText = brand.detailText || '';
    const imagePosition = config.imagePosition || 'left';
    
    // Handle different layouts based on number of images
    if (brand.detailImages.length === 1) {
        if (imagePosition === 'left') {
            // Single image layout - Image LEFT, Text RIGHT (Kaikyo style)
            return `
                <section class="brand-detail-section">
                    <div class="brand-detail-grid-single">
                        <div class="brand-detail-single-image-col">
                            <img src="${brand.detailImages[0]}" alt="${brand.name}" class="brand-detail-single-img">
                        </div>
                        <div class="brand-detail-single-text-col">
                            ${detailText ? `<p class="brand-detail-text">${detailText}</p>` : ''}
                        </div>
                    </div>
                </section>
            `;
        } else {
            // Single image layout - Text LEFT, Image RIGHT (Saburomaru style)
            return `
                <section class="brand-detail-section">
                    <div class="brand-detail-grid-single-reverse">
                        <div class="brand-detail-single-text-col">
                            ${detailText ? `<p class="brand-detail-text">${detailText}</p>` : ''}
                        </div>
                        <div class="brand-detail-single-image-col">
                            <img src="${brand.detailImages[0]}" alt="${brand.name}" class="brand-detail-single-img">
                        </div>
                    </div>
                </section>
            `;
        }
    } else {
        // Multiple images layout (like Nagahama) - Text LEFT, Images RIGHT
        return `
            <section class="brand-detail-section">
                <div class="brand-detail-grid">
                    <div class="brand-detail-text-col">
                        ${detailText ? `<p class="brand-detail-text">${detailText}</p>` : ''}
                    </div>
                    <div class="brand-detail-images-col">
                        <div class="detail-images-layout">
                            ${brand.detailImages.map((img, index) => 
                                `<img src="${img}" alt="${brand.name} detail ${index + 1}" class="brand-detail-img brand-detail-img-${index}">`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

// Render landscape section
function renderLandscapeSection(brand, config = {}) {
    if (!brand.landscapeImage) {
        return '';
    }
    
    const imagePosition = config.imagePosition || 'left';
    
    // Handle multiple paragraphs in landscape text
    let landscapeTextHTML = '';
    if (brand.landscapeText) {
        const paragraphs = brand.landscapeText.split('\\n\\n');
        landscapeTextHTML = paragraphs.map(para => 
            `<p class="brand-landscape-text">${para}</p>`
        ).join('');
    }
    
    if (imagePosition === 'left') {
        // Image LEFT, Text RIGHT (default)
        return `
            <section class="brand-landscape-section">
                <div class="brand-landscape-grid">
                    <div class="brand-landscape-image-col">
                        <img src="${brand.landscapeImage}" alt="${brand.name}" class="brand-landscape-img">
                    </div>
                    <div class="brand-landscape-text-col">
                        ${landscapeTextHTML}
                    </div>
                </div>
            </section>
        `;
    } else {
        // Text LEFT, Image RIGHT (Kaikyo style)
        return `
            <section class="brand-landscape-section">
                <div class="brand-landscape-grid-reverse">
                    <div class="brand-landscape-text-col">
                        ${landscapeTextHTML}
                    </div>
                    <div class="brand-landscape-image-col">
                        <img src="${brand.landscapeImage}" alt="${brand.name}" class="brand-landscape-img">
                    </div>
                </div>
            </section>
        `;
    }
}

// Render products section
function renderProductsSection(brand, config = {}) {
    const title = config.title || 'RELATED PRODUCT';
    
    return `
        <section class="brand-products-section">
            <h2 class="brand-products-title">${title}</h2>
            <div class="brand-products-grid" id="brand-products-grid">
                <!-- Products will be loaded from JSON -->
            </div>
            <div class="brand-products-link">
                <a href="shop.html" class="view-more-btn">VIEW MORE</a>
            </div>
        </section>
    `;
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
        grid.innerHTML = '<p style="color: #000000; grid-column: 1/-1;">No products found for this brand.</p>';
        return;
    }
    
    grid.innerHTML = displayProducts.map(product => `
        <div class="brand-product-card">
            ${product.badge ? `<span class="brand-product-badge">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="brand-product-img">
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
    // Check URL parameter first (e.g., brand.html?id=nagahama)
    const urlParams = new URLSearchParams(window.location.search);
    const brandId = urlParams.get('id');
    
    if (brandId) {
        return brandId.toLowerCase();
    }
    
    // Fallback: check path for backward compatibility
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
