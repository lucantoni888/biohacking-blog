// Système de newsletter et contenu premium
class MembershipSystem {
    constructor() {
        this.subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        this.members = JSON.parse(localStorage.getItem('members') || '[]');
        this.currentUser = null;
    }

    subscribe(email, interests) {
        if (!this.isValidEmail(email)) return false;

        const subscriber = {
            email,
            interests: interests || [],
            dateSubscribed: new Date().toISOString()
        };

        if (!this.subscribers.find(s => s.email === email)) {
            this.subscribers.push(subscriber);
            this.saveSubscribers();
            return true;
        }
        return false;
    }

    registerMember(email, password, plan) {
        if (!this.isValidEmail(email)) return false;

        const member = {
            email,
            plan,
            dateJoined: new Date().toISOString(),
            // En production, utilisez un système sécurisé de hachage de mot de passe
            passwordHash: btoa(password)
        };

        if (!this.members.find(m => m.email === email)) {
            this.members.push(member);
            this.saveMembers();
            return true;
        }
        return false;
    }

    login(email, password) {
        const member = this.members.find(m => 
            m.email === email && 
            m.passwordHash === btoa(password)
        );

        if (member) {
            this.currentUser = member;
            this.updateUI();
            return true;
        }
        return false;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    saveSubscribers() {
        localStorage.setItem('subscribers', JSON.stringify(this.subscribers));
    }

    saveMembers() {
        localStorage.setItem('members', JSON.stringify(this.members));
    }

    updateUI() {
        // Mise à jour de l'interface utilisateur
        const premiumContent = document.querySelectorAll('.premium-content');
        premiumContent.forEach(element => {
            if (this.currentUser && this.currentUser.plan === 'premium') {
                element.classList.remove('locked');
            } else {
                element.classList.add('locked');
            }
        });

        // Mise à jour du bouton de connexion
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.textContent = this.currentUser ? 'Mon Compte' : 'Se Connecter';
        }
    }
}

// Initialisation
const membershipSystem = new MembershipSystem();
document.addEventListener('DOMContentLoaded', () => {
    // Setup du formulaire de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.onsubmit = (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            const interests = Array.from(newsletterForm.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value);
            
            if (membershipSystem.subscribe(email, interests)) {
                alert('Merci de votre inscription à la newsletter !');
                newsletterForm.reset();
            } else {
                alert('Cette adresse email est déjà inscrite.');
            }
        };
    }

    // Setup du formulaire d'inscription premium
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.onsubmit = (e) => {
            e.preventDefault();
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;
            const plan = registerForm.querySelector('select[name="plan"]').value;

            if (membershipSystem.registerMember(email, password, plan)) {
                alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                registerForm.reset();
            } else {
                alert('Cette adresse email est déjà utilisée.');
            }
        };
    }
});
