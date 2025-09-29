document.addEventListener('DOMContentLoaded', () => {
    const calendarDays = document.getElementById('calendarDays');
    const monthYearDisplay = document.getElementById('monthYear');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const eventList = document.getElementById('eventList');

    let currentDate = new Date();

    // Datos de ejemplo para eventos escolares
    const schoolEvents = {
        // Formato de fecha: 'YYYY-MM-DD'
        '2025-09-20': ['Reunión de padres', 'Entrega de boletines'],
        '2025-09-25': ['Excursión al museo'],
        '2025-10-12': ['Día feriado (Día de la Hispanidad)'],
        '2025-11-02': ['Clases en línea por simulacro de emergencia'],
        '2025-12-15': ['Inicio de vacaciones de invierno'],
    };

    function renderCalendar() {
        // Limpia el calendario y la lista de eventos
        calendarDays.innerHTML = '';
        eventList.innerHTML = '<li>Haz clic en un día con borde rojo para ver los eventos.</li>';

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

        monthYearDisplay.textContent = new Date(year, month).toLocaleString('es-ES', { month: 'long', year: 'numeric' });

        // Días de la semana
        const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('calendar-day', 'day-of-week');
            calendarDays.appendChild(dayElement);
        });

        // Días en blanco para el inicio del mes
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day');
            calendarDays.appendChild(emptyDay);
        }

        // Días del mes
        for (let day = 1; day <= lastDayOfMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add('calendar-day', 'current-month');

            // Genera la cadena de fecha para buscar en los eventos
            const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // Si el día tiene eventos, añade la clase 'has-event'
            if (schoolEvents[dayString]) {
                dayElement.classList.add('has-event');
            }

            // Añade un evento de clic para mostrar los detalles del evento
            dayElement.addEventListener('click', () => showEvents(dayString));
            calendarDays.appendChild(dayElement);
        }
    }

    // Función para mostrar los eventos del día seleccionado
    function showEvents(date) {
        eventList.innerHTML = '';
        const events = schoolEvents[date];
        if (events && events.length > 0) {
            events.forEach(event => {
                const eventItem = document.createElement('li');
                eventItem.textContent = event;
                eventList.appendChild(eventItem);
            });
        } else {
            const noEventsItem = document.createElement('li');
            noEventsItem.textContent = 'No hay eventos para este día.';
            eventList.appendChild(noEventsItem);
        }
    }

    // Eventos para los botones de navegación
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Renderiza el calendario inicial
    renderCalendar();
});