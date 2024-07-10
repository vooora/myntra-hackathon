# Import necessary libraries
import os
import numpy as np
import cv2
from PIL import Image
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from keras.applications.resnet50 import ResNet50, preprocess_input
from keras.preprocessing import image
from keras.models import Model

dataset_path = 'processed_dataset'
folders = ['apple', 'hourglass', 'invtri', 'rectangle', 'triangle']
num_classes = len(folders)

folder_to_label = {folder: idx for idx, folder in enumerate(folders)}
print("Folder to label mapping:", folder_to_label)

base_model = ResNet50(weights='imagenet', include_top=False, pooling='avg')

def get_embedding(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_data = image.img_to_array(img)
    img_data = np.expand_dims(img_data, axis=0)
    img_data = preprocess_input(img_data)
    embedding = base_model.predict(img_data)
    return embedding[0]

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

encoder = LabelEncoder()
Y_encoded = encoder.fit_transform(Y)

print("Classes found:", encoder.classes_)
print("Label distribution:", np.bincount(Y_encoded))

np.savez_compressed('dataset_embeddings.npz', X, Y_encoded)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y_encoded, test_size=0.2, random_state=17)

model = SVC(kernel='linear', probability=True)
model.fit(X_train, Y_train)

ypreds_train = model.predict(X_train)
ypreds_test = model.predict(X_test)

train_accuracy = accuracy_score(Y_train, ypreds_train)
test_accuracy = accuracy_score(Y_test, ypreds_test)

print(f'Training accuracy: {train_accuracy:.4f}')
print(f'Testing accuracy: {test_accuracy:.4f}')

test_image_path = 'IMG_8246.jpeg'
test_image = cv2.imread(test_image_path)
test_image = cv2.cvtColor(test_image, cv2.COLOR_BGR2RGB)
test_image_resized = cv2.resize(test_image, (224, 224))

test_image_embedding = get_embedding(test_image_path)
test_image_embedding = np.expand_dims(test_image_embedding, axis=0)

test_prediction = model.predict(test_image_embedding)
predicted_class = encoder.inverse_transform(test_prediction)

test_probabilities = model.predict_proba(test_image_embedding)

print(f'Test image embedding shape: {test_image_embedding.shape}')
print(f'Test prediction raw output: {test_prediction}')
print(f'Predicted class: {folders[predicted_class[0]]}')

for idx, class_name in enumerate(encoder.classes_):
    print(f'Probability for {class_name}: {test_probabilities[0][idx]:.4f}')
