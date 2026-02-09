// Array SOLO con las imágenes que EXISTEN en tu carpeta
const imageSources = [
    'images/Concurso de disfraces/1.jpg',
    'images/Concurso de disfraces/2.jpg',
    'images/Concurso de disfraces/3.jpg',
    'images/Concurso de disfraces/4.jpg', 
    'images/Concurso de disfraces/5.jpg',
    'images/Concurso de disfraces/6.jpg', 
    'images/Concurso de disfraces/7.jpg',
    'images/Concurso de disfraces/8.jpg',
    'images/Concurso de disfraces/9.jpg',
    'images/Concurso de disfraces/10.jpg',
    'images/Concurso de disfraces/11.jpg',
    'images/Concurso de disfraces/12.jpg',
    'images/Concurso de disfraces/13.jpg',
    'images/Concurso de disfraces/14.jpg',
    'images/Concurso de disfraces/15.jpg',
    'images/Concurso de disfraces/16.jpg',
    'images/Concurso de disfraces/17.jpg',
    'images/Concurso de disfraces/18.jpg',
    'images/Concurso de disfraces/19.jpg',
    'images/Concurso de disfraces/20.jpg',
    'images/Concurso de disfraces/21.jpg',  
    'images/Concurso de disfraces/22.jpg',
    'images/Concurso de disfraces/23.jpg',
    'images/Concurso de disfraces/24.jpg',
    'images/Concurso de disfraces/25.jpg',
    'images/Concurso de disfraces/26.jpg',
    'images/Concurso de disfraces/27.jpg',
    'images/Concurso de disfraces/28.jpg',
    'images/Concurso de disfraces/29.jpg',
    'images/Concurso de disfraces/30.jpg',
    'images/Concurso de disfraces/31.jpg',
    'images/Concurso de disfraces/32.jpg',
    'images/Concurso de disfraces/33.jpg',
    'images/Concurso de disfraces/34.jpg',
    'images/Concurso de disfraces/35.jpg',
    'images/Concurso de disfraces/36.jpg',
    'images/Concurso de disfraces/37.jpg',
    'images/Concurso de disfraces/38.jpg',
    'images/Concurso de disfraces/39.jpg',
    'images/Concurso de disfraces/40.jpg',
    'images/Concurso de disfraces/41.jpg',
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