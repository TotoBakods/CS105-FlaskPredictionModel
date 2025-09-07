import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

os.makedirs('Models', exist_ok=True)

try:
    income_df = pd.read_csv('Datasets/income_dataset.csv')

    X = income_df[['age', 'experience']]
    y = income_df['income']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler_income = StandardScaler()
    X_train_scaled_income = scaler_income.fit_transform(X_train)
    X_test_scaled_income = scaler_income.transform(X_test)

    rf_income = RandomForestRegressor(random_state=42)

    param_grid_income = {
        'n_estimators': [50, 100, 200],
        'max_features': ['sqrt', 'log2'],
        'max_depth': [None, 10, 20],
    }

    grid_search_income = GridSearchCV(estimator=rf_income, param_grid=param_grid_income, cv=3, n_jobs=-1, verbose=2)
    grid_search_income.fit(X_train_scaled_income, y_train)

    best_rf_income = grid_search_income.best_estimator_

    y_pred_income = best_rf_income.predict(X_test_scaled_income)

    mse_income = mean_squared_error(y_test, y_pred_income)
    r2_income = r2_score(y_test, y_pred_income)

    print("\n--- Improved Income Prediction Model ---")
    print(f"Best Hyperparameters: {grid_search_income.best_params_}")
    print(f"Mean Squared Error: {mse_income}")
    print(f"R^2 Score: {r2_income}")

    joblib.dump(best_rf_income, 'Models/income_prediction_model.joblib')
    joblib.dump(scaler_income, 'Models/income_scaler.joblib')

    print("\nImproved income prediction model and scaler have been saved in the 'Models' folder.")

except FileNotFoundError:
    print("Make sure 'income_dataset.csv' is in the correct directory.")
except Exception as e:
    print(f"An error occurred: {e}")