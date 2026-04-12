import os

files = ["index.html", "videos.html", "biografia.html", "lanzamientos.html", "merch.html", "music.html"]

for file in files:
    if not os.path.exists(file):
        continue
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Remove -mt-2 from countdown
    content = content.replace(
        'px-3 py-1 -mt-2 shadow-sm relative z-50',
        'px-3 py-1 shadow-sm relative z-50'
    )
    
    # 2. Add visual rotation to the mini vinyl (already applied in index.html, but apply to others)
    # The new version might or might not have conic-gradient already. Let's make sure.
    target_vinyl = '<div class="absolute inset-0 rounded-full border border-gray-600 bg-gray-900 flex items-center justify-center shadow-md spin-vinyl-auto z-0" style="transform: translateX(8px);">'
    replacement_vinyl = '<div class="absolute inset-0 rounded-full border border-gray-600 bg-gray-900 flex items-center justify-center shadow-md spin-vinyl-auto z-0" style="transform: translateX(8px); background: conic-gradient(from 0deg, #181514 0%, #4a403d 10%, #181514 20%, #181514 40%, #4a403d 50%, #181514 60%, #181514 90%, #4a403d 100%);">'
    content = content.replace(target_vinyl, replacement_vinyl)

    # 3. Remove duplicate inline menu script
    # It might have varying whitespace, so let's use regex or just a precise string
    inline_script = """        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        function toggleMenu() { 
            if(menu.classList.contains('hidden')) {
                menu.classList.remove('hidden'); menu.classList.add('flex');
            } else {
                menu.classList.add('hidden'); menu.classList.remove('flex');
            }
        }
        btn.addEventListener('click', toggleMenu);"""
    
    if inline_script in content:
        content = content.replace(inline_script, "")

    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

# Update main.js
import re

with open("main.js", "r", encoding="utf-8") as f:
    main_content = f.read()

target_init_menu = """function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}"""

new_init_menu = """function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    // Definir funcion global para los enlaces del menu (onclick="toggleMenu()")
    window.toggleMenu = () => {
        if(menu) menu.classList.toggle('hidden');
    };

    if (btn && menu) {
        btn.addEventListener('click', window.toggleMenu);
    }
}"""

if target_init_menu in main_content:
    main_content = main_content.replace(target_init_menu, new_init_menu)

with open("main.js", "w", encoding="utf-8") as f:
    f.write(main_content)

print("Done.")
