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
    initParticles(); // Iniciar sistema de partículas SDC Antigravity
    initVuMeter(); // Iniciar vúmetro
});

// --- SISTEMA DE PARTÍCULAS PRA-OPS (ANTIGRAVITY) ---
function initParticles() {
    const container = document.getElementById('sdc-antigrav-layer');
    if (!container) return;

    // Crear partículas cada cierto tiempo
    setInterval(() => {
        spawnParticle(container);
    }, 200); // Aparece más rápido para el efecto de llamas y chispas
}

function spawnParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'spark'; // Definido en index.css
    
    // Configurar partículas como chispas (embers) que resplandece
    particle.innerText = ''; // Sin emojis
    
    const colors = ['#ff007f', '#ff0055', '#ff99cc', '#ffffff', '#ff1a1a'];
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];
    const blurAmount = Math.random() * 10 + 5;
    
    particle.style.background = selectedColor;
    particle.style.boxShadow = `0 0 ${blurAmount}px ${blurAmount/2}px ${selectedColor}`;
    particle.style.borderRadius = '50%';
    
    // Tamaño variable, pequeñas como brasas de fuego reales
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Posición horizontal aleatoria
    particle.style.left = `${Math.random() * 100}vw`;

    // Duración de la animación de deriva (más lento = flotación)
    const duration = Math.random() * 5 + 3;
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// --- VÚMETRO PRA-OPS ---
function initVuMeter() {
    const meter = document.getElementById('vu-meter');
    if (!meter) return;
    
    // Crear 15 barras
    for(let i=0; i<15; i++) {
        const bar = document.createElement('div');
        bar.className = 'w-2 bg-neonPink transition-all duration-100 ease-in-out';
        bar.style.height = '10%';
        bar.style.boxShadow = '0 0 5px rgba(255,0,127,0.8)';
        meter.appendChild(bar);
    }
    
    // Animar alturas de barras aleatoriamente
    setInterval(() => {
        const bars = meter.children;
        for(let i=0; i<bars.length; i++) {
            const height = Math.random() * 90 + 10;
            bars[i].style.height = `${height}%`;
            // Hacer que barras altas sean blancas/brillantes
            if(height > 80) {
                bars[i].style.backgroundColor = '#ffffff';
            } else {
                bars[i].style.backgroundColor = '#ff007f';
            }
        }
    }, 150);
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
    
    window.toggleMenu = () => {
        if (!menu) return;
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
            menu.classList.remove('hidden');
            menu.classList.add('flex');
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.remove('flex');
            menu.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };

    if (btn && menu) {
        btn.addEventListener('click', window.toggleMenu);
    }

    // ── ACTIVE PAGE & SECTION INDICATOR IN MOBILE MENU ──────────────────
    if (menu) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = menu.querySelectorAll('a[href]');

        function highlightMobileLinks(activeSectionId) {
            links.forEach(link => {
                const href = link.getAttribute('href') || '';
                if (link.classList.contains('bg-pastelVino')) return; // skip "Únete" button
                const hrefPage = href.split('#')[0] || '';
                const hrefHash = href.includes('#') ? href.split('#')[1] : null;
                let isActive = false;

                if (currentPage === 'index.html' || currentPage === '') {
                    // On index: match anchor sections
                    if (hrefHash && (hrefPage === '' || hrefPage === 'index.html')) {
                        isActive = hrefHash === activeSectionId;
                    }
                } else {
                    // On other pages: match filename
                    isActive = hrefPage === currentPage && !hrefHash;
                }

                if (isActive) {
                    link.classList.add('text-pastelVino', 'border-b-2', 'border-pastelVino', 'pb-1');
                    link.classList.remove('text-darkText');
                } else {
                    link.classList.remove('text-pastelVino', 'border-b-2', 'border-pastelVino', 'pb-1');
                    link.classList.add('text-darkText');
                }
            });
        }

        // For pages other than index, highlight on load
        if (currentPage !== 'index.html' && currentPage !== '') {
            highlightMobileLinks(null);
        }

        // For index: detect active section from scroll-spy when menu opens
        if (currentPage === 'index.html' || currentPage === '') {
            const origToggle = window.toggleMenu;
            window.toggleMenu = () => {
                origToggle();
                const activeNavLink = document.querySelector('#desktop-nav a.text-pastelVino[data-section]');
                const section = activeNavLink ? activeNavLink.dataset.section : 'music';
                highlightMobileLinks(section);
            };
        }
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

// 5. Checkout (Abrir formulario flotante)
window.checkoutCart = () => {
    if (cart.length === 0) return;

    const modal = ensureCheckoutModal();
    const summary = document.getElementById('checkout-summary');
    
    // Generar resumen
    let grandTotal = 0;
    let summaryHtml = '<h4 class="font-bold text-sm mb-2 text-pastelVino">Resumen de tu orden:</h4><ul class="text-xs space-y-2">';
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        grandTotal += subtotal;
        const colorName = item.selectedColor === 'white' ? 'Blanco' : 'Negro';
        summaryHtml += `<li class="flex justify-between border-b border-gray-100 pb-1">
            <span><b>${item.quantity}x</b> ${item.name} (${colorName}, Talla: ${item.selectedSize})</span>
            <span class="font-bold text-darkText">$${subtotal.toLocaleString('es-CO')}</span>
        </li>`;
    });
    summaryHtml += `</ul><div class="mt-3 pt-2 font-bold text-base text-pastelVino flex justify-between"><span>TOTAL:</span> <span>$${grandTotal.toLocaleString('es-CO')}</span></div>`;
    summary.innerHTML = summaryHtml;

    // Ocultar sidebar del carrito
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
    }

    // Mostrar modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeCheckoutModal = () => {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.submitOrder = (event) => {
    event.preventDefault();
    if (cart.length === 0) return;

    const nombres = document.getElementById('co-nombres').value.trim();
    const apellidos = document.getElementById('co-apellidos').value.trim();
    const telefono = document.getElementById('co-telefono').value.trim();
    const departamento = document.getElementById('co-departamento').value.trim();
    const ciudad = document.getElementById('co-ciudad').value.trim();
    const direccion = document.getElementById('co-direccion').value.trim();
    const referencia = document.getElementById('co-referencia').value.trim();
    const notas = document.getElementById('co-notas').value.trim();

    let message = `Hola soy ${nombres} ${apellidos} y quiero confirmar mi compra por ALEHNA\n\n`;
    message += `📦 *Datos de Envío:*\n`;

    let grandTotal = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        grandTotal += subtotal;
        const colorName = item.selectedColor === 'white' ? 'Blanco' : 'Negro';
        message += `▪ Producto: ${item.quantity} - ${item.name} | ${colorName}, Talla: ${item.selectedSize}\n`;
    });

    message += `\n💰 *Total a Pagar:* $${grandTotal.toLocaleString('es-CO')}\n\n`;
    message += `👤 *Nombre:* ${nombres} ${apellidos}\n`;
    message += `📱 *Teléfono:* ${telefono}\n`;
    message += `📍 *Dirección:* ${direccion}, ${referencia}\n`;
    if (notas) {
        message += `📝 *Complementos:* ${notas}\n`;
    }
    message += `🗺️ *Departamento:* ${departamento}\n`;
    message += `🏙️ *Ciudad:* ${ciudad}\n`;

    const url = `https://wa.me/573164280293?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    closeCheckoutModal();
};

const colombiaData = {
    "Amazonas": ["Leticia", "Puerto Nariño"],
    "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Rionegro", "Turbo", "Caucasia", "Marinilla"],
    "Arauca": ["Arauca", "Tame", "Saravena", "Arauquita"],
    "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Baranoa"],
    "Bogotá D.C.": ["Bogotá"],
    "Bolívar": ["Cartagena", "Magangué", "Turbaco", "El Carmen de Bolívar", "Arjona"],
    "Boyacá": ["Tunja", "Sogamoso", "Duitama", "Chiquinquirá", "Puerto Boyacá", "Paipa"],
    "Caldas": ["Manizales", "La Dorada", "Villamaría", "Chinchiná", "Riosucio"],
    "Caquetá": ["Florencia", "San Vicente del Caguán", "Cartagena del Chairá", "El Paujil"],
    "Casanare": ["Yopal", "Aguazul", "Villanueva", "Paz de Ariporo"],
    "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "El Tambo", "Miranda"],
    "Cesar": ["Valledupar", "Aguachica", "Agustín Codazzi", "Bosconia", "El Paso"],
    "Chocó": ["Quibdó", "Istmina", "Tadó", "Condoto"],
    "Córdoba": ["Montería", "Santa Cruz de Lorica", "Sahagún", "Cereté", "Montelíbano"],
    "Cundinamarca": ["Soacha", "Fusagasugá", "Facatativá", "Zipaquirá", "Chía", "Girardot", "Mosquera", "Madrid", "Funza"],
    "Guainía": ["Inírida"],
    "Guaviare": ["San José del Guaviare", "Calamar"],
    "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata", "Campoalegre"],
    "La Guajira": ["Riohacha", "Maicao", "Uribia", "San Juan del Cesar", "Fonseca"],
    "Magdalena": ["Santa Marta", "Ciénaga", "Zona Bananera", "Fundación", "El Banco"],
    "Meta": ["Villavicencio", "Acacías", "Granada", "Puerto López", "Puerto Gaitán"],
    "Nariño": ["Pasto", "Tumaco", "Ipiales", "Sandoná", "Tuquerres"],
    "Norte de Santander": ["Cúcuta", "Ocaña", "Villa del Rosario", "Los Patios", "Pamplona"],
    "Putumayo": ["Mocoa", "Puerto Asís", "Orito", "Valle del Guamuez"],
    "Quindío": ["Armenia", "Calarcá", "Montenegro", "La Tebaida", "Quimbaya"],
    "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia"],
    "San Andrés y Providencia": ["San Andrés", "Providencia"],
    "Santander": ["Bucaramanga", "Floridablanca", "Barrancabermeja", "Girón", "Piedecuesta", "San Gil"],
    "Sucre": ["Sincelejo", "Corozal", "San Marcos", "Tolú"],
    "Tolima": ["Ibagué", "Espinal", "Melgar", "Chaparral", "Líbano"],
    "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Yumbo", "Cartago", "Jamundí", "Buga"],
    "Vaupés": ["Mitú"],
    "Vichada": ["Puerto Carreño"]
};

window.updateCities = () => {
    const depSelect = document.getElementById('co-departamento');
    const citySelect = document.getElementById('co-ciudad');
    const selectedDep = depSelect.value;
    
    citySelect.innerHTML = '<option value="" disabled selected>Selecciona tu ciudad</option>';
    if (selectedDep && colombiaData[selectedDep]) {
        colombiaData[selectedDep].sort().forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
        citySelect.disabled = false;
    } else {
        citySelect.disabled = true;
    }
};

function ensureCheckoutModal() {
    let modal = document.getElementById('checkout-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'checkout-modal';
        modal.className = 'fixed inset-0 z-[400] hidden items-center justify-center p-4';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="closeCheckoutModal()"></div>
            <div class="relative z-10 bg-pastelBeige w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border-l-4 border-pastelCafe flex flex-col max-h-[90vh]">
                <div class="p-6 border-b border-pastelCafe bg-white flex justify-between items-center shrink-0">
                    <h3 class="text-2xl font-bold font-marker text-darkText">DATOS DE ENVÍO</h3>
                    <button onclick="closeCheckoutModal()" type="button" class="text-3xl text-pastelCafe hover:text-pastelVino transition-colors"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="p-6 overflow-y-auto font-main">
                    <div id="checkout-summary" class="mb-6 p-5 bg-white rounded-lg border-2 border-pastelBeigeDark shadow-sm"></div>
                    <form id="checkout-form" onsubmit="submitOrder(event)" class="space-y-5">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block font-bold font-main text-pastelCafe mb-1.5 uppercase text-[10px] tracking-widest">Nombres <span class="text-pastelVino">*</span></label>
                                <input type="text" id="co-nombres" required class="w-full px-4 py-3 bg-white rounded-lg border-2 border-pastelBeigeDark focus:border-pastelVino focus:outline-none transition-colors font-main text-darkText text-sm">
                            </div>
                            <div>
                                <label class="block font-bold font-main text-pastelCafe mb-1.5 uppercase text-[10px] tracking-widest">Apellidos <span class="text-pastelVino">*</span></label>
                                <input type="text" id="co-apellidos" required class="w-full px-4 py-3 bg-white rounded-lg border-2 border-pastelBeigeDark focus:border-pastelVino focus:outline-none transition-colors font-main text-darkText text-sm">
                            </div>
                        </div>
                        <div>
                            <label class="block font-bold font-main text-pastelCafe mb-1.5 uppercase text-[10px] tracking-widest">Teléfono (con Whatsapp) <span class="text-pastelVino">*</span></label>
                            <input type="tel" id="co-telefono" required class="w-full px-4 py-3 bg-white rounded-lg border-2 border-pastelBeigeDark focus:border-pastelVino focus:outline-none transition-colors font-main text-darkText text-sm" placeholder="Ej: +57 300 000 0000">
                            <p class="text-[10px] text-pastelCafe mt-1.5 font-bold">👉 A este número te enviaremos tu confirmación de compra.</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block font-bold font-main text-pastelCafe mb-1.5 uppercase text-[10px] tracking-widest">Departamento <span class="text-pastelVino">*</span></label>
                                <select id="co-departamento" onchange="updateCities()" required class="w-full px-4 py-3 bg-white rounded-lg border-2 border-pastelBeigeDark focus:border-pastelVino focus:outline-none transition-colors font-main text-darkText text-sm">
                                    <option value="" disabled selected>Selecciona tu departamento</option>
                                </select>
                            </div>
                            <div>
                                <label class="block font-bold font-main text-pastelCafe mb-1.5 uppercase text-[10px] tracking-widest">Ciudad / Municipio <span class="text-pastelVino">*</span></label>
                                <select id="co-ciudad" required disabled class="w-full px-4 py-3 bg-white rounded-lg border-2 border-pastelBeigeDark focus:border-pastelVino focus:outline-none transition-colors font-main text-darkText text-sm disabled:opacity-50">
                                    <option value="" disabled selected>Selecciona tu ciudad</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block font-bold font-main text-pastelCafe mb-1.5 uppercase text-[10px] tracking-widest">Dirección Completa <span class="text-pastelVino">*</span></label>
                            <input type="text" id="co-direccion" required class="w-full px-4 py-3 bg-white rounded-lg border-2 border-pastelBeigeDark focus:border-pastelVino focus:outline-none transition-colors font-main text-darkText text-sm" placeholder="Ej: Calle 20 # 4-50">
                        </div>
                        <div>
                            <label class="block font-bold font-main text-pastelCafe mb-1.5 uppercase text-[10px] tracking-widest">Punto de referencia <span class="text-pastelVino">*</span></label>
                            <input type="text" id="co-referencia" required class="w-full px-4 py-3 bg-white rounded-lg border-2 border-pastelBeigeDark focus:border-pastelVino focus:outline-none transition-colors font-main text-darkText text-sm" placeholder="Ej: Conjunto, Barrio, Torre">
                        </div>
                        <div>
                            <label class="block font-bold font-main text-pastelCafe mb-1.5 uppercase text-[10px] tracking-widest">Notas (Opcional)</label>
                            <textarea id="co-notas" rows="2" class="w-full px-4 py-3 bg-white rounded-lg border-2 border-pastelBeigeDark focus:border-pastelVino focus:outline-none transition-colors font-main text-darkText text-sm resize-none" placeholder="Especifica datos complementarios de la entrega"></textarea>
                        </div>
                        <button type="submit" class="w-full py-4 text-xl bg-pastelVino text-white hover:bg-pastelCafe transition-colors font-bold rounded-xl shadow-md border-2 border-transparent mt-6 flex flex-col items-center justify-center">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span>COMPLETAR COMPRA</span>
                            </div>
                            <span class="text-[10px] font-normal mt-0.5 opacity-90 uppercase tracking-widest">Pago al momento de recibir</span>
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Populate departments
        const depSelect = document.getElementById('co-departamento');
        Object.keys(colombiaData).sort().forEach(dep => {
            const option = document.createElement('option');
            option.value = dep;
            option.textContent = dep;
            depSelect.appendChild(option);
        });
    }
    return modal;
}

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

// --- LÓGICA GLOBAL DEL BANNER DE CUENTA REGRESIVA ---
(function initBannerCountdown() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const btnEl = document.getElementById("top-youtube-btn");

    // Solo iniciar el contador si el banner existe en la página
    if (!daysEl) return;

    // Fecha de lanzamiento: 30 de abril de 2026, 9:00 PM hora local
    // Usamos formato ISO 8601 para garantizar que el navegador lo parsee correctamente (YYYY-MM-DDTHH:mm:ss)
    const targetDate = new Date("2026-04-30T21:00:00").getTime();

    let countdownInterval;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0 || isNaN(distance)) {
            if (countdownInterval) clearInterval(countdownInterval);
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            
            if (btnEl && distance < 0) {
                btnEl.innerHTML = '<i class="fa-brands fa-youtube text-lg md:text-xl"></i><span class="hidden lg:inline">¡Escuchar Ahora!</span>';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Ejecutar inmediatamente para evitar el retraso de 1 segundo mostrando ceros
    updateCountdown();
    
    // Iniciar el intervalo si aún no hemos llegado a la fecha
    countdownInterval = setInterval(updateCountdown, 1000);
})();
// --- CARRUSEL AUTOMÁTICO Y2K POP ---


// --- SDC.A-Ops: GALERIA SINGLE-IMAGE ROTATION & LIGHTBOX ---
(function initSdcGallery() {
    const images = ['imgbio/alebio.jpg', 'almas/Portada2.jpg.jpeg', 'media/lanzamiento.jpg', 'imgbio/fondobio.jpg']; 
    // Fallback: Si no existen, usa las dos principales
    
    let currentIndex = 0;
    const mainImg = document.getElementById('main-gallery-img');
    const container = document.getElementById('main-gallery-container');
    
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');
    
    if (!mainImg) return;

    // Verificar cuáles imágenes resolverán (fallback a un arreglo seguro)
    const validImages = ['imgbio/alebio.jpg', 'almas/Portada2.jpg.jpeg'];

    let rotador;
    
    function changeMainImage(index) {
        mainImg.style.opacity = 0; // Fade out
        setTimeout(() => {
            mainImg.src = validImages[index];
            mainImg.style.opacity = 1; // Fade in
        }, 250); // half duration of CSS transition
    }

    function startAutoRotation() {
        rotador = setInterval(() => {
            currentIndex = (currentIndex + 1) % validImages.length;
            changeMainImage(currentIndex);
        }, 1500); // 1.5s as requested
    }

    function stopAutoRotation() {
        if(rotador) clearInterval(rotador);
    }

    // Iniciar rotativo
    startAutoRotation();

    // Eventos Lightbox
    container.addEventListener('click', () => {
        stopAutoRotation();
        lightboxImg.src = validImages[currentIndex];
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        setTimeout(() => lightbox.style.opacity = '1', 50);
    });

    btnClose.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            startAutoRotation(); // Reiniciar animación al cerrar
        }, 300);
    });

    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + validImages.length) % validImages.length;
        lightboxImg.src = validImages[currentIndex];
    });

    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % validImages.length;
        lightboxImg.src = validImages[currentIndex];
    });
})();
