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

const signupForm = document.getElementById("signupForm").querySelector("form");
const buttonSubmit = signupForm.querySelector("button[type='submit']");

buttonSubmit.disabled = true;

const SECRET_KEY = "YOUR_SECRET_KEY"; // Clé secrète pour le cryptage AES

// Validation du nom d'utilisateur
function validateUsername() {
  const username = usernameInput.value.trim();

  if (username === "") {
    usernameError.textContent = "Veuillez entrer un nom d'utilisateur.";
    usernameValidation.textContent = "❗";
    usernameValidation.className = "validation-icon invalid";
    return false;
  }

  if (username.length < 3) {
    usernameError.textContent =
      "Le nom d'utilisateur doit contenir au moins 3 caractères.";
    usernameValidation.textContent = "❗";
    usernameValidation.className = "validation-icon invalid";
    return false;
  }

  usernameError.textContent = "";
  usernameValidation.textContent = "✔️";
  usernameValidation.className = "validation-icon valid";
  return true;
}

// Validation de l'email
function validateEmail() {
  const email = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    emailError.textContent = "Rentrez un email valide.";
    emailValidation.textContent = "❗";
    emailValidation.className = "validation-icon invalid";
    return false;
  }

  emailError.textContent = "";
  emailValidation.textContent = "✔️";
  emailValidation.className = "validation-icon valid";
  return true;
}

// Validation du mot de passe et barre de force
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
  if (hasLowerCase) points++;
  if (hasNumber) points++;
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
    strengthText = "medium";
    barClass = "medium";
    buttonSubmit.disabled = false;
  } else if (points >= 6) {
    barWidth = "100%";
    strengthText = "fort";
    barClass = "strong";
    buttonSubmit.disabled = false;
  }

  passwordStrengthBar.style.width = barWidth;
  passwordStrengthBar.className = `password-strength-bar ${barClass}`;
  passwordStrengthText.textContent = strengthText;

  if (points >= 5) {
    passwordError.hidden = true;
    passwordValidation.textContent = "✔️";
    passwordValidation.className = "validation-icon valid";
    return true;
  } else {
    passwordError.hidden = false;
    passwordValidation.textContent = "❗";
    passwordValidation.className = "validation-icon invalid";
    return false;
  }
}

// Vérifie tous les champs
function checkAllFields() {
  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  buttonSubmit.disabled = !(isUsernameValid && isEmailValid && isPasswordValid);
}

// Gestion de la soumission du formulaire
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateUsername() && validateEmail() && validatePassword()) {
    const listeinfos = JSON.parse(localStorage.getItem("listeinfos")) || [];

    const alreadyExists = listeinfos.find(
      (info) =>
        info.username === usernameInput.value && info.email === emailInput.value
    );

    if (alreadyExists) {
      shakeElement(document.querySelector("#loginshake"));
      return;
    }

    // Crypter le mot de passe avant de le sauvegarder
    const encryptedPassword = CryptoJS.AES.encrypt(passwordInput.value, SECRET_KEY).toString();

    listeinfos.push({
      username: usernameInput.value,
      email: emailInput.value,
      password: encryptedPassword,
    });

    localStorage.setItem("listeinfos", JSON.stringify(listeinfos));
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    switchModeButton.textContent = "S'inscrire";
    document.getElementById("profil").style.display = "none";
    alert("Inscription réussie !");
  } else {
    shakeElement(document.querySelector("#loginshake"));
  }
});

function shakeElement(element) {
  $(element).css("position", "relative"); // s'assurer que l'élément peut bouger

  $(element)
    .animate({ left: "-10px" }, 100)
    .animate({ left: "10px" }, 100)
    .animate({ left: "-10px" }, 100)
    .animate({ left: "10px" }, 100)
    .animate({ left: "0px" }, 100);
}

// Événements "input"
usernameInput.addEventListener("input", checkAllFields);
emailInput.addEventListener("input", checkAllFields);
passwordInput.addEventListener("input", checkAllFields);
