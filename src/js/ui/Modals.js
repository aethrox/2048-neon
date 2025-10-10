/**
 * Modals.js - Info Modal Management
 * Handles the info modal display and interactions
 */

class Modals {
    constructor() {
        this.infoModal = document.getElementById('info-modal');
        this.infoClose = document.querySelector('.info-close');
    }
    
    /**
     * Initialize modal event listeners
     */
    init() {
        this.setupEventListeners();
    }
    
    /**
     * Setup modal event listeners
     */
    setupEventListeners() {
        // Close button listener
        if (this.infoClose) {
            this.infoClose.addEventListener('click', () => {
                this.closeInfo();
            });
        }
        
        // Close modal when clicking outside
        if (this.infoModal) {
            this.infoModal.addEventListener('click', (e) => {
                if (e.target === this.infoModal) {
                    this.closeInfo();
                }
            });
        }
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
