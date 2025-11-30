/**
 * ALEHNA Official Website - Main Logic
 */

// --- PRODUCT DATA ---
const products = [
    {
        id: 'tshirt-karma',
        name: 'T-Shirt EL KARMA',
        price: 65000,
        description: 'Camiseta de algodón premium con estampado KARMA.',
        variants: {
            white: 'imgmerch/camisablanca.png',
            black: 'imgmerch/camisanegra.png'
        },
        sizes: ['S', 'M', 'L', 'XL'],
        defaultColor: 'black'
    },
    {
        id: 'buso-karma',
        name: 'Sudadera KARMA',
        price: 120000,
        description: 'Hoodie premium con diseño exclusivo de la era KARMA.',
        variants: {
            white: 'imgmerch/busoblanco.png',
            black: 'imgmerch/busonegro.png'
        },
        sizes: ['S', 'M', 'L', 'XL'],
        defaultColor: 'black'
    },
    {
        id: 'gorra-karma',
        name: 'Gorra KARMA',
        price: 45000,
        description: 'Gorra bordada estilo dad-hat. Ajustable.',
        variants: {
            white: 'imgmerch/gorrablanca.png',
            black: 'imgmerch/gorranegra.png'
        },
        sizes: ['Única'],
        defaultColor: 'black'
    },
    {
        id: 'tote-karma',
        name: 'Tote Bag KARMA',
        price: 30000,
        description: 'Bolso de tela resistente y ecológico.',
        variants: {
            white: 'imgmerch/bolsablanca.png',
            black: 'imgmerch/bolsanegra.png'
        },
        sizes: ['Única'],
        defaultColor: 'black'
    }
];

// --- STATE MANAGEMENT ---
const state = {};

products.forEach(p => {
    state[p.id] = {
        color: p.defaultColor,
        size: p.sizes[0],
        quantity: 1
    };
});

// --- DOM ELEMENTS ---
document.addEventListener('DOMContentLoaded', () => {
    // Ya no llamamos a initTheme() aquí para evitar doble carga
    setupThemeToggle(); // Solo configuramos el botón
    initMobileMenu();

    const productContainer = document.getElementById('product-grid');
    if (productContainer) {
        renderProducts(productContainer);
    }
});

// --- THEME TOGGLE (Simplificado) ---
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Alternar clase
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

// --- MOBILE MENU ---
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

// --- MERCH LOGIC ---
function renderProducts(container) {
    container.innerHTML = products.map(product => {
        const productState = state[product.id];
        const currentImage = product.variants[productState.color];

        return `
            <div class="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 transition-all hover:shadow-neonPink/20 group" id="card-${product.id}">
                <div class="relative aspect-square bg-gray-100 dark:bg-gray-800 p-4">
                    <img src="${currentImage}" alt="${product.name}" class="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105" id="img-${product.id}">
                    <div class="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        ${product.sizes.length > 1 ? 'Varias Tallas' : 'Talla Única'}
                    </div>
                </div>
                <div class="p-6 space-y-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-xl font-bold dark:text-white">${product.name}</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">${product.description}</p>
                        </div>
                        <p class="text-lg font-bold text-neonPink">$${product.price.toLocaleString('es-CO')}</p>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold uppercase text-gray-400">Color:</span>
                            <div class="flex gap-2">
                                ${Object.keys(product.variants).map(color => `
                                    <button 
                                        onclick="updateColor('${product.id}', '${color}')"
                                        class="w-6 h-6 rounded-full border-2 ${productState.color === color ? 'border-neonPink scale-110' : 'border-gray-300 dark:border-gray-600'} shadow-sm transition-all"
                                        style="background-color: ${color === 'white' ? '#ffffff' : '#000000'};"
                                        title="${color}"
                                    ></button>
                                `).join('')}
                            </div>
                        </div>
                        ${product.sizes.length > 1 ? `
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold uppercase text-gray-400">Talla:</span>
                                <div class="flex flex-wrap gap-2">
                                    ${product.sizes.map(size => `
                                        <button 
                                            onclick="updateSize('${product.id}', '${size}')"
                                            class="px-3 py-1 text-xs font-bold rounded border ${productState.size === size ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'border-gray-200 dark:border-gray-700 hover:border-neonPink'} transition-colors"
                                        >${size}</button>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        <div class="flex items-center gap-4 pt-2">
                            <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                                <button onclick="updateQuantity('${product.id}', -1)" class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">-</button>
                                <span class="px-2 font-bold text-sm min-w-[20px] text-center dark:text-white">${productState.quantity}</span>
                                <button onclick="updateQuantity('${product.id}', 1)" class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">+</button>
                            </div>
                            <button 
                                onclick="buyProduct('${product.id}')"
                                class="flex-1 bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-bold text-sm hover:bg-neonPink dark:hover:bg-neonPink hover:text-white dark:hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <i class="fa-brands fa-whatsapp"></i> COMPRAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// --- ACTIONS ---
window.updateColor = (productId, color) => {
    state[productId].color = color;
    const img = document.getElementById(`img-${productId}`);
    const product = products.find(p => p.id === productId);
    if (img && product) {
        img.src = product.variants[color];
    }
    const container = document.getElementById('product-grid');
    renderProducts(container);
};

window.updateSize = (productId, size) => {
    state[productId].size = size;
    const container = document.getElementById('product-grid');
    renderProducts(container);
};

window.updateQuantity = (productId, change) => {
    const newQuantity = state[productId].quantity + change;
    if (newQuantity >= 1) {
        state[productId].quantity = newQuantity;
        const container = document.getElementById('product-grid');
        renderProducts(container);
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

    const url = `https://wa.me/573138432479?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};