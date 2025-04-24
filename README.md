
# 🎮 Jeu Memory

Un jeu Memory développé en HTML, CSS et JavaScript, où le but est de retrouver les paires d'images le plus rapidement possible. Ce projet m'a permis de mettre en pratique mes compétences en développement web, notamment la gestion du DOM, la logique de jeu, et le stockage local avec `localStorage`.

## 🧠 Fonctionnalités

- Système de jeu classique avec paires à retrouver
- Interface responsive
- Inscription/connexion utilisateurs
- Calcule du score en fonction du jeu
- Enregistrement et affichage des meilleurs scores (noms + temps)
- Menu déroulant pour choisir la taille de la grille (4x5, 6x6, etc.)
- Hash des mots de passe avec AES + PBKDF2 (dans la gestion utilisateur locale)
- Ajoute de 2 jeu supplémentaires (intégration de projets déjà existant)

## 🚀 Installation et utilisation

1. Clone ce dépôt ou télécharge-le :
   ```bash
   git clone https://github.com/matteorlt/Memory-Game.git
   ```
2. Ouvre le fichier `index.html` dans ton navigateur préféré.
3. Joue ! 😄

## 🔒 Sécurité

- Les mots de passe des utilisateurs sont chiffrés en local avec AES.
- Tout est stocké dans le `localStorage`.
- La clé n'est pas masqué 😱​

## 📊 Scores

- Un tableau des meilleurs scores est affiché sur la page de profil ou dans `scores.html`.
- Les noms des joueurs et leurs temps sont sauvegardés localement.

## 🛠️ Améliorations futures

- Ajout d’un classement en ligne (via backend ou Firebase)
- Ajout d’un mode multijoueur local
- Ajout d'une IA pour jouer en local

## 📚 Technologies utilisées

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Stockage local (`localStorage`)
- jQuery (optionnel)
- CryptoJS (pour AES & PBKDF2)

## 🙋‍♂️ Auteur

Mattéo

Projet réalisé dans le cadre de ma formation de développeur web.

---
