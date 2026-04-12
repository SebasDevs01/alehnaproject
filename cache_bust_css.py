import glob

files = glob.glob('*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Bust cache of styles.css
    if 'styles.css?v=3' not in content:
        new_content = content.replace('href="styles.css"', 'href="styles.css?v=3"')
        new_content = new_content.replace('href="styles.css?v=2"', 'href="styles.css?v=3"')
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
                print(f"Busted CSS cache in {filepath}")
