document.addEventListener('DOMContentLoaded', () => {

    const calendarTimeZone = 'America/New_York';

    const events = [
        {
            id: 1,
            datetime: '2023-06-17T10:00:00-05:00',
            title: 'Exemplo de evento',
            description: 'Lorem ipsum dolor sit amet',
            category: 1,
            export: '#',
            files: {
                webcast: '#',
                presentation: '#',
                transcript: '#'
            }
        },
        {
            id: 2,
            datetime: '2024-07-30T14:00:00-05:00',
            title: 'Exemplo de evento',
            description: 'Lorem ipsum dolor sit amet',
            category: 2,
            export: '#',
            files: {
                webcast: '',
                presentation: '#',
                transcript: ''
            }
        },
        {
            id: 3,
            datetime: '2024-08-05T09:00:00-05:00',
            title: 'Exemplo de evento',
            description: 'Lorem ipsum dolor sit amet',
            category: 1,
            export: '#',
            files: {
                webcast: '#',
                presentation: '',
                transcript: ''
            }
        },
        {
            id: 4,
            datetime: '2025-09-10T15:30:00-05:00',
            title: 'Exemplo de evento',
            description: 'Lorem ipsum dolor sit amet',
            category: 3,
            export: '#',
            files: {
                webcast: '',
                presentation: '#',
                transcript: '#'
            }
        }
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
                                timeZone: calendarTimeZone,
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

    (function upcoming_events() {

        const now = Date.now();
        const upcomingTable = document.querySelector('.js-upcoming-events tbody');
        upcomingTable.innerHTML = '';

        events
            .filter(e => new Date(e.datetime).getTime() > now)
            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
            .forEach(e => {
                const dateObj = new Date(e.datetime);
                const lang = document.documentElement.lang;

                const dateStr = dateObj.toLocaleDateString(lang, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    timeZone: calendarTimeZone
                });

                const timeStr = dateObj.toLocaleTimeString(lang, {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: calendarTimeZone
                });

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class"date">${dateStr}</td>
                    <td class"title">${e.title}</td>
                    <td class"time">${timeStr}</td>
                    <td class"description">${e.description}</td>
                    <td class"export">
                        <a href="${e.export}" target="_blank" rel="noopener noreferrer" aria-label="Exportar">
                            <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6.49351C6.70115 6.47487 27 6.49353 27 6.49353V10.4852H4V6.49351ZM4 12.4852V26.4852H20.7273C20.7273 25.4852 21.0818 24.0852 22.5 22.4852C23.9182 20.8852 26.0909 19.9431 27 20.172V12.4852H4Z" fill="#001EAF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 8.48523V3.48523H23.5V8.48523H22.5Z" fill="#001EAF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 8.48523V3.48523H8.5V8.48523H7.5Z" fill="#001EAF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M33 26.9852C33 30.0228 30.5376 32.4852 27.5 32.4852C24.4624 32.4852 22 30.0228 22 26.9852C22 23.9477 24.4624 21.4852 27.5 21.4852C30.5376 21.4852 33 23.9477 33 26.9852ZM27 26.4852V23.4852H28V26.4852H31V27.4852H28V30.4852H27V27.4852H24V26.4852H27Z" fill="#001EAF"/>
                            </svg>
                        </a>
                    </td>
                `;
                upcomingTable.appendChild(row);
            });

    })();

    (function past_events() {
        const now = Date.now();
        const pastTable = document.querySelector('.js-past-events tbody');
        const filter = document.querySelector('.js-filter-past-events');

        pastTable.innerHTML = '';

        const pastEvents = events
            .filter(e => new Date(e.datetime).getTime() < now)
            .sort((a, b) => new Date(b.datetime) - new Date(a.datetime)); // mais recentes primeiro

        const years = [...new Set(pastEvents.map(e => new Date(e.datetime).getFullYear()))];

        filter.innerHTML = years.map(year => `<option value="${year}">${year}</option>`).join('');

        pastEvents.forEach(e => {
            const dateObj = new Date(e.datetime);

            const lang = document.documentElement.lang;
            const isPT = lang === 'pt-BR';

            const dateStr = dateObj.toLocaleString(lang, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: !isPT,
                timeZone: calendarTimeZone,
                timeZoneName: 'short'
            })
                .replace(',', '')
                .replace(' at', isPT ? ' às' : ' at');

            const row = document.createElement('tr');
            row.setAttribute('data-year', dateObj.getFullYear());
            row.innerHTML = `
                <td class="title">
                    <span>${e.title}</span>
                    <time>${dateStr}</time>
                </td>
                <td class="file">
                    <a href="${e.files.webcast}" ${e.files.webcast !== '' ? 'class="has-file"' : ''} target="_blank" rel="noopener noreferrer" aria-label="Webcast">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="14.5" stroke="#001EAF"/>
                            <path d="M21 15L12 20.1962L12 9.80385L21 15Z" fill="#001EAF"/>
                        </svg>
                    </a>
                </td>
                <td class="file">
                    <a href="${e.files.presentation}" ${e.files.presentation !== '' ? 'class="has-file"' : ''} target="_blank" rel="noopener noreferrer" aria-label="Presentation">
                        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.9596 1.23823C2.79031 1.23823 1.02539 3.04463 1.02539 5.26491V24.8731C1.02539 27.0934 2.79031 28.8998 4.9596 28.8998H21.0385C23.2078 28.8998 24.9728 27.0934 24.9728 24.8731V12.2885C24.9728 10.654 24.3508 9.11722 23.2215 7.96138L18.4365 3.06354C17.2863 1.8867 15.7571 1.23823 14.1308 1.23823H4.9596ZM21.0395 29.9503H4.96053C2.22539 29.9503 0 27.6726 0 24.8732V5.26502C0 2.4656 2.22539 0.187897 4.96053 0.187897H14.1317C16.0321 0.187897 17.8189 0.945613 19.163 2.32099L23.9481 7.21883C25.2713 8.57285 26 10.3733 26 12.2886V24.8732C26 27.6726 23.7746 29.9503 21.0395 29.9503Z" fill="#001EAF"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.529 6.65775C12.4932 6.65775 12.4787 6.66375 12.4783 6.66375C12.3425 6.80484 12.302 7.6285 13.0085 9.7686C13.223 8.4772 13.2443 7.41579 12.9464 6.90855C12.8556 6.7544 12.7458 6.68032 12.579 6.66092C12.559 6.65845 12.5425 6.65775 12.529 6.65775ZM13.2323 13.2062C12.9855 14.033 12.7453 14.729 12.5924 15.1547C12.5799 15.19 12.0452 16.6641 11.2441 18.3894C12.0226 18.2046 12.7693 18.0589 13.4039 17.9481C13.589 17.916 13.8328 17.8663 14.1175 17.8081C14.5812 17.7139 15.0456 17.6225 15.5012 17.5425C14.8078 16.5206 14.2509 15.5043 13.9808 14.9096C13.7042 14.3 13.4556 13.7335 13.2323 13.2062ZM17.4141 18.353C18.177 19.2197 18.8737 19.7623 19.2452 19.7294C19.4327 19.7129 19.5492 19.4229 19.614 19.1827C19.713 18.8165 19.612 18.7019 19.5742 18.6589C19.2689 18.3132 18.3931 18.2719 17.4141 18.353ZM9.25444 20.0571C7.68231 20.6014 6.65089 21.2134 6.40097 21.7989C6.33883 21.9446 6.2929 22.1538 6.49081 22.4787C6.70222 22.8254 6.85488 22.8095 6.92073 22.8021C7.36586 22.7534 8.24598 21.7965 9.25444 20.0571ZM6.88226 23.8625C6.51178 23.8625 6.03457 23.7023 5.63503 23.0466C5.20916 22.3471 5.31284 21.7478 5.47495 21.3682C5.98695 20.1693 7.94138 19.3096 9.97214 18.7227C10.5287 17.614 11.1012 16.2944 11.6439 14.7832C12.0039 13.7811 12.3406 12.6981 12.6054 11.6579C10.8833 7.18265 11.447 6.35688 11.6564 6.05034C11.7891 5.85598 12.1008 5.53922 12.6929 5.60906C13.1708 5.66514 13.5575 5.923 13.8114 6.35546C14.446 7.43627 14.1509 9.61517 13.673 11.587C13.9979 12.4121 14.4001 13.3631 14.8966 14.4559C15.368 15.4947 15.9891 16.511 16.6227 17.3699C18.2661 17.16 19.6687 17.2062 20.3174 17.9417C20.5559 18.2122 20.7963 18.6966 20.5876 19.4698C20.3124 20.4885 19.7511 20.7463 19.3286 20.7837C18.3596 20.8673 17.2002 19.7936 16.1958 18.5011C15.4484 18.6151 14.7523 18.7569 14.3116 18.8468C14.0161 18.9071 13.7631 18.9586 13.5713 18.9918C12.5027 19.1781 11.5166 19.3953 10.6378 19.6338C9.57902 21.697 8.24196 23.7221 7.02512 23.8544C6.97953 23.8597 6.93191 23.8625 6.88226 23.8625Z" fill="#001EAF"/>
                        </svg>
                    </a>
                </td>
                <td class="file">
                    <a href="${e.files.transcript}" ${e.files.transcript !== '' ? 'class="has-file"' : ''} target="_blank" rel="noopener noreferrer" aria-label="Call transcript">
                        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.9596 1.23823C2.79031 1.23823 1.02539 3.04463 1.02539 5.26491V24.8731C1.02539 27.0934 2.79031 28.8998 4.9596 28.8998H21.0385C23.2078 28.8998 24.9728 27.0934 24.9728 24.8731V12.2885C24.9728 10.654 24.3508 9.11722 23.2215 7.96138L18.4365 3.06354C17.2863 1.8867 15.7571 1.23823 14.1308 1.23823H4.9596ZM21.0395 29.9503H4.96053C2.22539 29.9503 0 27.6726 0 24.8732V5.26502C0 2.4656 2.22539 0.187897 4.96053 0.187897H14.1317C16.0321 0.187897 17.8189 0.945613 19.163 2.32099L23.9481 7.21883C25.2713 8.57285 26 10.3733 26 12.2886V24.8732C26 27.6726 23.7746 29.9503 21.0395 29.9503Z" fill="#001EAF"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.529 6.65775C12.4932 6.65775 12.4787 6.66375 12.4783 6.66375C12.3425 6.80484 12.302 7.6285 13.0085 9.7686C13.223 8.4772 13.2443 7.41579 12.9464 6.90855C12.8556 6.7544 12.7458 6.68032 12.579 6.66092C12.559 6.65845 12.5425 6.65775 12.529 6.65775ZM13.2323 13.2062C12.9855 14.033 12.7453 14.729 12.5924 15.1547C12.5799 15.19 12.0452 16.6641 11.2441 18.3894C12.0226 18.2046 12.7693 18.0589 13.4039 17.9481C13.589 17.916 13.8328 17.8663 14.1175 17.8081C14.5812 17.7139 15.0456 17.6225 15.5012 17.5425C14.8078 16.5206 14.2509 15.5043 13.9808 14.9096C13.7042 14.3 13.4556 13.7335 13.2323 13.2062ZM17.4141 18.353C18.177 19.2197 18.8737 19.7623 19.2452 19.7294C19.4327 19.7129 19.5492 19.4229 19.614 19.1827C19.713 18.8165 19.612 18.7019 19.5742 18.6589C19.2689 18.3132 18.3931 18.2719 17.4141 18.353ZM9.25444 20.0571C7.68231 20.6014 6.65089 21.2134 6.40097 21.7989C6.33883 21.9446 6.2929 22.1538 6.49081 22.4787C6.70222 22.8254 6.85488 22.8095 6.92073 22.8021C7.36586 22.7534 8.24598 21.7965 9.25444 20.0571ZM6.88226 23.8625C6.51178 23.8625 6.03457 23.7023 5.63503 23.0466C5.20916 22.3471 5.31284 21.7478 5.47495 21.3682C5.98695 20.1693 7.94138 19.3096 9.97214 18.7227C10.5287 17.614 11.1012 16.2944 11.6439 14.7832C12.0039 13.7811 12.3406 12.6981 12.6054 11.6579C10.8833 7.18265 11.447 6.35688 11.6564 6.05034C11.7891 5.85598 12.1008 5.53922 12.6929 5.60906C13.1708 5.66514 13.5575 5.923 13.8114 6.35546C14.446 7.43627 14.1509 9.61517 13.673 11.587C13.9979 12.4121 14.4001 13.3631 14.8966 14.4559C15.368 15.4947 15.9891 16.511 16.6227 17.3699C18.2661 17.16 19.6687 17.2062 20.3174 17.9417C20.5559 18.2122 20.7963 18.6966 20.5876 19.4698C20.3124 20.4885 19.7511 20.7463 19.3286 20.7837C18.3596 20.8673 17.2002 19.7936 16.1958 18.5011C15.4484 18.6151 14.7523 18.7569 14.3116 18.8468C14.0161 18.9071 13.7631 18.9586 13.5713 18.9918C12.5027 19.1781 11.5166 19.3953 10.6378 19.6338C9.57902 21.697 8.24196 23.7221 7.02512 23.8544C6.97953 23.8597 6.93191 23.8625 6.88226 23.8625Z" fill="#001EAF"/>
                        </svg>
                    </a>
                </td>
            `;
            pastTable.appendChild(row);
        });

        function filterRows(year) {
            pastTable.querySelectorAll('tr').forEach(row => {
                row.style.display = row.getAttribute('data-year') === year ? '' : 'none';
            });
        }

        const latestYear = years[0];
        filter.value = latestYear;
        filterRows(String(latestYear));

        filter.addEventListener('change', (e) => {
            filterRows(e.target.value);
        });
    })();


});
