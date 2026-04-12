import re
import os

filepath = 'e:\\alehnaproject.com\\index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update <head> fonts and remove tailwind scripts for custom config if needed, 
# The user wants to keep Tailwind CDN. The main CSS is imported via styles.css.
# We'll just replace body classes to ensure the dark theme is forced on since SDC.A-Ops demands a dark atmosphere.
content = content.replace('bg-lightBg text-black dark:bg-darkBg dark:text-white', 'bg-darkBg text-white dark')

# 2. Update particles container ID
content = content.replace('<div id="particles-container"></div>', '<div id="sdc-antigrav-layer"></div>')

# 3. Completely replace the nav
nav_start = content.find('<nav')
nav_end = content.find('</nav>') + len('</nav>')
if nav_start != -1 and nav_end != -1:
    new_nav = """    <nav class="fixed top-[70px] w-full z-[60] chrome-panel h-[100px] flex items-center md:mt-2 transition-all">
        <div class="container mx-auto px-4 md:px-6 flex justify-between items-center h-full">
            <!-- Left Links -->
            <div class="hidden md:flex flex-1 items-center justify-end gap-6 font-industrial text-sm font-bold tracking-widest uppercase z-[65] mr-8">
                <a href="index.html" class="hover-fuchsia-glow chrome-text px-3 py-1 rounded transition-colors border border-transparent">INICIO</a>
                <a href="biografia.html" class="hover-fuchsia-glow chrome-text px-3 py-1 rounded transition-colors border border-transparent">BIOGRAFÍA</a>
                <a href="music.html" class="hover-fuchsia-glow chrome-text px-3 py-1 rounded transition-colors border border-transparent">MÚSICA</a>
            </div>
            
            <!-- Center Logo / Video -->
            <a href="index.html" class="z-[65] flex-shrink-0 mx-auto h-[120px] w-[200px] flex items-center justify-center transform hover:scale-105 transition-transform relative">
                <div class="absolute inset-0 bg-gradient-to-t from-[#ff007f] to-transparent opacity-20 filter blur-xl rounded-full"></div>
                <video autoplay loop muted playsinline class="w-full h-full object-cover filter drop-shadow-[0_0_15px_rgba(255,0,127,0.8)]">
                    <source src="logoanimado/Logo_Animado_Para_Página_Web.mp4" type="video/mp4">
                </video>
            </a>
            
            <!-- Right Links -->
            <div class="hidden md:flex flex-1 items-center justify-start gap-6 font-industrial text-sm font-bold tracking-widest uppercase z-[65] ml-8">
                <a href="lanzamientos.html" class="hover-fuchsia-glow chrome-text px-3 py-1 rounded transition-colors border border-transparent">LANZAMIENTOS</a>
                <a href="videos.html" class="hover-fuchsia-glow chrome-text px-3 py-1 rounded transition-colors border border-transparent">VIDEOS</a>
                <a href="merch.html" class="hover-fuchsia-glow chrome-text px-3 py-1 rounded transition-colors border border-transparent">MERCH</a>
            </div>
            
            <!-- Mobile / Cart Icons -->
            <div class="flex items-center gap-4 z-[65] absolute right-6">
                <button onclick="toggleCart()" class="relative p-2 text-[#ccc] hover-fuchsia-glow transition-colors rounded-full border border-transparent">
                    <i class="fa-solid fa-cart-shopping text-xl"></i>
                    <span id="cart-count" class="hidden absolute -top-1 -right-1 bg-neonPink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_5px_rgba(255,0,127,1)]">0</span>
                </button>
                <button id="mobile-menu-btn" class="md:hidden p-2 text-2xl text-[#ccc] hover-fuchsia-glow border border-transparent rounded"><i class="fa-solid fa-bars"></i></button>
            </div>
        </div>
    </nav>"""
    content = content[:nav_start] + new_nav + content[nav_end:]

# 4. Replace main content hero
main_start = content.find('<main')
main_start_inner = content.find('>', main_start) + 1
main_end = content.find('</main>')

if main_start != -1 and main_end != -1:
    new_main_content = """
        <!-- SDC.A-Ops Hero Section -->
        <div class="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[60vh] mt-10 mb-20">
            <!-- Portrait with underglow -->
            <div class="relative mb-8 group pulse-fuchsia cursor-pointer">
                <div class="absolute inset-x-0 -bottom-10 h-1/2 bg-gradient-to-t from-neonPink to-transparent opacity-50 mix-blend-color-dodge filter blur-2xl"></div>
                <img src="imgbio/alebio.jpg" alt="Alehna" class="w-[300px] md:w-[450px] aspect-[4/5] object-cover border-4 chrome-plate-border shadow-[0_0_40px_rgba(255,0,127,0.8)] relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                
                <!-- Floating sparks around portrait injected later by JS -->
            </div>

            <!-- Chrome Multilayer Button -->
            <a href="music.html" class="relative z-20 overflow-hidden chrome-panel px-12 py-5 border-2 chrome-plate-border hover-fuchsia-glow group block bg-black">
                <span class="glint-effect"></span>
                <span class="relative z-10 chrome-text font-industrial font-bold text-3xl tracking-[0.2em] group-hover:text-white transition-colors">LISTEN NOW</span>
            </a>
        </div>
        
        <div class="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-20 mb-32 z-20 relative">
            <!-- MUSIC PLAYER SDC PANEL -->
            <div class="chrome-panel p-8 relative overflow-hidden flex flex-col items-center border-[3px] chrome-plate-border group hover-fuchsia-glow">
                <div class="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-neonPink to-transparent opacity-80 pulse-fuchsia"></div>
                
                <h3 class="text-3xl font-gothic-metal chrome-text mb-6">LATEST RELEASE</h3>
                <div class="relative">
                    <img src="almas/Portada2.jpg.jpeg" class="w-48 h-48 mb-6 border-[3px] border-[#333] shadow-[0_0_20px_rgba(255,0,127,0.5)] z-10 relative">
                    <div class="absolute inset-0 bg-neonPink opacity-0 group-hover:opacity-20 filter blur-xl transition-opacity duration-500"></div>
                </div>
                
                <!-- SDC VU Meter -->
                <div class="w-full h-16 bg-black border-[2px] chrome-plate-border mb-6 flex items-end justify-center gap-[2px] p-1" id="vu-meter">
                    <!-- Bars inserted by JS -->
                </div>
                
                <div class="w-full flex items-center justify-between chrome-text font-industrial font-bold mb-4 px-2 tracking-widest text-sm">
                    <span>01:14</span>
                    <input type="range" class="w-3/4 h-2 accent-neonPink bg-[#222] rounded-full appearance-none cursor-pointer border border-[#444]" min="0" max="100" value="35">
                    <span>03:42</span>
                </div>
                
                <div class="flex gap-6 mt-4">
                    <button class="text-[#888] hover-fuchsia-glow chrome-panel w-12 h-12 flex items-center justify-center rounded-full border border-[#444] transition-colors"><i class="fa-solid fa-backward-step"></i></button>
                    <button class="text-white chrome-panel w-16 h-16 flex items-center justify-center rounded-full border border-neonPink shadow-[0_0_20px_rgba(255,0,127,0.9)] hover:scale-105 transition-transform"><i class="fa-solid fa-play text-2xl"></i></button>
                    <button class="text-[#888] hover-fuchsia-glow chrome-panel w-12 h-12 flex items-center justify-center rounded-full border border-[#444] transition-colors"><i class="fa-solid fa-forward-step"></i></button>
                </div>
            </div>
            
            <!-- TOUR DATES SDC PANEL -->
            <div class="flex flex-col justify-center gap-6 z-20">
                <h3 class="text-5xl font-gothic-metal chrome-text text-center md:text-left drop-shadow-md mb-2">UPCOMING TOUR</h3>
                
                <div class="chrome-panel border-l-4 border-l-[#fff] p-5 flex justify-between items-center hover-fuchsia-glow cursor-pointer transition-colors group relative overflow-hidden">
                    <div class="flex flex-col z-10">
                        <span class="text-neonPink font-industrial font-bold tracking-[0.2em] group-hover:drop-shadow-[0_0_8px_rgba(255,0,127,1)] transition-all">NOV 15, 2026</span>
                        <span class="text-gray-300 font-body text-xl md:text-2xl font-bold uppercase tracking-wide">Arena Ciudad de México</span>
                    </div>
                    <div class="px-5 py-2 text-center font-industrial text-sm md:text-md font-bold text-white bg-[#800020] border border-neonPink shadow-[0_0_15px_rgba(255,0,127,1)] relative z-10 tracking-widest pulse-fuchsia">
                        SOLD OUT
                    </div>
                </div>
                
                <div class="chrome-panel border-l-4 border-l-[#555] p-5 flex justify-between items-center hover-fuchsia-glow cursor-pointer transition-colors group relative overflow-hidden">
                    <div class="flex flex-col z-10">
                        <span class="text-neonPink font-industrial font-bold tracking-[0.2em] group-hover:drop-shadow-[0_0_8px_rgba(255,0,127,1)] transition-all">NOV 22, 2026</span>
                        <span class="text-gray-300 font-body text-xl md:text-2xl font-bold uppercase tracking-wide">Movistar Arena, Bogotá</span>
                    </div>
                    <div class="px-5 py-2 text-center font-industrial text-sm md:text-md font-bold chrome-text border border-[#666] bg-black/50 z-10 tracking-widest group-hover:border-white transition-colors">
                        TICKETS
                    </div>
                </div>
                
                <div class="chrome-panel border-l-4 border-l-[#333] p-5 flex justify-between items-center hover-fuchsia-glow cursor-pointer transition-colors group relative overflow-hidden">
                    <div class="flex flex-col z-10">
                        <span class="text-[#666] font-industrial font-bold tracking-[0.2em] transition-all">DIC 05, 2026</span>
                        <span class="text-gray-500 font-body text-xl md:text-2xl font-bold uppercase tracking-wide">Estadio Nacional, Lima</span>
                    </div>
                    <div class="px-5 py-2 text-center font-industrial text-sm md:text-md font-bold text-[#666] border border-[#333] bg-black/50 z-10 tracking-widest">
                        TBA
                    </div>
                </div>
            </div>
        </div>
        """
    content = content[:main_start_inner] + new_main_content + content[main_end:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated internal markup strictly observing SDC.A-Ops specs.")
