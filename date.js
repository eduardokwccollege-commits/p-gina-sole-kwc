        // Función para actualizar el reloj y la fecha
        function updateTime() {
            const now = new Date();
            // Formato de hora (ej: 14:30:05)
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            const timeString = now.toLocaleTimeString('es-ES', timeOptions);
            
            // Formato de fecha (ej: Viernes, 26 de Septiembre)
            const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
            const dateString = now.toLocaleDateString('es-ES', dateOptions);

            const timeElement = document.getElementById('current-time');
            if (timeElement) {
                // Se muestran en dos líneas separadas con un <br>
                timeElement.innerHTML = `${timeString} <br> ${dateString}`;
            }
        }/**
 * Archivo: date.js
 * Función: Muestra el reloj y la fecha actualizados en tiempo real.
 */

function updateCurrentTime() {
    // 1. Obtiene la hora y fecha actual
    const now = new Date();

    // Opciones para formatear la hora (ej: 06:10:11 PM)
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Para formato AM/PM
    };

    // Opciones para formatear la fecha (ej: Viernes, 26 de septiembre de 2025)
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    // Formatea la hora y la fecha
    const timeString = now.toLocaleTimeString('es-ES', timeOptions);
    const dateString = now.toLocaleDateString('es-ES', dateOptions);

    // 2. Encuentra el elemento en el DOM y lo actualiza
    const timeElement = document.getElementById('current-time');

    if (timeElement) {
        // Muestra la fecha y la hora separadas por un <br>
        timeElement.innerHTML = `${dateString}<br>${timeString}`;
    }
}

// 3. Llama a la función una vez para cargar la hora inicial inmediatamente
updateCurrentTime();

// 4. Configura la función para que se ejecute cada 1000 milisegundos (1 segundo)
// Esto asegura que el reloj se actualice en tiempo real.
setInterval(updateCurrentTime, 1000);