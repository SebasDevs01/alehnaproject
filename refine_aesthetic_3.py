import glob
import re

# Update main.js
with open('main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

# Replace emoji particle logic with spark logic
old_logic = """    // Aleatorizar forma de la partícula
    const symbols = ['💖', '⭐', '✨'];
    particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Aleatorizar colores para brasas (fucsia profundo a blanco puro, que afecta el resplandor)
    const colors = ['#ff007f', '#ff0055', '#ff99cc', '#ffffff'];
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.background = 'transparent';
    particle.style.textShadow = `0 0 ${Math.random() * 15 + 5}px ${selectedColor}`;
    particle.style.color = selectedColor;
    particle.style.boxShadow = 'none';

    // Tamaño de fuente (emulando tamaño de chispa)
    const size = Math.random() * 10 + 10;
    particle.style.fontSize = `${size}px`;
    particle.style.width = 'auto';
    particle.style.height = 'auto';"""

new_logic = """    // Configurar partículas como chispas (embers) que resplandece
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
    particle.style.height = `${size}px`;"""

if old_logic in main_js:
    main_js = main_js.replace(old_logic, new_logic)
    with open('main.js', 'w', encoding='utf-8') as f:
        f.write(main_js)
    print("Updated main.js")

# Update styles.css
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

if '--bg-dark-texture: #0a0a0a;' in css:
    css = css.replace('--bg-dark-texture: #0a0a0a;', '--bg-dark-texture: #000000;')
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Updated styles.css (Set bg to #000000 to match video perfectly)")

# Cache bust
for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    if 'styles.css?v=3' in html:
        html = html.replace('styles.css?v=3', 'styles.css?v=4')
    if 'main.js' in html and '?v=' not in html.split('main.js')[1][:5]:
        html = html.replace('main.js', 'main.js?v=4')
    elif 'main.js?v=' in html:
        html = re.sub(r'main\.js\?v=\d+', 'main.js?v=4', html)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Cache-busted {filepath} to v=4")
