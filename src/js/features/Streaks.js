// ============================================================================
// STREAK SYSTEM
// ============================================================================
// Manages merge streaks and rewards
// ============================================================================

import gameState from '../core/GameState.js';
import { t } from '../config/translations.js';
import { STREAK_REWARDS } from '../config/constants.js';
import { showNotification, showMilestoneNotification } from '../ui/Notifications.js';

class Streaks {
    constructor() {
        this.streakDisplay = null;
        this.streakCount = null;
    }
    
    /**
     * Initialize streak system
     */
    init() {
        this.streakDisplay = document.getElementById('streak-display');
        this.streakCount = document.querySelector('.streak-count');
    }
    
    /**
     * Update streak based on merge count
     */
    update(mergeCount) {
        if (mergeCount > 0) {
            gameState.streaks.currentMergeStreak++;
            
            if (mergeCount >= 2) {
                gameState.streaks.currentPerfectStreak++;
            } else {
                gameState.streaks.currentPerfectStreak = 0;
            }
            
            // Update best streaks
            if (gameState.streaks.currentMergeStreak > gameState.streaks.bestMergeStreak) {
                gameState.streaks.bestMergeStreak = gameState.streaks.currentMergeStreak;
            }
            if (gameState.streaks.currentPerfectStreak > gameState.streaks.bestPerfectStreak) {
                gameState.streaks.bestPerfectStreak = gameState.streaks.currentPerfectStreak;
            }
            
            // Update display
            this.updateDisplay();
            
            // Check for streak rewards
            this.checkRewards();
        } else {
            // Reset streaks on non-merge move
            gameState.streaks.currentMergeStreak = 0;
            gameState.streaks.currentPerfectStreak = 0;
            this.updateDisplay();
        }
        
        // Save to localStorage
        gameState.saveStreaks();
    }
    
    /**
     * Update streak display
     */
    updateDisplay() {
        if (!this.streakDisplay || !this.streakCount) return;
        
        const streak = gameState.streaks.currentMergeStreak;
        
        if (streak >= 3) {
            this.streakDisplay.classList.add('show');
            this.streakCount.textContent = streak;
            
            // Update color based on streak level
            this.streakDisplay.classList.remove('streak-low', 'streak-medium', 'streak-high', 'streak-legendary');
            
            if (streak >= 15) {
                this.streakDisplay.classList.add('streak-legendary');
            } else if (streak >= 10) {
                this.streakDisplay.classList.add('streak-high');
            } else if (streak >= 7) {
                this.streakDisplay.classList.add('streak-medium');
            } else {
                this.streakDisplay.classList.add('streak-low');
            }
        } else {
            this.streakDisplay.classList.remove('show');
        }
    }
    
    /**
     * Check for streak rewards
     */
    checkRewards() {
        const streak = gameState.streaks.currentMergeStreak;
        
        // Check if this streak level has a reward
        const reward = STREAK_REWARDS[streak];
        
        if (reward) {
            const bonusPoints = reward.points;
            let message = t(reward.message);
            
            // For 15+ streaks, include the streak count
            if (streak >= 15) {
                message = `${streak} ${message}`;
            }
            
            gameState.updateScore(bonusPoints);
            showMilestoneNotification(message, bonusPoints);
            
            // Award random power-up for streak 10
            if (reward.powerUp) {
                this.awardRandomPowerUp();
            }
        }
    }
    
    /**
     * Award random power-up
     */
    awardRandomPowerUp() {
        const powerUpTypes = ['undo', 'hint', 'remove'];
        const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        
        if (gameState.powerUps[randomType].count < gameState.powerUps[randomType].max) {
            gameState.powerUps[randomType].count++;
            gameState.savePowerUps();
            
            const icons = { undo: '↶', hint: '💡', remove: '✕' };
            showNotification(`BONUS! +1 ${randomType.toUpperCase()} ${icons[randomType]}`);
        }
    }
    
    /**
     * Reset streaks
     */
    reset() {
        gameState.streaks.currentMergeStreak = 0;
        gameState.streaks.currentPerfectStreak = 0;
        this.updateDisplay();
    }
}

// Export singleton instance
export default new Streaks();
