// ============================================================================
// FEEDBACK SYSTEM
// ============================================================================
// Complete feedback modal with 5-star rating system
// Webhook integration for collecting user feedback
// ============================================================================

import { t, getCurrentLanguage } from '../config/translations.js';
import { FEEDBACK_WEBHOOK_URL, STORAGE_KEYS } from '../config/constants.js';
import { showNotification } from '../ui/Notifications.js';
import gameState from '../core/GameState.js';

// Feedback state
let feedbackRating = 0;

// DOM Elements (initialized on load)
let feedbackModal;
let feedbackClose;
let stars;
let feedbackEmail;
let feedbackComment;
let charCount;
let submitFeedbackBtn;
let skipFeedbackBtn;
let dontShowCheckbox;

// Initialize feedback system
export function initFeedback() {
    // Get DOM elements
    feedbackModal = document.getElementById('feedback-modal');
    feedbackClose = document.querySelector('.feedback-close');
    stars = document.querySelectorAll('.star');
    feedbackEmail = document.getElementById('feedback-email');
    feedbackComment = document.getElementById('feedback-comment');
    charCount = document.getElementById('char-count');
    submitFeedbackBtn = document.getElementById('submit-feedback-btn');
    skipFeedbackBtn = document.getElementById('skip-feedback-btn');
    dontShowCheckbox = document.getElementById('dont-show-again');
    
    if (!feedbackModal) {
        console.warn('Feedback modal not found');
        return;
    }
    
    // Star rating listeners
    stars.forEach(star => {
        star.addEventListener('click', () => {
            feedbackRating = parseInt(star.dataset.rating);
            updateStars();
            submitFeedbackBtn.disabled = false;
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });
    });
    
    document.querySelector('.star-rating')?.addEventListener('mouseleave', () => {
        updateStars();
    });
    
    // Character counter
    if (feedbackComment) {
        feedbackComment.addEventListener('input', () => {
            charCount.textContent = feedbackComment.value.length;
        });
    }
    
    // Submit button
    if (submitFeedbackBtn) {
        submitFeedbackBtn.addEventListener('click', submitFeedback);
    }
    
    // Skip button
    if (skipFeedbackBtn) {
        skipFeedbackBtn.addEventListener('click', () => {
            if (dontShowCheckbox.checked) {
                localStorage.setItem(STORAGE_KEYS.feedbackDismissed, 'true');
            }
            closeFeedbackModal();
        });
    }
    
    // Close button
    if (feedbackClose) {
        feedbackClose.addEventListener('click', closeFeedbackModal);
    }
    
    // Close on backdrop click
    if (feedbackModal) {
        feedbackModal.addEventListener('click', (e) => {
            if (e.target === feedbackModal) {
                closeFeedbackModal();
            }
        });
    }
}

// Highlight stars on hover
function highlightStars(rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= rating) {
            star.classList.add('hover');
            star.textContent = '★';
        } else {
            star.classList.remove('hover');
            star.textContent = '☆';
        }
    });
}

// Update stars based on selected rating
function updateStars() {
    stars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        star.classList.remove('hover');
        if (starRating <= feedbackRating) {
            star.classList.add('selected');
            star.textContent = '★';
        } else {
            star.classList.remove('selected');
            star.textContent = '☆';
        }
    });
}

// Show feedback modal
export function showFeedbackModal(isManualTrigger = false) {
    // Only check localStorage preferences for automatic triggers
    if (!isManualTrigger) {
        const dismissed = localStorage.getItem(STORAGE_KEYS.feedbackDismissed) === 'true';
        const submitted = localStorage.getItem(STORAGE_KEYS.feedbackSubmitted) === 'true';
        
        if (dismissed || submitted) return;
    }
    
    // Show/hide "don't show again" checkbox based on trigger type
    if (dontShowCheckbox && dontShowCheckbox.parentElement) {
        if (isManualTrigger) {
            // Hide checkbox when manually opened from menu
            dontShowCheckbox.parentElement.style.display = 'none';
        } else {
            // Show checkbox when auto-triggered after game over/win
            dontShowCheckbox.parentElement.style.display = 'flex';
        }
    }
    
    if (feedbackModal) {
        feedbackModal.classList.add('show');
    }
}

// Check if feedback should be triggered (after game over/win)
export function checkFeedbackTrigger() {
    const dismissed = localStorage.getItem(STORAGE_KEYS.feedbackDismissed) === 'true';
    const submitted = localStorage.getItem(STORAGE_KEYS.feedbackSubmitted) === 'true';
    
    if (dismissed || submitted) return;
    
    // Show after game over/win with delay
    setTimeout(() => {
        showFeedbackModal();
    }, 1000);
}

// Submit feedback via webhook
export async function submitFeedback() {
    const email = feedbackEmail ? feedbackEmail.value.trim() : '';
    const comment = feedbackComment.value.trim();
    
    const feedbackData = {
        rating: feedbackRating,
        email: email || null,
        comment: comment || null,
        score: gameState.score,
        bestScore: gameState.bestScore,
        timestamp: new Date().toISOString(),
        language: getCurrentLanguage(),
        gamesPlayed: gameState.gamesPlayed
    };
    
    try {
        const response = await fetch(FEEDBACK_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        });
        
        if (response.ok) {
            localStorage.setItem(STORAGE_KEYS.feedbackSubmitted, 'true');
            showNotification(t('feedbackThankYou'));
            closeFeedbackModal();
        } else {
            throw new Error('Failed to submit');
        }
    } catch (error) {
        console.error('Feedback submission error:', error);
        showNotification(t('feedbackError'));
    }
}

// Close feedback modal
export function closeFeedbackModal() {
    if (feedbackModal) {
        feedbackModal.classList.remove('show');
    }
    
    // Reset form
    feedbackRating = 0;
    if (feedbackEmail) feedbackEmail.value = '';
    if (feedbackComment) feedbackComment.value = '';
    if (charCount) charCount.textContent = '0';
    if (submitFeedbackBtn) submitFeedbackBtn.disabled = true;
    if (dontShowCheckbox) dontShowCheckbox.checked = false;
    updateStars();
}

// Export feedback rating getter (for testing)
export function getFeedbackRating() {
    return feedbackRating;
}
