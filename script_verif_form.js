const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const usernameValidation = document.getElementById('usernameValidation');
        const emailValidation = document.getElementById('emailValidation');
        const passwordValidation = document.getElementById('passwordValidation');
        const passwordStrengthBar = document.getElementById('passwordStrengthBar');
        const passwordStrengthText = document.getElementById('passwordStrengthText');
        const signupForm = document.getElementById('signupForm');

        function validateUsername() {
            if (usernameInput.value.trim() === '') {
                usernameError.textContent = 'Veuillez entrer un nom d\'utilisateur.';
                usernameValidation.textContent = '❗';
                usernameValidation.className = 'validation-icon invalid';
                return false;
            } else {
                usernameError.textContent = '';
                usernameValidation.textContent = '✔️';
                usernameValidation.className = 'validation-icon valid';
                return true;
            }
        }

        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Rentrez un email valide.';
                emailValidation.textContent = '❗';
                emailValidation.className = 'validation-icon invalid';
                return false;
            } else {
                emailError.textContent = '';
                emailValidation.textContent = '✔️';
                emailValidation.className = 'validation-icon valid';
                return true;
            }
        }

        function updatePasswordStrength() {
            const password = passwordInput.value;
            let strength = 0;
            const hasSymbol = /[^\w\s]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasLetter = /[a-zA-Z]/.test(password);

            if (password.length >= 6) strength++;
            if (hasSymbol) strength++;
            if (hasNumber) strength++;
            if (hasLetter) strength++;

            let barWidth = '0%';
            let barClass = '';
            let strengthText = 'faible';

            if (strength === 1) {
                barWidth = '33%';
                barClass = 'weak';
            } else if (strength <= 3 && password.length >= 6) {
                barWidth = '66%';
                barClass = 'medium';
                strengthText = 'moyen';
            } else if (strength === 4 && password.length >= 6) {
                barWidth = '100%';
                barClass = 'strong';
                strengthText = 'fort';
            }

            passwordStrengthBar.style.width = barWidth;
            passwordStrengthBar.className = `password-strength-bar ${barClass}`;
            passwordStrengthText.textContent = strengthText;

            const isValidPassword = password.length >= 6 && hasSymbol && hasNumber && hasLetter;
            if (isValidPassword) {
                passwordError.textContent = '';
                passwordValidation.textContent = '✔️';
                passwordValidation.className = 'validation-icon valid';
                return true;
            } else if (password.length > 0) {
                passwordError.textContent = 'Au moins un symbole, un chiffre, ainsi que 6 caractères minimum.';
                passwordValidation.textContent = '❗';
                passwordValidation.className = 'validation-icon invalid';
                return false;
            } else {
                passwordError.textContent = 'Au moins un symbole, un chiffre, ainsi que 6 caractères minimum.';
                passwordValidation.textContent = '';
                return false;
            }
        }

        usernameInput.addEventListener('blur', validateUsername);
        emailInput.addEventListener('blur', validateEmail);
        passwordInput.addEventListener('input', updatePasswordStrength);

        signupForm.addEventListener('submit', function(event) {
            const isUsernameValid = validateUsername();
            const isEmailValid = validateEmail();
            const isPasswordValid = updatePasswordStrength();

            if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
                event.preventDefault(); // Prevent form submission if any field is invalid
            } else {
                alert('Formulaire soumis avec succès!'); // Replace with your actual submission logic
            }
        });