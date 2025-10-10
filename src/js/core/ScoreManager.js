// ============================================================================
// SCORE MANAGER
// ============================================================================
// Manages score display and best score tracking
// ============================================================================

import gameState from './GameState.js';

class ScoreManager {
    constructor() {
        this.scoreDisplay = null;
        this.bestScoreDisplay = null;
    }
    
    /**
     * Initialize score manager
     */
    init() {
        this.scoreDisplay = document.getElementById('score');
        this.bestScoreDisplay = document.getElementById('best-score');
        
        // Display initial scores
        this.updateScoreDisplay();
        this.updateBestScoreDisplay();
    }
    
    /**
     * Update score display
     */
    updateScoreDisplay() {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = gameState.score;
        }
    }
    
    /**
     * Update best score display
     */
    updateBestScoreDisplay() {
        if (this.bestScoreDisplay) {
            this.bestScoreDisplay.textContent = gameState.bestScore;
        }
    }
    
    /**
     * Add points to score
     */
    addScore(points) {
        gameState.updateScore(points);
        this.updateScoreDisplay();
        
        // Check if best score was updated
        if (gameState.score > gameState.bestScore) {
            this.updateBestScoreDisplay();
        }
    }
    
    /**
     * Reset score for new game
     */
    resetScore() {
        gameState.score = 0;
        this.updateScoreDisplay();
    }
    
    /**
     * Get current score
     */
    getScore() {
        return gameState.score;
    }
    
    /**
     * Get best score
     */
    getBestScore() {
        return gameState.bestScore;
    }
}

// Export singleton instance
export default new ScoreManager();
