document.getElementById('check-btn').addEventListener('click', function() {
    const input = document.getElementById('user-input').value;
    const resultsDiv = document.getElementById('results-div');

    if (!input) {
        alert('Please provide a phone number');
        return;
    }

    const isValid = validatePhoneNumber(input);
    if (isValid) {
        resultsDiv.innerText = `Valid US number: ${input}`;
        resultsDiv.style.color = '#4caf50'; // verde
    } else {
        resultsDiv.innerText = `Invalid US number: ${input}`;
        resultsDiv.style.color = '#f44336'; // rojo
    }
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('results-div').innerText = '';
    document.getElementById('user-input').value = '';
});

function validatePhoneNumber(number) {
    // Expresión regular para validar números de teléfono en formato estadounidense
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s.-]?)\d{3}([\s.-]?)\d{4}$/;
    return regex.test(number);
}