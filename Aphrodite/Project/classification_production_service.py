import pickle
import numpy as np
import pandas as pd

# 📦 Charger le modèle Random Forest
with open('random_forest_model.pkl', 'rb') as f:
    model = pickle.load(f)

# 📦 Charger la liste des colonnes attendues
with open('random_forest_model_columns.pkl', 'rb') as f:
    model_columns = pickle.load(f)

# 📦 Fonction pour prédire la catégorie
def predict_category(input_data):
    try:
        # Créer un DataFrame vide avec toutes les colonnes
        input_df = pd.DataFrame(columns=model_columns)
        input_df.loc[0] = 0  # Initialiser toutes les valeurs à 0

        # Remplir les colonnes envoyées par l'utilisateur
        for key, value in input_data.items():
            if key in input_df.columns:
                input_df.at[0, key] = value
            else:
                print(f"⚠️ Champ non utilisé : {key}")

        # Prédire
        prediction_encoded = model.predict(input_df)[0]

        # Dictionnaire de correspondance
        categories = {0: 'Faible', 1: 'Moyenne', 2: 'Très Faible', 3: 'Élevée'}
        prediction = categories.get(prediction_encoded, 'Inconnu')

        return prediction

    except Exception as e:
        return f"Erreur: {str(e)}"
