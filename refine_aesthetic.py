import glob

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update Top Banner Aesthetic & Position
    # Change fixed to absolute, improve colors to SDC spec
    if 'fixed top-0' in html:
        html = html.replace('fixed top-0', 'absolute top-0')
    
    # Apply SDC class to the banner background
    html = html.replace('bg-gradient-to-r from-gray-50 via-[#ffe6f2] to-gray-50 dark:from-black dark:via-[#1a000d] dark:to-black border-b-2 border-neonPink shadow-[0_0_20px_rgba(255,0,127,0.3)] dark:shadow-[0_0_20px_rgba(255,0,127,0.4)]', 
                        'chrome-panel border-b-2 border-[#333] shadow-none bg-black')
                        
    # Ensure "ALMAS. RELEASE" is chrome
    html = html.replace('font-gothic tracking-widest text-black dark:text-white', 'font-gothic-metal tracking-widest chrome-text')

    # Ensure Days/Hrs/Min text is industrial
    html = html.replace('font-gothic', 'font-industrial')

    # 2. Fix Nav detachment (remove md:mt-2) and change to absolute
    if 'md:mt-2' in html:
        html = html.replace('md:mt-2', '')
        
    if '<nav class="fixed top-[70px]' in html:
        html = html.replace('<nav class="fixed top-[70px]', '<nav class="absolute top-[70px]')

    # 3. For index.html: Apply mix-blend-screen to the hero video
    if 'Logo_Animado_Para_Página_Web.mp4' in html:
        # We need to find the video tag and inject the class
        # It current looks like: video autoplay loop muted playsinline class="w-full max-w-[800px] object-contain drop-shadow-[0_0_20px_rgba(255,0,127,0.8)] filter transition-transform duration-1000 hover:scale-[1.02] relative z-10"
        html = html.replace('drop-shadow-[0_0_20px_rgba(255,0,127,0.8)] filter', 'mix-blend-screen filter-none')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Refined {filepath}")

for f in glob.glob('*.html'):
    clean_file(f)
