function updateClock() {
    // Obtener la hora actual
    const now = new Date();
    
    // Opciones para formatear la hora (ej: 08:30:45 PM)
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Muestra AM/PM
    };
    
    // Formatear la hora
    const timeString = now.toLocaleTimeString('es-ES', options);

    // Encontrar el div y actualizar su contenido
    const clockElement = document.getElementById('current-time');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Llamar a la función inmediatamente para que se muestre la hora al cargar
updateClock();

// Actualizar la hora cada segundo (1000 milisegundos)
setInterval(updateClock, 1000);