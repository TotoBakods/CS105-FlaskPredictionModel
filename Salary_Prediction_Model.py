import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score
import joblib
import os

os.makedirs('Models', exist_ok=True)

try:
    print("Loading salary_data.csv...")
    salary_df = pd.read_csv('Datasets/salary_data.csv')

    X = salary_df[['YearsExperience']]
    y = salary_df['Salary']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Fitting the scaler on the training data...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    rf = RandomForestRegressor(random_state=42)
    param_grid = {
        'n_estimators': [50, 100, 200],
        'max_depth': [None, 10, 20],
    }

    print("Training the model with GridSearchCV")
    grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, cv=3, n_jobs=-1)
    grid_search.fit(X_train_scaled, y_train)

    best_model = grid_search.best_estimator_

    print("Saving the new model and scaler...")
    joblib.dump(best_model, 'Models/salary_prediction_model.joblib')
    joblib.dump(scaler, 'Models/salary_scaler.joblib')

    print("\n New salary prediction model and scaler have been saved successfully!")

except FileNotFoundError:
    print("Error: 'salary_data.csv' not found. Make sure it's in the same directory.")
except Exception as e:
    print(f"An error occurred: {e}")