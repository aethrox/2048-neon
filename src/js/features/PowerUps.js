// ============================================================================
// POWER-UPS SYSTEM
// ============================================================================
// Manages Undo, Hint, and Remove power-ups
// ============================================================================

import gameState from '../core/GameState.js';
import { moveUp, moveDown, moveLeft, moveRight } from '../core/MovementEngine.js';
import { refreshBoard } from '../core/TileManager.js';

class PowerUps {
    constructor() {
        // DOM elements
        this.undoBtn = null;
        this.hintBtn = null;
        this.removeBtn = null;
        this.undoCountDisplay = null;
        this.hintCountDisplay = null;
        this.removeCountDisplay = null;
    }
    
    /**
     * Initialize power-ups system
     */
    init() {
        this.undoBtn = document.getElementById('undo-btn');
        this.hintBtn = document.getElementById('hint-btn');
        this.removeBtn = document.getElementById('remove-btn');
        this.undoCountDisplay = document.getElementById('undo-count');
        this.hintCountDisplay = document.getElementById('hint-count');
        this.removeCountDisplay = document.getElementById('remove-count');
        
        // Add event listeners
        if (this.undoBtn) this.undoBtn.addEventListener('click', () => this.useUndo());
        if (this.hintBtn) this.hintBtn.addEventListener('click', () => this.useHint());
        if (this.removeBtn) this.removeBtn.addEventListener('click', () => this.useRemove());
        
        // Initial display update
        this.updateDisplay();
    }
    
    /**
     * Reset power-ups to initial state
     */
    reset() {
        // Reset is handled by GameState
        this.updateDisplay();
    }
    
    /**
     * Update power-up display
     */
    updateDisplay() {
        if (this.undoCountDisplay) this.undoCountDisplay.textContent = gameState.powerUps.undo.count;
        if (this.hintCountDisplay) this.hintCountDisplay.textContent = gameState.powerUps.hint.count;
        if (this.removeCountDisplay) this.removeCountDisplay.textContent = gameState.powerUps.remove.count;
        
        // Enable/disable buttons
        if (this.undoBtn) this.undoBtn.disabled = gameState.powerUps.undo.count === 0 || gameState.moveHistory.length === 0;
        if (this.hintBtn) this.hintBtn.disabled = gameState.powerUps.hint.count === 0;
        if (this.removeBtn) this.removeBtn.disabled = gameState.powerUps.remove.count === 0;
        
        // Save to localStorage
        gameState.savePowerUps();
    }
    
    /**
     * Use Undo power-up
     */
    useUndo() {
        if (gameState.powerUps.undo.count === 0 || gameState.moveHistory.length === 0 || gameState.isMoving) return;
        
        // Get last move
        const lastMove = gameState.moveHistory.pop();
        
        // Restore state
        gameState.board = JSON.parse(JSON.stringify(lastMove.board));
        gameState.score = lastMove.score;
        
        // Update score display
        const scoreDisplay = document.getElementById('score');
        if (scoreDisplay) scoreDisplay.textContent = gameState.score;
        
        // Decrease count
        gameState.powerUps.undo.count--;
        
        // Add animation
        this.undoBtn.classList.add('in-use');
        setTimeout(() => this.undoBtn.classList.remove('in-use'), 600);
        
        // Refresh board
        refreshBoard();
        this.updateDisplay();
    }
    
    /**
     * Use Hint power-up
     */
    useHint() {
        if (gameState.powerUps.hint.count === 0 || gameState.isMoving) return;
        
        // Calculate best move
        const bestDirection = this.calculateBestMove();
    
        if (!bestDirection) {
            alert('No valid moves available!');
            return;
        }
        
        // Decrease count
        gameState.powerUps.hint.count--;
        
        // Add animation
        this.hintBtn.classList.add('in-use');
        setTimeout(() => this.hintBtn.classList.remove('in-use'), 600);
        
        // Show hint arrow
        this.showHintArrow(bestDirection);
        this.updateDisplay();
    }
    
    /**
     * Use Remove power-up
     */
    useRemove() {
        if (gameState.powerUps.remove.count === 0 || gameState.isMoving) return;
        
        // Enter remove mode
        gameState.removeModeActive = true;
        document.body.classList.add('remove-mode');
        
        // Add animation
        this.removeBtn.classList.add('in-use');
        setTimeout(() => this.removeBtn.classList.remove('in-use'), 600);
        
        // Add click listeners to tiles
        const tiles = document.querySelectorAll('.tile:not(.ghost-tile)');
        tiles.forEach(tile => {
            tile.addEventListener('click', (e) => this.handleTileRemove(e), { once: true });
        });
        
        // Cancel if clicked outside
        document.addEventListener('click', (e) => this.cancelRemoveMode(e), { once: true });
    }
    
    /**
     * Handle tile removal
     */
    handleTileRemove(e) {
        e.stopPropagation();
        
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        
        // Remove tile
        gameState.setTileValue(row, col, 0);
        gameState.setSpecialTile(row, col, null);
        
        // Decrease count
        gameState.powerUps.remove.count--;
        
        // Exit remove mode
        gameState.removeModeActive = false;
        document.body.classList.remove('remove-mode');
        
        // Refresh board
        refreshBoard();
        this.updateDisplay();
    }
    
    /**
     * Cancel remove mode
     */
    cancelRemoveMode(e) {
        if (gameState.removeModeActive && !e.target.closest('.tile')) {
            gameState.removeModeActive = false;
            document.body.classList.remove('remove-mode');
        }
    }
    
    /**
     * Calculate best move
     */
    calculateBestMove() {
        const directions = ['up', 'down', 'left', 'right'];
        let bestDirection = null;
        let bestScore = -1;
        
        directions.forEach(dir => {
            const testBoard = JSON.parse(JSON.stringify(gameState.board));
            let moved = false;
            
            switch (dir) {
                case 'up': moved = moveUp(testBoard); break;
                case 'down': moved = moveDown(testBoard); break;
                case 'left': moved = moveLeft(testBoard); break;
                case 'right': moved = moveRight(testBoard); break;
            }
            
            if (moved) {
                // Count empty cells and potential merges
                let emptyCount = 0;
                let mergeCount = 0;
                
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (testBoard[i][j] === 0) emptyCount++;
                        
                        // Check for potential merges
                        if (j < 3 && testBoard[i][j] === testBoard[i][j + 1] && testBoard[i][j] !== 0) mergeCount++;
                        if (i < 3 && testBoard[i][j] === testBoard[i + 1][j] && testBoard[i][j] !== 0) mergeCount++;
                    }
                }
                
                const moveScore = emptyCount * 10 + mergeCount * 50;
                
                if (moveScore > bestScore) {
                    bestScore = moveScore;
                    bestDirection = dir;
                }
            }
        });
        
        return bestDirection;
    }
    
    /**
     * Show hint arrow
     */
    showHintArrow(direction) {
        const arrow = document.createElement('div');
        arrow.className = 'hint-arrow';
        
        const arrows = {
            'up': '↑',
            'down': '↓',
            'left': '←',
            'right': '→'
        };
        
        arrow.textContent = arrows[direction];
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.appendChild(arrow);
            setTimeout(() => arrow.remove(), 2000);
        }
    }
    
    /**
     * Disable power-up buttons (for game over)
     */
    disableButtons() {
        if (this.undoBtn) this.undoBtn.disabled = true;
        if (this.hintBtn) this.hintBtn.disabled = true;
        if (this.removeBtn) this.removeBtn.disabled = true;
    }
    
    /**
     * Enable power-up buttons (for new game)
     */
    enableButtons() {
        this.updateDisplay();
    }
}

// Export singleton instance
export default new PowerUps();
