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

function updatePasswordStrength() {
  const password = passwordInput.value;
  let points = 0;

  // Vérification des critères
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^\w\s]/.test(password);
  const hasMinLength = password.length >= 6;
  const hasMaxLength = password.length >= 9;

  // Calcul des points
  if (hasUpperCase) points++;
  if (hasNumber) points++;
  if (hasLowerCase) points++;
  if (hasSymbol) points++;
  if (hasMinLength) points++;
  if (points >= 5) {
    if (hasMaxLength) points++;
  }

  console.log(password);
  console.log(points);
  // Ajustement des barres et des textes de force
  let strength = 0;
  let barWidth = "0%";
  let strengthText = "faible";
  let barClass = "weak";

  // Définition des paliers
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

  // Met à jour la barre de progression et le texte
  passwordStrengthBar.style.width = barWidth;
  passwordStrengthBar.className = `password-strength-bar ${barClass}`;
  passwordStrengthText.textContent = strengthText;

  // Vérification du mot de passe pour l'activation du bouton de soumission
  if (points >= 5) {
    passwordValidation.textContent = "✔️";
    passwordValidation.className = "validation-icon valid";
    buttonSubmit.disabled = false;
    document.getElementById("passwordError").hidden = true;
    return true;
    
  } else {
    passwordValidation.textContent = "❗";
    passwordValidation.className = "validation-icon invalid";
    buttonSubmit.disabled = true;
    document.getElementById("passwordError").hidden = false;
    return false;
  }
}

// Écouteur d'événements pour la saisie du mot de passe
passwordInput.addEventListener("input", updatePasswordStrength);

// Validation du formulaire
const form = document.getElementById("signupForm");

      form.addEventListener("submit", function (event) {
        // Empêcher la soumission du formulaire pour éviter le rechargement de la page
        event.preventDefault();

        // Stocker les données dans le localStorage
        localStorage.setItem("username", document.getElementById("username").value);
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("password", document.getElementById("password").value);

        // Afficher un message de confirmation ou toute autre action
        alert("Données enregistrées dans le localStorage!");
      });