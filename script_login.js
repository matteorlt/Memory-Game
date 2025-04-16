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
    (info) => info.username === username
  );

  if (existingInfo) {
    // Décryptage du mot de passe avec la même clé secrète
    try {
      const decryptedPassword = CryptoJS.AES.decrypt(existingInfo.password, "YOUR_SECRET_KEY").toString(CryptoJS.enc.Utf8);

      // Si le mot de passe décrypté est correct, on redirige
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

function shakeElement(element) {
  $(element).css("position", "relative");

  $(element)
    .animate({ left: "-10px" }, 100)
    .animate({ left: "10px" }, 100)
    .animate({ left: "-10px" }, 100)
    .animate({ left: "10px" }, 100)
    .animate({ left: "0px" }, 100);
}
