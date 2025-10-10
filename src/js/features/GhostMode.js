// ============================================================================
// GHOST MODE
// ============================================================================
// Manages ghost tile overlay to compare with best game
// ============================================================================

import gameState from '../core/GameState.js';
import { displayGhostTiles, removeGhostTiles } from '../core/TileManager.js';

class GhostMode {
    constructor() {
        // No initialization needed
    }
    
    /**
     * Initialize ghost mode
     */
    init() {
        if (gameState.ghostModeEnabled && gameState.ghostData) {
            this.display();
        }
    }
    
    /**
     * Toggle ghost mode on/off
     */
    toggle() {
        const newState = gameState.toggleGhostMode();
        
        if (newState) {
            // Check if ghost data exists
            if (!gameState.ghostData || !gameState.ghostData.board) {
                console.warn('No ghost data available. Play a game to record your best score!');
                alert('👻 No ghost data yet!\n\nPlay a game and achieve a score to record your ghost board.');
                gameState.ghostModeEnabled = false;
                localStorage.setItem('ghostModeEnabled', false);
                return false;
            }
            
            this.display();
        } else {
            this.remove();
        }
        
        return newState;
    }
    
    /**
     * Display ghost tiles
     */
    display() {
        displayGhostTiles();
    }
    
    /**
     * Remove ghost tiles
     */
    remove() {
        removeGhostTiles();
    }
    
    /**
     * Check if ghost mode is enabled
     */
    isEnabled() {
        return gameState.ghostModeEnabled;
    }
}

// Export singleton instance
export default new GhostMode();
