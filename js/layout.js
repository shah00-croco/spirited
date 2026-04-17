// Load Header and Footer
function loadIncludes() {
    // Load header
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // Set active menu item based on current page
            setActiveMenuItem();
            // Initialize scroll effect
            initScrollEffect();
            // Notify other scripts that header DOM is ready
            document.dispatchEvent(new Event('headerLoaded'));
        });
    
    // Load footer
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

// Set active menu item based on current page
function setActiveMenuItem() {
    const currentPage = document.body.getAttribute('data-page') || 'home';
    const menuLinks = document.querySelectorAll('.nav-menu a[data-page]');
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize navbar scroll effect
function initScrollEffect() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const navContainer = document.querySelector('.nav-container');
        
        if (navbar && navContainer) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navContainer.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
                navContainer.classList.remove('scrolled');
            }
        }
    });
}

// Call loadIncludes when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIncludes);
} else {
    loadIncludes();
}
