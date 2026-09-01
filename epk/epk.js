/* ═══════════════════════════════════════════════════════
   ALEHNA — EPK 2026 — JavaScript
   ═══════════════════════════════════════════════════════ */

// ─── GALLERY LIGHTBOX ───────────────────────────────────
(function() {
    const items = document.querySelectorAll('.gallery-item img');
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');

    items.forEach(img => {
        img.parentElement.addEventListener('click', () => {
            if (lbImg && lb) {
                lbImg.src = img.src;
                lbImg.alt = img.alt;
                lb.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
})();

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ESC para cerrar lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ─── PDF DOWNLOAD (UNA SOLA VEZ) ────────────────────────
/**
 * Descarga el EPK como PDF usando la función de impresión del navegador.
 * Tras hacer clic, el botón desaparece permanentemente (guardado en localStorage).
 */
function downloadEPK() {
    const btn = document.getElementById('pdf-download-btn');

    // Ocultar botón inmediatamente con animación
    if (btn) {
        btn.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.8)';
        setTimeout(() => { btn.style.display = 'none'; }, 400);
    }

    try {
        localStorage.setItem('alehna_epk_downloaded', '1');
    } catch(e) {}

    // Disparar ventana de impresión / guardar como PDF
    setTimeout(() => {
        window.print();
    }, 250);
}

// Verificar si ya se descargó y ocultar el botón
(function() {
    try {
        if (localStorage.getItem('alehna_epk_downloaded') === '1') {
            const btn = document.getElementById('pdf-download-btn');
            if (btn) btn.style.display = 'none';
        }
    } catch(e) {}
})();

// ─── SMOOTH SCROLL REVEAL ────────────────────────────────
(function() {
    const revealElements = document.querySelectorAll(
        '.identity-card, .release-card, .video-card, .digital-card, .show-item, .contact-card, .bio-tags, .bio-quote-card, .release-links'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${i * 0.06}s`;
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
})();
