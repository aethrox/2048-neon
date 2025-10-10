// ============================================================================
// MILESTONES SYSTEM
// ============================================================================
// Manages tile value milestones and score thresholds
// ============================================================================

import gameState from '../core/GameState.js';
import { t } from '../config/translations.js';
import { MILESTONE_VALUES, MILESTONE_REWARDS, SCORE_MILESTONES } from '../config/constants.js';
import { showNotification, showMilestoneNotification, showConfetti } from '../ui/Notifications.js';

class Milestones {
    constructor() {
        // No initialization needed
    }
    
    /**
     * Initialize milestones system
     */
    init() {
        // No initialization needed for milestones
    }
    
    /**
     * Check if a tile milestone has been reached
     */
    checkTile(value) {
        // Check if this tile value is a milestone and hasn't been reached before
        if (MILESTONE_VALUES.includes(value) && !gameState.milestones.tilesReached.includes(value)) {
            gameState.milestones.tilesReached.push(value);
            gameState.saveMilestones();
            
            const reward = MILESTONE_REWARDS[value];
            
            if (reward) {
                const bonusPoints = reward.points;
                const message = t(reward.message);
                
                gameState.updateScore(bonusPoints);
                showMilestoneNotification(message, bonusPoints);
                
                // Show confetti for major milestones
                if (reward.confetti) {
                    showConfetti();
                }
            }
        }
    }
    
    /**
     * Check score milestones for power-up rewards
     */
    checkScore() {
        const score = gameState.score;
        const lastMilestone = gameState.lastScoreMilestone;
        
        // Check each score milestone
        Object.entries(SCORE_MILESTONES).forEach(([threshold, reward]) => {
            const thresholdValue = parseInt(threshold);
            
            // Check if we've passed this threshold and haven't awarded it yet
            if (score >= thresholdValue && lastMilestone < thresholdValue) {
                const powerUpType = reward.powerUp;
                
                // Award power-up if not at max
                if (gameState.powerUps[powerUpType].count < gameState.powerUps[powerUpType].max) {
                    gameState.powerUps[powerUpType].count++;
                    showNotification(reward.message);
                    gameState.savePowerUps();
                }
                
                // Update last milestone
                gameState.lastScoreMilestone = thresholdValue;
            }
        });
        
        // Also check for 1000 point intervals for hint power-ups
        if (score >= lastMilestone + 1000 && Math.floor(score / 1000) > Math.floor(lastMilestone / 1000)) {
            if (gameState.powerUps.hint.count < gameState.powerUps.hint.max) {
                gameState.powerUps.hint.count++;
                showNotification('POWER-UP EARNED! +1 HINT 💡');
                gameState.savePowerUps();
            }
            gameState.lastScoreMilestone = Math.floor(score / 1000) * 1000;
        }
    }
}

// Export singleton instance
export default new Milestones();
