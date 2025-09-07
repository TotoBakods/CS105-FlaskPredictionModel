document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://192.168.1.30:5000';

    const predictSalaryBtn = document.getElementById('predict-salary');
    predictSalaryBtn.addEventListener('click', () => {
        const experience = document.getElementById('experience').value;
        const resultText = document.getElementById('salary-result');

        predictSalaryBtn.disabled = true;
        resultText.textContent = 'Loading...';
        resultText.className = '';

        if (!experience) {
            resultText.textContent = 'Error: Please enter years of experience.';
            resultText.className = 'error';
            predictSalaryBtn.disabled = false;
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
                const salary = parseFloat(data.predicted_salary).toFixed(0);
                resultText.textContent = `Predicted Salary: $${salary}`;
                resultText.className = 'success';
            } else {
                resultText.textContent = `Error: ${data.error || 'Invalid response from API.'}`;
                resultText.className = 'error';
            }
            predictSalaryBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            resultText.textContent = 'Error: Could not connect to the API.';
            resultText.className = 'error';
            predictSalaryBtn.disabled = false;
        });
    });

    const predictIncomeBtn = document.getElementById('predict-income');
    predictIncomeBtn.addEventListener('click', () => {
        const age = document.getElementById('age').value;
        const experience = document.getElementById('income-experience').value;
        const resultText = document.getElementById('income-result');

        predictIncomeBtn.disabled = true;
        resultText.textContent = 'Loading...';
        resultText.className = '';

        if (!age || !experience) {
            resultText.textContent = 'Error: Please enter both age and experience.';
            resultText.className = 'error';
            predictIncomeBtn.disabled = false;
            return;
        }

        fetch(`${API_URL}/predict/income`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "age": parseInt(age), "experience": parseInt(experience) })
        })
        .then(response => response.json())
        .then(data => {
            if (data.predicted_income) {
                const income = parseFloat(data.predicted_income).toFixed(0);
                resultText.textContent = `Predicted Income: $${income}`;
                resultText.className = 'success';
            } else {
                resultText.textContent = `Error: ${data.error || 'Invalid response from API.'}`;
                resultText.className = 'error';
            }
            predictIncomeBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            resultText.textContent = 'Error: Could not connect to the API.';
            resultText.className = 'error';
            predictIncomeBtn.disabled = false;
        });
    });

    const predictAdBtn = document.getElementById('predict-ad');
    predictAdBtn.addEventListener('click', () => {
        const tv = document.getElementById('tv').value;
        const radio = document.getElementById('radio').value;
        const newspaper = document.getElementById('newspaper').value;
        const resultText = document.getElementById('ad-result');

        predictAdBtn.disabled = true;
        resultText.textContent = 'Loading...';
        resultText.className = '';

        if (!tv || !radio || !newspaper) {
            resultText.textContent = 'Error: Please enter all budget fields.';
            resultText.className = 'error';
            predictAdBtn.disabled = false;
            return;
        }

        fetch(`${API_URL}/predict/advertising`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "TV": parseFloat(tv), "Radio": parseFloat(radio), "Newspaper": parseFloat(newspaper) })
        })
        .then(response => response.json())
        .then(data => {
            if (data.predicted_sales) {
                const sales = data.predicted_sales.toFixed(2);
                resultText.textContent = `Predicted Sales: ${sales} units`;
                resultText.className = 'success';
            } else {
                resultText.textContent = `Error: ${data.error || 'Invalid response from API.'}`;
                resultText.className = 'error';
            }
            predictAdBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            resultText.textContent = 'Error: Could not connect to the API.';
            resultText.className = 'error';
            predictAdBtn.disabled = false;
        });
    });
});