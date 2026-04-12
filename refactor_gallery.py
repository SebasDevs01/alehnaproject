import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace old gallery HTML
old_gallery_start = html.find('<!-- GALLERY CAROUSEL -->')
old_gallery_end = html.find('<!-- SECCI', old_gallery_start)

if old_gallery_start != -1 and old_gallery_end != -1:
    old_gallery = html[old_gallery_start:old_gallery_end]

    new_gallery = """<!-- GALLERY CAROUSEL (SINGLE IMAGE Y2K) -->
        <div class="mt-20 max-w-4xl w-full mx-auto relative z-20 px-4">
            <h2 class="text-4xl md:text-5xl font-industrial-metal chrome-text mb-10 text-center">GALERÍA</h2>
            
            <div class="relative w-full aspect-square md:aspect-video chrome-panel border-[3px] chrome-plate-border group hover-fuchsia-glow cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(255,0,127,0.3)] transition-transform hover:scale-[1.02]" id="main-gallery-container">
                <img id="main-gallery-img" src="imgbio/alebio.jpg" class="w-full h-full object-cover transition-opacity duration-500">
                <div class="absolute inset-0 bg-neonPink opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div class="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 font-industrial tracking-widest text-sm rounded border border-neonPink backdrop-blur hover-fuchsia-glow">
                    <i class="fa-solid fa-expand"></i> VER
                </div>
            </div>
        </div>

        <!-- LIGHTBOX MODAL -->
        <div id="gallery-lightbox" class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md hidden flex items-center justify-center transition-opacity duration-300">
            <button id="lightbox-close" class="absolute top-6 right-8 text-white hover:text-neonPink text-4xl transition-colors"><i class="fa-solid fa-xmark"></i></button>
            <button id="lightbox-prev" class="absolute left-4 md:left-12 text-[#ccc] hover:text-white hover-fuchsia-glow text-5xl md:text-6xl transition-colors"><i class="fa-solid fa-chevron-left"></i></button>
            
            <img id="lightbox-img" src="" class="max-w-[90%] max-h-[85vh] object-contain border-[2px] border-neonPink shadow-[0_0_40px_rgba(255,0,127,0.4)]">
            
            <button id="lightbox-next" class="absolute right-4 md:right-12 text-[#ccc] hover:text-white hover-fuchsia-glow text-5xl md:text-6xl transition-colors"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
"""
    html = html.replace(old_gallery, new_gallery)
    
    # Bump version
    html = re.sub(r'main\.js\?v=[0-9]+', 'main.js?v=6', html)
    html = re.sub(r'styles\.css\?v=[0-9]+', 'styles.css?v=6', html)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Updated index.html with Single Image Gallery and Lightbox")
    
# Update main.js
with open('main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

# remove old initCarousel
if 'function initCarousel()' in main_js:
    # Use regex to strip it
    main_js = re.sub(r'\(\s*function\s+initCarousel\(\)\s*\{.*?\}\s*\)\(\);', '', main_js, flags=re.DOTALL)
    
# Add new gallery logic
new_js = """
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
"""

if 'initSdcGallery' not in main_js:
    main_js += new_js

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(main_js)
print("Updated main.js with Gallery auto-rotation and Lightbox")
