// ============================================================================
// GAME STATE MANAGEMENT
// ============================================================================
// Centralized state management for the game
// Uses singleton pattern to ensure single source of truth
// ============================================================================

import { DEFAULT_POWER_UPS, STORAGE_KEYS } from '../config/constants.js';

class GameState {
    constructor() {
        // Core game state
        this.board = [];
        this.specialTiles = {}; // Track special card types by position "row-col"
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem(STORAGE_KEYS.bestScore)) || 0;
        this.isMoving = false;
        this.hasWon = false;
        this.mergedPositions = new Set(); // Track merged tile positions
        
        // Ghost system state
        this.ghostModeEnabled = localStorage.getItem(STORAGE_KEYS.ghostModeEnabled) === 'true' || false;
        this.ghostData = null;
        this.moveCount = 0;
        
        // Power-up system state
        this.powerUps = { ...DEFAULT_POWER_UPS };
        this.moveHistory = [];
        this.removeModeActive = false;
        this.lastScoreMilestone = 0;
        
        // Special cards system
        this.specialCardsOnBoard = 0;
        this.specialCardsCollected = {
            lightning: 0,
            star: 0,
            diamond: 0
        };
        
        // Streak & Milestone system
        this.streaks = {
            currentMergeStreak: 0,
            bestMergeStreak: 0,
            currentPerfectStreak: 0,
            bestPerfectStreak: 0
        };
        this.milestones = {
            tilesReached: [],
            scoreThresholds: []
        };
        this.mergeCountThisMove = 0;
        
        // Feedback system state
        this.feedbackRating = 0;
        this.gamesPlayed = parseInt(localStorage.getItem(STORAGE_KEYS.gamesPlayed)) || 0;
        
        // Load saved data
        this.loadGhostData();
        this.loadPowerUps();
        this.loadStreaks();
        this.loadMilestones();
    }
    
    // Load ghost data from localStorage
    loadGhostData() {
        try {
            const savedGhostData = localStorage.getItem(STORAGE_KEYS.ghostData);
            if (savedGhostData && savedGhostData !== 'null') {
                this.ghostData = JSON.parse(savedGhostData);
            }
        } catch (e) {
            console.error('Error loading ghost data:', e);
            this.ghostData = null;
        }
    }
    
    // Load power-ups from localStorage
    loadPowerUps() {
        try {
            const savedPowerUps = localStorage.getItem(STORAGE_KEYS.powerUps);
            if (savedPowerUps) {
                this.powerUps = JSON.parse(savedPowerUps);
            }
        } catch (e) {
            console.error('Error loading power-ups:', e);
            this.powerUps = { ...DEFAULT_POWER_UPS };
        }
    }
    
    // Load streaks from localStorage
    loadStreaks() {
        try {
            const savedStreaks = localStorage.getItem(STORAGE_KEYS.streaks);
            if (savedStreaks) {
                this.streaks = JSON.parse(savedStreaks);
            }
        } catch (e) {
            console.error('Error loading streaks:', e);
        }
    }
    
    // Load milestones from localStorage
    loadMilestones() {
        try {
            const savedMilestones = localStorage.getItem(STORAGE_KEYS.milestones);
            if (savedMilestones) {
                this.milestones = JSON.parse(savedMilestones);
            }
        } catch (e) {
            console.error('Error loading milestones:', e);
        }
    }
    
    // Save ghost data to localStorage
    saveGhostData() {
        const data = {
            score: this.bestScore,
            board: JSON.parse(JSON.stringify(this.board)),
            moveCount: this.moveCount,
            timestamp: new Date().toISOString()
        };
        
        this.ghostData = data;
        localStorage.setItem(STORAGE_KEYS.ghostData, JSON.stringify(data));
    }
    
    // Save power-ups to localStorage
    savePowerUps() {
        localStorage.setItem(STORAGE_KEYS.powerUps, JSON.stringify(this.powerUps));
    }
    
    // Save streaks to localStorage
    saveStreaks() {
        localStorage.setItem(STORAGE_KEYS.streaks, JSON.stringify(this.streaks));
    }
    
    // Save milestones to localStorage
    saveMilestones() {
        localStorage.setItem(STORAGE_KEYS.milestones, JSON.stringify(this.milestones));
    }
    
    // Reset game state for new game
    resetGameState() {
        this.board = Array(4).fill().map(() => Array(4).fill(0));
        this.specialTiles = {};
        this.score = 0;
        this.hasWon = false;
        this.moveCount = 0;
        this.moveHistory = [];
        this.lastScoreMilestone = 0;
        this.specialCardsOnBoard = 0;
        this.mergeCountThisMove = 0;
        this.mergedPositions.clear();
        
        // Reset streaks
        this.streaks.currentMergeStreak = 0;
        this.streaks.currentPerfectStreak = 0;
        
        // Reset power-ups to default
        this.powerUps = { ...DEFAULT_POWER_UPS };
        
        // Increment games played
        this.gamesPlayed++;
        localStorage.setItem(STORAGE_KEYS.gamesPlayed, this.gamesPlayed);
    }
    
    // Update score
    updateScore(points) {
        this.score += points;
        
        // Update best score if needed
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem(STORAGE_KEYS.bestScore, this.bestScore);
            
            // Save ghost data when new best is achieved
            this.saveGhostData();
        }
    }
    
    // Toggle ghost mode
    toggleGhostMode() {
        this.ghostModeEnabled = !this.ghostModeEnabled;
        localStorage.setItem(STORAGE_KEYS.ghostModeEnabled, this.ghostModeEnabled);
        return this.ghostModeEnabled;
    }
    
    // Check if board position has special tile
    hasSpecialTile(row, col) {
        return this.specialTiles[`${row}-${col}`] !== undefined;
    }
    
    // Get special tile type at position
    getSpecialTileType(row, col) {
        return this.specialTiles[`${row}-${col}`] || null;
    }
    
    // Set special tile at position
    setSpecialTile(row, col, type) {
        if (type) {
            this.specialTiles[`${row}-${col}`] = type;
        } else {
            delete this.specialTiles[`${row}-${col}`];
        }
    }
    
    // Move special tile from one position to another
    moveSpecialTile(fromRow, fromCol, toRow, toCol) {
        const key = `${fromRow}-${fromCol}`;
        if (this.specialTiles[key]) {
            this.specialTiles[`${toRow}-${toCol}`] = this.specialTiles[key];
            delete this.specialTiles[key];
        }
    }
    
    // Get all special tiles on board
    getSpecialTilesCount() {
        return Object.keys(this.specialTiles).length;
    }
    
    // Update special cards count
    updateSpecialCardsCount() {
        this.specialCardsOnBoard = this.getSpecialTilesCount();
    }
    
    // Check if position is merged
    isMergedPosition(row, col) {
        return this.mergedPositions.has(`${row}-${col}`);
    }
    
    // Add merged position
    addMergedPosition(row, col) {
        this.mergedPositions.add(`${row}-${col}`);
    }
    
    // Clear merged positions
    clearMergedPositions() {
        this.mergedPositions.clear();
    }
    
    // Get board deep copy
    getBoardCopy() {
        return JSON.parse(JSON.stringify(this.board));
    }
    
    // Get tile value at position
    getTileValue(row, col) {
        return this.board[row][col];
    }
    
    // Set tile value at position
    setTileValue(row, col, value) {
        this.board[row][col] = value;
    }
    
    // Check if cell is empty
    isCellEmpty(row, col) {
        return this.board[row][col] === 0;
    }
    
    // Get all empty cells
    getEmptyCells() {
        const emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] === 0) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }
        return emptyCells;
    }
    
    // Check if board is full
    isBoardFull() {
        return this.getEmptyCells().length === 0;
    }
    
    // Get board fullness percentage
    getBoardFullness() {
        const emptyCells = this.getEmptyCells().length;
        return (16 - emptyCells) / 16;
    }
}

// Create singleton instance
const gameState = new GameState();

// Export singleton instance
export default gameState;

// Also export class for testing purposes
export { GameState };
