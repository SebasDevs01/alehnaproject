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

// --- EMAIL: Gmail Web en PC, App Nativa en Móvil ---
function setupMailtoToGmail() {
    const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
    mailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (isMobileDevice()) return;
            e.preventDefault();
            const href = link.getAttribute('href');
            const email = href.replace('mailto:', '').split('?')[0];
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
            window.open(gmailUrl, '_blank');
        });
    });
}

// --- ACTUALIZACIONES VISUALES DE LA TIENDA ---

function updateCardImage(productId) {
    const product = products.find(p => p.id === productId);
    const productState = state[productId];
    const img = document.getElementById(`img-${productId}`);
    if (img) img.src = product.variants[productState.color];
}

// Nueva función: Actualiza el borde del botón de color seleccionado
function updateColorUI(productId, selectedColor) {
    // Busca todos los botones de color de ESTE producto
    const buttons = document.querySelectorAll(`button[onclick^="updateColor('${productId}'"]`);

    buttons.forEach(btn => {
        // Averiguamos qué color es este botón mirando su propio onclick
        const onclickText = btn.getAttribute('onclick');
        const btnColor = onclickText.includes("'white'") ? 'white' : 'black';

        if (btnColor === selectedColor) {
            // Estilo ACTIVO (Borde Neon + Grande)
            btn.classList.add('border-neonPink', 'scale-110');
            btn.classList.remove('border-gray-300', 'dark:border-gray-600');
        } else {
            // Estilo INACTIVO (Borde Gris)
            btn.classList.remove('border-neonPink', 'scale-110');
            btn.classList.add('border-gray-300', 'dark:border-gray-600');
        }
    });
}

// Nueva función: Actualiza el estilo del botón de talla seleccionado
function updateSizeUI(productId, selectedSize) {
    // Busca todos los botones de talla de ESTE producto
    const buttons = document.querySelectorAll(`button[onclick^="updateSize('${productId}'"]`);

    buttons.forEach(btn => {
        const btnSize = btn.innerText.trim(); // "S", "M", etc.

        if (btnSize === selectedSize) {
            // Estilo ACTIVO (Fondo Negro/Blanco)
            btn.className = "px-3 py-1 text-xs font-bold rounded border bg-black text-white dark:bg-white dark:text-black border-transparent transition-colors";
        } else {
            // Estilo INACTIVO (Borde transparente/gris)
            btn.className = "px-3 py-1 text-xs font-bold rounded border border-gray-200 dark:border-gray-700 hover:border-neonPink transition-colors";
        }
    });
}

// --- ACCIONES GLOBALES (Llamadas desde el HTML) ---

window.updateColor = (productId, color) => {
    state[productId].color = color;
    updateCardImage(productId); // Cambia la foto
    updateColorUI(productId, color); // Cambia el borde del botón
};

window.updateSize = (productId, size) => {
    state[productId].size = size;
    updateSizeUI(productId, size); // Cambia el estilo del botón
};

window.updateQuantity = (productId, change) => {
    const newQuantity = state[productId].quantity + change;
    if (newQuantity >= 1) {
        state[productId].quantity = newQuantity;
        // Actualiza el número visualmente buscando el span dentro de la tarjeta
        const card = document.getElementById(`card-${productId}`);
        // Buscamos el span que tiene la clase text-center y min-w-[20px] (el contador)
        const counterSpan = card.querySelector('span.min-w-\\[20px\\]');
        if (counterSpan) counterSpan.innerText = newQuantity;
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

// --- ENVÍO DE CORREO INTELIGENTE ---
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

    // CUERPO DEL MENSAJE OPTIMIZADO (Formato Párrafo)
    const emailBody = `Hola Alehna, soy ${name}, ${message}, me puedes contactar a: ${userEmail}.`;

    const mailtoLink = `mailto:${officialEmail}?subject=${encodeURIComponent(subject || 'Mensaje desde Web')}&body=${encodeURIComponent(emailBody)}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${officialEmail}&su=${encodeURIComponent(subject || 'Mensaje desde Web')}&body=${encodeURIComponent(emailBody)}`;

    if (isMobileDevice()) {
        window.location.href = mailtoLink;
    } else {
        window.open(gmailLink, '_blank');
    }
};