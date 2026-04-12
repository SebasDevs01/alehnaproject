import os
import re

files = ["index.html", "videos.html", "biografia.html", "lanzamientos.html", "merch.html", "music.html"]

new_banner = """        <div class="w-full bg-pastelBeige border-b border-pastelCafe h-[53px] grid grid-cols-3 items-center px-2 md:px-4 text-pastelCafe text-xs">
            <!-- IZQUIERDA: Caratula y Album -->
            <div class="flex items-center justify-start gap-2">
                <div class="relative w-8 h-8 md:w-10 md:h-10 ml-2 hidden sm:block">
                    <div class="absolute inset-0 rounded-full border border-gray-600 bg-gray-900 flex items-center justify-center shadow-md spin-vinyl-auto z-0" style="transform: translateX(8px);">
                        <img src="almas/Portada2.jpg.jpeg" class="w-1/3 h-1/3 rounded-full border border-white/50">
                        <div class="absolute w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <div class="absolute inset-0 bg-white border border-gray-300 shadow bg-cover bg-center z-10 rounded-sm" style="background-image: url('almas/Portada2.jpg.jpeg');"></div>
                </div>
                <span class="font-marker tracking-widest text-pastelVino md:text-sm lg:block mt-1 hidden sm:block">ALMAS</span>
            </div>

            <!-- CENTRO: Contador -->
            <div class="flex items-center justify-center gap-1 md:gap-3 font-bold tracking-widest font-main">
                <div class="flex items-center gap-1"><span id="days" class="text-pastelVino text-sm md:text-base">00</span><span class="text-[8px] md:text-[10px] uppercase">Días</span></div><span class="hidden sm:inline">:</span>
                <div class="flex items-center gap-1"><span id="hours" class="text-pastelVino text-sm md:text-base">00</span><span class="text-[8px] md:text-[10px] uppercase">Hrs</span></div><span class="hidden sm:inline">:</span>
                <div class="flex items-center gap-1"><span id="minutes" class="text-pastelVino text-sm md:text-base">00</span><span class="text-[8px] md:text-[10px] uppercase">Min</span></div><span class="hidden sm:inline">:</span>
                <div class="flex items-center gap-1"><span id="seconds" class="text-pastelVino text-sm md:text-base">00</span><span class="text-[8px] md:text-[10px] uppercase">Seg</span></div>
            </div>

            <!-- DERECHA: YouTube -->
            <div class="flex justify-end">
                <a href="https://www.youtube.com/@ALEHNAOFICIAL" target="_blank" class="px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-2 transition-all border-2 border-pastelCafe text-pastelCafe hover:bg-pastelVino hover:text-white hover:border-pastelVino shadow-sm bg-white group">
                    <i class="fa-brands fa-youtube text-sm md:text-base text-pastelVino group-hover:text-white transition-colors"></i> <span class="hidden md:inline">YOUTUBE</span>
                </a>
            </div>
        </div>"""

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We use regex to replace from <div class="w-full bg-pastelBeige border-b border-pastelCafe h-[53px]
    # to the closing </div> right before <header id="header"
    pattern = re.compile(r'(<!-- Top Announcement Banner -->\s*)?<div class="w-full bg-pastelBeige border-b border-pastelCafe h-\[53px\].*?</div>(\s*<header id="header")', re.DOTALL)
    
    new_content = pattern.sub(f'{new_banner}\\2', content)
    
    if file == "lanzamientos.html":
        # JS update for click interaction
        new_content = new_content.replace(
            "vinylWrapper.classList.toggle('is-open');",
            "vinylWrapper.classList.toggle('disc-open');\n                vinylWrapper.classList.add('info-open');"
        )
        # CSS update
        new_content = new_content.replace(
            ".group.is-open .vinyl-disc { transform: translateX(8rem) rotate(90deg); }",
            ".group.disc-open .vinyl-disc { transform: translateX(8rem) rotate(90deg); }"
        )
        new_content = new_content.replace(
            ".group.is-open .vinyl-sleeve { transform: translateX(-2rem); }",
            ".group.disc-open .vinyl-sleeve { transform: translateX(-2rem); }"
        )
        new_content = new_content.replace(
            ".group.is-open .info-panel { opacity: 1; transform: translateX(0); pointer-events: auto; }",
            ".group.info-open .info-panel { opacity: 1; transform: translateX(0); pointer-events: auto; }"
        )

    with open(file, "w", encoding="utf-8") as f:
        f.write(new_content)

print(f"Updated {len(files)} files successfully.")
