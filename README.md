# 🎡 Carrusel 3D - Mockup de Móviles

Un carrusel 3D completo y profesional creado con **HTML, CSS y JavaScript puro** sin dependencias externas.

## ✨ Características

### Estructura 3D
- ✅ Contenedor con perspectiva 3D real
- ✅ Orbit (órbita) rotatorio con `transform-style: preserve-3d`
- ✅ Tarjetas posicionadas en 3D con `rotateY()` y `translateZ()`
- ✅ Efecto billboard: tarjetas siempre frontales visualmente
- ✅ Profundidad real, sin simplificaciones

### Comportamiento
- ✅ Rotación suave con easing `cubic-bezier(0.34, 1.56, 0.64, 1)`
- ✅ Bloqueo de animación durante transiciones
- ✅ Estados visuales: front (opaco), side (semi-visible), back (oculto)

### Controles
- ✅ Botones Prev/Next
- ✅ Indicadores inferiores clickeables
- ✅ Teclado: `← →` para navegar, `Espacio` para autoplay
- ✅ Gestos táctiles: swipe izquierda/derecha
- ✅ Reproducción automática pausable

### Diseño
- ✅ Mockup de móvil realista con notch y marco
- ✅ Videos que se reproducen en cada tarjeta
- ✅ Diseño moderno con sombras y bordes redondeados
- ✅ Totalmente responsive con `clamp()`
- ✅ Soporte para tema oscuro

## 🚀 Inicio Rápido

### Instalación
1. Descarga los tres archivos en una carpeta:
   - `index.html`
   - `styles.css`
   - `carousel.js`

2. Abre `index.html` en tu navegador

### Estructura de Archivos
```
3dcarousel/
├── index.html      # Estructura HTML
├── styles.css      # Estilos CSS y transformaciones 3D
├── carousel.js     # Lógica JavaScript
└── README.md       # Esta documentación
```

## 📱 Cómo Funciona

### HTML (`index.html`)
```html
<div class="carousel-container">
    <!-- Perspectiva 3D -->
    <div class="carousel-stage">
        <!-- Contenedor rotatorio -->
        <div class="carousel-orbit" id="carouselOrbit">
            <!-- Tarjetas se insertan aquí dinámicamente -->
        </div>
    </div>
    
    <!-- Controles: botones, indicadores, info -->
</div>
```

### CSS (`styles.css`)

#### Perspectiva y Transforms
```css
/* Contenedor principal con perspectiva */
.carousel-container {
    perspective: 1200px;
}

/* Orbit rotatorio con preserve-3d */
.carousel-orbit {
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Tarjetas posicionadas en 3D */
.carousel-card {
    transform: rotateY(60deg) translateZ(500px);
    /* El ángulo y profundidad se calculan dinámicamente */
}
```

#### Estados Visuales
```css
/* Tarjeta frontal */
.carousel-card.front {
    opacity: 1;
    filter: blur(0px);
}

/* Tarjeta lateral */
.carousel-card.side {
    opacity: 0.5;
    filter: blur(2px);
}

/* Tarjeta trasera */
.carousel-card.back {
    opacity: 0;
    filter: blur(8px);
    pointer-events: none;
}
```

#### Mockup de Móvil
```css
.mobile-mockup {
    border-radius: clamp(20px, 5vw, 40px);
    background: #000;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.mobile-notch {
    /* Notch dinámico con clamp() */
    width: clamp(120px, 35%, 180px);
    height: clamp(20px, 5%, 30px);
}

.mobile-screen {
    /* Pantalla que contiene el video */
    overflow: hidden;
    background: #000;
}
```

### JavaScript (`carousel.js`)

#### Clase Principal
```javascript
class Carousel3D {
    constructor() {
        this.currentIndex = 0;
        this.totalSlides = carouselData.length;
        this.isAnimating = false;
        this.autoplayInterval = null;
        // ...
    }
}
```

#### Generación Dinámica
```javascript
generateCards() {
    const anglePerCard = 360 / this.totalSlides;
    carouselData.forEach((item, index) => {
        const angle = anglePerCard * index;
        const radius = 500;
        // Crear elemento y aplicar transform 3D
        cardElement.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
}
```

#### Cálculo de Estados
```javascript
updateCardStates() {
    const anglePerCard = 360 / this.totalSlides;
    
    carouselData.forEach((_, index) => {
        // Calcular ángulo relativo al slide actual
        let relativeAngle = (index - this.currentIndex) * anglePerCard;
        
        // Normalizar a -180 a 180
        while (relativeAngle > 180) relativeAngle -= 360;
        while (relativeAngle < -180) relativeAngle += 360;
        
        // Asignar clase según proximidad
        const absDifference = Math.abs(relativeAngle);
        if (absDifference < anglePerCard / 2) {
            cardElement.classList.add('front');
        } else if (absDifference < anglePerCard * 1.5) {
            cardElement.classList.add('side');
        } else {
            cardElement.classList.add('back');
        }
    });
}
```

## ⌨️ Controles

| Control | Acción |
|---------|--------|
| **← →** | Navegar anterior/siguiente |
| **Click botones** | Prev/Next |
| **Click indicadores** | Ir a slide específica |
| **Swipe** | Deslizar izq/der |
| **Espacio** | Toggle autoplay |
| **Autoplay btn** | Iniciar reproducción automática |

## 🎨 Personalización

### Cambiar Datos
Edita el array `carouselData` en `carousel.js`:

```javascript
const carouselData = [
    {
        id: 1,
        title: 'Mi Slide',
        video: 'https://mi-video.mp4'
    },
    // ... más slides
];
```

### Ajustar Velocidad
En `carousel.js`, cambia el intervalo de autoplay:
```javascript
setInterval(() => {
    this.nextSlide();
}, 5000); // Cambiar este valor (milisegundos)
```

En `styles.css`, cambia la duración de la transición:
```css
.carousel-orbit {
    transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    /* Cambiar 0.8s a otro valor */
}
```

### Ajustar Profundidad
En `carousel.js`, cambia el radio de la órbita:
```javascript
const radius = 500; // Aumentar para más profundidad
```

### Cambiar Colores
En `styles.css`:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Cambiar gradiente */
}

.carousel-btn {
    background: rgba(255, 255, 255, 0.15);
    /* Cambiar transparencia/color */
}
```

## 📊 Datos Dinámicos

### Fuente: Array JavaScript
```javascript
const carouselData = [
    { id, title, video },
    // ...
];
```

### Conectar API
Para usar datos de un servidor:

```javascript
async function loadCarouselData() {
    const response = await fetch('https://api.ejemplo.com/slides');
    return await response.json();
}

// En init():
carouselData = await loadCarouselData();
this.totalSlides = carouselData.length;
```

## 🎯 Características Técnicas

### Transformaciones 3D
- `perspective`: Crea el efecto de profundidad
- `transform-style: preserve-3d`: Mantiene la profundidad en hijos
- `rotateY()`: Rotación alrededor del eje Y
- `translateZ()`: Posición en profundidad

### Easing
- `cubic-bezier(0.34, 1.56, 0.64, 1)`: Easing elegante con bounce sutil

### Responsive
- `clamp()`: Escalado automático según viewport
- Media queries: Ajustes por tamaño de pantalla
- Touch-friendly: Botones y gestos optimizados

## 🔧 API JavaScript

### Métodos Disponibles

```javascript
// Acceder al carrusel desde consola
window.carousel

// Navegar
carousel.nextSlide()
carousel.prevSlide()
carousel.goToSlide(index)

// Autoplay
carousel.startAutoplay()
carousel.stopAutoplay()
carousel.toggleAutoplay()

// Info
carousel.getCarouselInfo()
carousel.jumpToSlide(1) // Ir a slide 1
```

### Propiedades

```javascript
carousel.currentIndex        // Índice actual (0-based)
carousel.totalSlides         // Total de slides
carousel.isAnimating         // ¿Está animando?
carousel.isAutoplayActive    // ¿Autoplay activo?
```

## 🐛 Console Logging

El carrusel registra eventos en la consola del navegador:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🎡 CARRUSEL 3D - Inicializando...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Carrusel 3D inicializado con 6 tarjetas
✓ Tarjetas generadas: 6
✓ Indicadores generados: 6
✓ Event listeners configurados
✓ Estados de tarjetas actualizados - Slide actual: 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ Carrusel listo
  ⌨️ Controles: ← → flechas | Espacio: autoplay
  👆 Swipe en dispositivos táctiles
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🌐 Compatibilidad

| Navegador | Soporte |
|-----------|---------|
| Chrome | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Edge | ✅ 90+ |
| iOS Safari | ✅ 14+ |
| Chrome Android | ✅ 90+ |

## ⚙️ Restricciones Respetadas

✅ **No usa frameworks** - JavaScript vanilla puro  
✅ **No usa librerías** - Sin jQuery, Three.js, etc.  
✅ **No usa canvas/WebGL** - CSS 3D transforms puro  
✅ **Mantiene profundidad real** - No simplificado  
✅ **Efecto billboard** - Tarjetas siempre frontales  

## 🎬 Videos

### URLs Usadas por Defecto
El carrusel incluye 6 videos de ejemplo de Pexels. Para cambiar:

```javascript
const carouselData = [
    {
        id: 1,
        title: 'Mi Video',
        video: 'https://tu-dominio.com/video.mp4'
    },
    // ...
];
```

**Requisitos del video:**
- Formato: MP4, WebM
- Codificadores: H.264, VP9
- Resolución: Recomendado 640x360 o superior
- Atributo `crossorigin`: Puede requerirse para CORS

## 🚨 Solución de Problemas

### Videos no cargan
- Verifica la URL del video
- Comprueba CORS si es desde otro dominio
- Usa video local si es posible

### Carrusel no rota
- Abre DevTools (F12) y busca errores en Console
- Verifica que JavaScript esté habilitado
- Prueba en navegador moderno

### Rendimiento lento
- Reduce el tamaño de videos
- Aumenta el intervalo de autoplay
- Ajusta el blur filter en CSS

### Responsive no funciona
- Verifica soporte de `clamp()` (navegadores modernos)
- Fallback a media queries si es necesario

## 📖 Documentación Adicional

### CSS Transforms 3D
- [MDN: CSS Transforms](https://developer.mozilla.org/es/docs/Web/CSS/transform)
- [MDN: perspective](https://developer.mozilla.org/es/docs/Web/CSS/perspective)

### Eventos Táctiles
- [MDN: Touch Events](https://developer.mozilla.org/es/docs/Web/API/Touch_events)

### HTML5 Video
- [MDN: Video elemento](https://developer.mozilla.org/es/docs/Web/HTML/Element/video)

## 📝 Licencia

Este código es de uso libre. Puedes modificarlo y distribuirlo como desees.

## 🎨 Créditos

Diseño y desarrollo: Carrusel 3D  
Videos: Pexels (Libre de derechos)

---

**¿Preguntas o sugerencias?** El código está completamente comentado y modular. Siéntete libre de modificar según tus necesidades.
