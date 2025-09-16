// Carrusel
const carousel = document.querySelector('.carrusel');
const track = carousel.querySelector('.carousel-track');
const images = Array.from(track.children);
const prevButton = carousel.querySelector('.carousel-button.prev');
const nextButton = carousel.querySelector('.carousel-button.next');

let currentIndex = 0;
let autoSlideInterval;

function updateCarousel() {
    // Se usa clientWidth en lugar de getBoundingClientRect().width para evitar problemas de compatibilidad
    const imageWidth = images[0].clientWidth; 
    track.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
}

function goToNextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}

nextButton.addEventListener('click', () => {
    goToNextSlide();
    resetAutoSlide();
});

prevButton.addEventListener('click', () => {
    goToPrevSlide();
    resetAutoSlide();
});

function startAutoSlide() {
    autoSlideInterval = setInterval(goToNextSlide, 3000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

window.addEventListener('resize', updateCarousel);

// Se asegura de que el carrusel se inicialice y el auto-slide comience
window.onload = function() {
    updateCarousel();
    startAutoSlide();
};

// Menú hamburguesa funcional (el HTML para este menú no está en tu código, pero el JS es funcional)
const btnHamburguesa = document.getElementById("btnHamburguesa");
const menu = document.getElementById("menu");

if(btnHamburguesa && menu) {
    btnHamburguesa.addEventListener("click", () => {
        menu.classList.toggle("show");
    });
}
