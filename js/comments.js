// Système de commentaires
class CommentSystem {
    constructor() {
        this.comments = JSON.parse(localStorage.getItem('comments') || '{}');
        this.currentUser = null;
    }

    addComment(articleId, content) {
        if (!this.currentUser) return false;

        const comment = {
            id: Date.now(),
            content,
            author: this.currentUser,
            date: new Date().toISOString(),
            likes: 0
        };

        if (!this.comments[articleId]) {
            this.comments[articleId] = [];
        }

        this.comments[articleId].push(comment);
        this.saveComments();
        this.renderComments(articleId);
        return true;
    }

    likeComment(articleId, commentId) {
        const comment = this.comments[articleId].find(c => c.id === commentId);
        if (comment) {
            comment.likes++;
            this.saveComments();
            this.renderComments(articleId);
        }
    }

    saveComments() {
        localStorage.setItem('comments', JSON.stringify(this.comments));
    }

    renderComments(articleId) {
        const container = document.getElementById('comments-container');
        if (!container) return;

        const comments = this.comments[articleId] || [];
        container.innerHTML = comments.map(comment => `
            <div class="comment" data-id="${comment.id}">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${new Date(comment.date).toLocaleDateString()}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions">
                    <button class="like-btn" onclick="commentSystem.likeComment('${articleId}', ${comment.id})">
                        <i class="fas fa-heart"></i> ${comment.likes}
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Système de partage
const shareSystem = {
    shareArticle(title, url) {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            }).catch(console.error);
        } else {
            // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
            const shareUrl = encodeURIComponent(url);
            const shareTitle = encodeURIComponent(title);
            
            const shareLinks = {
                twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
                linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`,
                whatsapp: `https://wa.me/?text=${shareTitle}%20${shareUrl}`
            };

            const modal = document.createElement('div');
            modal.className = 'share-modal';
            modal.innerHTML = `
                <div class="share-modal-content">
                    <h3>Partager cet article</h3>
                    <div class="share-buttons">
                        ${Object.entries(shareLinks).map(([platform, link]) => `
                            <a href="${link}" target="_blank" rel="noopener noreferrer" class="share-btn ${platform}">
                                <i class="fab fa-${platform}"></i>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            modal.onclick = e => {
                if (e.target === modal) {
                    modal.remove();
                }
            };
        }
    }
};

// Initialisation
const commentSystem = new CommentSystem();
document.addEventListener('DOMContentLoaded', () => {
    // Setup du formulaire de commentaires
    const form = document.getElementById('comment-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const content = form.querySelector('textarea').value;
            const articleId = form.dataset.articleId;
            if (content && articleId) {
                commentSystem.addComment(articleId, content);
                form.reset();
            }
        };
    }
});
