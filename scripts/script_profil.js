document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    const displayUser = document.getElementById("username-display");
    const email = localStorage.getItem("email");
    const displayMail = document.getElementById("email-display");

    if (username) {
        displayUser.innerText = "Profil de " + username;
    } else {
        displayUser.innerText = "Aucun utilisateur connecté.";
    }

    if (email) {
        displayMail.innerText = "Email : " + email;
    } else {
        displayMail.innerText = "Erreur";
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("username");
        window.location.href = "login.html";
    });

    // Affichage des meilleurs scores avec la date
    const scoreTableBody = document.querySelector("#score-table tbody");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const userScore = highScores.find(entry => entry.name === username);

    if (userScore) {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${highScores.indexOf(userScore) + 1}</td>
    <td>${userScore.name}</td>
    <td>${userScore.score}</td>
    <td>${userScore.gridSize}</td>
    <td>${userScore.type}</td>
    <td>${userScore.date}</td>
  `;
        scoreTableBody.appendChild(row);
    }
});