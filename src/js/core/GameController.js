/**
 * GameController.js - Main Game Loop and Control Logic
 * Handles game initialization, movement logic, win/lose conditions
 */

import GameState from './GameState.js';
import TileManager from './TileManager.js';
import { moveUp, moveDown, moveLeft, moveRight } from './MovementEngine.js';
import gameState from './GameState.js';
import ScoreManager from './ScoreManager.js';
import GhostMode from '../features/GhostMode.js';
import PowerUps from '../features/PowerUps.js';
import Streaks from '../features/Streaks.js';
import Milestones from '../features/Milestones.js';
import { checkFeedbackTrigger } from '../features/Feedback.js';
import { translations } from '../config/translations.js';

class GameController {
    constructor() {
        this.grid = document.querySelector('.grid');
        this.gameOverScreen = document.querySelector('.game-over');
        this.winScreen = document.querySelector('.win');
        this.tryAgainBtn = document.getElementById('try-again');
        this.keepGoingBtn = document.getElementById('keep-going');
        this.newGameBtn2 = document.getElementById('new-game-2');
    }
    
    /**
     * Initialize the game controller
     */
    init() {
        this.setupButtonListeners();
    }
    
    /**
     * Setup button event listeners
     */
    setupButtonListeners() {
        if (this.tryAgainBtn) {
            this.tryAgainBtn.addEventListener('click', () => this.initGame());
        }
        
        if (this.keepGoingBtn) {
            this.keepGoingBtn.addEventListener('click', () => {
                this.winScreen.classList.remove('show');
            });
        }
        
        if (this.newGameBtn2) {
            this.newGameBtn2.addEventListener('click', () => this.initGame());
        }
    }
    
    /**
     * Initialize a new game
     */
    initGame() {
        const state = gameState;
        
        // Use GameState's built-in reset method (handles power-ups properly)
        state.resetGameState();
        
        // Update score display
        ScoreManager.updateScoreDisplay();
        
        // Reset streaks
        Streaks.reset();
        
        // Update power-up display (this will enable buttons with correct counts)
        PowerUps.updateDisplay();
        
        // Clear the grid
        this.grid.innerHTML = '';
        
        // Create empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                this.grid.appendChild(cell);
            }
        }
        
        // Update ghost display if enabled (before adding tiles)
        if (GhostMode.isEnabled()) {
            GhostMode.display();
        }
        
        // Add initial tiles
        TileManager.addRandomTile();
        TileManager.addRandomTile();
        
        // Hide game over and win screens
        this.gameOverScreen.classList.remove('show');
        this.winScreen.classList.remove('show');
    }
    
    /**
     * Move tiles in the specified direction
     */
    async moveTiles(direction) {
        const state = gameState;
        
        if (state.isMoving) return false;
        state.isMoving = true;
        
        // Save move history for undo
        state.moveHistory.push({
            board: JSON.parse(JSON.stringify(state.board)),
            score: state.score
        });
        
        // Keep only last 3 moves
        if (state.moveHistory.length > 3) {
            state.moveHistory.shift();
        }
        
        // Reset merge count for this move
        state.mergeCountThisMove = 0;
        
        // Clear merged positions
        state.mergedPositions.clear();
        
        // Get all current tiles
        const tiles = document.querySelectorAll('.tile:not(.ghost-tile)');
        
        // Process the move based on direction
        let moved = false;
        switch(direction) {
            case 'up': moved = moveUp(state.board); break;
            case 'down': moved = moveDown(state.board); break;
            case 'left': moved = moveLeft(state.board); break;
            case 'right': moved = moveRight(state.board); break;
        }
        
        if (moved) {
            // Increment move counter
            state.moveCount++;
            
            // Remove ALL tiles (including ghost tiles)
            tiles.forEach(tile => tile.remove());
            
            // Re-create ghost tiles first (if enabled)
            if (GhostMode.isEnabled()) {
                GhostMode.display();
            }
            
            // Create new tiles at their new positions
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (state.board[i][j] !== 0) {
                        const tile = TileManager.createTile(i, j, state.board[i][j], false);
                        
                        // Check if this position had a merge
                        if (state.mergedPositions.has(`${i}-${j}`)) {
                            // Apply random merge animation (1-24)
                            const randomAnim = Math.floor(Math.random() * 24) + 1;
                            tile.classList.add(`merge-${randomAnim}`);
                            
                            // Remove animation class after it completes
                            setTimeout(() => {
                                tile.classList.remove(`merge-${randomAnim}`);
                            }, 600);
                        }
                    }
                }
            }
            
            // Add a new random tile after animation
            await new Promise(resolve => setTimeout(resolve, 150));
            TileManager.addRandomTile();
            
            // Release the moving lock immediately
            state.isMoving = false;
            
            // Update streak based on merge count
            Streaks.update(state.mergeCountThisMove);
            
            // Update power-up display (enables undo button after first move)
            PowerUps.updateDisplay();
            
            // Check for win (2048)
            if (!state.hasWon && this.checkWin()) {
                state.hasWon = true;
                this.winGame();
            }
            
            // Check for game over (no more moves possible)
            if (!this.canMove()) {
                this.gameOver();
            }
            
            return true;
        }
        
        state.isMoving = false;
        return false;
    }
    
    /**
     * Check if the player has won (reached 2048)
     */
    checkWin() {
        const state = gameState;
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (state.board[i][j] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }
    
    /**
     * Check if there are any possible moves left
     */
    canMove() {
        const state = gameState;
        
        // Check for empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (state.board[i][j] === 0) {
                    return true;
                }
            }
        }
        
        // Check for possible merges (horizontal and vertical)
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const value = state.board[i][j];
                
                // Check right
                if (j < 3 && state.board[i][j + 1] === value) {
                    return true;
                }
                
                // Check down
                if (i < 3 && state.board[i + 1][j] === value) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * Handle game over
     */
    gameOver() {
        // Disable power-up buttons
        PowerUps.disableButtons();
        
        setTimeout(() => {
            this.gameOverScreen.classList.add('show');
        }, 300);
        
        // Trigger feedback modal
        checkFeedbackTrigger();
    }
    
    /**
     * Handle win
     */
    winGame() {
        // Disable power-up buttons
        PowerUps.disableButtons();
        
        setTimeout(() => {
            this.winScreen.classList.add('show');
        }, 300);
        
        // Trigger feedback modal
        checkFeedbackTrigger();
    }
    
    /**
     * Update all UI texts based on current language
     */
    updateAllTexts() {
        const currentLanguage = localStorage.getItem('game-language') || 'en';
        
        function t(key) {
            return translations[currentLanguage][key] || key;
        }
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.innerHTML = t(key);
        });
        
        // Update game over/win screens
        const gameOverText = this.gameOverScreen.querySelector('p');
        if (gameOverText) gameOverText.textContent = t('gameOver');
        
        const winText = this.winScreen.querySelector('p');
        if (winText) winText.textContent = t('youWin');
        
        // Update button texts
        if (this.tryAgainBtn) this.tryAgainBtn.textContent = t('tryAgain');
        if (this.keepGoingBtn) this.keepGoingBtn.textContent = t('keepGoing');
        if (this.newGameBtn2) this.newGameBtn2.textContent = t('restart');
        
        // Update feedback textarea placeholder
        const feedbackComment = document.getElementById('feedback-comment');
        if (feedbackComment) feedbackComment.placeholder = t('feedbackPlaceholder');
    }
}

// Export singleton instance
export default new GameController();
