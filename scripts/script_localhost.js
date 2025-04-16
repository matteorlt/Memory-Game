function disconnect() {
  const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  document.getElementById("profil").style.display = "none";
  localStorage.removeItem("username");
  localStorage.removeItem("email");
});
}
function usernameNav() {
  const username = localStorage.getItem("username");
if (username !== null) {
    document.getElementById("profil").style.display = "block";
}
document.getElementById("profil").innerText = "Profil de " + username;
}

disconnect();
usernameNav();