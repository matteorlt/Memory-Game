const username = localStorage.getItem("username");
if (username !== null) {
    document.getElementById("profil").style.display = "block";
}
document.getElementById("profil").innerText = "Profil de " + username;

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  document.getElementById("profil").style.display = "none";
  localStorage.removeItem("username");
  localStorage.removeItem("email");
});
