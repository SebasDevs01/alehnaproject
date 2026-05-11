import os
import sys

try:
    from PIL import Image
except ImportError:
    print("Error: La librería Pillow no está instalada.")
    print("Por favor, abre tu terminal (PowerShell) y ejecuta este comando antes de correr el script:")
    print("    pip install Pillow")
    sys.exit(1)

def optimize_directory(input_dir, max_size=(1920, 1920), quality=80):
    if not os.path.exists(input_dir):
        print(f"La carpeta '{input_dir}' no existe. Omitiendo...")
        return
    
    print(f"Optimizando imágenes en: {input_dir}")
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(input_dir, filename)
            
            # Obtener el tamaño original
            original_size = os.path.getsize(filepath)
            
            # Si la imagen ya es pequeña (menor a 500KB), la omitimos para no procesarla doble
            if original_size < 500 * 1024:
                print(f"  -> {filename} ya está optimizada ({(original_size/1024/1024):.2f} MB). Omitiendo.")
                continue
                
            try:
                img = Image.open(filepath)
                # Convertir a RGB si es necesario (para guardar en JPEG)
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                
                # Redimensionar manteniendo la proporción
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Sobrescribir la imagen optimizada
                img.save(filepath, format='JPEG', quality=quality, optimize=True)
                
                new_size = os.path.getsize(filepath)
                print(f"  -> Optimizado: {filename} (De {(original_size/1024/1024):.2f} MB a {(new_size/1024/1024):.2f} MB)")
            except Exception as e:
                print(f"  -> Error procesando {filepath}: {e}")

if __name__ == "__main__":
    print("==================================================")
    print(" INICIANDO OPTIMIZACIÓN DE IMÁGENES")
    print("==================================================")
    
    # Directorios con imágenes muy pesadas
    optimize_directory("imagenescarrusel")
    optimize_directory("imagenesvinotinto")
    optimize_directory("bioinicio")
    
    print("==================================================")
    print(" ¡OPTIMIZACIÓN COMPLETADA!")
    print("==================================================")
