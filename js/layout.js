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
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
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
                
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
}

// Age Gate Functionality
function initAgeGate() {
    const ageGateModal = document.getElementById('age-gate-modal');
    const ageConfirm = document.getElementById('age-confirm');
    const termsConfirm = document.getElementById('terms-confirm');
    const enterBtn = document.getElementById('age-gate-enter');
    
    if (!ageGateModal) return;
    
    // Check both checkboxes to enable button
    function checkVerification() {
        if (ageConfirm && termsConfirm && enterBtn) {
            enterBtn.disabled = !(ageConfirm.checked && termsConfirm.checked);
        }
    }
    
    if (ageConfirm) ageConfirm.addEventListener('change', checkVerification);
    if (termsConfirm) termsConfirm.addEventListener('change', checkVerification);
    
    // Handle enter button click
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            if (ageConfirm.checked && termsConfirm.checked) {
                localStorage.setItem('ageVerified', 'true');
                ageGateModal.classList.remove('show');
                ageGateModal.classList.add('hidden');
                // Enable scroll after entering
                document.body.classList.remove('no-scroll');
            }
        });
    }
}

// Call loadIncludes when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadIncludes();
        initAgeGate();
    });
} else {
    loadIncludes();
    initAgeGate();
}
