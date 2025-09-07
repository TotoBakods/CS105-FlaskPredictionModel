document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://192.168.1.30:5000'; // URL of your Flask API

    // Helper function to manage loading state
    const handlePrediction = (button, resultBox, loaderContainer, predictionText) => {
        button.disabled = true;
        predictionText.textContent = '';
        loaderContainer.style.display = 'flex';

        return (isSuccess, message) => {
            loaderContainer.style.display = 'none';
            predictionText.textContent = message;
            predictionText.className = `prediction-text ${isSuccess ? 'success' : 'error'}`;
            button.disabled = false;
        };
    };

    // --- Salary Predictor ---
    const predictSalaryBtn = document.getElementById('predict-salary');
    predictSalaryBtn.addEventListener('click', () => {
        const experience = document.getElementById('experience').value;
        const resultBox = document.getElementById('salary-result');
        const loader = resultBox.querySelector('.loader-container');
        const text = resultBox.querySelector('.prediction-text');
        
        const complete = handlePrediction(predictSalaryBtn, resultBox, loader, text);

        if (!experience) {
            complete(false, 'Error: Please enter years of experience.');
            return;
        }

        fetch(`${API_URL}/predict/salary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "YearsExperience": parseFloat(experience) })
        })
        .then(response => response.json())
        .then(data => {
            if (data.predicted_salary) {
                const salary = parseFloat(data.predicted_salary).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
                complete(true, `Predicted Salary: ${salary}`);
            } else {
                complete(false, `Error: ${data.error || 'Invalid response from API.'}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            complete(false, 'Error: Could not connect to the API.');
        });
    });

    // --- Income Predictor ---
    const predictIncomeBtn = document.getElementById('predict-income');
    predictIncomeBtn.addEventListener('click', () => {
        const age = document.getElementById('age').value;
        const experience = document.getElementById('income-experience').value;
        const resultBox = document.getElementById('income-result');
        const loader = resultBox.querySelector('.loader-container');
        const text = resultBox.querySelector('.prediction-text');

        const complete = handlePrediction(predictIncomeBtn, resultBox, loader, text);

        if (!age || !experience) {
            complete(false, 'Error: Please enter both age and experience.');
            return;
        }

        fetch(`${API_URL}/predict/income`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "age": parseInt(age), 
                "experience": parseInt(experience) 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.predicted_income) {
                const income = parseFloat(data.predicted_income).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
                complete(true, `Predicted Income: ${income}`);
            } else {
                complete(false, `Error: ${data.error || 'Invalid response from API.'}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            complete(false, 'Error: Could not connect to the API.');
        });
    });

    // --- Advertising Sales Predictor ---
    const predictAdBtn = document.getElementById('predict-ad');
    predictAdBtn.addEventListener('click', () => {
        const tv = document.getElementById('tv').value;
        const radio = document.getElementById('radio').value;
        const newspaper = document.getElementById('newspaper').value;
        const resultBox = document.getElementById('ad-result');
        const loader = resultBox.querySelector('.loader-container');
        const text = resultBox.querySelector('.prediction-text');

        const complete = handlePrediction(predictAdBtn, resultBox, loader, text);

        if (!tv || !radio || !newspaper) {
            complete(false, 'Error: Please enter all budget fields.');
            return;
        }

        fetch(`${API_URL}/predict/advertising`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "TV": parseFloat(tv),
                "Radio": parseFloat(radio),
                "Newspaper": parseFloat(newspaper)
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.predicted_sales) {
                const sales = data.predicted_sales.toFixed(2);
                complete(true, `Predicted Sales: ${sales} units`);
            } else {
                complete(false, `Error: ${data.error || 'Invalid response from API.'}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            complete(false, 'Error: Could not connect to the API.');
        });
    });
});