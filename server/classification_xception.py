# Import necessary libraries
import os
import numpy as np
#import cv2
from PIL import Image
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from keras.applications.xception import Xception, preprocess_input
from keras.preprocessing import image
from keras.models import Model

# Define paths
dataset_path = 'processed_dataset'
folders = ['apple', 'hourglass', 'invtri', 'rectangle', 'triangle']
num_classes = len(folders)

# Map folder names to class labels
folder_to_label = {folder: idx for idx, folder in enumerate(folders)}
print("Folder to label mapping:", folder_to_label)

# Initialize the base Xception model
base_model = Xception(weights='imagenet', include_top=False, pooling='avg')

def get_embedding(img_path):
    img = image.load_img(img_path, target_size=(299, 299))  # Xception uses 299x299 images
    img_data = image.img_to_array(img)
    img_data = np.expand_dims(img_data, axis=0)
    img_data = preprocess_input(img_data)
    embedding = base_model.predict(img_data)
    return embedding[0]

# Prepare the dataset
X = []
Y = []

for folder, label in folder_to_label.items():
    folder_path = os.path.join(dataset_path, folder)
    for filename in os.listdir(folder_path):
        if filename.endswith('.jpeg'):
            file_path = os.path.join(folder_path, filename)
            embedding = get_embedding(file_path)
            X.append(embedding)
            Y.append(label)

X = np.array(X)
Y = np.array(Y)

# Encode the labels
encoder = LabelEncoder()
Y_encoded = encoder.fit_transform(Y)

print("Classes found:", encoder.classes_)
print("Label distribution:", np.bincount(Y_encoded))

# Save the embeddings and labels
np.savez_compressed('dataset_embeddings.npz', X, Y_encoded)

# Split the dataset into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y_encoded, test_size=0.2, random_state=17)

# Train an SVM classifier
model = SVC(kernel='linear', probability=True)
model.fit(X_train, Y_train)

# Predict on the training and testing sets
ypreds_train = model.predict(X_train)
ypreds_test = model.predict(X_test)

# Calculate accuracy
train_accuracy = accuracy_score(Y_train, ypreds_train)
test_accuracy = accuracy_score(Y_test, ypreds_test)

print(f'Training accuracy: {train_accuracy:.4f}')
print(f'Testing accuracy: {test_accuracy:.4f}')
