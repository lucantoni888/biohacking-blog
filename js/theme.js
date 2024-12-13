// Système de thème sombre/clair
const themeToggle = {
    init() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.applyTheme();
        this.setupListeners();
    },

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
    },

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    },

    setupListeners() {
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
            // Mise à jour de l'icône
            themeBtn.innerHTML = `<i class="fas ${this.theme === 'light' ? 'fa-moon' : 'fa-sun'}"></i>`;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => themeToggle.init());
