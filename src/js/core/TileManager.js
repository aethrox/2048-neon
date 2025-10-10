// ============================================================================
// TILE MANAGER
// ============================================================================
// Handles tile creation, rendering, and DOM manipulation
// ============================================================================

import gameState from './GameState.js';
import { 
    TILE_2_PROBABILITY, 
    MAX_SPECIAL_CARDS_ON_BOARD, 
    SPECIAL_CARD_MIN_MOVES,
    SPECIAL_CARD_MAX_BOARD_FULLNESS,
    SPECIAL_CARD_PROBABILITIES,
    MERGE_ANIMATION_COUNT
} from '../config/constants.js';

class TileManager {
    constructor() {
        this.grid = null;
    }
    
    /**
     * Initialize tile manager
     */
    init() {
        this.grid = document.querySelector('.grid');
        if (!this.grid) {
            console.error('Grid element not found');
        }
    }
    
    /**
     * Create a tile element at the specified position
     */
    createTile(row, col, value, isNew = false, specialType = null) {
        if (!this.grid) {
            console.error('Grid not initialized');
            return null;
        }
        
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = value;
        tile.dataset.value = value;
        tile.dataset.row = row;
        tile.dataset.col = col;
        
        // Add special card type
        if (specialType) {
            tile.dataset.special = specialType;
            tile.classList.add(`special-${specialType}`);
            
            // Add icon
            const icon = document.createElement('span');
            icon.className = 'special-icon';
            if (specialType === 'lightning') icon.textContent = '⚡';
            else if (specialType === 'star') icon.textContent = '🌟';
            else if (specialType === 'diamond') icon.textContent = '💎';
            tile.appendChild(icon);
        }
        
        if (isNew) {
            tile.classList.add('new');
            // Remove the 'new' class after the animation completes
            setTimeout(() => tile.classList.remove('new'), 200);
        }
        
        // Calculate position based on cell size
        const cellSize = (this.grid.offsetWidth - 45) / 4; // 45 = 15px gap * 3
        const gap = 15;
        const x = col * (cellSize + gap);
        const y = row * (cellSize + gap);
        
        tile.style.width = cellSize + 'px';
        tile.style.height = cellSize + 'px';
        // Use left/top for positioning instead of transform
        tile.style.left = x + 'px';
        tile.style.top = y + 'px';
        
        this.grid.appendChild(tile);
        return tile;
    }
    
    /**
     * Add a random tile (2 or 4) to an empty cell
     */
    addRandomTile() {
        const emptyCells = gameState.getEmptyCells();
        
        if (emptyCells.length > 0) {
            // Choose a random empty cell
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            
            // 90% chance for 2, 10% chance for 4
            const value = Math.random() < TILE_2_PROBABILITY ? 2 : 4;
            
            // Determine if special card should spawn
            let specialType = null;
            const boardFullness = gameState.getBoardFullness();
            const specialCardsOnBoard = gameState.getSpecialTilesCount();
            
            if (specialCardsOnBoard < MAX_SPECIAL_CARDS_ON_BOARD && 
                gameState.moveCount > SPECIAL_CARD_MIN_MOVES && 
                boardFullness < SPECIAL_CARD_MAX_BOARD_FULLNESS) {
                const random = Math.random();
                if (random < SPECIAL_CARD_PROBABILITIES.lightning) {
                    specialType = 'lightning';
                } else if (random < SPECIAL_CARD_PROBABILITIES.star) {
                    specialType = 'star';
                } else if (random < SPECIAL_CARD_PROBABILITIES.diamond) {
                    specialType = 'diamond';
                }
            }
            
            gameState.setTileValue(row, col, value);
            
            // Store special card type
            if (specialType) {
                gameState.setSpecialTile(row, col, specialType);
                gameState.updateSpecialCardsCount();
            }
            
            // Create and animate the new tile
            this.createTile(row, col, value, true, specialType);
            
            return true;
        }
        return false;
    }
    
    /**
     * Refresh the entire board (remove and recreate all tiles)
     */
    refreshBoard() {
        // Remove all tiles except ghost tiles
        document.querySelectorAll('.tile:not(.ghost-tile)').forEach(tile => tile.remove());
        
        // Re-create ghost tiles if enabled
        if (gameState.ghostModeEnabled && gameState.ghostData) {
            this.displayGhostTiles();
        }
        
        // Create tiles
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const value = gameState.getTileValue(i, j);
                if (value !== 0) {
                    const specialType = gameState.getSpecialTileType(i, j);
                    this.createTile(i, j, value, false, specialType);
                }
            }
        }
        
        // Update special card count
        gameState.updateSpecialCardsCount();
    }
    
    /**
     * Create a ghost tile (for ghost mode)
     */
    createGhostTile(row, col, value) {
        if (!this.grid) return null;
        
        const tile = document.createElement('div');
        tile.className = 'tile ghost-tile';
        tile.textContent = value;
        tile.dataset.value = value;
        tile.dataset.row = row;
        tile.dataset.col = col;
        
        // Calculate position
        const cellSize = (this.grid.offsetWidth - 45) / 4;
        const gap = 15;
        const x = col * (cellSize + gap);
        const y = row * (cellSize + gap);
        
        tile.style.width = cellSize + 'px';
        tile.style.height = cellSize + 'px';
        tile.style.left = x + 'px';
        tile.style.top = y + 'px';
        
        this.grid.appendChild(tile);
        return tile;
    }
    
    /**
     * Display ghost tiles from saved board
     */
    displayGhostTiles() {
        // Remove existing ghost tiles
        document.querySelectorAll('.ghost-tile').forEach(tile => tile.remove());
        
        if (!gameState.ghostModeEnabled || !gameState.ghostData || !gameState.ghostData.board) {
            return;
        }
        
        // Create ghost tiles from saved board
        const ghostBoard = gameState.ghostData.board;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (ghostBoard[i][j] !== 0) {
                    this.createGhostTile(i, j, ghostBoard[i][j]);
                }
            }
        }
    }
    
    /**
     * Remove all ghost tiles
     */
    removeGhostTiles() {
        document.querySelectorAll('.ghost-tile').forEach(tile => tile.remove());
    }
    
    /**
     * Clear the grid (remove all tiles)
     */
    clearGrid() {
        if (this.grid) {
            this.grid.innerHTML = '';
            
            // Create empty cells
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('cell');
                    this.grid.appendChild(cell);
                }
            }
        }
    }
    
    /**
     * Apply random merge animation to a tile
     */
    applyMergeAnimation(row, col) {
        const tiles = document.querySelectorAll('.tile:not(.ghost-tile)');
        tiles.forEach(tile => {
            if (parseInt(tile.dataset.row) === row && parseInt(tile.dataset.col) === col) {
                // Apply random merge animation (1-24)
                const randomAnim = Math.floor(Math.random() * MERGE_ANIMATION_COUNT) + 1;
                tile.classList.add(`merge-${randomAnim}`);
                
                // Remove animation class after it completes
                setTimeout(() => {
                    tile.classList.remove(`merge-${randomAnim}`);
                }, 600);
            }
        });
    }
    
    /**
     * Show special effect text
     */
    showSpecialEffect(row, col, text, color) {
        if (!this.grid) return;
        
        const cellSize = (this.grid.offsetWidth - 45) / 4;
        const gap = 15;
        const x = col * (cellSize + gap) + cellSize / 2;
        const y = row * (cellSize + gap) + cellSize / 2;
        
        const effect = document.createElement('div');
        effect.className = 'special-effect-text';
        effect.textContent = text;
        effect.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            color: ${color};
            text-shadow: 0 0 10px ${color};
        `;
        
        this.grid.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }
    
    /**
     * Get grid element (for external use)
     */
    getGrid() {
        return this.grid;
    }
}

// Create singleton instance
const tileManager = new TileManager();

// Export singleton as default
export default tileManager;

// Also export the named functions for backward compatibility with MovementEngine
export const displayGhostTiles = tileManager.displayGhostTiles.bind(tileManager);
export const removeGhostTiles = tileManager.removeGhostTiles.bind(tileManager);
export const refreshBoard = tileManager.refreshBoard.bind(tileManager);
export const showSpecialEffect = tileManager.showSpecialEffect.bind(tileManager);
