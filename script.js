
const cards = [
    {
        title: "E-Commerce App",
        videoUrl: "https://example.com/videos/demo1.mp4",
        url: "https://example.com/demo1"
    },
    {
        title: "Fitness Tracker",
        videoUrl: "https://example.com/videos/demo2.mp4",
        url: "https://example.com/demo2"
    },
    {
        title: "Social Network",
        videoUrl: "https://example.com/videos/demo3.mp4",
        url: "https://example.com/demo3"
    },
    {
        title: "Food Delivery",
        videoUrl: "https://example.com/videos/demo4.mp4",
        url: "https://example.com/demo4"
    }
];

let currentRotation = 0;
let currentIndex = 0;
let isAnimating = false;
const orbit = document.getElementById('carouselOrbit');
const indicatorsContainer = document.getElementById('indicators');
const rotationStep = 90; // 360 / 4 tarjetas

// Crear las tarjetas
function createCards() {
    cards.forEach((card, index) => {
        const mobileCard = document.createElement('div');
        mobileCard.className = 'mobile-card';
        mobileCard.dataset.index = index;
        mobileCard.innerHTML = `
                    <div class="mobile-frame">
                        <div class="mobile-notch"></div>
                        <div class="mobile-screen">
                            <div class="video-container">
                                <video autoplay loop muted playsinline>
                                    <source src="${card.videoUrl}" type="video/mp4">
                                </video>
                            </div>
                        </div>
                    </div>
                    <div class="card-label">${card.title}</div>
                `;

        mobileCard.addEventListener('click', () => {
            if (mobileCard.classList.contains('front')) {
                window.open(card.url, '_blank');
            }
        });

        orbit.appendChild(mobileCard);

        // Crear indicadores
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    updateVisibility();
    updateIndicators();
}

// Actualizar visibilidad de las tarjetas según rotación
function updateVisibility() {
    const mobileCards = document.querySelectorAll('.mobile-card');
    const normalizedRotation = ((currentRotation % 360) + 360) % 360;

    mobileCards.forEach((card, index) => {
        const cardAngle = (index * rotationStep) % 360;
        const relativeAngle = ((cardAngle - normalizedRotation) % 360 + 360) % 360;

        card.classList.remove('front', 'side', 'back');

        if (relativeAngle < 45 || relativeAngle > 315) {
            card.classList.add('front');
        } else if (relativeAngle >= 45 && relativeAngle <= 135) {
            card.classList.add('side');
        } else if (relativeAngle >= 225 && relativeAngle <= 315) {
            card.classList.add('side');
        } else {
            card.classList.add('back');
        }
    });
}

// Actualizar indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Rotar el carrusel
function rotateCarousel() {
    orbit.style.transform = `rotateY(${-currentRotation}deg)`;
    updateVisibility();
    updateIndicators();
}

// Navegación hacia adelante
function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;

    currentRotation += rotationStep;
    currentIndex = (currentIndex + 1) % cards.length;
    rotateCarousel();

    setTimeout(() => {
        isAnimating = false;
    }, 1200);
}

// Navegación hacia atrás
function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;

    currentRotation -= rotationStep;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    rotateCarousel();

    setTimeout(() => {
        isAnimating = false;
    }, 1200);
}

// Ir a una diapositiva específica
function goToSlide(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;

    const diff = index - currentIndex;
    const shortestPath = diff > cards.length / 2 ? diff - cards.length :
        diff < -cards.length / 2 ? diff + cards.length : diff;

    currentRotation += shortestPath * rotationStep;
    currentIndex = index;
    rotateCarousel();

    setTimeout(() => {
        isAnimating = false;
    }, 1200);
}

// Event listeners
document.getElementById('nextBtn').addEventListener('click', () => {
    clearInterval(autoRotateInterval);
    nextSlide();
    startAutoRotate();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    clearInterval(autoRotateInterval);
    prevSlide();
    startAutoRotate();
});

// Rotación automática continua y suave
let autoRotateInterval;

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        nextSlide();
    }, 3500);
}

// Soporte para teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        clearInterval(autoRotateInterval);
        prevSlide();
        startAutoRotate();
    }
    if (e.key === 'ArrowRight') {
        clearInterval(autoRotateInterval);
        nextSlide();
        startAutoRotate();
    }
});

// Soporte para gestos táctiles
let touchStartX = 0;
let touchEndX = 0;

orbit.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

orbit.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        clearInterval(autoRotateInterval);
        nextSlide();
        startAutoRotate();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        clearInterval(autoRotateInterval);
        prevSlide();
        startAutoRotate();
    }
}

// Inicializar
createCards();
startAutoRotate();
