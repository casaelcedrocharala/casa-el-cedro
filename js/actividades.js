function changeSlide(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    const slides = slider.getElementsByClassName('act-slide');
    let activeIndex = 0;

    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {
            activeIndex = i;
            slides[i].classList.remove('active');
            break;
        }
    }

    let newIndex = activeIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    slides[newIndex].classList.add('active');
}


async function changeLanguage(lang) {
    try {
        // Detectar qué archivo JSON cargar según la página actual
        const pageJson = document.body.getAttribute('data-page-json') || 'actividades-detalle.json';
        
        // Ajustar ruta: si el HTML está en una subcarpeta, sube un nivel para buscar la carpeta /json
        const response = await fetch(`../json/${pageJson}`);
        const translations = await response.json();
        const texts = translations[lang];

        // 1. Traducir el MENÚ
        if (texts.menu) {
            Object.keys(texts.menu).forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = texts.menu[id];
            });
        }

        // 2. Traducir CONTENIDO (IDs dinámicos)
        Object.keys(texts).forEach(key => {
            // Dentro de Object.keys(texts).forEach(key => { ... })
            if (key === 'meta-title') {
                document.title = texts[key];
            }
            if (key === 'meta-desc') {
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) metaDescription.setAttribute('content', texts[key]);
            }

            if (key !== 'menu') {
                const el = document.getElementById(key);
                if (el) el.textContent = texts[key];
            }
        });

        localStorage.setItem('preferredLang', lang);
        document.getElementById('current-lang').innerText = lang.toUpperCase();

    } catch (error) {
        console.error("Error cargando traducción de subpágina:", error);
    }
}


// Cargar idioma guardado al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    changeLanguage(savedLang);
});
