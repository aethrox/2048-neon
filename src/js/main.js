// ============================================================================
// 2048 NEON GAME - MAIN ENTRY POINT (MODULAR)
// ============================================================================

import { TranslationManager } from './config/translations.js';
import { DOMManager } from './utils/dom.js';
import { StorageManager } from './utils/storage.js';
import { GameState } from './core/GameState.js';
import { TileManager } from './core/TileManager.js';

// ============================================================================
// INITIALIZE APPLICATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 2048 Neon Game - Modular Version');
    console.log('📦 Modules loaded successfully');
    
    // Initialize managers
    const translationManager = new TranslationManager();
    const domManager = new DOMManager();
    const gameState = new GameState();
    const tileManager = new TileManager(gameState, domManager);
    
    // Initialize language
    const languageText = domManager.get('languageText');
    languageText.textContent = translationManager.getCurrentLanguage().toUpperCase();
    translationManager.updateAllTexts();
    
    // Note: Full game logic will be imported from modular files
    // This is a transitional structure showing the modular architecture
    
    console.log('✅ Game initialized with modular structure');
    console.log('📁 Modules: Config, Utils, Core, Features');
    
    // Temporary: Load legacy game.js for full functionality
    // Future: Replace with modular imports
    const script = document.createElement('script');
    script.src = '../game.js';
    document.body.appendChild(script);
});

// Export for debugging
window.GameModules = {
    TranslationManager,
    DOMManager,
    StorageManager,
    GameState,
    TileManager
};
