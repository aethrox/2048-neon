/**
 * EventHandlers.js - Keyboard, Touch, and Button Event Handlers
 * Handles all user input events for the game
 */

class EventHandlers {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.isSwiping = false;
        
        this.onMove = null;
        this.onKeyPress = null;
    }
    
    /**
     * Initialize all event handlers
     */
    init() {
        this.setupKeyboardControls();
        this.setupTouchControls();
    }
    
    /**
     * Setup keyboard controls
     */
    setupKeyboardControls() {
        document.addEventListener('keydown', async (e) => {
            // Check if movement is allowed
            if (this.onMove) {
                let direction = null;
                
                switch (e.key) {
                    case 'ArrowUp':
                        direction = 'up';
                        break;
                    case 'ArrowRight':
                        direction = 'right';
                        break;
                    case 'ArrowDown':
                        direction = 'down';
                        break;
                    case 'ArrowLeft':
                        direction = 'left';
                        break;
                }
                
                if (direction) {
                    await this.onMove(direction);
                }
            }
            
            // Pass key press to callback for other handlers (like 'G' for ghost mode)
            if (this.onKeyPress) {
                this.onKeyPress(e);
            }
        });
    }
    
    /**
     * Setup touch controls for mobile
     */
    setupTouchControls() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            this.isSwiping = true;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!this.isSwiping) return;
            // Prevent scrolling while swiping on the game
            if (e.target.closest('.game-container')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        document.addEventListener('touchend', async (e) => {
            if (!this.isSwiping) {
                this.isSwiping = false;
                return;
            }
            
            this.touchEndX = e.changedTouches[0].clientX;
            this.touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = this.touchEndX - this.touchStartX;
            const deltaY = this.touchEndY - this.touchStartY;
            
            // Minimum swipe distance (in pixels)
            const minSwipeDistance = 20;
            
            // Determine if it's a valid swipe
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);
            
            if (absX > minSwipeDistance || absY > minSwipeDistance) {
                let direction = null;
                
                if (absX > absY) {
                    // Horizontal swipe
                    direction = deltaX > 0 ? 'right' : 'left';
                } else {
                    // Vertical swipe
                    direction = deltaY > 0 ? 'down' : 'up';
                }
                
                if (direction && this.onMove) {
                    await this.onMove(direction);
                }
            }
            
            this.isSwiping = false;
        }, { passive: true });
    }
    
    /**
     * Set callback for move actions
     */
    setOnMove(callback) {
        this.onMove = callback;
    }
    
    /**
     * Set callback for key press actions
     */
    setOnKeyPress(callback) {
        this.onKeyPress = callback;
    }
}

// Export singleton instance
export default new EventHandlers();
