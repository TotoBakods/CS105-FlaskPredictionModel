from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

try:
    salary_model = joblib.load('Models/salary_prediction_model.joblib')
    salary_scaler = joblib.load('Models/salary_scaler.joblib')

    income_model = joblib.load('Models/income_prediction_model.joblib')
    income_scaler = joblib.load('Models/income_scaler.joblib')

    ad_model = joblib.load('Models/advertising_prediction_model.joblib')
    ad_scaler = joblib.load('Models/advertising_scaler.joblib')

    print("All models and scalers loaded successfully!")

except FileNotFoundError as e:
    print(f"Error loading models or scalers: {e}")
    print("Please make sure you have run all the training scripts first.")
    exit()


@app.route('/')
def home():
    """Home route to confirm the API is running."""
    return "<h1>Multi-Model Prediction API is running with Improved Models</h1>"


@app.route('/predict/salary', methods=['POST'])
def predict_salary():
    """Predicts salary based on years of experience."""
    try:
        data = request.get_json(force=True)
        experience_value = data['YearsExperience']
        experience_df = pd.DataFrame([[experience_value]], columns=['YearsExperience'])
        scaled_experience = salary_scaler.transform(experience_df)
        prediction = salary_model.predict(scaled_experience)
        return jsonify({'predicted_salary': prediction[0]})
    except KeyError:
        return jsonify({'error': "Missing 'YearsExperience' key in request"}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/predict/income', methods=['POST'])
def predict_income():
    try:
        data = request.get_json(force=True)
        features_df = pd.DataFrame([[data['age'], data['experience']]], columns=['age', 'experience'])
        scaled_features = income_scaler.transform(features_df)
        prediction = income_model.predict(scaled_features)
        return jsonify({'predicted_income': prediction[0]})
    except KeyError as e:
        return jsonify({'error': f"Missing key in request: {e}"}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/predict/advertising', methods=['POST'])
def predict_advertising():
    try:
        data = request.get_json(force=True)
        # --- THIS LINE IS NOW CORRECTED ---
        features_df = pd.DataFrame([[data['TV'], data['Radio'], data['Newspaper']]],
                                   columns=['TV', 'Radio', 'Newspaper'])
        scaled_features = ad_scaler.transform(features_df)
        prediction = ad_model.predict(scaled_features)
        return jsonify({'predicted_sales': prediction[0]})
    except KeyError as e:
        return jsonify({'error': f"Missing key in request: {e}"}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)