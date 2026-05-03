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
        const pageJson = document.body.getAttribute('data-page-json') || 'actividades-detalle.json';
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
            if (key === 'meta-title') {
                document.title = texts[key];
            }
            if (key === 'meta-desc') {
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) metaDescription.setAttribute('content', texts[key]);
            }

            // Añadimos: && key !== 'common' para que no falle al leer el objeto de los botones
            if (key !== 'menu' && key !== 'common') {
                const el = document.getElementById(key);
                if (el) el.textContent = texts[key];
            }
        });

        // 3. Traducir elementos por CLASE (Usando el objeto 'common')
        if (texts.common) {
            Object.keys(texts.common).forEach(className => {
                const selector = '.' + className.split(' ').join('.');
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.textContent = texts.common[className];
                });
            });
        }

        localStorage.setItem('preferredLang', lang);
        // Actualizar el indicador visual del selector de idioma
        const langDisplay = document.getElementById('current-lang');
        if (langDisplay) langDisplay.innerText = lang.toUpperCase();

    } catch (error) {
        console.error("Error cargando traducción:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    changeLanguage(savedLang);
});
