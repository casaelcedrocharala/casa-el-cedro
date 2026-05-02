// 1. OBJETO CON LA CONFIGURACIÓN DE TODOS TUS MAPAS
const configuracionMapas = {
    'juan-curi': {
        containerId: 'map-juan-curi',
        centro: [6.2956, -73.1365],
        zoom: 12,
        geojson: '../data/ruta-juan-curi.geojson',
        color: '#9003FF',
        marcadores: [
            { latlng: [6.23072, -73.17116], texto: '<b>🏨 Hotel Casa El Cedro</b>' },
            { latlng: [6.3715, -73.1647], texto: '<b>🧗 Parque Juan Curi</b>' }
        ]
    },
    'laguna-grande': {
        containerId: 'map-laguna-grande',
        centro: [6.0503, -73.17116],
        zoom: 13,
        geojson: '../data/ruta-laguna-grande.geojson',
        color: '#9003FF',
        marcadores: [
            { latlng: [6.23072, -73.17116], texto: '<b>🏨 Hotel Casa El Cedro</b>' },
            { latlng: [6.05025, -72.97128], texto: '<b>🏞️ Laguna grande</b>' }
        ]
    },
    'pozo-zaque': {
        containerId: 'map-pozo-zaque',
        centro: [6.0503, -73.17116],
        zoom: 13,
        geojson: '../data/ruta-pozo-zaque.geojson',
        color: '#9003FF',
        marcadores: [
            { latlng: [6.23072, -73.17116], texto: '<b>🏨 Hotel Casa El Cedro</b>' },
            { latlng: [6.21182, -73.17935], texto: '<b>🏞️ pozo-zaque</b>' }
        ]
    },
    'laguna-azul': {
        containerId: 'map-laguna-azul',
        centro: [6.0503, -73.17116],
        zoom: 14,
        geojson: '../data/ruta-laguna-azul.geojson',
        color: '#9003FF',
        marcadores: [
            { latlng: [6.23072, -73.17116], texto: '<b>🏨 Hotel Casa El Cedro</b>' },
            { latlng: [6.17086, -73.06722], texto: '<b>🏞️ Laguna azul</b>' }
        ]
    },
    'cascada-escondida': {
        containerId: 'map-cascada-escondida',
        centro: [6.0503, -73.17116],
        zoom: 12,
        geojson: '../data/ruta-cascada-escondida.geojson',
        color: '#9003FF',
        marcadores: [
            { latlng: [6.23072, -73.17116], texto: '<b>🏨 Hotel Casa El Cedro</b>' },
            { latlng: [6.24251, -73.17448], texto: '<b>🏞️ Cascada Escondida</b>' }
        ]
    },
    'calle-de-piedra': {
        containerId: 'map-calle-de-piedra',
        centro: [6.0503, -73.17116],
        zoom: 12,
        geojson: '../data/ruta-calle-de-piedra.geojson',
        color: '#9003FF',
        marcadores: [
            { latlng: [6.23072, -73.17116], texto: '<b>🏨 Hotel Casa El Cedro</b>' },
            { latlng: [6.25536, -73.17510], texto: '<b>🏞️ Calle de Piedra</b>' }
        ]
    },
    'pozo-lajas': {
        containerId: 'map-pozo-lajas',
        centro: [6.0503, -73.17116],
        zoom: 12,
        geojson: '../data/ruta-pozo-lajas.geojson',
        color: '#9003FF',
        marcadores: [
            { latlng: [6.23072, -73.17116], texto: '<b>🏨 Hotel Casa El Cedro</b>' },
            { latlng: [6.27598, -73.16313], texto: '<b>🏞️ Pozo Lajas</b>' }
        ]
    },
    'pozo-paraiso': {
        containerId: 'map-pozo-paraiso',
        centro: [6.0503, -73.17116],
        zoom: 16,
        geojson: '../data/ruta-pozo-paraiso.geojson',
        color: '#9003FF',
        marcadores: [
            { latlng: [6.23072, -73.17116], texto: '<b>🏨 Hotel Casa El Cedro</b>' },
            { latlng: [6.20061, -73.18429], texto: '<b>🏞️ Pozo Paraiso</b>' }
        ]
    },
    'la-variante': {
        containerId: 'map-la-variante',
        centro: [6.0503, -73.17116],
        zoom: 16,
        geojson: '../data/ruta-la-variante.geojson',
        color: '#9003FF',
        marcadores: [
            { latlng: [6.23072, -73.17116], texto: '<b>🏨 Hotel Casa El Cedro</b>' },
            { latlng: [6.11449, -73.07599], texto: '<b>🏞️ La Variante</b>' }
        ]
    }
    
};

const mapasInstanciados = {};
const apiKey = '1546b463fc8a4ec0a928718fbe52e017'; 

// 2. FUNCIÓN MAESTRA PARA CONSTRUIR EL MAPA
function renderizarMapa(nombreClave) {
    if (mapasInstanciados[nombreClave]) return;

    const info = configuracionMapas[nombreClave];
    if (!info) return;

    const contenedor = document.getElementById(info.containerId);
    if (!contenedor) return;

    const map = L.map(info.containerId).setView(info.centro, info.zoom);

    L.tileLayer(`https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${apiKey}`, {
    maxZoom: 22,
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    info.marcadores.forEach(m => {
        L.marker(m.latlng).addTo(map)
            .bindPopup(m.texto, { autoClose: false, closeOnClick: false })
            .openPopup();
    });

    fetch(info.geojson)
        .then(res => res.json())
        .then(data => {
            const capaGeoJSON = L.geoJSON(data, { 
                style: { color: info.color, weight: 7, opacity: 0.5 } 
            }).addTo(map);

            map.fitBounds(capaGeoJSON.getBounds(), { padding: [30, 30] });
        })
        .catch(err => console.error("Error en ruta:", err));

    mapasInstanciados[nombreClave] = map;
}

// --- 3. INICIALIZACIÓN menu hamburguesa---
function moveSlide(step) {
    showSlide(currentSlide + step);
}


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
        var map = L.map('map').setView([6.23072, -73.17116], 8); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        var marker = L.marker([6.23072, -73.17116]).addTo(map);
        marker.bindPopup("<b>🏨 Hotel Casa El Cedro</b><br>🌿Charalá, Santander.").openPopup();
    }
}); 

// 4. EVENTO DE CARGA AUTOMÁTICO
window.addEventListener('load', () => {
    // El script busca en todo el documento HTML cuál contenedor de mapa existe
    for (const clave in configuracionMapas) {
        const idDelDiv = configuracionMapas[clave].containerId;
        
        if (document.getElementById(idDelDiv)) {
            renderizarMapa(clave);
            
            // Refresco de seguridad para evitar cuadros grises
            setTimeout(() => {
                if (mapasInstanciados[clave]) {
                    mapasInstanciados[clave].invalidateSize();
                }
            }, 300);
        }
    }
}); 
