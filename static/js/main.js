// Dark/Light Mode
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');

    if (!toggleBtn || !icon) return;

    // Set initial theme
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

// Hamburger Dropdown Menu
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('dropdown-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');

    if (!hamburger || !menu) return;

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;

        if (isOpen) {
            menu.classList.remove('hidden');
            // Small delay for smooth animation
            setTimeout(() => {
                menu.style.transform = 'scale(1)';
                menu.style.opacity = '1';
            }, 10);
        } else {
            menu.style.transform = 'scale(0.95)';
            menu.style.opacity = '0';
            setTimeout(() => {
                menu.classList.add('hidden');
            }, 200);
        }
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();   // Prevent click from immediately closing
        toggleMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !menu.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close when clicking any link inside the menu
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (isOpen) toggleMenu();
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHamburger();
});