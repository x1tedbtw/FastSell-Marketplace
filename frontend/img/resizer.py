from PIL import Image

# Open the image
with Image.open('dota2.png') as img:
    # Resize the image
    img_resized = img.resize((140, 140), Image.ANTIALIAS)

    # Save the resized image
    resized_path = './dota2_.png'
    img_resized.save(resized_path, format='PNG', optimize=True)

resized_path