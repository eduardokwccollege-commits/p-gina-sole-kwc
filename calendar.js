// Calendario Interactivo - Karol Wojtyla College
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Todos los eventos del año (puedes agregar todos los que necesites)
const allYearEvents = [
    { date: '2025-01-01', title: 'Año Nuevo', description: 'Feriado nacional' },
    { date: '2025-02-14', title: 'San Valentín', description: 'Actividad especial' },
    { date: '2025-03-08', title: 'Día de la Mujer', description: 'Celebración' },
    { date: '2025-04-01', title: 'Día de la Educación', description: 'Actividades educativas' },
    { date: '2025-04-17', title: 'Jueves Santo', description: 'Feriado' },
    { date: '2025-04-18', title: 'Viernes Santo', description: 'Feriado' },
    { date: '2025-05-01', title: 'Día del Trabajo', description: 'Feriado nacional' },
    { date: '2025-05-11', title: 'Día de la Madre', description: 'Celebración especial' },
    { date: '2025-06-15', title: 'Día del Padre', description: 'Celebración especial' },
    { date: '2025-06-29', title: 'San Pedro y San Pablo', description: 'Feriado' },
    { date: '2025-07-06', title: 'Día del Maestro', description: 'Homenaje a profesores' },
    { date: '2025-07-28', title: 'Fiestas Patrias', description: 'Día 1' },
    { date: '2025-07-29', title: 'Fiestas Patrias', description: 'Día 2' },
    { date: '2025-08-30', title: 'Santa Rosa de Lima', description: 'Feriado' },
    { date: '2025-09-21', title: 'Día de la Primavera', description: 'Actividad recreativa' },
    { date: '2025-10-08', title: 'Combate de Angamos', description: 'Feriado' },
    { date: '2025-10-15', title: 'Día del Maestro', description: 'Celebración especial' },
    { date: '2025-10-20', title: 'Reunión de Padres', description: 'Todos los niveles' },
    { date: '2025-10-31', title: 'Halloween 2025', description: 'Actividad recreativa' },
    { date: '2025-11-01', title: 'Todos los Santos', description: 'Feriado' },
    { date: '2025-11-15', title: 'Simulacro de Sismo', description: 'Seguridad escolar' },
    { date: '2025-12-08', title: 'Inmaculada Concepción', description: 'Feriado' },
    { date: '2025-12-20', title: 'Clausura Escolar', description: 'Fin de año académico' },
    { date: '2025-12-25', title: 'Navidad', description: 'Feriado nacional' }
];

// Convertir array a objeto para búsqueda rápida
const specialEvents = {};
allYearEvents.forEach(event => {
    specialEvents[event.date] = event;
});

const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const monthNamesShort = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

// Función para obtener eventos del mes actual
function getEventsForMonth(month, year) {
    return allYearEvents.filter(event => {
        const eventDate = new Date(event.date + 'T00:00:00');
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    }).sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
}

// Función para actualizar la lista de eventos
function updateEventsList(month, year) {
    const eventsContainer = document.querySelector('.events-widget');
    if (!eventsContainer) return;

    const monthEvents = getEventsForMonth(month, year);
    
    // Limpiar eventos anteriores (mantener solo el título)
    const existingItems = eventsContainer.querySelectorAll('.event-item');
    existingItems.forEach(item => item.remove());

    if (monthEvents.length === 0) {
        const noEvents = document.createElement('p');
        noEvents.style.textAlign = 'center';
        noEvents.style.color = '#999';
        noEvents.style.padding = '20px';
        noEvents.textContent = 'No hay eventos este mes';
        eventsContainer.appendChild(noEvents);
        return;
    }

    // Agregar eventos del mes
    monthEvents.forEach(event => {
        const eventDate = new Date(event.date + 'T00:00:00');
        const day = eventDate.getDate();
        const monthShort = monthNamesShort[eventDate.getMonth()];

        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        
        eventItem.innerHTML = `
            <div class="event-date"><h5>${day} ${monthShort}</h5></div>
            <div class="event-info">
                <h4>${event.title}</h4>
                <p>${event.description}</p>
            </div>
        `;
        
        eventsContainer.appendChild(eventItem);
    });
}

function generateCalendar(month, year) {
    const calendarDates = document.getElementById('calendarDates');
    const monthYear = document.getElementById('monthYear');
    
    if (!calendarDates || !monthYear) return;

    // Actualizar título del mes y año
    monthYear.textContent = `${monthNames[month]} ${year}`;
    
    // Limpiar calendario anterior
    calendarDates.innerHTML = '';
    
    // Primer día del mes (0 = Domingo, 1 = Lunes, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    
    // Último día del mes
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    // Último día del mes anterior
    const prevLastDate = new Date(year, month, 0).getDate();
    
    // Fecha actual
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const currentDate = today.getDate();
    
    // Días del mes anterior (para llenar la primera semana)
    for (let i = firstDay - 1; i >= 0; i--) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'calendar-date other-month';
        dateDiv.textContent = prevLastDate - i;
        calendarDates.appendChild(dateDiv);
    }
    
    // Días del mes actual
    for (let day = 1; day <= lastDate; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'calendar-date';
        dateDiv.textContent = day;
        
        // Marcar el día actual
        if (isCurrentMonth && day === currentDate) {
            dateDiv.classList.add('today');
        }
        
        // Marcar días con eventos
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const eventData = specialEvents[dateString];
        
        if (eventData) {
            dateDiv.classList.add('event-day');
            dateDiv.title = eventData.title;
        }
        
        // Evento click para mostrar información del día
        dateDiv.addEventListener('click', function() {
            if (eventData) {
                alert(`📅 ${eventData.title}\n\n${eventData.description}\n\nFecha: ${day} de ${monthNames[month]} de ${year}`);
            }
        });
        
        calendarDates.appendChild(dateDiv);
    }
    
    // Días del siguiente mes (para completar la última semana)
    const totalCells = firstDay + lastDate;
    const remainingDays = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
    
    for (let day = 1; day <= remainingDays; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'calendar-date other-month';
        dateDiv.textContent = day;
        calendarDates.appendChild(dateDiv);
    }

    // Actualizar la lista de eventos
    updateEventsList(month, year);
}

// Función para inicializar el calendario
function initCalendar() {
    // Verificar que los elementos existan
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    if (!prevBtn || !nextBtn) {
        console.error('No se encontraron los botones del calendario');
        return;
    }
    
    // Botón mes anterior
    prevBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Botón mes siguiente
    nextBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Generar calendario inicial
    generateCalendar(currentMonth, currentYear);
}

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendar);
} else {
    initCalendar();
}

// Función para agregar un nuevo evento
function addEvent(date, title, description) {
    const newEvent = { date, title, description };
    allYearEvents.push(newEvent);
    specialEvents[date] = newEvent;
    generateCalendar(currentMonth, currentYear);
}

// Función para ir a un mes específico
function goToMonth(month, year) {
    currentMonth = month;
    currentYear = year;
    generateCalendar(currentMonth, currentYear);
}

// Función para ir al día de hoy
function goToToday() {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    generateCalendar(currentMonth, currentYear);
}

// Exportar funciones
window.calendarFunctions = {
    addEvent: addEvent,
    goToMonth: goToMonth,
    goToToday: goToToday,
    getAllEvents: () => allYearEvents
};