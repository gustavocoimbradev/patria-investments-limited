document.addEventListener('DOMContentLoaded', () => {
    const events = [
        { id: 1, datetime: '2025-07-22T10:00:00-05:00', title: 'Exemplo de evento', category: 1 },
        { id: 2, datetime: '2025-07-30T14:00:00-05:00', title: 'Exemplo de evento', category: 2 },
        { id: 3, datetime: '2025-08-05T09:00:00-05:00', title: 'Exemplo de evento', category: 1 },
        { id: 4, datetime: '2025-09-10T15:30:00-05:00', title: 'Exemplo de evento', category: 3 }
    ];

    (function calendar() {
        let baseDate = new Date();

        function renderCalendar() {
            const calendar = document.getElementById('calendar');
            calendar.innerHTML = '';

            const monthsToShow = window.matchMedia('(max-width: 768px)').matches ? 1 : 3;
            const lang = document.documentElement.lang;

            for (let i = 0; i < monthsToShow; i++) {
                const current = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);
                const month = current.toLocaleString(lang, { month: 'long' });
                const year = current.getFullYear();

                const firstDay = new Date(year, current.getMonth(), 1).getDay();
                const daysInMonth = new Date(year, current.getMonth() + 1, 0).getDate();

                const monthDiv = document.createElement('div');
                monthDiv.className = 'month';

                const title = document.createElement('h3');
                title.textContent = `${month}`;
                monthDiv.appendChild(title);

                const weekdays = document.createElement('div');
                weekdays.className = 'weekdays';
                weekdays.innerHTML = 'SMTWTFS'.split('').map(d => `<div>${d}</div>`).join('');
                monthDiv.appendChild(weekdays);

                const days = document.createElement('div');
                days.className = 'days';

                for (let j = 0; j < firstDay; j++) {
                    days.appendChild(document.createElement('div'));
                }

                for (let d = 1; d <= daysInMonth; d++) {
                    const dateStr = `${year}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                    const day = document.createElement('div');
                    day.textContent = d;

                    const isToday = new Date().toDateString() === new Date(year, current.getMonth(), d).toDateString();
                    if (isToday) day.classList.add('today');

                    const matched = events.filter(e =>
                        new Date(e.datetime).toISOString().slice(0, 10) === dateStr
                    );

                    if (matched.length) {
                        day.classList.add('event');
                        day.classList.add(`event--${matched.map(e => e.category)}`);

                        const tooltip = document.createElement('div');
                        tooltip.className = 'tooltip';

                        const header = document.createElement('h6');
                        header.textContent = 'Lista de eventos';
                        tooltip.appendChild(header);

                        const list = document.createElement('ul');
                        matched.forEach(ev => {
                            const item = document.createElement('li');
                            const localDate = new Date(ev.datetime).toLocaleString(lang, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZoneName: 'short'
                            });
                            item.textContent = `${ev.title} – ${localDate}`;
                            list.appendChild(item);
                        });

                        tooltip.appendChild(list);
                        day.appendChild(tooltip);
                    }

                    days.appendChild(day);
                }

                monthDiv.appendChild(days);
                calendar.appendChild(monthDiv);
            }
        }

        document.getElementById('prev').onclick = () => {
            baseDate.setMonth(baseDate.getMonth() - 1);
            renderCalendar();
        };

        document.getElementById('next').onclick = () => {
            baseDate.setMonth(baseDate.getMonth() + 1);
            renderCalendar();
        };

        renderCalendar();
        window.addEventListener('resize', renderCalendar);
    })();
});
