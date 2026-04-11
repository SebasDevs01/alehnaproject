import glob, re

banner_old = """    <!-- TOP ANNOUNCEMENT BANNER -->
    <div class="fixed top-0 left-0 w-full z-[80] bg-gradient-to-r from-black via-[#1a000d] to-black border-b-2 border-neonPink shadow-[0_0_20px_rgba(255,0,127,0.4)] h-[70px] flex items-center justify-between px-2 md:px-6">
        <!-- LEFT: COVER & TEXT -->
        <div class="flex items-center gap-3 w-[30%] md:w-1/3">
            <img src="almas/Portada2.jpg.jpeg" alt="ALMAS" class="h-12 w-12 rounded bg-black object-cover shadow-[0_0_10px_rgba(255,0,127,0.8)]">
            <span class="hidden md:block font-gothic tracking-widest text-white font-bold text-sm lg:text-lg whitespace-nowrap">ALMAS<span class="text-neonPink">.</span> RELEASE</span>
        </div>
        
        <!-- CENTER: COUNTDOWN -->
        <div class="flex items-center justify-center w-[40%] md:w-1/3 text-center gap-2 md:gap-4 font-gothic">
            <div class="flex flex-col items-center"><span id="top-days" class="text-xl md:text-3xl font-black text-white leading-none">00</span><span class="text-[9px] md:text-xs uppercase font-bold text-gray-400 tracking-widest mt-1">Días</span></div>
            <span class="text-xl md:text-3xl font-black text-gray-600 leading-none pb-2 md:pb-4">:</span>
            <div class="flex flex-col items-center"><span id="top-hours" class="text-xl md:text-3xl font-black text-white leading-none">00</span><span class="text-[9px] md:text-xs uppercase font-bold text-gray-400 tracking-widest mt-1">Hrs</span></div>
            <span class="text-xl md:text-3xl font-black text-gray-600 leading-none pb-2 md:pb-4">:</span>
            <div class="flex flex-col items-center"><span id="top-minutes" class="text-xl md:text-3xl font-black text-white leading-none">00</span><span class="text-[9px] md:text-xs uppercase font-bold text-gray-400 tracking-widest mt-1">Min</span></div>
            <span class="text-xl md:text-3xl font-black text-gray-600 leading-none pb-2 md:pb-4">:</span>
            <div class="flex flex-col items-center"><span id="top-seconds" class="text-xl md:text-3xl font-black text-neonPink leading-none drop-shadow-[0_0_8px_rgba(255,0,127,1)]">00</span><span class="text-[9px] md:text-xs uppercase font-bold text-neonPink tracking-widest mt-1">Seg</span></div>
        </div>

        <!-- RIGHT: BUTTON -->
        <div class="w-[30%] md:w-1/3 flex justify-end">
            <a id="top-youtube-btn" href="https://www.youtube.com/@ALEHNAOFICIAL" target="_blank" class="bg-white text-black font-extrabold uppercase tracking-widest text-[10px] md:text-xs px-3 py-2 md:px-6 md:py-2.5 rounded hover:bg-neonPink hover:text-white hover:shadow-[0_0_20px_rgba(255,0,127,0.8)] transition-all flex items-center gap-2 whitespace-nowrap">
                <i class="fa-brands fa-youtube text-lg md:text-xl"></i><span class="hidden lg:inline">Escuchar ahora</span>
            </a>
        </div>
    </div>"""

banner_new = """    <!-- TOP ANNOUNCEMENT BANNER -->
    <div class="fixed top-0 left-0 w-full z-[80] bg-gradient-to-r from-gray-50 via-[#ffe6f2] to-gray-50 dark:from-black dark:via-[#1a000d] dark:to-black border-b-2 border-neonPink shadow-[0_0_20px_rgba(255,0,127,0.3)] dark:shadow-[0_0_20px_rgba(255,0,127,0.4)] h-[70px] flex items-center justify-between px-2 md:px-6 transition-colors duration-300">
        <!-- LEFT: COVER & TEXT -->
        <div class="flex items-center gap-3 w-[30%] md:w-1/3">
            <img src="almas/Portada2.jpg.jpeg" alt="ALMAS" class="h-12 w-12 rounded bg-black object-cover shadow-[0_0_10px_rgba(255,0,127,0.5)] dark:shadow-[0_0_10px_rgba(255,0,127,0.8)]">
            <span class="hidden md:block font-gothic tracking-widest text-black dark:text-white font-bold text-sm lg:text-lg whitespace-nowrap">ALMAS<span class="text-neonPink">.</span> RELEASE</span>
        </div>
        
        <!-- CENTER: COUNTDOWN -->
        <div class="flex items-center justify-center w-[40%] md:w-1/3 text-center gap-2 md:gap-4 font-gothic">
            <div class="flex flex-col items-center"><span id="top-days" class="text-xl md:text-3xl font-black text-black dark:text-white leading-none">00</span><span class="text-[9px] md:text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mt-1">Días</span></div>
            <span class="text-xl md:text-3xl font-black text-gray-400 dark:text-gray-600 leading-none pb-2 md:pb-4">:</span>
            <div class="flex flex-col items-center"><span id="top-hours" class="text-xl md:text-3xl font-black text-black dark:text-white leading-none">00</span><span class="text-[9px] md:text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mt-1">Hrs</span></div>
            <span class="text-xl md:text-3xl font-black text-gray-400 dark:text-gray-600 leading-none pb-2 md:pb-4">:</span>
            <div class="flex flex-col items-center"><span id="top-minutes" class="text-xl md:text-3xl font-black text-black dark:text-white leading-none">00</span><span class="text-[9px] md:text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mt-1">Min</span></div>
            <span class="text-xl md:text-3xl font-black text-gray-400 dark:text-gray-600 leading-none pb-2 md:pb-4">:</span>
            <div class="flex flex-col items-center"><span id="top-seconds" class="text-xl md:text-3xl font-black text-neonPink leading-none drop-shadow-[0_0_5px_rgba(255,0,127,0.5)] dark:drop-shadow-[0_0_8px_rgba(255,0,127,1)]">00</span><span class="text-[9px] md:text-xs uppercase font-bold text-neonPink tracking-widest mt-1">Seg</span></div>
        </div>

        <!-- RIGHT: BUTTON -->
        <div class="w-[30%] md:w-1/3 flex justify-end">
            <a id="top-youtube-btn" href="https://www.youtube.com/@ALEHNAOFICIAL" target="_blank" class="bg-black text-white dark:bg-white dark:text-black font-extrabold uppercase tracking-widest text-[10px] md:text-xs px-3 py-2 md:px-6 md:py-2.5 rounded hover:bg-neonPink hover:text-white dark:hover:bg-neonPink dark:hover:text-white hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] dark:hover:shadow-[0_0_20px_rgba(255,0,127,0.8)] transition-all flex items-center gap-2 whitespace-nowrap">
                <i class="fa-brands fa-youtube text-lg md:text-xl"></i><span class="hidden lg:inline">Escuchar ahora</span>
            </a>
        </div>
    </div>"""

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strip whitespaces perfectly for replacement or use regex
    # The banner string might have slight differences in indentation across files
    
    # Let's find the start and end of the banner
    start_str = '<!-- TOP ANNOUNCEMENT BANNER -->'
    end_str = '<!-- RIGHT: BUTTON -->'
    
    if start_str in content and end_str in content:
        start_idx = content.find(start_str)
        # End index should catch the closing </div> of the banner which is the 3rd </div> after end_str
        part = content[start_idx:]
        end_idx_offset = part.find('</a>\n        </div>\n    </div>') + len('</a>\n        </div>\n    </div>')
        
        if end_idx_offset > len('</a>\n        </div>\n    </div>'):
            old_block = part[:end_idx_offset]
            content = content.replace(old_block, banner_new)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated banner in {filepath}")
        else:
            print(f"Could not find exact end in {filepath}")
