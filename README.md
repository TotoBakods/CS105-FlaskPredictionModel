# 📊 Predictive Regression Models

This repository contains a collection of **pre-trained machine learning regression models** built using **scikit-learn**. Each model is trained on a specific dataset and comes with the scaler used for preprocessing, making it easy to load and use for predictions.

---

## 🚀 Models Overview

This project includes three regression models:

1. **Advertising Sales Prediction**  
   Predicts product sales based on advertising budgets for **TV, Radio, and Newspaper**.

2. **Income Prediction**  
   Predicts a person's income based on **age** and **years of experience**.

3. **Salary Prediction**  
   Predicts a person's salary based on **years of experience**.

---

## ⚙️ Getting Started

### ✅ Prerequisites
- Python **3.7+**
- Required libraries: `pandas`, `scikit-learn`, `joblib`

### 📥 Installation
Clone this repository and install the dependencies:

```bash
git clone <your-repository-url>
cd <your-repository-name>
pip install pandas scikit-learn joblib
```

---

## 📌 How to Use the Models

Each model has its own `.joblib` file and a corresponding scaler. You can load them and make predictions easily.

### 🔮 Example: Predicting Advertising Sales

```python
import joblib
import pandas as pd

# Load the pre-trained model and scaler
model = joblib.load('advertising_prediction_model.joblib')
scaler = joblib.load('advertising_scaler.joblib')

# New data point (e.g., TV=200, Radio=40, Newspaper=70)
new_data = pd.DataFrame({
    'TV': [200],
    'Radio': [40],
    'Newspaper': [70]
})

print("New data to predict:")
print(new_data)

# Scale the data
new_data_scaled = scaler.transform(new_data)

# Make prediction
predicted_sales = model.predict(new_data_scaled)

print(f"\nPredicted Sales: {predicted_sales[0]:.2f}")
```

👉 You can follow the same approach for **income** and **salary** predictions using their respective `.joblib` files.

---

## 📂 Project Structure

```
.
├── advertising-dataset.csv             # Training data for sales prediction
├── income_dataset.csv                  # Training data for income prediction
├── salary_data.csv                     # Training data for salary prediction
│
├── advertising_prediction_model.joblib # Pre-trained model (sales)
├── advertising_scaler.joblib           # Scaler for sales data
│
├── income_prediction_model.joblib      # Pre-trained model (income)
├── income_scaler.joblib                # Scaler for income data
│
├── salary_prediction_model.joblib      # Pre-trained model (salary)
├── salary_scaler.joblib                # Scaler for salary data
│
├── Advertising_Prediction_Model.py     # Example training script
└── README.md                           # This file
```

---

## 🏗️ Model Training

The models were trained using **RandomForestRegressor** from scikit-learn. Training steps included:

1. Loading and splitting the dataset  
2. Scaling features with **StandardScaler**  
3. Hyperparameter tuning using **GridSearchCV**  
4. Saving the best model and scaler as `.joblib`  

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
