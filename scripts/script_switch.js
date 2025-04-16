function switchMode() {
  const switchModeButton = document.getElementById("switch-mode");
  let count = 1;
  switchModeButton.addEventListener("click", () => {
    count++;
    // Animation de switch
    switchModeButton.classList.add("animate-switch");
  
    // Attendez que l'animation soit terminée
    setTimeout(() => {
      // Switcher en mode connexion
      if (count % 2 === 0) {
        document.getElementById("signupForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        switchModeButton.textContent = "S'inscrire";
      } else {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("signupForm").style.display = "block";
        switchModeButton.textContent = "Se connecter";
      }
  
      // Supprimer l'animation de switch
      switchModeButton.classList.remove("animate-switch");
    }, 500);
  });
}

switchMode();