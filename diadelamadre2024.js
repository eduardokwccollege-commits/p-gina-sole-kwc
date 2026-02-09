// Array SOLO con las imágenes que EXISTEN en tu carpeta
const imageSources = [
    'images/día de la madre/1.jpg',
    'images/día de la madre/2.jpg',
    'images/día de la madre/3.jpg',
    'images/día de la madre/4.jpg',
    'images/día de la madre/5.jpg',
    'images/día de la madre/6.jpg',
    'images/día de la madre/7.jpg',
    'images/día de la madre/8.jpg',
    'images/día de la madre/9.jpg',
    'images/día de la madre/10.jpg',
    'images/día de la madre/11.jpg',
    'images/día de la madre/12.jpg',
    'images/día de la madre/13.jpg',
    'images/día de la madre/14.jpg',
    'images/día de la madre/15.jpg',
    'images/día de la madre/16.jpg',
    'images/día de la madre/17.jpg',
    'images/día de la madre/18.jpg',
    'images/día de la madre/19.jpg',
    'images/día de la madre/20.jpg',
    'images/día de la madre/21.jpg',
    'images/día de la madre/22.jpg',
    'images/día de la madre/23.jpg',
    'images/día de la madre/24.jpg',
    'images/día de la madre/25.jpg',
    'images/día de la madre/26.jpg',
    'images/día de la madre/27.jpg',
    'images/día de la madre/28.jpg',
    'images/día de la madre/29.jpg',
    'images/día de la madre/30.jpg',
    'images/día de la madre/31.jpg',
    'images/día de la madre/32.jpg',
    'images/día de la madre/33.jpg',
    'images/día de la madre/34.jpg',
    'images/día de la madre/35.jpg',
    'images/día de la madre/36.jpg',
    'images/día de la madre/37.jpg',
    'images/día de la madre/38.jpg',
    'images/día de la madre/39.jpg',
    'images/día de la madre/40.jpg',
    'images/día de la madre/41.jpg',
    'images/día de la madre/42.jpg',
    'images/día de la madre/43.jpg',
    'images/día de la madre/44.jpg',
    'images/día de la madre/45.jpg',
    'images/día de la madre/46.jpg',
    'images/día de la madre/47.jpg',
    'images/día de la madre/48.jpg',
    'images/día de la madre/49.jpg',
    'images/día de la madre/50.jpg',
    'images/día de la madre/51.jpg',
    'images/día de la madre/52.jpg',
    'images/día de la madre/53.jpg',
    'images/día de la madre/54.jpg',
    'images/día de la madre/55.jpg',
    'images/día de la madre/56.jpg',
    'images/día de la madre/57.jpg',
    'images/día de la madre/58.jpg',
    'images/día de la madre/59.jpg',
    'images/día de la madre/60.jpg',
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