// ============================================================================
// TILE MANAGEMENT
// ============================================================================

import { GRID_SIZE, TILE_SPAWN_PROBABILITY } from '../config/constants.js';

export class TileManager {
    constructor(gameState, domManager) {
        this.gameState = gameState;
        this.domManager = domManager;
    }

    addRandomTile() {
        const emptyCells = this.gameState.getEmptyCells();
        if (emptyCells.length === 0) return;

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const value = Math.random() < TILE_SPAWN_PROBABILITY[2] ? 2 : 4;
        
        this.gameState.board[randomCell.row][randomCell.col] = value;
    }

    createTile(row, col, value, isNew = false) {
        const grid = this.domManager.get('grid');
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = value;
        tile.setAttribute('data-value', value);
        tile.setAttribute('data-row', row);
        tile.setAttribute('data-col', col);
        
        if (isNew) {
            tile.classList.add('new');
        }

        const cellSize = grid.offsetWidth / GRID_SIZE;
        const gap = 10;
        const x = col * (cellSize + gap);
        const y = row * (cellSize + gap);
        
        tile.style.width = cellSize + 'px';
        tile.style.height = cellSize + 'px';
        tile.style.left = x + 'px';
        tile.style.top = y + 'px';
        
        // Check for special tile type
        const specialType = this.gameState.specialTiles[`${row}-${col}`];
        if (specialType) {
            tile.classList.add(`special-${specialType}`);
        }
        
        grid.appendChild(tile);
        return tile;
    }

    updateGrid() {
        this.domManager.clearGrid();
        
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const value = this.gameState.board[row][col];
                if (value !== 0) {
                    this.createTile(row, col, value);
                }
            }
        }
    }

    getTileColor(value) {
        const colors = {
            2: '#00ffff',
            4: '#00e5e5',
            8: '#00cccc',
            16: '#00b3b3',
            32: '#009999',
            64: '#ff00ff',
            128: '#e600e6',
            256: '#cc00cc',
            512: '#b300b3',
            1024: '#990099',
            2048: '#ffffff',
            4096: '#ffbe0b',
            8192: '#9d00ff'
        };
        return colors[value] || '#00ffff';
    }
}
