// ===== LANGUAGE STATE =====
let currentLang = 'en';

// ===== SCREEN NAVIGATION =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        // Reset scroll position
        const scroll = screen.querySelector('.screen-scroll');
        if (scroll) scroll.scrollTop = 0;
    }

    // Update bottom nav visibility
    const bottomNav = document.getElementById('bottom-nav');
    if (screenId === 'screen-home') {
        bottomNav.style.display = 'flex';
    } else {
        bottomNav.style.display = 'flex';
    }

    // Update active nav item based on screen
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    switch (screenId) {
        case 'screen-home':
            navItems[0].classList.add('active');
            break;
        case 'screen-group':
            navItems[1].classList.add('active');
            break;
        case 'screen-restaurants':
            navItems[2].classList.add('active');
            break;
        case 'screen-cart':
            navItems[3].classList.add('active');
            break;
    }
}

function setActiveNav(btn) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
}

// ===== AREA SWITCHING =====
function switchArea(btn, area) {
    // Update tabs
    document.querySelectorAll('.area-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    // Update restaurant lists
    document.querySelectorAll('.area-restaurants').forEach(a => a.classList.remove('active'));
    const areaEl = document.getElementById('area-' + area);
    if (areaEl) areaEl.classList.add('active');
}

// ===== LANGUAGE TOGGLE =====
function toggleLanguage() {
    const html = document.documentElement;

    if (currentLang === 'en') {
        currentLang = 'ar';
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        document.body.style.fontFamily = "'Tajawal', 'Inter', sans-serif";
    } else {
        currentLang = 'en';
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    }

    // Update lang toggle button text
    const langBtn = document.querySelector('.lang-toggle .lang-text');
    langBtn.textContent = currentLang === 'en' ? 'عربي' : 'EN';
    langBtn.style.fontFamily = currentLang === 'en' ? "'Tajawal', sans-serif" : "'Inter', sans-serif";

    // Update all bilingual text
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute('data-' + currentLang);
        if (text) {
            el.textContent = text;
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
        const placeholder = el.getAttribute('data-placeholder-' + currentLang);
        if (placeholder) {
            el.setAttribute('placeholder', placeholder);
        }
    });
}

// ===== FILTER CHIPS =====
document.addEventListener('DOMContentLoaded', function() {
    // Filter chip click handling
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Split payment toggle
    const splitToggle = document.getElementById('split-toggle');
    const splitBreakdown = document.getElementById('split-breakdown');
    if (splitToggle && splitBreakdown) {
        splitToggle.addEventListener('change', function() {
            if (this.checked) {
                splitBreakdown.classList.add('show');
            } else {
                splitBreakdown.classList.remove('show');
            }
        });
    }

    // Payment option selection
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// ===== DEMO: ADD TO CART =====
function addToCartDemo(restaurant, item, price) {
    showToast(currentLang === 'en'
        ? `Added ${item} from ${restaurant}`
        : `تمت إضافة ${item} من ${restaurant}`
    );
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.getElementById('app').appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Animate out
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===== ORDER CONFIRMATION =====
function showOrderConfirmation() {
    const overlay = document.getElementById('order-confirmation');
    overlay.classList.add('show');
}

function hideOrderConfirmation() {
    const overlay = document.getElementById('order-confirmation');
    overlay.classList.remove('show');
    showScreen('screen-home');
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    // Ensure first screen is shown
    showScreen('screen-home');
});
