/**
 * Modals.js - Info Modal Management
 * Handles the info modal display and interactions including language selection
 */

import { setCurrentLanguage, updateAllTexts } from '../config/translations.js';

class Modals {
    constructor() {
        this.infoModal = document.getElementById('info-modal');
        this.infoClose = document.querySelector('.info-close');
        this.languageModal = document.getElementById('language-modal');
        this.languageOptions = document.querySelectorAll('.language-option');
    }
    
    /**
     * Initialize modal event listeners
     */
    init() {
        this.setupEventListeners();
        this.checkFirstVisit();
    }
    
    /**
     * Setup modal event listeners
     */
    setupEventListeners() {
        // Info modal close button
        if (this.infoClose) {
            this.infoClose.addEventListener('click', () => {
                this.closeInfo();
            });
        }
        
        // Close info modal when clicking outside
        if (this.infoModal) {
            this.infoModal.addEventListener('click', (e) => {
                if (e.target === this.infoModal) {
                    this.closeInfo();
                }
            });
        }
        
        // Language selection buttons
        this.languageOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                this.selectLanguage(lang);
            });
        });
    }
    
    /**
     * Check if this is the first visit and show language selection
     */
    checkFirstVisit() {
        const hasVisited = localStorage.getItem('has-visited-game');
        
        // Show language selection modal first on first visit
        if (!hasVisited) {
            // Small delay to let the page load
            setTimeout(() => {
                this.showLanguageSelection();
            }, 500);
        }
    }
    
    /**
     * Show the language selection modal
     */
    showLanguageSelection() {
        if (this.languageModal) {
            this.languageModal.classList.add('show');
        }
    }
    
    /**
     * Close the language selection modal
     */
    closeLanguageSelection() {
        if (this.languageModal) {
            this.languageModal.classList.remove('show');
        }
    }
    
    /**
     * Handle language selection
     * @param {string} lang - Language code (en or tr)
     */
    selectLanguage(lang) {
        // Set the language
        setCurrentLanguage(lang);
        
        // Update all text on the page
        updateAllTexts();
        
        // Update menu language text
        const languageTextMenu = document.getElementById('language-text-menu');
        if (languageTextMenu) {
            languageTextMenu.textContent = lang.toUpperCase();
        }
        
        // Close language modal
        this.closeLanguageSelection();
        
        // Show info modal after a short delay
        setTimeout(() => {
            this.showInfo();
        }, 300);
        
        // Mark as visited
        localStorage.setItem('has-visited-game', 'true');
    }
    
    /**
     * Show the info modal
     */
    showInfo() {
        if (this.infoModal) {
            this.infoModal.classList.add('show');
        }
    }
    
    /**
     * Close the info modal
     */
    closeInfo() {
        if (this.infoModal) {
            this.infoModal.classList.remove('show');
        }
    }
}

// Export singleton instance
export default new Modals();
