import pickle
import numpy as np

# Charger le modèle SVR
with open('svr_model.pkl', 'rb') as f:
    svr_model = pickle.load(f)

# Fonction pour prédire la quantité utilisée
def predict_quantity(input_features):
    try:
        features_array = np.array([list(input_features.values())])
        prediction = svr_model.predict(features_array)[0]
        return round(prediction, 2)
    except Exception as e:
        return f"Erreur: {str(e)}"
