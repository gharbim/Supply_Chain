# save_recommendation_production.py
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer

# ✅ Chargement depuis le chemin absolu
csv_path = r"C:\Users\ayadi\OneDrive - ESPRIT (1)\Bureau\pa bi\data_externe\most_used_beauty_cosmetics_products_extended.csv"
df = pd.read_csv(csv_path)

# ✅ Construction des features combinées
df['combined_features'] = (
    df['Brand'].astype(str) + ' ' +
    df['Category'].astype(str) + ' ' +
    df['Skin_Type'].astype(str) + ' ' +
    df['Gender_Target'].astype(str) + ' ' +
    df['Main_Ingredient'].astype(str) + ' ' +
    df['Packaging_Type'].astype(str) + ' ' +
    df['Usage_Frequency'].astype(str) + ' ' +
    df['Country_of_Origin'].astype(str) + ' ' +
    df['Cruelty_Free'].astype(str)
)

# ✅ TF-IDF
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['combined_features'])

# ✅ Sauvegarde
joblib.dump(df, "df_production.pkl")
joblib.dump(tfidf, "tfidf_production.pkl")
joblib.dump(tfidf_matrix, "tfidf_matrix_production.pkl")

print("✅ Fichiers enregistrés avec succès.")
