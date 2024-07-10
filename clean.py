import os

# Define the base directory containing the folders
base_dir = 'miniset'

# Define the folders you want to process
folders = ['hourglass']

# Loop through each folder
for folder in folders:
    folder_path = os.path.join(base_dir, folder)
    
    if os.path.isdir(folder_path):
        # List all files in the current folder
        files = os.listdir(folder_path)
        
        # Loop through each file and rename it
        for i, filename in enumerate(files, start=1):
            # Construct the new filename
            new_filename = f"{i}.jpeg"
            
            # Construct full file paths
            old_file = os.path.join(folder_path, filename)
            new_file = os.path.join(folder_path, new_filename)
            
            # Rename the file
            os.rename(old_file, new_file)
            
        print(f"Renamed files in {folder_path}")
    else:
        print(f"Folder {folder_path} does not exist")
