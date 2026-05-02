// --- 1. LÓGICA DE IDIOMAS ---
async function changeLanguage(lang) {
    try {
        const response = await fetch('json/translations.json');
        const translations = await response.json();
        if (!translations[lang]) return;

        Object.keys(translations[lang]).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = translations[lang][id];
            }
        });

        const currentLangElem = document.getElementById('current-lang');
        if (currentLangElem) currentLangElem.textContent = lang.toUpperCase();
        localStorage.setItem('preferredLang', lang);
    } catch (error) {
        console.warn("Error con idiomas:", error);
    }
}

// --- 2. LÓGICA DEL SLIDER (Tus funciones de Palo de Agua) ---
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    
    if (slides.length === 0) return; // Si no hay fotos, no hace nada

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
        slide.style.display = (i === currentSlide) ? "block" : "none";
    });
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

// --- 3. INICIALIZACIÓN ÚNICA ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. EJECUTAR IDIOMAS
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    changeLanguage(savedLang);

    // 2. LÓGICA DEL MENÚ RESPONSIVE (Asegurada)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            console.log("Menú clickeado, clase active:", mainNav.classList.contains('active'));
        });
    }

    // 3. EJECUTAR SLIDER
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
        showSlide(0); 
        setInterval(() => moveSlide(1), 5000);
    }

    // 4. EJECUTAR MAPA
    const mapContainer = document.getElementById('map');
    if (mapContainer && typeof L !== 'undefined') {
        var map = L.map('map').setView([6.23072, -73.17116], 12); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        var marker = L.marker([6.23072, -73.17116]).addTo(map);
        marker.bindPopup("<b>🏨 Hotel Casa El Cedro</b><br>🌿Charalá, Santander.").openPopup();
    }
});

const modal = document.getElementById("modal-legal");
const btnOk = document.getElementById("modal-ok");
const btnClose = document.querySelector(".close-modal");

function openLegal(tipo) {
    const title = document.getElementById("modal-title");
    const body = document.getElementById("modal-body");

    if (tipo === 'privacidad') {
        title.innerText = "Política de Privacidad";
        body.innerHTML = "<p>En Casa El Cedro protegemos tus datos... (tu texto aquí)</p>";
    } else {
        title.innerText = "Términos y Condiciones";
        body.innerHTML = "<p>Al reservar con nosotros aceptas... (tu texto aquí)</p>";
    }
    modal.style.display = "block";
}

// Cerrar al dar OK, en la X o fuera de la ventana
btnOk.onclick = () => modal.style.display = "none";
btnClose.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }


