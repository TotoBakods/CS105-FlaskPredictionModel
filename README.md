Predictive Regression Models ProjectThis repository contains a collection of pre-trained machine learning models designed to solve various regression tasks. Each model is built using scikit-learn and is accompanied by the dataset it was trained on and the scaler used for data preprocessing.Models OverviewThis project includes three distinct regression models:Advertising Sales Prediction: Predicts product sales based on advertising budgets for TV, Radio, and Newspaper.Income Prediction: Predicts a person's income based on their age and years of experience.Salary Prediction: Predicts a person's salary based on their years of experience.Getting StartedTo use these models, you'll need Python and a few common data science libraries installed.PrerequisitesPython 3.7+InstallationClone this repository and install the required packages using pip:git clone <your-repository-url>
cd <your-repository-name>
pip install pandas scikit-learn joblib
How to Use the ModelsYou can easily load the pre-trained models and their corresponding scalers to make new predictions. Here is an example of how to predict advertising sales.Example: Predicting Advertising SalesThe following Python script demonstrates how to load the advertising model and make a prediction for a new set of advertising budgets.import joblib
import pandas as pd

# Load the pre-trained model and the scaler
model = joblib.load('advertising_prediction_model.joblib')
scaler = joblib.load('advertising_scaler.joblib')

# Create a new data point for prediction
# (e.g., TV=200, Radio=40, Newspaper=70)
new_data = pd.DataFrame({
    'TV': [200],
    'Radio': [40],
    'Newspaper': [70]
})

print("New data to predict:")
print(new_data)

# Scale the new data using the loaded scaler
new_data_scaled = scaler.transform(new_data)

# Make a prediction
predicted_sales = model.predict(new_data_scaled)

print(f"\nPredicted Sales: {predicted_sales[0]:.2f}")

You can follow a similar process to use the income and salary prediction models with their respective .joblib files.Project StructureHere is an overview of the key files in this repository:.
├── advertising-dataset.csv             # Training data for the sales prediction model
├── income_dataset.csv                  # Training data for the income prediction model
├── salary_data.csv                     # Training data for the salary prediction model
│
├── advertising_prediction_model.joblib # Pre-trained model for advertising sales
├── advertising_scaler.joblib           # Pre-trained scaler for advertising data
│
├── income_prediction_model.joblib      # Pre-trained model for income
├── income_scaler.joblib                # Pre-trained scaler for income data
│
├── salary_prediction_model.joblib      # Pre-trained model for salary
├── salary_scaler.joblib                # Pre-trained scaler for salary data
│
├── Advertising_Prediction_Model.py     # Example script used to train the advertising model
└── README.md                           # This file
Model TrainingThe models were trained using a RandomForestRegressor from scikit-learn. The training process, as detailed in Advertising_Prediction_Model.py, involved:Loading and splitting the dataset.Scaling the features using StandardScaler.Performing hyperparameter tuning using GridSearchCV to find the best model parameters.Saving the best-performing model and the scaler to .joblib files for future use.LicenseThis project is licensed under the MIT License. See the LICENSE file for details.
