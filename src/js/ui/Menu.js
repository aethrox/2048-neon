/**
 * Menu.js - Hamburger Menu System
 * Handles the menu overlay, menu items, and menu interactions
 */

import GameState from '../core/GameState.js';

class Menu {
    constructor() {
        this.menuBtn = document.getElementById('menu-btn');
        this.menuOverlay = document.getElementById('menu-overlay');
        this.menuClose = document.getElementById('menu-close');
        this.newGameMenuBtn = document.getElementById('new-game-menu');
        this.ghostToggleMenuBtn = document.getElementById('ghost-toggle-menu');
        this.infoBtnMenu = document.getElementById('info-btn-menu');
        this.languageBtnMenu = document.getElementById('language-btn-menu');
        this.languageTextMenu = document.getElementById('language-text-menu');
        this.feedbackBtnMenu = document.getElementById('feedback-btn-menu');
        
        this.onNewGame = null;
        this.onGhostToggle = null;
        this.onShowInfo = null;
        this.onLanguageToggle = null;
        this.onShowFeedback = null;
    }
    
    /**
     * Initialize menu event listeners
     */
    init() {
        this.setupEventListeners();
        this.updateLanguageDisplay();
        this.updateGhostButtonState();
    }
    
    /**
     * Setup all menu event listeners
     */
    setupEventListeners() {
        // Open menu
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.open());
        }
        
        // Close menu
        if (this.menuClose) {
            this.menuClose.addEventListener('click', () => this.close());
        }
        
        // Close menu when clicking backdrop
        if (this.menuOverlay) {
            this.menuOverlay.addEventListener('click', (e) => {
                if (e.target === this.menuOverlay) {
                    this.close();
                }
            });
        }
        
        // New game button
        if (this.newGameMenuBtn) {
            this.newGameMenuBtn.addEventListener('click', () => {
                this.close();
                if (this.onNewGame) this.onNewGame();
            });
        }
        
        // Ghost mode toggle button
        if (this.ghostToggleMenuBtn) {
            this.ghostToggleMenuBtn.addEventListener('click', () => {
                if (this.onGhostToggle) this.onGhostToggle();
                this.updateGhostButtonState();
            });
        }
        
        // Info button
        if (this.infoBtnMenu) {
            this.infoBtnMenu.addEventListener('click', () => {
                this.close();
                if (this.onShowInfo) this.onShowInfo();
            });
        }
        
        // Language button
        if (this.languageBtnMenu) {
            this.languageBtnMenu.addEventListener('click', () => {
                if (this.onLanguageToggle) this.onLanguageToggle();
                this.updateLanguageDisplay();
            });
        }
        
        // Feedback button
        if (this.feedbackBtnMenu) {
            this.feedbackBtnMenu.addEventListener('click', () => {
                this.close();
                if (this.onShowFeedback) this.onShowFeedback();
            });
        }
    }
    
    /**
     * Open the menu
     */
    open() {
        if (this.menuOverlay) {
            this.menuOverlay.classList.add('show');
        }
    }
    
    /**
     * Close the menu
     */
    close() {
        if (this.menuOverlay) {
            this.menuOverlay.classList.remove('show');
        }
    }
    
    /**
     * Update language display in menu
     */
    updateLanguageDisplay() {
        if (this.languageTextMenu) {
            const currentLanguage = localStorage.getItem('game-language') || 'en';
            this.languageTextMenu.textContent = currentLanguage.toUpperCase();
        }
    }
    
    /**
     * Update ghost mode button state
     */
    updateGhostButtonState() {
        if (this.ghostToggleMenuBtn) {
            const ghostEnabled = localStorage.getItem('ghostModeEnabled') === 'true';
            if (ghostEnabled) {
                this.ghostToggleMenuBtn.classList.add('active');
            } else {
                this.ghostToggleMenuBtn.classList.remove('active');
            }
        }
    }
    
    /**
     * Set callback for new game action
     */
    setOnNewGame(callback) {
        this.onNewGame = callback;
    }
    
    /**
     * Set callback for ghost toggle action
     */
    setOnGhostToggle(callback) {
        this.onGhostToggle = callback;
    }
    
    /**
     * Set callback for show info action
     */
    setOnShowInfo(callback) {
        this.onShowInfo = callback;
    }
    
    /**
     * Set callback for language toggle action
     */
    setOnLanguageToggle(callback) {
        this.onLanguageToggle = callback;
    }
    
    /**
     * Set callback for show feedback action
     */
    setOnShowFeedback(callback) {
        this.onShowFeedback = callback;
    }
}

// Export singleton instance
export default new Menu();
