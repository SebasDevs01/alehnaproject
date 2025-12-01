/**
 * ALEHNA Official Website - Main Logic
 */

const products = [
    {
        id: 'tshirt-karma',
        name: 'T-Shirt EL KARMA',
        price: 65000,
        description: 'Camiseta de algodón premium con estampado KARMA.',
        variants: { white: 'imgmerch/camisablanca.png', black: 'imgmerch/camisanegra.png' },
        sizes: ['S', 'M', 'L', 'XL'],
        defaultColor: 'black'
    },
    {
        id: 'buso-karma',
        name: 'Sudadera KARMA',
        price: 120000,
        description: 'Hoodie premium con diseño exclusivo de la era KARMA.',
        variants: { white: 'imgmerch/busoblanco.png', black: 'imgmerch/busonegro.png' },
        sizes: ['S', 'M', 'L', 'XL'],
        defaultColor: 'black'
    },
    {
        id: 'gorra-karma',
        name: 'Gorra KARMA',
        price: 45000,
        description: 'Gorra bordada estilo dad-hat. Ajustable.',
        variants: { white: 'imgmerch/gorrablanca.png', black: 'imgmerch/gorranegra.png' },
        sizes: ['Única'],
        defaultColor: 'black'
    },
    {
        id: 'tote-karma',
        name: 'Tote Bag KARMA',
        price: 30000,
        description: 'Bolso de tela resistente y ecológico.',
        variants: { white: 'imgmerch/bolsablanca.png', black: 'imgmerch/bolsanegra.png' },
        sizes: ['Única'],
        defaultColor: 'black'
    }
];

const state = {};
products.forEach(p => {
    state[p.id] = { color: p.defaultColor, size: p.sizes[0], quantity: 1 };
});

document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    initMobileMenu();
    setupMailtoToGmail();
});

// --- DETECCIÓN DE DISPOSITIVO MÓVIL ---
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.theme = 'light';
            } else {
                htmlElement.classList.add('dark');
                localStorage.theme = 'dark';
            }
        });
    }
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

// --- FUNCIÓN HÍBRIDA: Gmail Web en PC, App Nativa en Móvil ---
function setupMailtoToGmail() {
    const mailLinks = document.querySelectorAll('a[href^="mailto:"]');

    mailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Si es móvil, NO hacemos nada especial. 
            // Dejamos que el navegador abra la app por defecto (comportamiento estándar).
            if (isMobileDevice()) return;

            // Si es PC, prevenimos el estándar y abrimos Gmail Web
            e.preventDefault();

            const href = link.getAttribute('href');
            const email = href.replace('mailto:', '').split('?')[0];

            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
            window.open(gmailUrl, '_blank');
        });
    });
}

// --- GLOBAL ACTIONS ---

function updateCardUI(productId) {
    const product = products.find(p => p.id === productId);
    const productState = state[productId];
    const img = document.getElementById(`img-${productId}`);
    if (img) img.src = product.variants[productState.color];
}

window.updateColor = (productId, color) => {
    state[productId].color = color;
    updateCardUI(productId);
};

window.updateSize = (productId, size) => {
    state[productId].size = size;
    alert(`Talla ${size} seleccionada para ${products.find(p => p.id === productId).name}`);
};

window.updateQuantity = (productId, change) => {
    const newQuantity = state[productId].quantity + change;
    if (newQuantity >= 1) {
        state[productId].quantity = newQuantity;
        const card = document.getElementById(`card-${productId}`);
        const span = card.querySelectorAll('span.text-center')[0];
        if (span) span.innerText = newQuantity;
    }
};

window.buyProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    const s = state[productId];
    const total = product.price * s.quantity;

    const message = `Hola ALEHNA, quiero comprar:
- Producto: ${product.name}
- Color: ${s.color === 'white' ? 'Blanco' : 'Negro'}
- Talla: ${s.size}
- Cantidad: ${s.quantity}

Precio Total Estimado: $${total.toLocaleString('es-CO')}

Mis datos de envío son:
(Por favor completa tus datos aquí)`;

    const url = `https://wa.me/573164280293?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

// --- ENVÍO DE CORREO INTELIGENTE (Móvil vs PC) ---
window.sendEmail = () => {
    const name = document.getElementById('contact-name').value;
    const userEmail = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !message) {
        alert('Por favor completa al menos tu nombre y el mensaje.');
        return;
    }

    const officialEmail = "alenamusicoficial@gmail.com";

    // CUERPO DEL MENSAJE OPTIMIZADO (Formato Párrafo Continuo)
    // Se usan comas y minúsculas para conectar las frases fluidamente.
    const emailBody = `Hola Alehna, soy ${name}, ${message}, me puedes contactar a: ${userEmail}.`;

    // 1. Enlace estándar (Para Móviles y Apps de Escritorio configuradas)
    const mailtoLink = `mailto:${officialEmail}?subject=${encodeURIComponent(subject || 'Nuevo Mensaje Web')}&body=${encodeURIComponent(emailBody)}`;

    // 2. Enlace Gmail Web (Para Escritorio sin app configurada)
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${officialEmail}&su=${encodeURIComponent(subject || 'Nuevo Mensaje Web')}&body=${encodeURIComponent(emailBody)}`;

    // DECISIÓN:
    if (isMobileDevice()) {
        // En celular: Usar la app nativa
        window.location.href = mailtoLink;
    } else {
        // En PC: Intentar abrir Gmail Web en nueva pestaña
        window.open(gmailLink, '_blank');
    }
};