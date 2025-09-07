Multi-Model Machine Learning API
This project provides a RESTful API built with Flask to serve multiple machine learning models. It exposes endpoints for predicting salary based on experience, income based on age and experience, and advertising sales based on media spending.
The models are trained using scikit-learn's RandomForestRegressor with hyperparameter tuning performed by GridSearchCV to ensure optimal performance.
Image of a neural network diagram
Table of Contents
Project Structure
Features
Setup and Installation
Usage
Step 1: Train the Models
Step 2: Run the API Server
API Endpoints
/predict/salary
/predict/income
/predict/advertising
Model Details
Project Structure
The project is organized as follows. The training scripts will automatically create the Models/ directory and populate it with the trained model files.
.
├── Datasets/
│   ├── advertising-dataset.csv
│   ├── income_dataset.csv
│   └── salary_data.csv
│
├── Models/
│   ├── advertising_prediction_model.joblib  (Generated)
│   ├── advertising_scaler.joblib          (Generated)
│   ├── income_prediction_model.joblib     (Generated)
│   ├── income_scaler.joblib               (Generated)
│   ├── salary_prediction_model.joblib     (Generated)
│   └── salary_scaler.joblib               (Generated)
│
├── Advertising_Prediction_Model.py  # Training script for the sales model
├── Income_Prediction_Model.py       # Training script for the income model
├── Salary_Prediction_Model.py       # Training script for the salary model
├── app.py                           # The Flask API server
└── README.md


Features
Three Independent Models:
Salary Prediction: Predicts salary from years of experience.
Income Prediction: Predicts income from age and work experience.
Advertising Sales Prediction: Predicts product sales from TV, Radio, and Newspaper advertising budgets.
RESTful API: Easy-to-use endpoints for getting predictions via HTTP requests.
Hyperparameter Tuned: Each model is optimized using GridSearchCV for better accuracy.
Feature Scaling: Input data is standardized using StandardScaler for model consistency and improved performance.
Setup and Installation
Follow these steps to set up the project environment.
Prerequisites
Python 3.8 or higher
pip package manager
Clone the Repository (If applicable)
git clone <your-repository-url>
cd <repository-directory>


Create a Virtual Environment (Recommended)
# For Windows
python -m venv venv
.\venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate


Install Dependencies
Create a requirements.txt file with the following content:
Flask
Flask-Cors
pandas
scikit-learn
joblib

Then, install the packages from your terminal:
pip install -r requirements.txt


Usage
The project requires a two-step process: first, train the models to generate the necessary .joblib files, and second, run the Flask API server which uses these files to make predictions.
Step 1: Train the Models
Run the following scripts from your terminal in the project's root directory. This will train the models and save them, along with their scalers, into the Models/ directory.
# Train the Salary Prediction Model
python Salary_Prediction_Model.py

# Train the Income Prediction Model
python Income_Prediction_Model.py

# Train the Advertising Sales Prediction Model
python Advertising_Prediction_Model.py


You should see output in your terminal indicating the model performance and confirmation that the model files have been saved.
Step 2: Run the API Server
Once the models are trained and saved, start the Flask API server:
flask run


By default, the API will be available at http://127.0.0.1:5000.
API Endpoints
You can interact with the API using any tool that can send POST requests, such as curl, Postman, or a custom script.
/predict/salary
Predicts salary based on years of experience.
Method: POST
Request Body (JSON):
{
    "YearsExperience": 8
}


Success Response (JSON):
{
    "predicted_salary": 101820.6
}


Example curl command:
curl -X POST -H "Content-Type: application/json" \
-d '{"YearsExperience": 8}' [http://127.0.0.1:5000/predict/salary](http://127.0.0.1:5000/predict/salary)


/predict/income
Predicts income based on age and years of experience.
Method: POST
Request Body (JSON):
{
    "age": 40,
    "experience": 15
}


Success Response (JSON):
{
    "predicted_income": 56262.0
}


Example curl command:
curl -X POST -H "Content-Type: application/json" \
-d '{"age": 40, "experience": 15}' [http://127.0.0.1:5000/predict/income](http://127.0.0.1:5000/predict/income)


/predict/advertising
Predicts sales based on advertising spending across three media channels.
Method: POST
Request Body (JSON):
{
    "TV": 200,
    "Radio": 40,
    "Newspaper": 70
}


Success Response (JSON):
{
    "predicted_sales": 21.46
}


Example curl command:
curl -X POST -H "Content-Type: application/json" \
-d '{"TV": 200, "Radio": 40, "Newspaper": 70}' [http://127.0.0.1:5000/predict/advertising](http://127.0.0.1:5000/predict/advertising)


Model Details
This table provides a summary of the machine learning models used in this project.
Model
Dataset
Features
Target
Algorithm
Salary Prediction
salary_data.csv
YearsExperience
Salary
RandomForestRegressor
Income Prediction
income_dataset.csv
age, experience
income
RandomForestRegressor
Advertising Sales
advertising-dataset.csv
TV, Radio, Newspaper
Sales
RandomForestRegressor


