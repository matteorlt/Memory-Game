const loginFormContainer = document.querySelector("#loginForm");
const loginForm = loginFormContainer.querySelector("form");
const loginUsernameInput = document.querySelector("#login-username");
const loginPasswordInput = document.querySelector("#login-password");

let listeinfos = JSON.parse(localStorage.getItem("listeinfos")) || [];

/**
 * Gère la validation du formulaire de connexion.
 * Vérifie les champs, déchiffre le mot de passe et redirige si les identifiants sont corrects.
 */
function validatePassword() {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (!username || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const existingInfo = listeinfos.find(
      (info) => info.username === username
    );

    if (existingInfo) {
      try {
        const decryptedPassword = CryptoJS.AES.decrypt(
          existingInfo.password,
          "YOUR_SECRET_KEY"
        ).toString(CryptoJS.enc.Utf8);

        console.log("Mot de passe décrypté : ", decryptedPassword);

        if (decryptedPassword === password) {
          window.location.href = "profil.html";
          document.getElementById("profil").style.display = "block";
          localStorage.setItem("username", username);
          localStorage.setItem("email", existingInfo.email);
        } else {
          shakeElement(document.querySelector("#loginshake"));
        }
      } catch (error) {
        console.error("Erreur lors du décryptage du mot de passe:", error);
        shakeElement(document.querySelector("#loginshake"));
      }
    } else {
      shakeElement(document.querySelector("#loginshake"));
    }
  });
}

/**
 * Applique une animation de secousse à un élément DOM pour signaler une erreur.
 */
function shakeElement(element) {
  $(element).css("position", "relative");

  $(element)
    .animate({ left: "-10px" }, 100)
    .animate({ left: "10px" }, 100)
    .animate({ left: "-10px" }, 100)
    .animate({ left: "10px" }, 100)
    .animate({ left: "0px" }, 100);
}
