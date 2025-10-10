/**
 * main.js - Entry Point for 2048 Neon Game
 * Initializes all modules and starts the game
 */

// Import all modules
import GameState from './core/GameState.js';
import TileManager from './core/TileManager.js';
import ScoreManager from './core/ScoreManager.js';
import GameController from './core/GameController.js';
import GhostMode from './features/GhostMode.js';
import PowerUps from './features/PowerUps.js';
import Streaks from './features/Streaks.js';
import Milestones from './features/Milestones.js';
import { initFeedback, showFeedbackModal } from './features/Feedback.js';
import { showNotification } from './ui/Notifications.js';
import Menu from './ui/Menu.js';
import Modals from './ui/Modals.js';
import EventHandlers from './ui/EventHandlers.js';
import { translations } from './config/translations.js';

/**
 * Initialize the game when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 2048 Neon Game - Initializing...');
    
    // ========================================================================
    // STEP 1: Initialize Managers
    // ========================================================================
    console.log('✓ Initializing managers...');
    
    // Initialize TileManager (needs grid element)
    TileManager.init();
    
    // Initialize ScoreManager (needs score displays)
    ScoreManager.init();
    
    // Initialize GameController (sets up button listeners)
    GameController.init();
    
    // ========================================================================
    // STEP 2: Initialize Features
    // ========================================================================
    console.log('✓ Initializing features...');
    
    // Initialize GhostMode
    GhostMode.init();
    
    // Initialize PowerUps (sets up power-up buttons)
    PowerUps.init();
    
    // Initialize Streaks
    Streaks.init();
    
    // Initialize Milestones
    Milestones.init();
    
    // Initialize Feedback system
    initFeedback();
    
    // ========================================================================
    // STEP 3: Initialize UI Components
    // ========================================================================
    console.log('✓ Initializing UI...');
    
    // Initialize Menu
    Menu.init();
    
    // Initialize Modals
    Modals.init();
    
    // Initialize EventHandlers
    EventHandlers.init();
    
    // ========================================================================
    // STEP 4: Wire Up Callbacks
    // ========================================================================
    console.log('✓ Wiring up callbacks...');
    
    // Wire up Menu callbacks
    Menu.setOnNewGame(() => GameController.initGame());
    Menu.setOnGhostToggle(() => GhostMode.toggle());
    Menu.setOnShowInfo(() => Modals.showInfo());
    Menu.setOnLanguageToggle(() => {
        toggleLanguage();
        Menu.updateLanguageDisplay();
    });
    Menu.setOnShowFeedback(() => showFeedbackModal(true));
    
    // Wire up EventHandlers callbacks
    EventHandlers.setOnMove((direction) => GameController.moveTiles(direction));
    EventHandlers.setOnKeyPress((e) => {
        // Handle 'G' key for ghost mode toggle
        if ((e.key === 'g' || e.key === 'G') && !GameState.getInstance().isMoving) {
            GhostMode.toggle();
            Menu.updateGhostButtonState();
        }
    });
    
    // ========================================================================
    // STEP 5: Language System
    // ========================================================================
    console.log('✓ Setting up language system...');
    
    /**
     * Toggle language between TR and EN
     */
    function toggleLanguage() {
        const currentLanguage = localStorage.getItem('game-language') || 'en';
        const newLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
        localStorage.setItem('game-language', newLanguage);
        
        // Update all UI texts
        GameController.updateAllTexts();
        
        // Show notification
        showNotification(t('languageChanged'));
    }
    
    /**
     * Get translation for a key
     */
    function t(key) {
        const currentLanguage = localStorage.getItem('game-language') || 'en';
        return translations[currentLanguage][key] || key;
    }
    
    // Initialize language on load
    GameController.updateAllTexts();
    
    // ========================================================================
    // STEP 6: Start the Game
    // ========================================================================
    console.log('✓ Starting game...');
    
    // Initialize best score display
    const bestScore = localStorage.getItem('bestScore') || 0;
    const bestScoreDisplay = document.getElementById('best-score');
    if (bestScoreDisplay) {
        bestScoreDisplay.textContent = bestScore;
    }
    
    // Set initial ghost button state
    Menu.updateGhostButtonState();
    
    // Update power-up display
    PowerUps.updateDisplay();
    
    // Start the game
    GameController.initGame();
    
    console.log('🎉 2048 Neon Game - Ready!');
});
