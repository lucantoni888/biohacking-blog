// Système de catégories et tags
const categories = {
    nutrition: {
        name: 'Nutrition',
        description: 'Optimisation nutritionnelle et supplémentation',
        icon: 'fa-apple-whole'
    },
    sommeil: {
        name: 'Sommeil',
        description: 'Optimisation du sommeil et récupération',
        icon: 'fa-moon'
    },
    meditation: {
        name: 'Méditation',
        description: 'Méditation et pratiques mindfulness',
        icon: 'fa-om'
    },
    cognitive: {
        name: 'Optimisation Cognitive',
        description: 'Nootropiques et amélioration cognitive',
        icon: 'fa-brain'
    },
    sport: {
        name: 'Performance Physique',
        description: 'Entraînement et récupération',
        icon: 'fa-dumbbell'
    }
};

// Système de filtrage par catégories
function filterByCategory(category) {
    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        if (category === 'all' || article.dataset.category === category) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });

    // Mise à jour du bouton actif
    document.querySelectorAll('.category-filter').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
}

// Système de tags
function filterByTag(tag) {
    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        const tags = article.dataset.tags.split(',');
        if (tag === 'all' || tags.includes(tag)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Création des filtres de catégories
    const categoryContainer = document.getElementById('category-filters');
    if (categoryContainer) {
        Object.keys(categories).forEach(key => {
            const btn = document.createElement('button');
            btn.className = 'category-filter';
            btn.dataset.category = key;
            btn.innerHTML = `<i class="fas ${categories[key].icon}"></i> ${categories[key].name}`;
            btn.onclick = () => filterByCategory(key);
            categoryContainer.appendChild(btn);
        });
    }
});
