// ============================================================================
// GAME STATE MANAGEMENT
// ============================================================================

import { GRID_SIZE, POWER_UPS_INITIAL } from '../config/constants.js';
import { StorageManager } from '../utils/storage.js';

export class GameState {
    constructor() {
        this.board = [];
        this.specialTiles = {};
        this.score = 0;
        this.bestScore = StorageManager.get('bestScore', 0);
        this.isMoving = false;
        this.hasWon = false;
        this.mergedPositions = new Set();
        this.moveCount = 0;
        this.moveHistory = [];
        this.lastScoreMilestone = 0;
        
        // Ghost Mode
        this.ghostModeEnabled = StorageManager.get('ghostModeEnabled', false);
        this.ghostData = StorageManager.get('ghostData', null);
        
        // Power-ups
        this.powerUps = StorageManager.get('powerUps', POWER_UPS_INITIAL);
        
        // Streaks
        this.streaks = StorageManager.get('streaks', {
            currentMergeStreak: 0,
            bestMergeStreak: 0,
            totalMerges: 0
        });
        
        // Milestones
        this.milestones = StorageManager.get('milestones', {
            tilesReached: [],
            highestTile: 0
        });
    }

    reset() {
        this.board = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
        this.specialTiles = {};
        this.score = 0;
        this.hasWon = false;
        this.moveCount = 0;
        this.moveHistory = [];
        this.lastScoreMilestone = 0;
        this.mergedPositions.clear();
        
        // Reset streak
        this.streaks.currentMergeStreak = 0;
        StorageManager.set('streaks', this.streaks);
    }

    updateScore(points) {
        this.score += points;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            StorageManager.set('bestScore', this.bestScore);
        }
    }

    saveMove() {
        this.moveHistory.push({
            board: JSON.parse(JSON.stringify(this.board)),
            score: this.score
        });
        
        // Keep only last 3 moves
        if (this.moveHistory.length > 3) {
            this.moveHistory.shift();
        }
    }

    restoreMove() {
        if (this.moveHistory.length === 0) return null;
        return this.moveHistory.pop();
    }

    incrementMoveCount() {
        this.moveCount++;
    }

    getEmptyCells() {
        const emptyCells = [];
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (this.board[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }
        return emptyCells;
    }

    getBoardFillPercentage() {
        let filledCells = 0;
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (this.board[row][col] !== 0) {
                    filledCells++;
                }
            }
        }
        return filledCells / (GRID_SIZE * GRID_SIZE);
    }

    countSpecialCards() {
        return Object.keys(this.specialTiles).length;
    }

    isGameOver() {
        // Check for empty cells
        if (this.getEmptyCells().length > 0) return false;
        
        // Check for possible merges
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const value = this.board[row][col];
                
                // Check right
                if (col < GRID_SIZE - 1 && this.board[row][col + 1] === value) {
                    return false;
                }
                
                // Check down
                if (row < GRID_SIZE - 1 && this.board[row + 1][col] === value) {
                    return false;
                }
            }
        }
        
        return true;
    }

    hasWon2048() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (this.board[row][col] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }
}
