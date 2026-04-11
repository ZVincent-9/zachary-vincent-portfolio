// Dark/Light Mode
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');

    if (!toggleBtn || !icon) return;

    // Set initial theme based on system preference or saved choice
    if (localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        icon.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        icon.textContent = '🌙';
    }

    // Toggle on click
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

// Hamburger Menu
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Run when page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHamburger();
});