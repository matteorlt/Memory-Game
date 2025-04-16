/**
 * Gère la déconnexion de l'utilisateur.
 * Masque la section de profil et supprime les données du localStorage.
 */
function disconnect() {
  const logout = document.getElementById("logout");
  logout.addEventListener("click", () => {
    document.getElementById("profil").style.display = "none";
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  });
}

/**
 * Affiche le nom d'utilisateur dans la navigation si l'utilisateur est connecté.
 * Affiche également la section de profil.
 */
function usernameNav() {
  const username = localStorage.getItem("username");
  if (username !== null) {
    document.getElementById("profil").style.display = "block";
  }
  document.getElementById("profil").innerText = "Profil de " + username;
}

disconnect();
usernameNav();
