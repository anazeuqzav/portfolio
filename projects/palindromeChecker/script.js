const checkButton = document.getElementById("check-btn");

function checkPalindrome() {
  const inputText = document.getElementById('text-input').value;

  if (!inputText) {
        alert('Please input a value');
        return;
    }
    const cleanedText = inputText.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedText = cleanedText.split('').reverse().join('');
    const isPalindrome = cleanedText === reversedText;

    if (isPalindrome) {
       document.getElementById('result').innerText = `${inputText} is a palindrome`;
    } else {
       document.getElementById('result').innerText = `${inputText} is not a palindrome`;
    }
}

checkButton.addEventListener("click", checkPalindrome);
