import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make the container a flex centering box, keep aspect-video/h-something so the page doesn't jump,
# and use object-contain so the image is fully visible without cropping.
old_container = '<div class="relative w-full aspect-square md:aspect-video chrome-panel border-[3px] chrome-plate-border group hover-fuchsia-glow cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(255,0,127,0.3)] transition-transform hover:scale-[1.02]" id="main-gallery-container">'
new_container = '<div class="relative w-full h-[400px] md:h-[600px] chrome-panel border-[3px] chrome-plate-border group hover-fuchsia-glow cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(255,0,127,0.3)] transition-transform hover:scale-[1.02] flex items-center justify-center bg-black/50" id="main-gallery-container">'

if old_container in html:
    html = html.replace(old_container, new_container)

# Change image from object-cover to object-contain so it doesn't get cut
old_img = 'class="w-full h-full object-cover transition-opacity duration-500"'
new_img = 'class="w-full h-full object-contain transition-opacity duration-500"'

if old_img in html:
    html = html.replace(old_img, new_img)
    
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
    
print("Updated index.html: container layout fixed, object-contain applied.")
