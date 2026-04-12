import glob
import re

# 1. Update main.js
with open('main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

# Fix Countdown IDs
main_js = main_js.replace('getElementById("top-days")', 'getElementById("days")')
main_js = main_js.replace('getElementById("top-hours")', 'getElementById("hours")')
main_js = main_js.replace('getElementById("top-minutes")', 'getElementById("minutes")')
main_js = main_js.replace('getElementById("top-seconds")', 'getElementById("seconds")')

# Inject Carousel Auto-Scroll Logic at the end of the file
carousel_js = """
// --- CARRUSEL AUTOMÁTICO Y2K POP ---
(function initCarousel() {
    const carousels = document.querySelectorAll('.snap-x.snap-mandatory');
    if (!carousels || carousels.length === 0) return;
    
    carousels.forEach(c => {
        let direction = 1;
        setInterval(() => {
            const maxScrollLeft = c.scrollWidth - c.clientWidth;
            // Si está al final, cambia de dirección
            if (c.scrollLeft >= maxScrollLeft - 10) {
                direction = -1;
            } else if (c.scrollLeft <= 10) {
                direction = 1;
            }
            c.scrollBy({ left: 320 * direction, behavior: 'smooth' });
        }, 2000);
    });
})();
"""
if 'CARRUSEL AUTOMÁTICO' not in main_js:
    main_js += carousel_js

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(main_js)


# 2. Update styles.css with Vinotinto
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_body_css = """html, body {
    overflow-x: hidden;
    background-color: #000;
    background: radial-gradient(circle at top 200px, rgba(128, 0, 32, 0.4) 0%, rgba(26, 0, 13, 0.8) 30%, #000000 65%);
    background-attachment: fixed;
}"""

css = re.sub(r'html, body \{[^}]+\}', new_body_css, css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)


# 3. Update HTML files (Font fix and Cache Bust)
for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Fix ALMAS font in banner
    html = html.replace('<span class="font-gothic-metal tracking-widest chrome-text text-lg md:text-xl font-bold uppercase hidden sm:block">ALMAS. RELEASE</span>', 
                        '<span class="font-industrial tracking-widest chrome-text text-lg md:text-xl font-bold uppercase hidden sm:block" style="letter-spacing: 0.15em;">ALMAS. RELEASE</span>')

    # Cache bust styles and scripts to v=5
    html = re.sub(r'styles\.css\?v=[0-9]+', 'styles.css?v=5', html)
    html = html.replace('href="styles.css"', 'href="styles.css?v=5"')
    
    html = re.sub(r'main\.js\?v=[0-9]+', 'main.js?v=5', html)
    html = html.replace('src="main.js"', 'src="main.js?v=5"')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Updated and Cache-Busted {filepath} to v=5")

print("Vinotinto Y2K palette, Countdown fix, and Carousel Auto-scroll injected successfully.")
