const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const usernameValidation = document.getElementById("usernameValidation");
const emailValidation = document.getElementById("emailValidation");
const passwordValidation = document.getElementById("passwordValidation");
const passwordStrengthBar = document.getElementById("passwordStrengthBar");
const passwordStrengthText = document.getElementById("passwordStrengthText");
const signupForm = document.getElementById("signupForm");
const buttonSubmit = document.getElementById("button-submit");

buttonSubmit.disabled = true;

// Fonction de validation du nom d'utilisateur
function validateUsername() {
  if (usernameInput.value.trim() === "") {
    usernameError.textContent = "Veuillez entrer un nom d'utilisateur.";
    usernameValidation.textContent = "❗";
    usernameValidation.className = "validation-icon invalid";
    return false;
  }
  if (usernameInput.value.length >= 3) {
    usernameError.textContent = "";
    usernameValidation.textContent = "✔️";
    usernameValidation.className = "validation-icon valid";
    return true;
  }
}

// Fonction de validation de l'email
function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = "Rentrez un email valide.";
    emailValidation.textContent = "❗";
    emailValidation.className = "validation-icon invalid";
    return false;
  } else {
    emailError.textContent = "";
    emailValidation.textContent = "✔️";
    emailValidation.className = "validation-icon valid";
    return true;
  }
}

// Fonction de validation du mot de passe (sans appel récursif)
function validatePassword() {
  const password = passwordInput.value;
  let points = 0;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^\w\s]/.test(password);
  const hasMinLength = password.length >= 6;
  const hasMaxLength = password.length >= 9;

  if (hasUpperCase) points++;
  if (hasNumber) points++;
  if (hasLowerCase) points++;
  if (hasSymbol) points++;
  if (hasMinLength) points++;
  if (points >= 5 && hasMaxLength) points++;

  // Mise à jour de la barre
  let barWidth = "0%";
  let strengthText = "faible";
  let barClass = "weak";

  if (points === 2) {
    barWidth = "20%";
    strengthText = "pas assez fort";
    barClass = "weak";
  } else if (points === 3) {
    barWidth = "40%";
    strengthText = "pas assez fort";
    barClass = "weak";
  } else if (points === 4) {
    barWidth = "60%";
    strengthText = "pas assez fort";
    barClass = "weak";
  } else if (points === 5) {
    barWidth = "80%";
    strengthText = "validation possible";
    barClass = "medium";
  } else if (points === 6) {
    barWidth = "100%";
    strengthText = "fort";
    barClass = "strong";
  }

  passwordStrengthBar.style.width = barWidth;
  passwordStrengthBar.className = `password-strength-bar ${barClass}`;
  passwordStrengthText.textContent = strengthText;

  if (points >= 5) {
    passwordValidation.textContent = "✔️";
    passwordValidation.className = "validation-icon valid";
    passwordError.hidden = true;
    return true;
  } else {
    passwordValidation.textContent = "❗";
    passwordValidation.className = "validation-icon invalid";
    passwordError.hidden = false;
    return false;
  }
}

// Vérifie si tout est bon
function checkAllFields() {
  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  let listeinfos = [];

  buttonSubmit.disabled = !(isUsernameValid && isEmailValid && isPasswordValid);
}

// Ajout des écouteurs d'événements
usernameInput.addEventListener("input", checkAllFields);
emailInput.addEventListener("input", checkAllFields);
passwordInput.addEventListener("input", checkAllFields);

// Validation du formulaire
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateUsername() && validateEmail() && validatePassword()) {
    listeinfos.push(localStorage.setItem("username", usernameInput.value));
    listeinfos.push(localStorage.setItem("email", emailInput.value));
    listeinfos.push(localStorage.setItem("password", passwordInput.value));

    alert("Données enregistrées dans le localStorage!");
  } else {
    alert("Veuillez remplir correctement tous les champs.");
  }
});
