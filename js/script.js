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
        body.innerHTML = "<section class="politica-privacidad"><h1>Política de Privacidad</h1><p>En <strong>Casa El Cedro</strong>, valoramos tu privacidad. Esta política explica cómo manejamos la información que nos proporcionas a través de nuestro formulario de contacto.</p><h2>1. Responsable del Tratamiento</h2><p>El responsable del tratamiento de tus datos es Casa El Cedro, ubicada en Charalá, Santander. Puedes contactarnos para cualquier duda sobre tus datos a través de nuestro correo electrónico oficial.</p><h2>2. Datos que recolectamos</h2><p>A través de nuestro formulario de contacto, solicitamos únicamente:</p><ul><li>Nombre.</li><li>Correo electrónico.</li><li>Mensaje (contenido de tu consulta).</li></ul><h2>3. Finalidad del tratamiento</h2><p>Los datos que nos envías se utilizan exclusivamente para:</p><ul><li>Responder a tus dudas, solicitudes de información o comentarios.</li><li>Gestionar pre-reservas o consultas relacionadas con nuestros servicios de hospedaje.</li></ul><p>No utilizamos tus datos para enviar publicidad masiva (spam) ni los compartimos con terceros con fines comerciales.</p><h2>4. Almacenamiento y Seguridad</h2><p>La información llega directamente a nuestra cuenta de correo electrónico institucional y se maneja con total confidencialidad. No almacenamos tus datos en bases de datos públicas ni los vendemos a ninguna otra entidad.</p><h2>5. Tus Derechos (Derechos ARCO)</h2><p>Como titular de tus datos, tienes derecho a conocer, actualizar y rectificar tu información. Si deseas que eliminemos tu correo de nuestra bandeja de entrada o quieres actualizar tus datos, solo debes escribirnos al mismo correo de contacto y procesaremos tu solicitud de inmediato.</p><h2>6. Aceptación</h2><p>Al hacer clic en "Enviar" en nuestro formulario, manifiestas que has leído y aceptas el tratamiento de tus datos bajo estas condiciones.</p></section>";
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


