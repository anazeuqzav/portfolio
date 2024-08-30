const checkButton = document.getElementById("check-btn");

function checkPalindrome() {
  const inputText = document.getElementById('text-input').value;

  if (!inputText) {
        alert('Please input a value');
        return;
    }

    const cleanedText = inputText
    .toLowerCase()
    .normalize("NFD")  // Descompone caracteres Unicode en sus partes constituyentes
    .replace(/[\u0300-\u036f]/g, '')  // Elimina los signos diacríticos (acentos)
    .replace(/[^a-z0-9]/g, '');  // Elimina caracteres no alfanuméricos

    const reversedText = cleanedText.split('').reverse().join('');
    const isPalindrome = cleanedText === reversedText;

    if (isPalindrome) {
       document.getElementById('result').innerText = `${inputText} is a palindrome`;
    } else {
       document.getElementById('result').innerText = `${inputText} is not a palindrome`;
    }
}

checkButton.addEventListener("click", checkPalindrome);
