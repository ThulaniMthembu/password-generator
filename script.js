document.addEventListener('DOMContentLoaded', () => {
  // Theme switching elements
  const lightModeBtn = document.getElementById('light-btn');
  const darkModeBtn = document.getElementById('dark-btn');
  const mainContainer = document.getElementById('main-container');
  const span = document.querySelector('.span');
  const generatePwdBtn = document.getElementById('generatePwd-btn');
  const customPwdBtn = document.getElementById('customPwd-btn');
  const getPasswordOne = document.getElementById('pwd1');
  const getPasswordTwo = document.getElementById('pwd2');

  // Characters for password generation
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+=[]{}|:;<>.,?/";

  // Set light mode
  const setLightMode = () => {
    // Add light mode styles
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    mainContainer.classList.add('main-container-colors-light');
    mainContainer.classList.remove('main-container-colors-dark');
    span.classList.add('span-light');
    span.classList.remove('span-dark');
    generatePwdBtn.classList.add('generateBtn-light');
    generatePwdBtn.classList.remove('generateBtn-dark');
    customPwdBtn.classList.add('generateBtn-light');
    customPwdBtn.classList.remove('generateBtn-dark');
    getPasswordOne.classList.add('pwd-inputs-light');
    getPasswordOne.classList.remove('pwd-inputs-dark');
    getPasswordTwo.classList.add('pwd-inputs-light');
    getPasswordTwo.classList.remove('pwd-inputs-dark');
    localStorage.setItem('theme', 'light');
  };

  // Set dark mode
  const setDarkMode = () => {
    // Add dark mode styles
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    mainContainer.classList.add('main-container-colors-dark');
    mainContainer.classList.remove('main-container-colors-light');
    span.classList.add('span-dark');
    span.classList.remove('span-light');
    generatePwdBtn.classList.add('generateBtn-dark');
    generatePwdBtn.classList.remove('generateBtn-light');
    customPwdBtn.classList.add('generateBtn-dark');
    customPwdBtn.classList.remove('generateBtn-light');
    getPasswordOne.classList.add('pwd-inputs-dark');
    getPasswordOne.classList.remove('pwd-inputs-light');
    getPasswordTwo.classList.add('pwd-inputs-dark');
    getPasswordTwo.classList.remove('pwd-inputs-light');
    localStorage.setItem('theme', 'dark');
  };

  // Event listeners for theme buttons
  lightModeBtn.addEventListener('click', setLightMode);
  darkModeBtn.addEventListener('click', setDarkMode);

  // Check and set saved theme on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setDarkMode();
  } else {
    setLightMode();
  }

  // Show optional container for custom password
  customPwdBtn.addEventListener('click', () => {
    document.getElementById('optional-container').style.display = 'block';
  });

  // Generate random password
  generatePwdBtn.addEventListener('click', () => {
    const passwordLength = 15;
    getPasswordOne.textContent = generateRandomPassword(passwordLength);
    getPasswordTwo.textContent = generateRandomPassword(passwordLength);
  });

  // Function to generate random password
  const generateRandomPassword = (length, includeSymbols = true, includeNumbers = true) => {
    let password = '';
    const symbols = "~`!@#$%^&*()_-+={}[]|:;<>.,?/";
    const numbers = "0123456789";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let characters = letters;
    if (includeSymbols) characters += symbols;
    if (includeNumbers) characters += numbers;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  // Generate custom password
  customPwdBtn.addEventListener('click', () => {
    document.getElementById('optional-container').style.display = 'block';
    const customPwdBtnGenerate = customPwdBtn;
    customPwdBtnGenerate.addEventListener('click', () => {
      const length = parseInt(document.getElementById('length').value);
      const includeSymbols = document.getElementById('symbols').checked;
      const includeNumbers = document.getElementById('numbers').checked;
      getPasswordOne.textContent = generateRandomPassword(length, includeSymbols, includeNumbers);
      getPasswordTwo.textContent = generateRandomPassword(length, includeSymbols, includeNumbers);
    });
  });

  // Copy password on click
  getPasswordOne.addEventListener('click', () => copyToClipboard(getPasswordOne.textContent));
  getPasswordTwo.addEventListener('click', () => copyToClipboard(getPasswordTwo.textContent));

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Password copied to clipboard');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };
});
