document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Animations ---------------- */

    (function animations() {
        const elements = document.querySelectorAll('[data-animation]');
        const checkVisibility = () => {
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight - 100 || el.tagName.toLowerCase() === 'header') {
                    el.classList.add('is-visible');
                } else {
                    el.classList.remove('is-visible');
                }
            });
        };
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);
        window.addEventListener('resize', checkVisibility);
        checkVisibility();
    })();

    /* ---------------- Header Desktop ---------------- */

    (function header_desktop() {
        const search = document.querySelector('.js-search-desktop');
        const header = document.querySelector('.js-header-desktop');
        document.querySelector('.js-open-search-desktop')?.addEventListener('click', () => {
            search.classList.add('is-active');
            header.classList.add('is-active');
        });
        document.querySelector('.js-close-search-desktop')?.addEventListener('click', () => {
            search.classList.remove('is-active');
            header.classList.remove('is-active');
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                search.classList.remove('is-active');
                header.classList.remove('is-active');
            }
        });
        const handleScroll = () => {
            if (window.scrollY > 100) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);
        window.addEventListener('resize', handleScroll);
    })();

    /* ---------------- Header Mobile ---------------- */

    (function header_mobile() {
        const html = document.querySelector('html');
        const navigation = document.querySelector('.js-navigation-mobile');
        const header = document.querySelector('.js-header-mobile');
        document.querySelector('.js-toggle-navigation-mobile')?.addEventListener('click', () => {
            html.classList.toggle('overflow-none');
            navigation.classList.toggle('is-active');
            header.classList.toggle('is-active');
        });
        const handleScroll = () => {
            if (window.scrollY > 100) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);
        window.addEventListener('resize', handleScroll);
        const menu = document.querySelector('.js-menu-mobile');
        menu.querySelectorAll('li').forEach(li => {
            const submenu = li.querySelector('ul');
            const link = li.querySelector('a');
        
            if (submenu && link) {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    li.classList.toggle('is-active');
                });
            }
        });
    })();

});