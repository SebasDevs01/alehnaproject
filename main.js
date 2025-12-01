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
    // No renderizamos productos aquí porque ya están en el HTML.
});

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

// --- GLOBAL ACTIONS (Para los botones HTML) ---

function updateCardUI(productId) {
    const product = products.find(p => p.id === productId);
    const productState = state[productId];

    // 1. Actualizar Imagen
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
        // Intento de actualizar el texto del botón (avanzado)
        const card = document.getElementById(`card-${productId}`);
        const span = card.querySelectorAll('span.text-center')[0]; // Busca el span de cantidad
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

// --- FUNCIÓN PARA ENVIAR CORREO (FORMULARIO) ---
window.sendEmail = () => {
    // 1. Obtener datos del usuario (Quién escribe)
    const name = document.getElementById('contact-name').value;
    const userEmail = document.getElementById('contact-email').value; // El correo del fan
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !message) {
        alert('Por favor completa al menos tu nombre y el mensaje.');
        return;
    }

    // 2. Destinatario OFICIAL (Alehna)
    const officialEmail = "alenamusicoficial@gmail.com";

    // 3. Construir el cuerpo del mensaje
    // Aquí incluimos el correo del fan DENTRO del mensaje para que Alehna lo lea y pueda responderle manualmente
    const emailBody = `Hola Alehna, tienes un nuevo mensaje desde la web:\n\n` +
        `Nombre del remitente: ${name}\n` +
        `Correo de contacto: ${userEmail}\n\n` +
        `MENSAJE:\n${message}`;

    // 4. Crear el enlace mailto
    // Esto le dice al programa de correo: "Envía A Alehna, con ESTE asunto y ESTE cuerpo"
    const mailtoLink = `mailto:${officialEmail}?subject=${encodeURIComponent(subject || 'Nuevo Mensaje Web')}&body=${encodeURIComponent(emailBody)}`;

    // 5. Intentar abrir
    // Usamos window.open para intentar forzar una nueva pestaña/ventana,
    // lo cual a veces ayuda a que el navegador sugiera Gmail si no hay app instalada.
    window.open(mailtoLink, '_blank');
};