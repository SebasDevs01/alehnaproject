import glob
import re

with open('index.html', encoding='utf-8') as f:
    idx = f.read()

nav_start = idx.find('<nav')
nav_end = idx.find('</nav>') + 6
nav_html = idx[nav_start:nav_end]

files = [
    'biografia.html',
    'contact.html',
    'lanzamientos.html',
    'merch.html',
    'music.html',
    'videos.html'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 1. Replace Body Classes
    html = re.sub(
        r'<body[^>]*class="[^"]*"',
        r'<body class="font-sans antialiased transition-colors duration-300 bg-darkBg text-white dark flex flex-col min-h-screen"',
        html
    )

    # 2. Replace Particles
    html = html.replace('<div id="particles-container"></div>', '<div id="sdc-antigrav-layer"></div>')

    # 3. Replace Nav
    n_start = html.find('<nav')
    n_end = html.find('</nav>') + 6
    if n_start != -1 and n_end != -1:
        html = html[:n_start] + nav_html + html[n_end:]

    # 4. Replace padding on main
    html = html.replace('pt-[170px]', 'pt-[220px]')
    
    # 5. Bring in chrome text for all gothic headers
    html = html.replace('font-gothic logo-metallic', 'font-gothic-metal chrome-text drop-shadow-md')
    html = html.replace('font-gothic', 'font-gothic-metal chrome-text')
    
    # 6. Transform generic cards into chrome panels to force the aesthetic
    html = html.replace('bg-white dark:bg-black border border-gray-200 dark:border-gray-800', 'chrome-panel border-2 chrome-plate-border')
    html = html.replace('bg-white border text-center shadow-lg', 'chrome-panel border-[3px] chrome-plate-border text-center shadow-[0_0_15px_rgba(255,0,127,0.4)]')
    html = html.replace('bg-gray-50 dark:bg-neutral-900', 'bg-black chrome-panel')
    
    # 7. Button enhancements
    html = html.replace('bg-black text-white px-8 py-3 rounded-full hover:bg-neonPink transition-colors shadow-xl', 'chrome-panel chrome-text px-8 py-3 rounded border-[2px] chrome-plate-border hover-fuchsia-glow hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,127,0.3)]')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(html)
        print(f"Propagated SDC aesthetics to {file}")
