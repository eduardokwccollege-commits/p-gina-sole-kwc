// Array SOLO con las imágenes que EXISTEN en tu carpeta
const imageSources = [
    'images/Día de la Madre 2025/1.jpg',
    'images/Día de la Madre 2025/2.jpg',
    'images/Día de la Madre 2025/3.jpg',
    'images/Día de la Madre 2025/4.jpg',
    'images/Día de la Madre 2025/5.jpg',
    'images/Día de la Madre 2025/6.jpg',
    'images/Día de la Madre 2025/7.jpg',
    'images/Día de la Madre 2025/8.jpg',
    'images/Día de la Madre 2025/9.jpg',
    'images/Día de la Madre 2025/10.jpg',
    'images/Día de la Madre 2025/11.jpg',
    'images/Día de la Madre 2025/12.jpg',
    'images/Día de la Madre 2025/13.jpg',
    'images/Día de la Madre 2025/14.jpg',
    'images/Día de la Madre 2025/15.jpg',
    'images/Día de la Madre 2025/16.jpg',
    'images/Día de la Madre 2025/17.jpg',
    'images/Día de la Madre 2025/18.jpg',
    'images/Día de la Madre 2025/19.jpg',
    'images/Día de la Madre 2025/20.jpg',
    'images/Día de la Madre 2025/21.jpg',
    'images/Día de la Madre 2025/22.jpg',
    'images/Día de la Madre 2025/23.jpg',
    'images/Día de la Madre 2025/24.jpg',
    'images/Día de la Madre 2025/25.jpg',
    'images/Día de la Madre 2025/26.jpg',
    'images/Día de la Madre 2025/27.jpg',
    'images/Día de la Madre 2025/28.jpg',
    'images/Día de la Madre 2025/29.jpg',
    'images/Día de la Madre 2025/30.jpg',
    'images/Día de la Madre 2025/31.jpg',
    'images/Día de la Madre 2025/32.jpg',   
    'images/Día de la Madre 2025/33.jpg',
    'images/Día de la Madre 2025/34.jpg',
    'images/Día de la Madre 2025/35.jpg',
    'images/Día de la Madre 2025/36.jpg',
    'images/Día de la Madre 2025/37.jpg',
    'images/Día de la Madre 2025/38.jpg',
    'images/Día de la Madre 2025/39.jpg',
    'images/Día de la Madre 2025/40.jpg',
    'images/Día de la Madre 2025/41.jpg',
    'images/Día de la Madre 2025/42.jpg',
    'images/Día de la Madre 2025/43.jpg',
    'images/Día de la Madre 2025/44.jpg',
    'images/Día de la Madre 2025/45.jpg',
    'images/Día de la Madre 2025/46.jpg',
];

const gallery = document.getElementById('gallery');
const largeImageContainer = document.getElementById('largeImageContainer');
let activeImageIndex = -1;

// Función para verificar si una imagen existe
function checkImageExists(src, callback) {
    const img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = src;
}

// Función para cargar solo las imágenes que existen
function loadExistingImages() {
    const existingImages = [];
    let imagesChecked = 0;
    
    imageSources.forEach((src, index) => {
        checkImageExists(src, (exists) => {
            imagesChecked++;
            if (exists) {
                existingImages.push({ src, originalIndex: index });
            }
            
            // Cuando todas las imágenes han sido verificadas
            if (imagesChecked === imageSources.length) {
                // Ordenar por el índice original
                existingImages.sort((a, b) => a.originalIndex - b.originalIndex);
                
                // Crear nuevo array solo con las URLs de las imágenes que existen
                const validImageSources = existingImages.map(item => item.src);
                
                // Renderizar la galería con las imágenes que existen
                renderGallery(validImageSources);
            }
        });
    });
}

// Función para generar imágenes en la galería
function renderGallery(imagesArray = imageSources) {
    gallery.innerHTML = '';
    
    if (imagesArray.length === 0) {
        largeImageContainer.innerHTML = '<div class="placeholder">No hay imágenes para mostrar</div>';
        return;
    }
    
    imagesArray.forEach((src, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        if (index === activeImageIndex) {
            imageCard.classList.add('active');
        }
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';
        
        imageContainer.appendChild(img);
        imageCard.appendChild(imageContainer);
        
        // Añadir evento de clic
        imageCard.addEventListener('click', () => {
            showLargeImage(index, imagesArray);
        });
        
        gallery.appendChild(imageCard);
    });
}

// Función para mostrar la imagen en grande
function showLargeImage(index, imagesArray = imageSources) {
    if (imagesArray.length === 0) return;
    
    activeImageIndex = index;
    
    const img = document.createElement('img');
    img.src = imagesArray[index];
    img.alt = '';
    
    largeImageContainer.innerHTML = '';
    largeImageContainer.appendChild(img);
    
    // Actualizar la galería para resaltar la imagen activa
    renderGallery(imagesArray);
}

// Inicializar la galería cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    loadExistingImages();
});