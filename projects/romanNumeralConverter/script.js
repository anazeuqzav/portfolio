document.getElementById('convert-btn').addEventListener('click', function() {
    const inputNumber = document.getElementById('number').value;
    const outputElement = document.getElementById('output');
    
    if (!inputNumber) {
        outputElement.innerText = 'Please enter a valid number';
        return;
    }

    const number = parseInt(inputNumber);

    if (number < 1) {
        outputElement.innerText = 'Please enter a number greater than or equal to 1';
        return;
    } else if (number >= 4000) {
        outputElement.innerText = 'Please enter a number less than or equal to 3999';
        return;
    }

    // Lógica para convertir el número a romano
    const romanNumeral = convertToRoman(number);
    outputElement.innerText = romanNumeral;
});

function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, symbol: "M" },
        { value: 900, symbol: "CM" },
        { value: 500, symbol: "D" },
        { value: 400, symbol: "CD" },
        { value: 100, symbol: "C" },
        { value: 90, symbol: "XC" },
        { value: 50, symbol: "L" },
        { value: 40, symbol: "XL" },
        { value: 10, symbol: "X" },
        { value: 9, symbol: "IX" },
        { value: 5, symbol: "V" },
        { value: 4, symbol: "IV" },
        { value: 1, symbol: "I" }
    ];
    let result = "";

    romanNumerals.forEach(function(item) {
        while (num >= item.value) {
            result += item.symbol;
            num -= item.value;
        }
    });

    return result;
}