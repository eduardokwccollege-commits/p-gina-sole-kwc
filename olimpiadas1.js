        document.addEventListener('DOMContentLoaded', function() {
            const eventCards = document.querySelectorAll('.event-card');
            const selectedImg = document.getElementById('selected-img');
            const selectedImgPlaceholder = document.getElementById('selected-img-placeholder');
            const selectedTitle = document.getElementById('selected-title');
            const selectedDescription = document.getElementById('selected-description');
            
            // Seleccionar el primer evento por defecto
            selectEvent(1);
            
            // Agregar event listeners a las tarjetas
            eventCards.forEach(card => {
                card.addEventListener('click', function() {
                    const eventId = this.getAttribute('data-id');
                    selectEvent(eventId);
                });
            });
            
            function selectEvent(eventId) {
                // Remover clase activa de todas las tarjetas
                eventCards.forEach(card => {
                    card.classList.remove('active');
                });
                
                // Agregar clase activa a la tarjeta seleccionada
                const selectedCard = document.querySelector(`.event-card[data-id="${eventId}"]`);
                selectedCard.classList.add('active');
                
                // Obtener la imagen de la tarjeta seleccionada
                const cardImage = selectedCard.querySelector('img');
                
                // Actualizar la información en el panel lateral
                selectedTitle.textContent = selectedCard.querySelector('.event-title').textContent;
                selectedDescription.textContent = selectedCard.querySelector('.event-description').textContent;
                
                // Actualizar la imagen en el panel lateral (usamos la misma imagen pero en mejor calidad si está disponible)
                selectedImg.src = cardImage.src.replace('600', '1000'); // Intentamos obtener una imagen de mayor resolución
                selectedImg.alt = cardImage.alt;
                selectedImg.style.display = 'block';
                selectedImgPlaceholder.style.display = 'none';
            }
        });