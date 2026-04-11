import glob, re

banner_new = """    <!-- TOP ANNOUNCEMENT BANNER -->
    <div class="fixed top-0 left-0 w-full z-[80] bg-gradient-to-r from-gray-50 via-[#ffe6f2] to-gray-50 dark:from-black dark:via-[#1a000d] dark:to-black border-b-2 border-neonPink shadow-[0_0_20px_rgba(255,0,127,0.3)] dark:shadow-[0_0_20px_rgba(255,0,127,0.4)] h-[70px] flex items-center justify-between px-2 sm:px-4 md:px-6 transition-colors duration-300">
        <!-- LEFT: COVER & TEXT -->
        <div class="flex items-center gap-2 md:gap-3 shrink-0">
            <img src="almas/Portada2.jpg.jpeg" alt="ALMAS" class="h-10 w-10 md:h-12 md:w-12 rounded bg-black object-cover shadow-[0_0_10px_rgba(255,0,127,0.5)] dark:shadow-[0_0_10px_rgba(255,0,127,0.8)]">
            <span class="hidden md:block font-gothic tracking-widest text-black dark:text-white font-bold text-sm lg:text-lg whitespace-nowrap">ALMAS<span class="text-neonPink">.</span> RELEASE</span>
        </div>
        
        <!-- CENTER: COUNTDOWN -->
        <div class="flex items-center justify-center flex-1 mx-1 sm:mx-2 text-center gap-1 sm:gap-2 md:gap-4 font-gothic">
            <div class="flex flex-col items-center"><span id="top-days" class="text-base sm:text-xl md:text-3xl font-black text-black dark:text-white leading-none">00</span><span class="text-[8px] sm:text-[9px] md:text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mt-0.5 md:mt-1">Días</span></div>
            <span class="text-base sm:text-xl md:text-3xl font-black text-gray-400 dark:text-gray-600 leading-none pb-2 md:pb-4">:</span>
            <div class="flex flex-col items-center"><span id="top-hours" class="text-base sm:text-xl md:text-3xl font-black text-black dark:text-white leading-none">00</span><span class="text-[8px] sm:text-[9px] md:text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mt-0.5 md:mt-1">Hrs</span></div>
            <span class="text-base sm:text-xl md:text-3xl font-black text-gray-400 dark:text-gray-600 leading-none pb-2 md:pb-4">:</span>
            <div class="flex flex-col items-center"><span id="top-minutes" class="text-base sm:text-xl md:text-3xl font-black text-black dark:text-white leading-none">00</span><span class="text-[8px] sm:text-[9px] md:text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mt-0.5 md:mt-1">Min</span></div>
            <span class="text-base sm:text-xl md:text-3xl font-black text-gray-400 dark:text-gray-600 leading-none pb-2 md:pb-4">:</span>
            <div class="flex flex-col items-center"><span id="top-seconds" class="text-base sm:text-xl md:text-3xl font-black text-neonPink leading-none drop-shadow-[0_0_5px_rgba(255,0,127,0.5)] dark:drop-shadow-[0_0_8px_rgba(255,0,127,1)]">00</span><span class="text-[8px] sm:text-[9px] md:text-xs uppercase font-bold text-neonPink tracking-widest mt-0.5 md:mt-1">Seg</span></div>
        </div>

        <!-- RIGHT: BUTTON -->
        <div class="flex justify-end shrink-0">
            <a id="top-youtube-btn" href="https://www.youtube.com/@ALEHNAOFICIAL" target="_blank" class="bg-black text-white dark:bg-white dark:text-black font-extrabold uppercase tracking-widest text-[9px] md:text-xs px-2.5 py-1.5 md:px-6 md:py-2.5 rounded hover:bg-neonPink hover:text-white dark:hover:bg-neonPink dark:hover:text-white hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] dark:hover:shadow-[0_0_20px_rgba(255,0,127,0.8)] transition-all flex items-center justify-center whitespace-nowrap">
                <i class="fa-brands fa-youtube text-base sm:text-lg md:text-xl"></i><span class="hidden lg:inline ml-2">Escuchar ahora</span>
            </a>
        </div>
    </div>"""

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The block starts at <!-- TOP ANNOUNCEMENT BANNER -->
    # and ends at the closing div of the RIGHT block.
    # regex should match reliably.
    
    pattern = r'<!-- TOP ANNOUNCEMENT BANNER -->[\s\S]*?<!-- RIGHT: BUTTON -->[\s\S]*?</a>\s*</div>\s*</div>'
    new_content = re.sub(pattern, banner_new, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated responsive banner in {filepath}")
    else:
        print(f"Did not find match in {filepath}")
