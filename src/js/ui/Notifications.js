// ============================================================================
// NOTIFICATIONS SYSTEM
// ============================================================================
// Toast-style notifications for user feedback
// ============================================================================

// Show a notification message
export function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        transform: translateX(400px);
        background: rgba(10, 14, 39, 0.95);
        border: 2px solid #00ffff;
        border-radius: 8px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: bold;
        color: #00ffff;
        text-shadow: 0 0 8px #00ffff;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        z-index: 1000;
        transition: transform 0.3s ease-out;
        max-width: 250px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Show milestone notification with points
export function showMilestoneNotification(message, points) {
    const notification = document.createElement('div');
    notification.className = 'milestone-notification';
    notification.innerHTML = `
        <div class="milestone-message">${message}</div>
        <div class="milestone-points">+${points}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Show confetti animation
export function showConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = ['#00ffff', '#ff00ff', '#ffbe0b'][Math.floor(Math.random() * 3)];
        confettiContainer.appendChild(confetti);
    }
    
    document.body.appendChild(confettiContainer);
    setTimeout(() => confettiContainer.remove(), 4000);
}
