        // --- LÓGICA DEL REPRODUCTOR DE MÚSICA (CORREGIDO) ---
        const audioPlayer = document.querySelector('.audio');
        const songButtons = document.querySelectorAll('.canciones');

        if (audioPlayer && songButtons.length > 0) {
            songButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const songSrc = button.getAttribute('data-src');
                    if (songSrc) {
                        audioPlayer.src = songSrc;
                        const playPromise = audioPlayer.play();

                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.error(`Error al intentar reproducir: ${error.message}`);
                                console.warn(`No se pudo cargar la canción desde la ruta: "${songSrc}". Asegúrate de que el archivo exista y la ruta sea correcta.`);
                            });
                        }
                    }
                });
            });

            // Agregamos un listener para el error en el elemento de audio en sí.
            // Esto captura errores si el archivo fuente inicial no se puede cargar.
            audioPlayer.addEventListener('error', () => {
                // Evitamos mostrar el error si la fuente está vacía (al inicio)
                if (audioPlayer.currentSrc) {
                    console.error(`Error al cargar el archivo de audio inicial: ${audioPlayer.currentSrc}`);
                     console.warn(`Verifica que la ruta en la etiqueta <source> del elemento <audio> sea correcta.`);
                }
            });
        }