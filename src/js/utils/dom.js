// ============================================================================
// DOM UTILITY FUNCTIONS
// ============================================================================

export class DOMManager {
    constructor() {
        this.elements = this.initializeElements();
    }

    initializeElements() {
        return {
            // Core Game Elements
            grid: document.querySelector('.grid'),
            scoreDisplay: document.getElementById('score'),
            bestScoreDisplay: document.getElementById('best-score'),
            
            // Button Elements
            newGameBtn: document.getElementById('new-game'),
            tryAgainBtn: document.getElementById('try-again'),
            keepGoingBtn: document.getElementById('keep-going'),
            newGameBtn2: document.getElementById('new-game-2'),
            
            // Screen Elements
            gameOverScreen: document.querySelector('.game-over'),
            winScreen: document.querySelector('.win'),
            streakDisplay: document.getElementById('streak-display'),
            streakCount: document.querySelector('.streak-count'),
            
            // Feature Buttons
            ghostToggleBtn: document.getElementById('ghost-toggle'),
            infoBtn: document.getElementById('info-btn'),
            infoModal: document.getElementById('info-modal'),
            infoClose: document.querySelector('.info-close'),
            languageBtn: document.getElementById('language-btn'),
            languageText: document.querySelector('.language-text'),
            
            // Power-up Elements
            undoBtn: document.getElementById('undo-btn'),
            hintBtn: document.getElementById('hint-btn'),
            removeBtn: document.getElementById('remove-btn'),
            undoCountDisplay: document.getElementById('undo-count'),
            hintCountDisplay: document.getElementById('hint-count'),
            removeCountDisplay: document.getElementById('remove-count')
        };
    }

    get(elementName) {
        return this.elements[elementName];
    }

    clearGrid() {
        this.elements.grid.innerHTML = '';
    }

    updateScore(score) {
        this.elements.scoreDisplay.textContent = score;
    }

    updateBestScore(bestScore) {
        this.elements.bestScoreDisplay.textContent = bestScore;
    }

    showGameOver() {
        setTimeout(() => {
            this.elements.gameOverScreen.classList.add('show');
        }, 300);
    }

    hideGameOver() {
        this.elements.gameOverScreen.classList.remove('show');
    }

    showWin() {
        setTimeout(() => {
            this.elements.winScreen.classList.add('show');
        }, 300);
    }

    hideWin() {
        this.elements.winScreen.classList.remove('show');
    }
}
