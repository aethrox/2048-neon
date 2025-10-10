// ============================================================================
// MOVEMENT ENGINE
// ============================================================================
// Core game logic for tile movement and merging in all 4 directions
// ============================================================================

import gameState from './GameState.js';
import ScoreManager from './ScoreManager.js';
import { SPECIAL_EFFECTS } from '../config/constants.js';
import { showSpecialEffect } from './TileManager.js';

// Merge special tiles and return their types
function mergeSpecialTiles(row1, col1, row2, col2, targetRow, targetCol) {
    const types = [];
    
    const type1 = gameState.getSpecialTileType(row1, col1);
    const type2 = gameState.getSpecialTileType(row2, col2);
    
    if (type1) {
        types.push(type1);
        gameState.setSpecialTile(row1, col1, null);
    }
    if (type2) {
        types.push(type2);
        gameState.setSpecialTile(row2, col2, null);
    }
    
    // Keep one special type if any existed (prefer first)
    if (types.length > 0) {
        gameState.setSpecialTile(targetRow, targetCol, types[0]);
    }
    
    return types;
}

// Process special card effects when merging
export function processSpecialCardEffects(row, col, value, specialTypes) {
    let bonusPoints = 0;
    let newValue = value;
    
    // Check if any special cards were merged
    if (specialTypes.length === 0) return { newValue, bonusPoints };
    
    // Lightning effect
    if (specialTypes.includes('lightning')) {
        const lightningCount = specialTypes.filter(t => t === 'lightning').length;
        bonusPoints += SPECIAL_EFFECTS.lightning.bonusPerCard * lightningCount;
        showSpecialEffect(row, col, SPECIAL_EFFECTS.lightning.text, SPECIAL_EFFECTS.lightning.color);
        gameState.specialCardsCollected.lightning++;
    }
    
    // Star effect (multiplier)
    if (specialTypes.includes('star')) {
        const starCount = specialTypes.filter(t => t === 'star').length;
        const multiplier = Math.pow(SPECIAL_EFFECTS.star.multiplier, starCount);
        newValue = value * multiplier;
        bonusPoints += SPECIAL_EFFECTS.star.bonusPerCard * starCount;
        const text = SPECIAL_EFFECTS.star.text.replace('{multiplier}', multiplier);
        showSpecialEffect(row, col, text, SPECIAL_EFFECTS.star.color);
        gameState.specialCardsCollected.star++;
    }
    
    // Diamond effect (point boost)
    if (specialTypes.includes('diamond')) {
        const diamondCount = specialTypes.filter(t => t === 'diamond').length;
        const diamondBonus = value * SPECIAL_EFFECTS.diamond.pointsMultiplier * diamondCount;
        bonusPoints += diamondBonus;
        const text = SPECIAL_EFFECTS.diamond.text.replace('{points}', diamondBonus);
        showSpecialEffect(row, col, text, SPECIAL_EFFECTS.diamond.color);
        gameState.specialCardsCollected.diamond++;
    }
    
    return { newValue, bonusPoints };
}

// Move tiles up
export function moveUp(board) {
    let moved = false;
    
    for (let j = 0; j < 4; j++) {
        // Move all tiles up as far as possible
        for (let i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
                let row = i;
                while (row > 0 && board[row - 1][j] === 0) {
                    board[row - 1][j] = board[row][j];
                    board[row][j] = 0;
                    gameState.moveSpecialTile(row, j, row - 1, j);
                    row--;
                    moved = true;
                }
            }
        }
        
        // Merge tiles
        for (let i = 0; i < 3; i++) {
            if (board[i][j] !== 0 && board[i][j] === board[i + 1][j]) {
                const specialTypes = mergeSpecialTiles(i, j, i + 1, j, i, j);
                const { newValue, bonusPoints } = processSpecialCardEffects(i, j, board[i][j] * 2, specialTypes);
                board[i][j] = newValue;
                gameState.updateScore(board[i][j] + bonusPoints);
                ScoreManager.updateScoreDisplay();
                board[i + 1][j] = 0;
                gameState.addMergedPosition(i, j);
                gameState.mergeCountThisMove++;
                moved = true;
            }
        }
        
        // Move tiles up again after merging
        for (let i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
                let row = i;
                while (row > 0 && board[row - 1][j] === 0) {
                    board[row - 1][j] = board[row][j];
                    board[row][j] = 0;
                    gameState.moveSpecialTile(row, j, row - 1, j);
                    row--;
                }
            }
        }
    }
    
    return moved;
}

// Move tiles right
export function moveRight(board) {
    let moved = false;
    
    for (let i = 0; i < 4; i++) {
        // Move all tiles right as far as possible
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                let col = j;
                while (col < 3 && board[i][col + 1] === 0) {
                    board[i][col + 1] = board[i][col];
                    board[i][col] = 0;
                    gameState.moveSpecialTile(i, col, i, col + 1);
                    col++;
                    moved = true;
                }
            }
        }
        
        // Merge tiles
        for (let j = 3; j > 0; j--) {
            if (board[i][j] !== 0 && board[i][j] === board[i][j - 1]) {
                const specialTypes = mergeSpecialTiles(i, j, i, j - 1, i, j);
                const { newValue, bonusPoints } = processSpecialCardEffects(i, j, board[i][j] * 2, specialTypes);
                board[i][j] = newValue;
                gameState.updateScore(board[i][j] + bonusPoints);
                ScoreManager.updateScoreDisplay();
                board[i][j - 1] = 0;
                moved = true;
                gameState.addMergedPosition(i, j);
                gameState.mergeCountThisMove++;
                
                // Move any tiles left after merging
                for (let k = j - 1; k > 0; k--) {
                    if (board[i][k - 1] !== 0) {
                        board[i][k] = board[i][k - 1];
                        board[i][k - 1] = 0;
                        gameState.moveSpecialTile(i, k - 1, i, k);
                    }
                }
            }
        }
    }
    
    return moved;
}

// Move tiles down
export function moveDown(board) {
    let moved = false;
    
    for (let j = 0; j < 4; j++) {
        // Move all tiles down as far as possible
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                let row = i;
                while (row < 3 && board[row + 1][j] === 0) {
                    board[row + 1][j] = board[row][j];
                    board[row][j] = 0;
                    gameState.moveSpecialTile(row, j, row + 1, j);
                    row++;
                    moved = true;
                }
            }
        }
        
        // Merge tiles
        for (let i = 3; i > 0; i--) {
            if (board[i][j] !== 0 && board[i][j] === board[i - 1][j]) {
                const specialTypes = mergeSpecialTiles(i, j, i - 1, j, i, j);
                const { newValue, bonusPoints } = processSpecialCardEffects(i, j, board[i][j] * 2, specialTypes);
                board[i][j] = newValue;
                gameState.updateScore(board[i][j] + bonusPoints);
                ScoreManager.updateScoreDisplay();
                board[i - 1][j] = 0;
                gameState.addMergedPosition(i, j);
                gameState.mergeCountThisMove++;
                moved = true;
            }
        }
        
        // Move tiles down again after merging
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                let row = i;
                while (row < 3 && board[row + 1][j] === 0) {
                    board[row + 1][j] = board[row][j];
                    board[row][j] = 0;
                    gameState.moveSpecialTile(row, j, row + 1, j);
                    row++;
                }
            }
        }
    }
    
    return moved;
}

// Move tiles left
export function moveLeft(board) {
    let moved = false;
    
    for (let i = 0; i < 4; i++) {
        // Move all tiles left as far as possible
        for (let j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                let col = j;
                while (col > 0 && board[i][col - 1] === 0) {
                    board[i][col - 1] = board[i][col];
                    board[i][col] = 0;
                    gameState.moveSpecialTile(i, col, i, col - 1);
                    col--;
                    moved = true;
                }
            }
        }
        
        // Merge tiles
        for (let j = 0; j < 3; j++) {
            if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
                const specialTypes = mergeSpecialTiles(i, j, i, j + 1, i, j);
                const { newValue, bonusPoints } = processSpecialCardEffects(i, j, board[i][j] * 2, specialTypes);
                board[i][j] = newValue;
                gameState.updateScore(board[i][j] + bonusPoints);
                ScoreManager.updateScoreDisplay();
                board[i][j + 1] = 0;
                moved = true;
                gameState.addMergedPosition(i, j);
                gameState.mergeCountThisMove++;
                
                // Move any tiles right after merging
                for (let k = j + 1; k < 3; k++) {
                    if (board[i][k + 1] !== 0) {
                        board[i][k] = board[i][k + 1];
                        board[i][k + 1] = 0;
                        gameState.moveSpecialTile(i, k + 1, i, k);
                    }
                }
            }
        }
    }
    
    return moved;
}

// Check if there are any possible moves left
export function canMove() {
    const board = gameState.board;
    
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return true;
            }
        }
    }
    
    // Check for possible merges (horizontal and vertical)
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const value = board[i][j];
            
            // Check right
            if (j < 3 && board[i][j + 1] === value) {
                return true;
            }
            
            // Check down
            if (i < 3 && board[i + 1][j] === value) {
                return true;
            }
        }
    }
    
    return false;
}
