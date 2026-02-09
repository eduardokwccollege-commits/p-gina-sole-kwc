// Array SOLO con las imágenes que EXISTEN en tu carpeta
const imageSources = [
    'images/iniciodeclases/1.jpg',
    'images/iniciodeclases/2.jpg',
    'images/iniciodeclases/3.jpg',
    'images/iniciodeclases/4.jpg',
    'images/iniciodeclases/5.jpg',
    'images/iniciodeclases/6.jpg',
    'images/iniciodeclases/7.jpg',
    'images/iniciodeclases/8.jpg',
    'images/iniciodeclases/9.jpg',
    'images/iniciodeclases/10.jpg',
    'images/iniciodeclases/11.jpg',
    'images/iniciodeclases/12.jpg',
    'images/iniciodeclases/13.jpg',
    'images/iniciodeclases/14.jpg',
    'images/iniciodeclases/15.jpg',
    'images/iniciodeclases/16.jpg',
    'images/iniciodeclases/17.jpg',
    'images/iniciodeclases/18.jpg',
    'images/iniciodeclases/19.jpg',
    'images/iniciodeclases/20.jpg',
    'images/iniciodeclases/21.jpg',
    'images/iniciodeclases/22.jpg',
    'images/iniciodeclases/23.jpg',
    'images/iniciodeclases/24.jpg',
    'images/iniciodeclases/25.jpg',
    'images/iniciodeclases/26.jpg',
    'images/iniciodeclases/27.jpg',
    'images/iniciodeclases/28.jpg',
    'images/iniciodeclases/29.jpg',
    'images/iniciodeclases/30.jpg',
    'images/iniciodeclases/31.jpg',
    'images/iniciodeclases/32.jpg',
    'images/iniciodeclases/33.jpg',
    'images/iniciodeclases/34.jpg',
    'images/iniciodeclases/35.jpg',
    'images/iniciodeclases/36.jpg',
    'images/iniciodeclases/37.jpg',
    'images/iniciodeclases/38.jpg',
    'images/iniciodeclases/39.jpg',
    'images/iniciodeclases/40.jpg',
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