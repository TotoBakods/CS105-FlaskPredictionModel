import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

os.makedirs('Models', exist_ok=True)

try:
    advertising_df = pd.read_csv('Datasets/advertising-dataset.csv')

    X = advertising_df[['TV', 'Radio', 'Newspaper']]
    y = advertising_df['Sales']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler_ad = StandardScaler()
    X_train_scaled_ad = scaler_ad.fit_transform(X_train)
    X_test_scaled_ad = scaler_ad.transform(X_test)

    rf_ad = RandomForestRegressor(random_state=42)

    # Define the hyperparameters to tune
    param_grid_ad = {
        'n_estimators': [100, 200, 300],
        'max_features': ['sqrt', 'log2'],
        'max_depth': [None, 10, 20, 30],
    }

    grid_search_ad = GridSearchCV(estimator=rf_ad, param_grid=param_grid_ad, cv=5, n_jobs=-1, verbose=2)
    grid_search_ad.fit(X_train_scaled_ad, y_train)

    best_rf_ad = grid_search_ad.best_estimator_

    y_pred_ad = best_rf_ad.predict(X_test_scaled_ad)

    mse_ad = mean_squared_error(y_test, y_pred_ad)
    r2_ad = r2_score(y_test, y_pred_ad)

    print("\n--- Improved Advertising Prediction Model ---")
    print(f"Best Hyperparameters: {grid_search_ad.best_params_}")
    print(f"Mean Squared Error: {mse_ad}")
    print(f"R^2 Score: {r2_ad}")

    joblib.dump(best_rf_ad, 'Models/advertising_prediction_model.joblib')
    joblib.dump(scaler_ad, 'Models/advertising_scaler.joblib')

    print("\nImproved advertising prediction model and scaler have been saved in the 'Models' folder.")

except FileNotFoundError:
    print("Make sure 'advertising-dataset.csv' is in the correct directory.")
except Exception as e:
    print(f"An error occurred: {e}")