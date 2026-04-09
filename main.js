/**
 * ALEHNA Official Website - Main Logic
 */

// --- CONFIGURACIÓN DE FORMSPREE ---
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xanrjnjr';

// --- DATOS DE PRODUCTOS ---
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

// Estado de selección actual en la tienda (antes de agregar al carrito)
const state = {};
products.forEach(p => {
    state[p.id] = { color: p.defaultColor, size: p.sizes[0], quantity: 1 };
});

// --- ESTADO DEL CARRITO ---
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    initMobileMenu();
    setupMailtoToGmail();
    setupContactForm();
    loadCartFromStorage(); // Cargar carrito guardado si existe
    initParticles(); // Iniciar sistema de partículas
});

// --- SISTEMA DE PARTÍCULAS (CORAZONES Y ESTRELLAS) ---
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Crear partículas cada cierto tiempo
    setInterval(() => {
        spawnParticle(container);
    }, 400); // Aparece 1 partícula cada 400ms
}

function spawnParticle(container) {
    const particle = document.createElement('i');
    
    // Aleatorizar si es corazón o estrella
    const isHeart = Math.random() > 0.5;
    
    if (isHeart) {
        particle.className = 'fa-solid fa-heart particle';
    } else {
        // Estrellas asimétricas estilo Y2k Grunge Britney en vez del icono limpio
        particle.className = 'particle';
        particle.innerHTML = `<svg viewBox="0 0 100 100" fill="currentColor" width="100%" height="100%">
            <!-- Forma de estrella gruesa e irregular -->
            <path d="M45 5 L60 35 L95 30 L65 55 L80 95 L45 70 L10 85 L25 50 L5 20 L35 30 Z" stroke="rgba(0,0,0,0.5)" stroke-width="3" stroke-linejoin="round"/>
        </svg>`;
        particle.style.display = 'inline-flex';
    }
    
    // Dar color vinotinto o rosita (Pop/Rock Britney style)
    // Rosita brillante: #FF007F, Vinotinto: #800020 u oscuro #A3003B
    const isVinotinto = Math.random() > 0.5;
    particle.style.color = isVinotinto ? '#800020' : '#FF007F'; 

    if (!document.documentElement.classList.contains('dark')) {
        particle.style.color = isVinotinto ? '#A3003B' : '#FF1493'; // Un poco más claros en modo claro para destacar
    }

    // Tamaño aleatorio, las estrellas asimétricas se verán muy bien un poco más grandes (20px a 35px)
    const size = Math.floor(Math.random() * 15) + (isHeart ? 12 : 20);
    particle.style.fontSize = `${size}px`;
    particle.style.width = isHeart ? 'auto' : `${size}px`;
    particle.style.height = isHeart ? 'auto' : `${size}px`;

    // Posición horizontal aleatoria
    particle.style.left = `${Math.random() * 100}vw`;

    // Duración de animación aleatoria (floatUp) entre 5 y 10 segundos
    const duration = Math.random() * 5 + 5;
    particle.style.animationDuration = `${duration}s`;

    // Retraso aleatorio
    particle.style.animationDelay = `${Math.random()}s`;

    container.appendChild(particle);

    // Limpiar el DOM tras terminar la animación
    setTimeout(() => {
        particle.remove();
    }, (duration + 1) * 1000);
}

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

// --- ACTUALIZACIONES VISUALES DE PRODUCTOS ---
function updateCardUI(productId) {
    const product = products.find(p => p.id === productId);
    const productState = state[productId];
    const img = document.getElementById(`img-${productId}`);
    if (img) img.src = product.variants[productState.color];

    // Actualizar bordes de botones de color
    const colorBtns = document.querySelectorAll(`button[onclick^="updateColor('${productId}'"]`);
    colorBtns.forEach(btn => {
        const btnColor = btn.getAttribute('onclick').includes("'white'") ? 'white' : 'black';
        if (btnColor === productState.color) {
            btn.classList.add('border-neonPink', 'scale-110');
            btn.classList.remove('border-gray-300', 'dark:border-gray-600');
        } else {
            btn.classList.remove('border-neonPink', 'scale-110');
            btn.classList.add('border-gray-300', 'dark:border-gray-600');
        }
    });
}

function updateSizeUI(productId, size) {
    const sizeBtns = document.querySelectorAll(`button[onclick^="updateSize('${productId}'"]`);
    sizeBtns.forEach(btn => {
        if (btn.innerText === size) {
            btn.className = "px-3 py-1 text-xs font-bold rounded border bg-black text-white dark:bg-white dark:text-black border-transparent transition-colors";
        } else {
            btn.className = "px-3 py-1 text-xs font-bold rounded border border-gray-200 dark:border-gray-700 hover:border-neonPink transition-colors";
        }
    });
}

// --- ACCIONES DE SELECCIÓN ---
window.updateColor = (productId, color) => {
    state[productId].color = color;
    updateCardUI(productId);
};

window.updateSize = (productId, size) => {
    state[productId].size = size;
    updateSizeUI(productId, size);
};

window.updateQuantity = (productId, change) => {
    const newQuantity = state[productId].quantity + change;
    if (newQuantity >= 1) {
        state[productId].quantity = newQuantity;
        const card = document.getElementById(`card-${productId}`);
        const span = card.querySelector('span.min-w-\\[20px\\]');
        if (span) span.innerText = newQuantity;
    }
};

// --- LÓGICA DEL CARRITO DE COMPRAS ---

// 1. Agregar al carrito (Botón +)
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const selection = state[productId];

    // Crear un ID único para este item (por si compra el mismo producto en tallas diferentes)
    const cartItemId = `${productId}-${selection.color}-${selection.size}`;

    const existingItem = cart.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.quantity += selection.quantity;
    } else {
        cart.push({
            cartItemId: cartItemId,
            ...product, // Copia datos del producto
            selectedColor: selection.color,
            selectedSize: selection.size,
            quantity: selection.quantity,
            image: product.variants[selection.color] // Guardamos la foto correcta
        });
    }

    updateCartUI();
    saveCart();

    // Feedback visual (Pequeña animación o alerta)
    openCart(); // Abrimos el carrito para mostrar que se agregó
};

// 2. Eliminar del carrito
window.removeFromCart = (cartItemId) => {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    updateCartUI();
    saveCart();
};

// 3. Renderizar el carrito visualmente
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountBadge = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer) return; // Si no estamos en una página con carrito

    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) {
        cartCountBadge.innerText = totalItems;
        cartCountBadge.classList.toggle('hidden', totalItems === 0);
    }

    // Renderizar lista
    cartItemsContainer.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        const colorName = item.selectedColor === 'white' ? 'Blanco' : 'Negro';

        cartItemsContainer.innerHTML += `
            <div class="flex gap-4 mb-4 bg-gray-50 dark:bg-neutral-800 p-3 rounded-xl relative group">
                <img src="${item.image}" class="w-16 h-16 object-contain bg-white rounded-lg">
                <div class="flex-1">
                    <h4 class="font-bold text-sm dark:text-white">${item.name}</h4>
                    <p class="text-xs text-gray-500">Color: ${colorName} | Talla: ${item.selectedSize}</p>
                    <div class="flex justify-between items-center mt-1">
                        <span class="text-xs font-bold">Cant: ${item.quantity}</span>
                        <span class="text-sm font-bold text-neonPink">$${itemTotal.toLocaleString('es-CO')}</span>
                    </div>
                </div>
                <button onclick="removeFromCart('${item.cartItemId}')" class="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                    <i class="fa-solid fa-trash text-xs"></i>
                </button>
            </div>
        `;
    });

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-gray-500 py-4">Tu carrito está vacío.</p>';
    }

    if (cartTotalElement) {
        cartTotalElement.innerText = `$${totalAmount.toLocaleString('es-CO')}`;
    }
}

// 4. Abrir/Cerrar Carrito
window.toggleCart = () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar && cartOverlay) {
        const isHidden = cartSidebar.classList.contains('translate-x-full');
        if (isHidden) {
            // Abrir
            cartSidebar.classList.remove('translate-x-full');
            cartOverlay.classList.remove('hidden');
        } else {
            // Cerrar
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.add('hidden');
        }
    }
}
// Alias para abrir directamente
window.openCart = () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar) {
        cartSidebar.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
    }
}

// 5. Checkout (WhatsApp con lista completa)
window.checkoutCart = () => {
    if (cart.length === 0) return;

    let message = "Hola ALEHNA, quiero realizar el siguiente pedido:\n\n";
    let grandTotal = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        grandTotal += subtotal;
        const colorName = item.selectedColor === 'white' ? 'Blanco' : 'Negro';

        message += `▪ ${item.name}\n   Color: ${colorName} | Talla: ${item.selectedSize}\n   Cantidad: ${item.quantity} | Subtotal: $${subtotal.toLocaleString('es-CO')}\n\n`;
    });

    message += `💰 *TOTAL A PAGAR: $${grandTotal.toLocaleString('es-CO')}*\n\n`;
    message += "Mis datos de envío son:\n(Por favor completa aquí)";

    const url = `https://wa.me/573164280293?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

// Persistencia (Guardar carrito si refresca la página)
function saveCart() {
    localStorage.setItem('alehna_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('alehna_cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
}

// --- ENVÍO DE CORREO Y FORMSPREE (Mantener anterior) ---
// 6. Comprar producto individual directamente
window.buyProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    const selection = state[productId];
    const subtotal = product.price * selection.quantity;
    const colorName = selection.color === 'white' ? 'Blanco' : 'Negro';

    let message = "Hola ALEHNA, quiero comprar este producto:\n\n";
    message += `▪ ${product.name}\n   Color: ${colorName} | Talla: ${selection.size}\n   Cantidad: ${selection.quantity} | Total: $${subtotal.toLocaleString('es-CO')}\n\n`;
    message += "Mis datos de envío son:\n(Por favor completa aquí)";

    const url = `https://wa.me/573164280293?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

// --- ENVÍO DE CORREO (CONTACTO) ---
window.sendEmail = () => {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
        alert('Por favor completa todos los campos requeridos.');
        return;
    }

    const recipient = 'alenamusicoficial@gmail.com';
    const finalSubject = subject || 'Contacto desde Web';
    // Formato de párrafo solicitado: solo la inicial del párrafo en mayúscula
    const body = `Hola soy ${name.toLowerCase()}, ${message.toLowerCase()}. me puedes contactar a ${email.toLowerCase()}.`;

    if (isMobileDevice()) {
        // En celular: usar mailto para abrir app nativa (Gmail u otra)
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
    } else {
        // En PC: abrir Gmail en la web
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank');
    }

    // Limpiar formulario después de enviar
    setTimeout(() => {
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-subject').value = '';
        document.getElementById('contact-message').value = '';
    }, 1000);
};

// Función para abrir cliente de correo desde el link directo
window.openEmailClient = (event) => {
    if (event) event.preventDefault();
    const recipient = 'alenamusicoficial@gmail.com';

    if (isMobileDevice()) {
        window.location.href = `mailto:${recipient}`;
    } else {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}`;
        window.open(gmailUrl, '_blank');
    }
};

function setupContactForm() { /* ... código anterior ... */ }
function setupMailtoToGmail() { /* ... código anterior ... */ }