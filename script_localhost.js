const username = localStorage.getItem("username");
console.log(username);
document.getElementById("profil").innerText = "Profil de " + username;

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  document.getElementById("profil").style.display = "none";
  localStorage.removeItem("username");
});
