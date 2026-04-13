// Dark/Light Mode
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');

    if (!toggleBtn || !icon) return;

    if (localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        icon.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        icon.textContent = '🌙';
    }

    toggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            icon.textContent = '🌙';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            icon.textContent = '☀️';
        }
    });
}

// Hamburger Dropdown
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('dropdown-menu');

    if (!hamburger || !menu) return;

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
        if (isOpen) {
            menu.classList.remove('hidden');
            setTimeout(() => menu.style.transform = 'scale(1)', 10);
        } else {
            menu.style.transform = 'scale(0.95)';
            setTimeout(() => menu.classList.add('hidden'), 200);
        }
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (e) => {
        if (isOpen && !menu.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => isOpen && toggleMenu());
    });
}

// Reliable Scroll Animations - Manual check on load + scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    function checkVisibility() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Element is in view
            if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                if (!el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            } else {
                el.classList.remove('visible');
            }
        });
    }

    // Initial check after page is fully rendered
    setTimeout(() => {
        checkVisibility();
    }, 150);

    // Check on scroll (throttled)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Also check on resize
    window.addEventListener('resize', checkVisibility);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHamburger();
    initScrollAnimations();
});