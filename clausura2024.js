// Array SOLO con las imágenes que EXISTEN en tu carpeta
const imageSources = [
    'images/clausura 2024 kwc/1.jpg',
    'images/clausura 2024 kwc/2.jpg',
    'images/clausura 2024 kwc/3.jpg',
    'images/clausura 2024 kwc/4.jpg',
    'images/clausura 2024 kwc/5.jpg',
    'images/clausura 2024 kwc/6.jpg',
    'images/clausura 2024 kwc/7.jpg',
    'images/clausura 2024 kwc/8.jpg',
    'images/clausura 2024 kwc/9.jpg',
    'images/clausura 2024 kwc/10.jpg',
    'images/clausura 2024 kwc/11.jpg',
    'images/clausura 2024 kwc/12.jpg',
    'images/clausura 2024 kwc/13.jpg',
    'images/clausura 2024 kwc/14.jpg',
    'images/clausura 2024 kwc/15.jpg',
    'images/clausura 2024 kwc/16.jpg',
    'images/clausura 2024 kwc/17.jpg',
    'images/clausura 2024 kwc/18.jpg',
    'images/clausura 2024 kwc/19.jpg',
    'images/clausura 2024 kwc/20.jpg',
    'images/clausura 2024 kwc/21.jpg',
    'images/clausura 2024 kwc/22.jpg',
    'images/clausura 2024 kwc/23.jpg',
    'images/clausura 2024 kwc/24.jpg',
    'images/clausura 2024 kwc/25.jpg',
    'images/clausura 2024 kwc/26.jpg',
    'images/clausura 2024 kwc/27.jpg',
    'images/clausura 2024 kwc/28.jpg',
    'images/clausura 2024 kwc/29.jpg',
    'images/clausura 2024 kwc/30.jpg',
    'images/clausura 2024 kwc/31.jpg',
    'images/clausura 2024 kwc/32.jpg',
    'images/clausura 2024 kwc/33.jpg',
    'images/clausura 2024 kwc/34.jpg',
    'images/clausura 2024 kwc/35.jpg',
    'images/clausura 2024 kwc/36.jpg',
    'images/clausura 2024 kwc/37.jpg',
    'images/clausura 2024 kwc/38.jpg',
    'images/clausura 2024 kwc/39.jpg',
    'images/clausura 2024 kwc/40.jpg',
    'images/clausura 2024 kwc/41.jpg',
    'images/clausura 2024 kwc/42.jpg',
    'images/clausura 2024 kwc/43.jpg',
    'images/clausura 2024 kwc/44.jpg',
    'images/clausura 2024 kwc/45.jpg',
    'images/clausura 2024 kwc/46.jpg',
    'images/clausura 2024 kwc/47.jpg',
    'images/clausura 2024 kwc/48.jpg',
    'images/clausura 2024 kwc/49.jpg',
    'images/clausura 2024 kwc/50.jpg',
    'images/clausura 2024 kwc/51.jpg',
    'images/clausura 2024 kwc/52.jpg',
    'images/clausura 2024 kwc/53.jpg',
    'images/clausura 2024 kwc/54.jpg',
    'images/clausura 2024 kwc/55.jpg',
    'images/clausura 2024 kwc/56.jpg',
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