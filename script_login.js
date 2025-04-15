const loginFormContainer = document.querySelector("#loginForm");
const loginForm = loginFormContainer.querySelector("form");
const loginUsernameInput = document.querySelector("#login-username");
const loginPasswordInput = document.querySelector("#login-password");

let listeinfos = JSON.parse(localStorage.getItem("listeinfos")) || [];

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value.trim();

  if (!username || !password) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const existingInfo = listeinfos.find(
    (info) => info.username === username && info.password === password
  );

  if (existingInfo) {
    window.location.href = "profil.html";
    document.getElementById("profil").style.display = "block";
    localStorage.setItem("username", username);
    localStorage.setItem("email", existingInfo.email);
  } else {
    alert("Nom d'utilisateur ou mot de passe incorrect.");
  }
});
