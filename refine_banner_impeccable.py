import glob
import re

new_banner = """    <!-- TOP ANNOUNCEMENT BANNER -->
    <div class="absolute top-0 left-0 w-full z-[80] chrome-panel border-b-2 border-neonPink h-[70px] flex items-center justify-between px-4 md:px-8 shadow-[0_0_15px_rgba(255,0,127,0.2)]">
        <!-- Logo / Title -->
        <div class="flex items-center gap-3">
            <img src="almas/Portada2.jpg.jpeg" alt="Almas Cover"
                class="w-10 h-10 object-cover rounded shadow-[0_0_10px_rgba(255,0,127,0.8)] border border-[#ff007f]">
            <span class="font-gothic-metal tracking-widest chrome-text text-lg md:text-xl font-bold uppercase hidden sm:block">ALMAS. RELEASE</span>
        </div>
        <!-- Countdown -->
        <div class="flex items-center gap-2 md:gap-4 font-industrial font-bold tracking-widest">
            <div class="flex flex-col items-center">
                <span id="days" class="text-2xl md:text-3xl leading-none chrome-text">00</span>
                <span class="text-[10px] md:text-xs text-gray-400 uppercase">DÍAS</span>
            </div>
            <span class="text-xl md:text-2xl pb-3 text-gray-600">:</span>
            <div class="flex flex-col items-center">
                <span id="hours" class="text-2xl md:text-3xl leading-none chrome-text">00</span>
                <span class="text-[10px] md:text-xs text-gray-400 uppercase">HRS</span>
            </div>
            <span class="text-xl md:text-2xl pb-3 text-gray-600">:</span>
            <div class="flex flex-col items-center">
                <span id="minutes" class="text-2xl md:text-3xl leading-none chrome-text">00</span>
                <span class="text-[10px] md:text-xs text-gray-400 uppercase">MIN</span>
            </div>
            <span class="text-xl md:text-2xl pb-3 text-gray-600">:</span>
            <div class="flex flex-col items-center">
                <span id="seconds" class="text-2xl md:text-3xl leading-none text-white drop-shadow-[0_0_8px_rgba(255,0,127,1)]" style="text-shadow: 0 0 10px #ff007f, 0 0 20px #ff007f;">00</span>
                <span class="text-[10px] md:text-xs text-neonPink uppercase drop-shadow-[0_0_5px_rgba(255,0,127,1)]">SEG</span>
            </div>
        </div>
        <!-- CTA -->
        <a href="music.html"
            class="chrome-panel border-[2px] chrome-plate-border px-4 py-1.5 md:px-6 md:py-2 rounded-sm text-[#ccc] font-industrial uppercase font-bold text-xs md:text-sm flex items-center gap-2 hover:border-neonPink hover:text-white transition-all shadow-lg hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] group">
            <i class="fa-brands fa-youtube text-red-600 group-hover:text-white transition-colors"></i> <span class="hidden md:inline">ESCUCHAR AHORA</span>
        </a>
    </div>"""

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Try to find the banner bounds
    start_tag = '<!-- TOP ANNOUNCEMENT BANNER -->'
    end_tag = '<!-- HEADER -->'
    start_idx = html.find(start_tag)
    end_idx = html.find(end_tag)
    
    if start_idx != -1 and end_idx != -1:
        new_html = html[:start_idx] + new_banner + "\n    " + html[end_idx:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f"Updated banner in {filepath}")
    else:
        print(f"Could not find banner bounds in {filepath}")
