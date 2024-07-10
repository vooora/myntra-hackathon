#pip install -qr https://huggingface.co/briaai/RMBG-1.4/resolve/main/requirements.txt
import os
from PIL import Image
import matplotlib.pyplot as plt
from transformers import pipeline

# Define the base directory containing the folders
base_dir = 'miniset'
folders = ['hourglass']
output_base_dir = 'processed_dataset3'

# Create the output base directory if it doesn't exist
os.makedirs(output_base_dir, exist_ok=True)

# Load the image segmentation pipeline
pipe = pipeline("image-segmentation", model="briaai/RMBG-1.4", trust_remote_code=True)

# Loop through each folder
for folder in folders:
    folder_path = os.path.join(base_dir, folder)
    output_folder_path = os.path.join(output_base_dir, folder)
    os.makedirs(output_folder_path, exist_ok=True)
    
    if os.path.isdir(folder_path):
        # List all files in the current folder
        files = [f for f in os.listdir(folder_path) if f.endswith('.jpeg')]
        
        # Loop through each file and preprocess it
        for i, filename in enumerate(files, start=1):
            image_path = os.path.join(folder_path, filename)
            original_image = Image.open(image_path)

            # Apply image segmentation
            pillow_mask = pipe(image_path, return_mask=True) # outputs a pillow mask
            pillow_image = pipe(image_path)
            masked_image = Image.composite(original_image, pillow_image, pillow_mask)
            bw_image = masked_image.convert("L")

            # Save the preprocessed image
            output_image_path = os.path.join(output_folder_path, f"{i}.jpeg")
            bw_image.save(output_image_path)
            
        print(f"Processed and saved images in {output_folder_path}")
    else:
        print(f"Folder {folder_path} does not exist")

print("All images have been processed and saved.")
