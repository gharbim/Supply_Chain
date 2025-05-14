from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping
import tensorflow as tf

# --- Paramètres ---
IMAGE_SIZE = 224
BATCH_SIZE = 32
NUM_CLASSES = 6  # blush, eyeliner, eyeshadow, foundation, lipstick, mascara

# --- Génération des données ---
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=15,    # 🔥 Ajout de rotation aléatoire
    zoom_range=0.1,       # 🔥 Zoom aléatoire
    horizontal_flip=True  # 🔥 Flip horizontal aléatoire
)

train_generator = train_datagen.flow_from_directory(
    'cosmetics_dataset/',
    target_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_generator = train_datagen.flow_from_directory(
    'cosmetics_dataset/',
    target_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# --- Charger MobileNetV2 sans la tête (include_top=False) ---
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3))

# --- Geler les couches convolutionnelles ---
base_model.trainable = False

# --- Ajouter une tête personnalisée ---
x = base_model.output
x = GlobalAveragePooling2D()(x)
predictions = Dense(NUM_CLASSES, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# --- Compiler ---
model.compile(optimizer=Adam(learning_rate=0.001), loss='categorical_crossentropy', metrics=['accuracy'])

# --- Early stopping ---
early_stop = EarlyStopping(monitor='val_loss', patience=5)

# --- Entraîner ---
model.fit(
    train_generator,
    epochs=10,
    validation_data=val_generator,
    callbacks=[early_stop]
)

# --- Sauvegarder au format .keras ---
model.save('model_cosmetics_fixed.keras')

print("✅ Nouveau modèle sauvegardé : model_cosmetics_fixed.keras")
