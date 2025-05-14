from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import joblib
import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import pandas as pd
import numpy as np
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import openai
# Initialisation Flask
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
MODEL_DIR = os.getcwd()

# NLTK setup
nltk.download('vader_lexicon')
analyzer = SentimentIntensityAnalyzer()
OPENROUTER_API_KEY = "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"
openai.api_key = OPENROUTER_API_KEY  # Définir la clé API pour OpenAI

@app.route('/generate-report', methods=['POST'])
def generate_report():
    data = request.get_json()
    profile = data.get('profile', '')
    user_prompt = data.get('prompt', '')

    if not profile or not user_prompt:
        return jsonify({'error': 'Profil ou prompt manquant.'}), 400

    try:
        # Demande à OpenAI de générer le rapport en fonction du profil et du prompt
        response = openai.Completion.create(
            engine="text-davinci-003",  # GPT-3 ou GPT-4
            prompt=f"Rédige un rapport pour un {profile} : {user_prompt}",
            max_tokens=150
        )
        
        report = response.choices[0].text.strip()
        return jsonify({'report': report})

    except openai.error.AuthenticationError as e:
        return jsonify({'error': 'Problème d\'authentification avec OpenAI. Vérifiez votre clé API.'}), 500
    except openai.error.OpenAIError as e:
        return jsonify({'error': f'Erreur avec OpenAI : {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Erreur interne : {str(e)}'}), 500

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    sender = 'mohamedoussama.ayadi@esprit.tn'  # Sender's email
    recipients = ['medoussamaayadi@gmail.com']  # Receiver's email
    subject = data['subject']
    body = data['body']
    
    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = ", ".join(recipients)
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    
    # Set up the SMTP server for sending the email (Gmail in this example)
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    
    # Login with the sender's email and app password (be sure to use an app password if 2FA is enabled)
    server.login(sender, 'AzertyGom24240')  # Use your email password or an App password
    
    # Send the email
    server.sendmail(sender, recipients, msg.as_string())
    server.quit()
    
    return jsonify({"message": "Email sent successfully!"})
# Chargement automatique des modèles .pkl dans Project/
loaded_models = {}
for filename in os.listdir(MODEL_DIR):
    if filename.endswith('.pkl'):
        path = os.path.join(MODEL_DIR, filename)
        try:
            model_name = filename.replace('.pkl', '')
            loaded_models[model_name] = joblib.load(path)
            print(f"✅ Loaded model: {model_name}")
        except Exception as e:
            print(f"❌ Error loading {filename}: {e}")

# 📦 Box Classifier Model (PyTorch spécifique)
box_model = models.resnet18(weights=None)
box_model.fc = torch.nn.Linear(box_model.fc.in_features, 2)
box_model.load_state_dict(torch.load('box_classifier_resnet18.pth', map_location=torch.device('cpu')))
box_model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# 📈 Revenue Prediction
revenue_model = loaded_models.get('revenue_model')
revenue_features = loaded_models.get('revenue_model_columns')
available_brands = [f.replace('BrandName_', '') for f in revenue_features if f.startswith('BrandName_')] if revenue_features else []

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        year = int(data['year'])
        month = int(data['month'])
        avg_unit_price = float(data['avg_unit_price'])
        total_quantity = int(data['total_quantity'])
        brand = data['brand']

        input_data = {
            'year': year,
            'month': month,
            'Avg_Unit_Price': avg_unit_price,
            'Total_Quantity': total_quantity,
        }

        for col in revenue_features:
            if col.startswith('BrandName_'):
                input_data[col] = 1 if col == f'BrandName_{brand}' else 0

        X_input = np.array([input_data[feat] for feat in revenue_features]).reshape(1, -1)
        revenue_prediction = revenue_model.predict(X_input)[0]
        return jsonify(revenue_prediction)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/brands', methods=['GET'])
def get_brands():
    return jsonify(available_brands)

# 🧠 Sentiment Analysis
@app.route('/review', methods=['POST'])
def review():
    try:
        data = request.get_json()
        review_text = data.get('review', '')
        scores = analyzer.polarity_scores(review_text)
        compound = scores['compound']
        sentiment = 'Positive' if compound >= 0.05 else 'Negative' if compound <= -0.05 else 'Neutral'
        return jsonify({'sentiment': sentiment, 'score': compound})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 📷 Box Classifier Endpoint
@app.route('/box', methods=['POST'])
def box():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        file = request.files['image']
        if not file.mimetype.startswith('image/'):
            return jsonify({'error': 'Invalid file type'}), 400

        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(img_path)

        image = Image.open(img_path).convert('RGB')
        img_tensor = transform(image).unsqueeze(0)

        with torch.no_grad():
            outputs = box_model(img_tensor)
            _, predicted = torch.max(outputs, 1)
            probs = torch.nn.functional.softmax(outputs, dim=1)
            confidence = probs[0][predicted.item()] * 100
            predicted_class = 'Good Packaging' if predicted.item() == 1 else 'Defective Packaging'
            emoji = '✅' if predicted_class == 'Good Packaging' else '❌'
            result = f"{emoji} {predicted_class} ({confidence:.2f}% confidence)"

        return jsonify({
            'result': result,
            'image_url': f"http://localhost:5000/{img_path.replace(os.sep, '/')}"
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 📊 Recommandation Stock
try:
    df = pd.read_csv(os.path.join(MODEL_DIR, 'products.csv'))
except FileNotFoundError:
    df = pd.DataFrame()
    print("⚠️ 'products.csv' not found. Recommendation will not work.")

def recommend_products(price_range=(0, float('inf')), min_rating=0, brand=None):
    filtered = df.copy()
    if not filtered.empty:
        filtered = filtered[(filtered['Price'] >= float(price_range[0])) & (filtered['Price'] <= float(price_range[1]))]
        filtered = filtered[filtered['Rating'] >= float(min_rating)]
        if brand:
            filtered = filtered[filtered['Brand'] == brand]
        return filtered.sort_values(by='Rating', ascending=False).head(10)
    return pd.DataFrame()

@app.route('/recommandation_stock', methods=['POST'])
def recommandation_stock():
    try:
        data = request.get_json()
        price_min = float(data.get('price_min', 0))
        price_max = float(data.get('price_max', float('inf')))
        rating_min = float(data.get('rating_min', 0))
        brand = data.get('brand', None)

        recommended = recommend_products((price_min, price_max), rating_min, brand)
        result = recommended.to_dict(orient='records')
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/recommandation_stock/brands', methods=['GET'])
def get_recommandation_brands():
    try:
        if df.empty:
            return jsonify([])
        brands = df['Brand'].dropna().unique().tolist()
        return jsonify(brands)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# 📊 Clustering Stock
import joblib

# Charger le modèle
model_clust = joblib.load(os.path.join(MODEL_DIR, 'model_clust_stock.pkl'))

@app.route('/clustering_stock', methods=['POST'])
def clustering_stock():
    try:
        data = request.get_json()
        capacity = float(data.get('capacity'))
        quantity = float(data.get('quantity'))

        features = np.array([[capacity, quantity]])
        prediction = int(model_clust.predict(features)[0])
        pourcentage = round((quantity / capacity) * 100, 2)

        if prediction == 0:
            interpretation = "🔴 Stock critique : un réapprovisionnement immédiat est nécessaire."
        elif prediction == 1:
            interpretation = "🟡 Stock modéré : un réapprovisionnement bientôt est conseillé."
        else:
            interpretation = "🟢 Stock élevé : aucun réapprovisionnement nécessaire pour l’instant."

        return jsonify({
            'prediction': prediction,
            'pourcentage': pourcentage,
            'interpretation': interpretation
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
# 📦 Classification de Stock
import joblib

model_classif = joblib.load(os.path.join(MODEL_DIR, 'model_classif_stock.pkl'))

@app.route('/classification_stock', methods=['POST'])
def classification_stock():
    try:
        capacity = float(request.form['capacity'])
        prediction = model_classif.predict(np.array([[capacity]]))[0]

        if prediction == 'Low':
            message = "⚠️ Low stock! Restock now."
        elif prediction == 'Medium':
            message = "✔️ Moderate stock. Monitor closely."
        else:
            message = "✅ High stock. All good."

        return jsonify({
            'prediction': prediction,
            'message': message
        })
    except Exception as e:
        return jsonify({
            'prediction': 'Error',
            'message': str(e)
        }), 500
# 📈 Régression Stock
model_regr = joblib.load(os.path.join(MODEL_DIR, 'model_regr_stock.pkl'))

@app.route('/regression_stock', methods=['POST'])
def regression_stock():
    try:
        capacity = float(request.form['capacity'])
        features = np.array([[capacity]])
        predicted_usage = model_regr.predict(features)[0]
        prediction = round(predicted_usage, 2)

        if predicted_usage >= 0.8 * capacity:
            alert = "⚠️ Alert: Imminent depletion!"
            recommendation = "📦 Restock fast."
        elif predicted_usage >= 0.6 * capacity:
            alert = "🔶 Warning: Decreasing stock."
            recommendation = "Plan restocking."
        else:
            alert = "✅ Sufficient stock."
            recommendation = "No action required."

        return jsonify({
            'prediction': prediction,
            'alert': alert,
            'recommendation': recommendation
        })

    except Exception as e:
        return jsonify({'prediction': 'Error', 'alert': '', 'recommendation': str(e)}), 500
# ⏳ ARIMA Prediction
import pickle

with open(os.path.join(MODEL_DIR, 'aarima_model.pkl'), 'rb') as f:
    aarima_model = pickle.load(f)

@app.route('/predict_arriima', methods=['POST'])
def predict_arriima():
    try:
        n_periods = int(request.form['input_value'])
        prediction = aarima_model.predict(start=0, end=n_periods - 1)
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# 🔵 Régression Linéaire B avec 204 colonnes
with open(os.path.join(MODEL_DIR, 'B_linear_regression_model.pkl'), 'rb') as f:
    b_linear_model = pickle.load(f)

@app.route('/predict_blinear', methods=['POST'])
def predict_blinear():
    try:
        input_value = float(request.form['input_value'])
        X_input = np.zeros((1, 204))
        X_input[0, 0] = input_value
        prediction = float(b_linear_model.predict(X_input)[0])
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
from flask import request, jsonify, make_response
import pyodbc
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
import io
import base64
from datetime import datetime
import traceback

@app.route('/forecast_production', methods=['GET'])
def forecast_production():
    try:
        # Connexion SQL Server
        conn_str = (
            "Driver={ODBC Driver 17 for SQL Server};"
            "Server=LAPTOP-GPVK1ANC;"
            "Database=DW_SupplyChain;"
            "Trusted_Connection=yes;"
        )
        cnxn = pyodbc.connect(conn_str)

        # Extraction
        query = "SELECT Production_Start_Time, quantityused FROM fact_production"
        df = pd.read_sql(query, cnxn)
        df['Production_Start_Time'] = df['Production_Start_Time'].astype(str).str[:8]
        df['Production_Start_Time'] = pd.to_datetime(df['Production_Start_Time'], format='%Y%m%d', errors='coerce')
        df['quantityused'] = pd.to_numeric(df['quantityused'], errors='coerce')
        df = df.dropna().sort_values('Production_Start_Time')
        df_monthly = df.resample('MS', on='Production_Start_Time')['quantityused'].sum()

        # Paramètres
        default_start = df_monthly.index[-1] + pd.DateOffset(months=1)
        start_date_str = request.args.get('start_date', default_start.strftime('%Y/%m/%d'))
        n_months = int(request.args.get('n_months', 3))

        start_date = pd.to_datetime(start_date_str, errors='coerce')
        if pd.isna(start_date):
            start_date = default_start

        # Padding
        last_date = df_monthly.index[-1]
        delta = (start_date.year - last_date.year) * 12 + (start_date.month - last_date.month)
        if delta > 0:
            future_dates = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=delta, freq='MS')
            df_padding = pd.Series([None]*delta, index=future_dates)
            df_monthly = pd.concat([df_monthly, df_padding])

        df_monthly = df_monthly.astype(float)

        # Modélisation
        model = SARIMAX(df_monthly, order=(1,1,1), seasonal_order=(0,0,0,0))
        result = model.fit(disp=False)
        forecast = result.get_forecast(steps=n_months)
        pred_series = forecast.predicted_mean
        conf_int = forecast.conf_int()

        # Graphique
        plt.figure(figsize=(10, 5))
        plt.plot(df_monthly, label="Historique", marker='o')
        plt.plot(pred_series, label="Prévision", color='red', marker='o')
        plt.fill_between(pred_series.index, conf_int.iloc[:, 0], conf_int.iloc[:, 1], color='pink', alpha=0.3)
        plt.title(f"Prévision ARIMA sur {n_months} mois")
        plt.xlabel("Date")
        plt.ylabel("Quantité utilisée")
        plt.legend()
        plt.grid(True)

        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        plot_url = base64.b64encode(buf.read()).decode('utf-8')
        plt.close()

        # Résultat
        forecast_table = pd.DataFrame({
            'Date': pred_series.index.strftime('%Y-%m'),
            'Prediction': pred_series.round(2)
        })

        return jsonify({
            'plot_url': plot_url,
            'forecast_table': forecast_table.to_dict(orient='records'),
            'default_date': start_date.strftime('%Y/%m/%d'),
            'n_months': n_months
        })

    except Exception as e:
        print("❌ ERREUR SERVEUR :", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/download_forecast_csv')
def download_forecast_csv():
    try:
        # Connexion SQL
        conn_str = (
            "Driver={ODBC Driver 17 for SQL Server};"
            "Server=LAPTOP-GPVK1ANC;"
            "Database=DW_SupplyChain;"
            "Trusted_Connection=yes;"
        )
        cnxn = pyodbc.connect(conn_str)
        query = "SELECT Production_Start_Time, quantityused FROM fact_production"
        df = pd.read_sql(query, cnxn)

        # Prétraitement
        df['Production_Start_Time'] = df['Production_Start_Time'].astype(str).str[:8]
        df['Production_Start_Time'] = pd.to_datetime(df['Production_Start_Time'], format='%Y%m%d', errors='coerce')
        df['quantityused'] = pd.to_numeric(df['quantityused'], errors='coerce')
        df = df.dropna().sort_values('Production_Start_Time')
        df_monthly = df.resample('MS', on='Production_Start_Time')['quantityused'].sum()

        # Lecture des paramètres
        default_start = df_monthly.index[-1] + pd.DateOffset(months=1)
        start_date_str = request.args.get('start_date', default_start.strftime('%Y/%m/%d'))
        n_months = int(request.args.get('n_months', 3))
        start_date = pd.to_datetime(start_date_str, errors='coerce') or default_start

        # Padding si besoin
        last_date = df_monthly.index[-1]
        delta = (start_date.year - last_date.year) * 12 + (start_date.month - last_date.month)
        if delta > 0:
            future_dates = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=delta, freq='MS')
            df_padding = pd.Series([None]*delta, index=future_dates)
            df_monthly = pd.concat([df_monthly, df_padding])
        df_monthly = df_monthly.astype(float)

        # ARIMA
        model = SARIMAX(df_monthly, order=(1, 1, 1), seasonal_order=(0, 0, 0, 0))
        result = model.fit(disp=False)
        forecast = result.get_forecast(steps=n_months)
        pred_series = forecast.predicted_mean

        # Préparer CSV
        forecast_table = pd.DataFrame({
            'Date': pred_series.index.strftime('%Y-%m'),
            'Prediction': pred_series.round(2)
        })

        output = io.StringIO()
        forecast_table.to_csv(output, index=False)
        response = make_response(output.getvalue())
        response.headers['Content-Disposition'] = 'attachment; filename=forecast_production.csv'
        response.headers["Content-type"] = "text/csv"
        return response

    except Exception as e:
        print("❌ ERREUR CSV :", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


from flask import request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as keras_image
import numpy as np
import os
import traceback

# ✅ Charger le modèle une seule fois, au démarrage de l'app
cosmetics_model = load_model('model_cosmetics_fixed.keras')
cosmetics_classes = ['blush', 'eyeliner', 'eyeshadow', 'foundation', 'lipstick', 'mascara']

@app.route('/cosmetics_predict', methods=['POST'])
def cosmetics_predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in request'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        # 📁 Dossier d'upload
        upload_folder = 'static/uploads'
        os.makedirs(upload_folder, exist_ok=True)
        filepath = os.path.join(upload_folder, file.filename)
        file.save(filepath)

        # 🖼 Préparation de l'image
        img = keras_image.load_img(filepath, target_size=(224, 224))
        img_array = keras_image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # 🤖 Prédiction
        prediction = cosmetics_model.predict(img_array)
        predicted_class = cosmetics_classes[np.argmax(prediction)]

        return jsonify({'prediction': predicted_class})

    except Exception as e:
        print("❌ ERREUR COSMETICS:", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
@app.route('/classification_production', methods=['POST'])
def classification_production():
    try:
        dosage = float(request.form.get('dosage'))
        input_data = {'dosage': dosage}

        # === Logique de classification intégrée ici ===
        if dosage <= 0:
            prediction = "Erreur : le dosage doit être strictement supérieur à 0"
        elif dosage < 1.5:
            prediction = "Très Faible"
        elif dosage < 3:
            prediction = "Faible"
        elif dosage < 6:
            prediction = "Moyen"
        elif dosage <= 9:
            prediction = "Élevé"
        else:
            prediction = "Erreur : le dosage ne peut pas dépasser 9"

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

import joblib
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from flask import request, jsonify
import traceback

# ========== 1. Connexion SQL Server ==========
def get_sql_connection():
    conn_str = (
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=LAPTOP-GPVK1ANC;"
        "Database=DW_SupplyChain;"
        "Trusted_Connection=yes;"
    )
    return pyodbc.connect(conn_str)

# ========== 2. Recommandation Beauté - Chargement ==========
try:
    df_production = joblib.load("df_production.pkl")
    tfidf = joblib.load("tfidf_production.pkl")
    tfidf_matrix_production = joblib.load("tfidf_matrix_production.pkl")
    cosine_sim_prod = cosine_similarity(tfidf_matrix_production)
    indices_prod = pd.Series(df_production.index, index=df_production['Product_Name']).drop_duplicates()
except Exception as e:
    print("❌ Erreur de chargement des fichiers recommendation_production :", e)
    df_production = pd.DataFrame()
    cosine_sim_prod = []
    indices_prod = pd.Series(dtype=int)

@app.route('/recommendation_production/options', methods=['GET'])
def get_recommendation_production_options():
    try:
        product_names = sorted(df_production['Product_Name'].dropna().unique())
        skin_types = sorted(df_production['Skin_Type'].dropna().unique())
        usage_frequencies = sorted(df_production['Usage_Frequency'].dropna().unique())

        return jsonify({
            'product_names': product_names,
            'skin_types': skin_types,
            'usage_frequencies': usage_frequencies
        })
    except Exception as e:
        print("❌ ERREUR OPTIONS:", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/recommendation_production', methods=['POST'])
def recommendation_production():
    try:
        data = request.form
        product_name = data.get('product_name')
        user_skin_type = data.get('user_skin_type')
        user_usage = data.get('user_usage')
        top_n = int(data.get('top_n', 10))

        print("🧪 REQUÊTE REÇUE:", product_name, "|", user_skin_type, "|", user_usage)

        # ✅ Comparaison robuste du nom
        normalized_input = product_name.strip().lower()
        matched_name = next((name for name in indices_prod.keys() if name.strip().lower() == normalized_input), None)

        if matched_name is None:
            return jsonify([])

        idx = indices_prod[matched_name]
        sim_vector = cosine_sim_prod[idx].flatten()
        sim_scores = list(enumerate(sim_vector))
        sim_scores = sorted(sim_scores, key=lambda x: float(x[1]), reverse=True)[1:]

        filtered_indices = []
        for i, _ in sim_scores:
            if i >= len(df_production):
                continue
            if user_skin_type and df_production.iloc[i]['Skin_Type'] != user_skin_type:
                continue
            if user_usage and df_production.iloc[i]['Usage_Frequency'] != user_usage:
                continue
            filtered_indices.append(i)
            if len(filtered_indices) >= top_n:
                break

        if not filtered_indices:
            return jsonify([])

        results = df_production.loc[filtered_indices, [
            'Product_Name', 'Brand', 'Category', 'Skin_Type', 'Usage_Frequency', 'Rating'
        ]].reset_index(drop=True)

        return jsonify(results.to_dict(orient='records'))

    except Exception as e:
        print("❌ ERREUR RECOMMENDATION:", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/regression_production/options', methods=['GET'])
def regression_production_options():
    try:
        cnxn = get_sql_connection()

        # ✅ Produits avec FK correct (via ROW_NUMBER() ou MIN, si pas de doublons exacts)
        product_query = """
            SELECT productPK, productname
            FROM dim_product
            WHERE productPK IN (
                SELECT MIN(productPK)
                FROM dim_product
                GROUP BY productname
            )
            ORDER BY productname
        """
        product_df = pd.read_sql(product_query, cnxn)
        products = [{"id": int(row["productPK"]), "name": row["productname"]} for _, row in product_df.iterrows()]

        # ✅ Marques avec FK correct
        brand_query = """
            SELECT brandPK, brandname
            FROM dim_brand
            WHERE brandPK IN (
                SELECT MIN(brandPK)
                FROM dim_brand
                GROUP BY brandname
            )
            ORDER BY brandname
        """
        brand_df = pd.read_sql(brand_query, cnxn)
        brands = [{"id": int(row["brandPK"]), "name": row["brandname"]} for _, row in brand_df.iterrows()]

        print("📋 PRODUITS DISPONIBLES :", products)
        print("🏷️  MARQUES DISPONIBLES :", brands)

        return jsonify({"products": products, "brands": brands})
    except Exception as e:
        print("❌ ERREUR options regression_production:", str(e))
        return jsonify({'error': str(e)}), 500

# ========== 6. ROUTE : Prediction pour regression_production ==========
from flask import request, jsonify
from regression_production_service import predict_quantity

@app.route('/regression_production', methods=['POST'])
def regression_production():
    try:
        product_fk = int(request.form['productFK'])
        brand_fk = int(request.form['brandFK'])
        dosage = float(request.form['dosage'])
        production_duration_hours = float(request.form['production_duration_hours'])

        input_data = {
            'productFK': product_fk,
            'brandFK': brand_fk,
            'Dosage': dosage,
            'production_duration_hours': production_duration_hours
        }

        print("📦 INPUT REÇU:", input_data)  # Pour vérification dans le terminal
        prediction = predict_quantity(input_data)
        return jsonify({'prediction': prediction})
    except Exception as e:
        print("❌ ERREUR:", str(e))
        return jsonify({'error': str(e)}), 500

# 🟢 Lancer l'application
if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
