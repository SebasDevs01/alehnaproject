import re

# Read original
with open('index.html', 'r', encoding='utf-8') as f:
    orig = f.read()

# Read what I generated
with open('index_sdc.html', 'r', encoding='utf-8') as f:
    sdc = f.read()

# --- STEP 1: Get the cool head and nav setup from sdc.html but fix the nav logo ---
# sdc nav
nav_start = sdc.find('<nav')
nav_end = sdc.find('</nav>') + len('</nav>')
nav_html = sdc[nav_start:nav_end]

# Modify nav_html to revert the video back to text
nav_html = re.sub(
    r'<a href="index.html" class="z-\[65\] flex-shrink-0 mx-auto.*?</a>',
    r'<a href="index.html" class="text-2xl font-gothic-metal chrome-text hover:text-white transition-colors text-white z-[65] mx-auto uppercase tracking-widest px-4 hover-fuchsia-glow">ALEHNA<span class="text-neonPink text-shadow-none">.</span></a>',
    nav_html,
    flags=re.DOTALL
)

# Replace light mode body classes with pure dark mode
head_end = orig.find('<main')
new_head = orig[:head_end]
new_head = new_head.replace('bg-lightBg text-black dark:bg-darkBg dark:text-white', 'bg-darkBg text-white dark')
new_head = new_head.replace('<div id="particles-container"></div>', '<div id="sdc-antigrav-layer"></div>')

# Wait, we need to inject the new nav into new_head
orig_nav_start = new_head.find('<nav')
orig_nav_end = new_head.find('</nav>') + len('</nav>')
new_head = new_head[:orig_nav_start] + nav_html + new_head[orig_nav_end:]

# --- STEP 2: Building the Main Content ---
# 1. Huge Video Hero
hero = """
    <main class="flex-grow flex flex-col items-center justify-center pt-[150px] pb-12 px-4 relative z-10 overflow-hidden">
        
        <!-- MASSIVE LOGO VIDEO (HERO) -->
        <div class="text-center space-y-8 w-full max-w-5xl mx-auto flex flex-col items-center justify-center mt-10 mb-20 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-[#ff007f]/20 via-transparent to-[#ff007f]/20 blur-[100px] pointer-events-none rounded-full"></div>
            
            <video autoplay loop muted playsinline class="w-full max-w-[800px] object-contain drop-shadow-[0_0_20px_rgba(255,0,127,0.8)] filter transition-transform duration-1000 hover:scale-[1.02] relative z-10" onerror="this.outerHTML='<h1 class=\'text-6xl md:text-9xl font-gothic-metal chrome-text leading-none\'>ALEHNA</h1>';">
                <source src="logoanimado/Logo_Animado_Para_Página_Web.mp4" type="video/mp4">
            </video>
        </div>
"""

# 2. Extract Biography from Original
bio_start = orig.find('<!-- SECCIÓN: Biografía y Boletín de Prensa -->')
bio_end = orig.find('<!-- SECCIÓN: Boletín Informativo -->', bio_start)
bio_html = orig[bio_start:bio_end]

# Enhance Bio with SDC styling
bio_html = bio_html.replace('text-gray-700 dark:text-gray-300', 'text-gray-300 font-body text-xl')
bio_html = bio_html.replace('font-gothic logo-metallic', 'font-gothic-metal chrome-text drop-shadow-[0_0_5px_rgba(255,0,127,0.5)]')
bio_html = bio_html.replace('border-[#800020]', 'border-neonPink shadow-[0_0_15px_rgba(255,0,127,0.4)] chrome-panel')
bio_html = bio_html.replace('bg-gray-50 dark:bg-black/30', 'bg-transparent overflow-hidden object-cover')
bio_html = bio_html.replace('border-2 border-gray-800 dark:border-neutral-800', 'border-[3px] chrome-plate-border')
bio_html = bio_html.replace('text-black text-shadow-md', 'text-white text-shadow-md')

# Add "LISTEN NOW" button inside bio's action area (under the date)
btn_insert = """<a href="music.html" class="mt-4 w-full block text-center chrome-panel py-3 font-industrial font-bold hover-fuchsia-glow tracking-widest text-[#ccc] hover:text-white transition-colors">ESCUCHAR AHORA</a>"""
bio_html = bio_html.replace('</p>\n                        </div>', f'</p>\n                        {btn_insert}\n                        </div>')

# 3. Add Music Player (from SDC version)
music_start = sdc.find('<!-- MUSIC PLAYER SDC PANEL -->')
music_end = sdc.find('<!-- TOUR DATES SDC PANEL -->')
music_player = sdc[music_start:music_end]
if music_end == -1: music_player = ''

# 4. Add Carousel (New component)
carousel = """
        <!-- GALLERY CAROUSEL -->
        <div class="mt-20 max-w-6xl w-full mx-auto relative z-20">
            <h2 class="text-4xl md:text-5xl font-gothic-metal chrome-text mb-10 text-center">GALERÍA</h2>
            <div class="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide py-4 px-2">
                
                <div class="snap-center shrink-0 w-[300px] h-[300px] chrome-panel border-[3px] chrome-plate-border group hover-fuchsia-glow cursor-pointer relative overflow-hidden transition-transform hover:scale-105">
                    <img src="imgbio/alebio.jpg" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-neonPink opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>

                <div class="snap-center shrink-0 w-[300px] h-[300px] chrome-panel border-[3px] chrome-plate-border group hover-fuchsia-glow cursor-pointer relative overflow-hidden transition-transform hover:scale-105">
                    <img src="almas/Portada2.jpg.jpeg" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-neonPink opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                
                <div class="snap-center shrink-0 w-[300px] h-[300px] chrome-panel border-[3px] chrome-plate-border group hover-fuchsia-glow cursor-pointer relative overflow-hidden flex items-center justify-center transition-transform hover:scale-105">
                    <span class="font-industrial text-gray-500 tracking-widest">NUEVA ERA</span>
                </div>
                
                <div class="snap-center shrink-0 w-[300px] h-[300px] chrome-panel border-[3px] chrome-plate-border group hover-fuchsia-glow cursor-pointer relative overflow-hidden flex items-center justify-center transition-transform hover:scale-105 bg-[#0a0a0a]">
                    <i class="fa-brands fa-youtube text-6xl text-[#333] group-hover:text-neonPink transition-colors"></i>
                </div>
            </div>
        </div>
"""

# 5. Extract Newsletter from Original
news_start = orig.find('<!-- SECCIÓN: Boletín Informativo -->')
news_end = orig.find('</main>', news_start)
news_html = orig[news_start:news_end]

# Enhance Newsletter with SDC styling
news_html = news_html.replace('bg-gray-50 dark:bg-neutral-900', 'chrome-panel border-[3px] chrome-plate-border hover-fuchsia-glow')
news_html = news_html.replace('border border-gray-200 dark:border-gray-800', '')
news_html = news_html.replace('text-gray-700 dark:text-gray-400', 'text-gray-300 font-body text-xl')
news_html = news_html.replace('font-gothic logo-metallic', 'font-gothic-metal chrome-text')
news_html = news_html.replace('bg-white dark:bg-black', 'bg-black text-white font-industrial chrome-plate-border focus:border-neonPink border-2')
news_html = news_html.replace('bg-black dark:bg-white text-white dark:text-black', 'bg-black text-[#ccc] border-2 border-[#444] chrome-panel hover:text-white hover:border-neonPink')


# Wrap everything up
new_html = new_head + hero + bio_html + "\n<div class='w-full max-w-6xl mx-auto flex justify-center mt-20 z-20 relative'>" + music_player + "</div>" + carousel + news_html + orig[news_end:]

# Write back to index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Index HTML fully assembled.")
