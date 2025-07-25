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
            html.classList.toggle('overflow-hidden');
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

    /* ---------------- Banner bar ---------------- */

    (function banner_bar() {
        const bannerBar = document.querySelector('.js-banner-bar');
        const prevButton = document.querySelector('.js-banner-bar-prev');
        const nextButton = document.querySelector('.js-banner-bar-next');
        const items = bannerBar?.querySelectorAll('li') || [];
        let currentIndex = 0;

        const scrollToIndex = index => {
            items[index]?.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        };

        prevButton?.addEventListener('click', () => {
            if (currentIndex > 0) currentIndex--;
            scrollToIndex(currentIndex);
        });

        nextButton?.addEventListener('click', () => {
            if (currentIndex < items.length - 1) currentIndex++;
            scrollToIndex(currentIndex);
        });
    })();


    /* ---------------- Highcharts ---------------- */

    (function highcharts() {

        function parseDate(str) {
            const [date, time] = str.split(' ');
            const [y, m, d] = date.split('-').map(Number);
            const [h, i] = time.split(':').map(Number);
            return Date.UTC(y, m - 1, d, h, i);
        }

        window.generate_chart = function (id, rawData, options = {}) {
            const data = rawData.map(([time, value]) => [parseDate(time), value]);

            const defaultOptions = {
                credits: { enabled: false },
                chart: { height: 300 },
                title: { text: null },
                rangeSelector: { enabled: false },
                navigator: { enabled: false },
                scrollbar: { enabled: false },
                yAxis: {
                    opposite: true,
                    gridLineColor: '#2C2C2C',
                    labels: { align: 'left', x: 0 },
                    title: { text: null },
                    endOnTick: false
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function () {
                            const date = new Date(this.value);
                            let hours = date.getHours();
                            const ampm = hours >= 12 ? 'PM' : 'AM';
                            hours = hours % 12;
                            hours = hours || 12;
                            return hours + ampm;
                        },
                        style: {
                            fontSize: '11px',
                            color: '#444',
                            fontFamily: 'sans-serif'
                        }
                    },
                    tickInterval: 3600 * 1000
                },
                legend: {
                    enabled: false,
                    align: 'right',
                    verticalAlign: 'top',
                    floating: true,
                    layout: 'vertical',
                    labelFormatter: () => 'USD'
                },
                tooltip: {
                    xDateFormat: '%H:%M',
                    shared: true,
                    valueDecimals: 2,
                    valuePrefix: '$'
                },
                series: [{
                    name: 'USD',
                    type: 'line',
                    data: data,
                    color: '#5B6BB9',
                    lineWidth: 1,
                    marker: { enabled: false }
                }]
            };

            const finalOptions = Object.assign({}, defaultOptions, options);
            Highcharts.stockChart(id, finalOptions);
        };

    })();

    /* ---------------- Faqs ---------------- */

    (function faqs() {
        document.querySelectorAll('.js-faq').forEach(faq => {
            const title = faq.querySelector('.js-faq-title');
            const content = faq.querySelector('.js-faq-content');
            title.addEventListener('click', () => {
                const active = faq.classList.contains('is-active');
                content.style.height = active ? '' : content.scrollHeight + 'px';
                faq.classList.toggle('is-active');
            });
        });
    })();

    /* ---------------- Select Multiple ---------------- */

    (function select_multiple() {
        window.onmousedown = function (e) {
            var el = e.target;
            if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
                e.preventDefault();
                if (el.hasAttribute('selected'))
                    el.removeAttribute('selected');
                else
                    el.setAttribute('selected', '');
                var select = el.parentNode.cloneNode(true);
                el.parentNode.parentNode.replaceChild(select, el.parentNode);
            }
        }
    })();

    /* ---------------- Submit button ---------------- */

    (function submit_button() {
        document.querySelectorAll('form').forEach(f => {
            const c = f.querySelector('input[name="terms"]'),
                b = f.querySelector('button[type="submit"]');
            c && b && (b.disabled = !c.checked, c.addEventListener('change', () => b.disabled = !c.checked));
        });
    })();

    /* ---------------- Autofill email ---------------- */

    (function autofill_email() {
        const u = new URL(location), e = u.searchParams.get('email');
        if (e) {
            document.querySelectorAll('[name="email"]').forEach(i => i.value = e);
            u.searchParams.delete('email');
            history.replaceState(null, '', u);
        }
    })();
    
});