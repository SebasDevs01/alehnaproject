/* ═══════════════════════════════════════════════════════
   ALEHNA — EPK OFICIAL 2026 — INTERACTIVE LOGIC
   Lightbox, PDF Download, Stats Counter & Observers
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. PDF Download / Print Function
    const pdfBtn = document.getElementById('pdf-download-btn');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // 2. Lightbox Functionality
    const lightboxOverlay = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightboxOverlay && lightboxImg && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || 'ALEHNA Fotografía';
                    lightboxOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeLightbox = () => {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // 3. Animated Number Counters
    const statCounters = document.querySelectorAll('.stat-number[data-target]');
    let statsAnimated = false;

    const animateStats = () => {
        statCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const prefix = counter.getAttribute('data-prefix') || '';
            const duration = 1800;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic formula
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);

                counter.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const statsSection = document.getElementById('sec-bio');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    } else {
        animateStats();
    }

    // 5. Son de Azúcar — Auto Slider (every 5s)
    const sdaSlider = document.getElementById('sda-slider');
    const sdaDots = document.getElementById('sda-slider-dots');
    if (sdaSlider && sdaDots) {
        const slides = sdaSlider.querySelectorAll('.sda-slide');
        const dots = sdaDots.querySelectorAll('.sda-dot');
        let currentSlide = 0;
        let autoPlay = null;

        const goToSlide = (index) => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const startAutoPlay = () => {
            autoPlay = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlay);
        };

        // Click dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                stopAutoPlay();
                goToSlide(parseInt(dot.dataset.index));
                startAutoPlay();
            });
        });

        // Pause on hover
        const sliderWrap = sdaSlider.closest('.sda-slider-wrap');
        sliderWrap.addEventListener('mouseenter', stopAutoPlay);
        sliderWrap.addEventListener('mouseleave', startAutoPlay);

        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        sliderWrap.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        sliderWrap.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diffX = touchStartX - touchEndX;
            if (Math.abs(diffX) > 45) {
                if (diffX > 0) {
                    goToSlide(currentSlide + 1); // swipe left -> next
                } else {
                    goToSlide(currentSlide - 1 + slides.length); // swipe right -> prev
                }
            }
            startAutoPlay();
        }, { passive: true });

        startAutoPlay();
    }
});
