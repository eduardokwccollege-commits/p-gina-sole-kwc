        // Obtiene la ventana modal
        const modal = document.getElementById('welcomeModal');
        // Obtiene el botón de cierre
        const closeBtn = document.querySelector('.close-btn');
        // Cuando la página se carga, muestra la modal
        window.onload = function() {
            modal.style.display = 'flex';
        }
        // Cuando el usuario hace clic en el botón de cierre, oculta la modal
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
        // Cuando el usuario hace clic en cualquier lugar fuera de la modal, la oculta
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }