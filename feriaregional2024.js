// Array SOLO con las imágenes que EXISTEN en tu carpeta
const imageSources = [
    'images/fería regional/1.jpg',
    'images/fería regional/2.jpg',
    'images/fería regional/3.jpg',
    'images/fería regional/4.jpg',
    'images/fería regional/5.jpg',
    'images/fería regional/6.jpg',
    'images/fería regional/7.jpg',
    'images/fería regional/8.jpg',
    'images/fería regional/9.jpg',
    'images/fería regional/10.jpg',
    'images/fería regional/11.jpg',
    'images/fería regional/12.jpg',
    'images/fería regional/13.jpg',
    'images/fería regional/14.jpg',
    'images/fería regional/15.jpg',
    'images/fería regional/16.jpg',
    'images/fería regional/17.jpg',
    'images/fería regional/18.jpg',
    'images/fería regional/19.jpg',
    'images/fería regional/20.jpg',
    'images/fería regional/21.jpg',
    'images/fería regional/22.jpg',
    'images/fería regional/23.jpg',
    'images/fería regional/24.jpg',
    'images/fería regional/25.jpg',
    'images/fería regional/26.jpg',
    'images/fería regional/27.jpg',
    'images/fería regional/28.jpg',
    'images/fería regional/29.jpg',
    'images/fería regional/30.jpg',
    'images/fería regional/31.jpg',
    'images/fería regional/32.jpg',
    'images/fería regional/33.jpg',
    'images/fería regional/34.jpg',
    'images/fería regional/35.jpg',
    'images/fería regional/36.jpg',
    'images/fería regional/37.jpg',
    'images/fería regional/38.jpg',
    'images/fería regional/39.jpg',
    'images/fería regional/40.jpg',
    'images/fería regional/41.jpg',
    'images/fería regional/42.jpg',
    'images/fería regional/43.jpg',
    'images/fería regional/44.jpg',
    'images/fería regional/45.jpg',
    'images/fería regional/46.jpg',
    'images/fería regional/47.jpg',
    'images/fería regional/48.jpg',
    'images/fería regional/49.jpg',
    'images/fería regional/50.jpg',
    'images/fería regional/51.jpg',
    'images/fería regional/52.jpg',
    'images/fería regional/53.jpg',
    'images/fería regional/54.jpg',
    'images/fería regional/55.jpg',
    'images/fería regional/56.jpg',
    'images/fería regional/57.jpg',
    'images/fería regional/58.jpg',
    'images/fería regional/59.jpg',
    'images/fería regional/60.jpg',
    'images/fería regional/61.jpg',
    'images/fería regional/62.jpg',
    'images/fería regional/63.jpg',
    'images/fería regional/64.jpg',
    'images/fería regional/65.jpg',
    'images/fería regional/66.jpg',
    'images/fería regional/67.jpg',
    'images/fería regional/68.jpg',
    'images/fería regional/69.jpg',
    'images/fería regional/70.jpg',
    'images/fería regional/71.jpg',
    'images/fería regional/72.jpg',
    'images/fería regional/73.jpg',
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