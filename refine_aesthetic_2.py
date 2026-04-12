import glob
import re

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the top announcement banner div and replace its classes entirely to be robust
    html = re.sub(
        r'<div class="absolute top-0 left-0 w-full z-\[80\].*?h-\[70px\]',
        r'<div class="absolute top-0 left-0 w-full z-[80] chrome-panel border-b border-[#333] h-[70px]',
        html,
        flags=re.DOTALL
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Refined {filepath}")
