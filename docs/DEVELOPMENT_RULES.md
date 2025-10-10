# Development Rules & Patterns

## 🚫 ABSOLUTE NO-GO RULES

### 1. Never Remove Existing Merge Animations
**Lines:** style.css (313-512)
```css
/* PROTECTED: Do not modify or delete */
.tile.merge-1 through .tile.merge-24
@keyframes merge-pop through @keyframes merge-matrix
```
**Reason:** Other features may depend on specific animation classes. Removing breaks random selection.

### 2. Never Change Core Color Scheme Without Approval
**Protected Colors:**
- Primary Cyan: `#00ffff`
- Primary Magenta: `#ff00ff`
- Primary Purple: `#7b2cbf`, `#533483`
- Background: `#0a0e27`, `#1a0b2e`, `#16003b`

**Reason:** Cyberpunk aesthetic is core to the game's identity. Changing colors breaks visual consistency.

### 3. Never Modify Tile Movement Logic Without Testing
**Lines:** game.js (208-366)
```javascript
// PROTECTED: Movement functions
function moveUp(board) { ... }
function moveDown(board) { ... }
function moveLeft(board) { ... }
function moveRight(board) { ... }
```
**Reason:** Movement logic is complex. Changes can break merging, scoring, or game state.

### 4. Never Skip localStorage Persistence
**Rule:** Any new game state (scores, power-ups, cards) MUST save to localStorage.
```javascript
// REQUIRED pattern for new features
localStorage.setItem('featureName', JSON.stringify(data));
```
**Reason:** Players expect progress to persist across sessions.

### 5. Never Use `var` - Always Use `const` or `let`
**Reason:** ES6+ code style. `var` has function scope issues.

### 6. Never Animate `left`/`top` Properties
**Rule:** Use `transform` for animations, not `left`/`top`.
```css
/* WRONG */
@keyframes bad-animation {
    0% { left: 0; top: 0; }
    100% { left: 100px; top: 100px; }
}

/* CORRECT */
@keyframes good-animation {
    0% { transform: translate(0, 0); }
    100% { transform: translate(100px, 100px); }
}
```
**Reason:** `left`/`top` trigger reflows (slow). `transform` uses GPU (fast).

### 7. Never Remove the `isMoving` Flag Check
**Lines:** game.js (121-122, 427)
```javascript
// REQUIRED: Always check before allowing moves
if (isMoving) return false;
isMoving = true;
```
**Reason:** Prevents concurrent moves that corrupt game state.

### 8. Never Hardcode Grid Size
**Rule:** Always use dynamic calculation based on `grid.offsetWidth`.
```javascript
// CORRECT
const cellSize = (grid.offsetWidth - 45) / 4;
```
**Reason:** Enables responsive design for mobile.

### 9. Never Delete Existing Event Listeners
**Lines:** game.js (426-512)
**Reason:** Keyboard and touch controls are core functionality.

### 10. Never Use Inline Styles in HTML
**Rule:** All styling must be in style.css or applied via JavaScript.
**Reason:** Maintains separation of concerns and makes debugging easier.

---

## ✅ MUST-FOLLOW PATTERNS

### Adding New UI Elements

**Pattern Used in This Codebase:**
```javascript
// 1. Create element
const element = document.createElement('div');

// 2. Set class (not inline styles)
element.className = 'my-element';

// 3. Set content
element.textContent = 'Content';

// 4. Set data attributes if needed
element.dataset.value = value;
element.dataset.id = id;

// 5. Append to parent
parentElement.appendChild(element);

// 6. Return reference if needed
return element;
```

**Example from game.js (lines 76-103):**
```javascript
function createTile(row, col, value, isNew = false) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = value;
    tile.dataset.value = value;
    tile.dataset.row = row;
    tile.dataset.col = col;
    
    // Calculate position
    const cellSize = (grid.offsetWidth - 45) / 4;
    const gap = 15;
    const x = col * (cellSize + gap);
    const y = row * (cellSize + gap);
    
    tile.style.width = cellSize + 'px';
    tile.style.height = cellSize + 'px';
    tile.style.left = x + 'px';
    tile.style.top = y + 'px';
    
    grid.appendChild(tile);
    return tile;
}
```

---

### Updating Game State

**Pattern Used in This Codebase:**
```javascript
// 1. Check if action is allowed
if (isMoving) return false;

// 2. Set lock flag
isMoving = true;

// 3. Save old state (if needed for undo)
const oldBoard = JSON.parse(JSON.stringify(board));

// 4. Perform state mutation
board[i][j] = newValue;

// 5. Update UI
refreshBoard();

// 6. Update score/localStorage
updateScore(points);

// 7. Release lock
isMoving = false;

// 8. Return success/failure
return true;
```

**Example from game.js (lines 119-205):**
```javascript
async function moveTiles(direction) {
    if (isMoving) return false;
    isMoving = true;
    
    let moved = false;
    const oldBoard = JSON.parse(JSON.stringify(board));
    
    // Process move
    switch (direction) {
        case 'up': moved = moveUp(board); break;
        // ... other directions
    }
    
    if (moved) {
        // Update UI
        tiles.forEach(tile => tile.remove());
        
        // Create new tiles
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] !== 0) {
                    createTile(i, j, board[i][j], false);
                }
            }
        }
        
        // Spawn new tile
        await new Promise(resolve => setTimeout(resolve, 150));
        addRandomTile();
        
        // Check win/lose
        if (!canMove()) gameOver();
        if (!hasWon && checkWin()) winGame();
    }
    
    isMoving = false;
    return moved;
}
```

---

### Adding Animations

**Pattern Used in This Codebase:**
```javascript
// 1. Add animation class
element.classList.add('animation-name');

// 2. Remove after duration
setTimeout(() => {
    element.classList.remove('animation-name');
}, durationInMs);
```

**Example from game.js (lines 84-88, 170-178):**
```javascript
// New tile animation
if (isNew) {
    tile.classList.add('new');
    setTimeout(() => tile.classList.remove('new'), 200);
}

// Random merge animation
if (mergedPositions.has(`${i}-${j}`)) {
    const randomAnim = Math.floor(Math.random() * 24) + 1;
    tile.classList.add(`merge-${randomAnim}`);
    setTimeout(() => {
        tile.classList.remove(`merge-${randomAnim}`);
    }, 600);
}
```

**CSS Pattern:**
```css
/* 1. Define animation class */
.tile.animation-name {
    animation: keyframe-name duration easing;
}

/* 2. Define keyframes */
@keyframes keyframe-name {
    0% { /* start state */ }
    50% { /* mid state */ }
    100% { /* end state */ }
}
```

---

### localStorage Integration

**Pattern Used in This Codebase:**
```javascript
// 1. Load on init
let bestScore = localStorage.getItem('bestScore') || 0;

// 2. Save on update
function updateScore(points) {
    score += points;
    
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
    }
}

// 3. For objects, use JSON
const data = { key: 'value' };
localStorage.setItem('dataKey', JSON.stringify(data));

// 4. Load objects with JSON.parse
const loaded = JSON.parse(localStorage.getItem('dataKey')) || {};
```

**Example from game.js (lines 14, 112-116):**
```javascript
// Load
let bestScore = localStorage.getItem('bestScore') || 0;

// Save
if (score > bestScore) {
    bestScore = score;
    bestScoreDisplay.textContent = bestScore;
    localStorage.setItem('bestScore', bestScore);
}
```

---

### Event Listener Pattern

**Pattern Used in This Codebase:**
```javascript
// 1. Get element reference (top of file)
const button = document.getElementById('button-id');

// 2. Add listener (bottom of file, before init)
button.addEventListener('click', handlerFunction);

// 3. Handler function (defined earlier)
function handlerFunction() {
    // Handle event
}

// OR use arrow function for simple handlers
button.addEventListener('click', () => {
    // Simple logic
});
```

**Example from game.js (lines 507-512):**
```javascript
// Button listeners
newGameBtn.addEventListener('click', initGame);
tryAgainBtn.addEventListener('click', initGame);
keepGoingBtn.addEventListener('click', () => {
    winScreen.classList.remove('show');
});
newGameBtn2.addEventListener('click', initGame);
```

---

### Async Timing Pattern

**Pattern Used in This Codebase:**
```javascript
// Use async/await with Promise + setTimeout
async function myFunction() {
    // Do something
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, milliseconds));
    
    // Continue after delay
}
```

**Example from game.js (lines 185-186):**
```javascript
// Wait before spawning new tile
await new Promise(resolve => setTimeout(resolve, 150));
addRandomTile();
```

---

## 🎨 Visual Consistency Rules

### All New Buttons
**Required Styling:**
```css
.new-button {
    background: linear-gradient(135deg, #ff00ff, #00ffff);
    color: #0a0e27;
    border: 2px solid #00ffff;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 
        0 0 20px rgba(0, 255, 255, 0.5),
        inset 0 0 10px rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.new-button:hover {
    transform: translateY(-2px);
    box-shadow: 
        0 0 30px rgba(0, 255, 255, 0.8),
        0 5px 20px rgba(255, 0, 255, 0.4),
        inset 0 0 15px rgba(255, 255, 255, 0.5);
}

.new-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}
```

### All New Text
**Required Styling:**
```css
.new-text {
    font-family: 'Orbitron', sans-serif;
    color: #00ffff;
    text-shadow: 0 0 10px #00ffff;
}

.new-text strong {
    color: #ff00ff;
    text-shadow: 0 0 10px #ff00ff;
}
```

### All New Containers
**Required Styling:**
```css
.new-container {
    background: rgba(10, 14, 39, 0.8);
    border: 2px solid #00ffff;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 
        0 0 30px rgba(0, 255, 255, 0.3),
        inset 0 0 30px rgba(255, 0, 255, 0.1);
}
```

### All New Animations
**Timing/Easing Standards:**
- **Short animations:** 0.2-0.4s (UI feedback)
- **Medium animations:** 0.4-0.6s (tile merges)
- **Long animations:** 0.6-1.0s (special effects)
- **Infinite loops:** 1.5-2.0s (glows, pulses)
- **Easing:** ease-in-out (default), cubic-bezier for bounces

### All Glow Effects
**Standard box-shadow:**
```css
/* Cyan glow */
box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);

/* Magenta glow */
box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);

/* Combined glow */
box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.5),
    0 0 20px rgba(255, 0, 255, 0.5);

/* Inset glow */
box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.5),
    inset 0 0 20px rgba(255, 0, 255, 0.2);
```

---

## 🧪 Testing Requirements

### Quick Manual Test Checklist
Run after every change:

**Core Gameplay (2 minutes):**
- [ ] New game starts with 2 tiles
- [ ] Arrow keys move tiles (all 4 directions)
- [ ] Tiles merge when matching
- [ ] Score increases on merge
- [ ] New tile spawns after move
- [ ] Game over triggers when stuck
- [ ] Win screen shows at 2048

**Animations (1 minute):**
- [ ] New tiles animate in
- [ ] Merge animations play (try multiple merges)
- [ ] 2048 tile glows
- [ ] No visual glitches

**Mobile (1 minute on phone):**
- [ ] Swipe gestures work
- [ ] Layout fits screen
- [ ] Buttons are tappable

**Persistence (30 seconds):**
- [ ] Refresh page
- [ ] Best score is saved

### Regression Test (After Major Changes)
**Full test suite (5 minutes):**
1. Play full game to 2048
2. Test all 4 directions multiple times
3. Verify all merge animations appear
4. Test on mobile device
5. Clear localStorage and test fresh start
6. Check browser console for errors

---

## 📦 Dependencies

### External Libraries
**Google Fonts:**
- **URL:** `https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap`
- **Version:** Latest (CDN auto-updates)
- **Usage:** All text elements
- **Fallback:** sans-serif
- **Import:** Line 1 in style.css

### Browser APIs
- **localStorage** - Best score persistence
- **Touch Events API** - Mobile swipe controls
- **CSS Animations API** - All visual animations
- **DOM API** - Element creation/manipulation

### No npm Packages
This project has ZERO npm dependencies. Keep it that way unless absolutely necessary.

---

## ⚠️ Known Issues

### Current Bugs/Limitations

**1. Tile Recreation Performance**
- **Issue:** All tiles removed and recreated on every move
- **Impact:** Slight performance overhead on older devices
- **Workaround:** None needed (works well enough)
- **Fix Priority:** Low
- **Lines:** game.js (161-182)

**2. No Move History**
- **Issue:** Cannot undo moves
- **Impact:** Blocks undo power-up feature
- **Workaround:** Must implement for power-ups
- **Fix Priority:** High (needed for planned features)
- **Solution:** Add `moveHistory` array in state

**3. No Animation Queuing**
- **Issue:** Rapid inputs during animation are ignored
- **Impact:** User must wait for animation
- **Workaround:** `isMoving` flag prevents issues
- **Fix Priority:** Low (acceptable UX)

**4. LocalStorage Only**
- **Issue:** No cloud save or cross-device sync
- **Impact:** Best score lost if localStorage cleared
- **Workaround:** None
- **Fix Priority:** Low (acceptable for MVP)

**5. No Service Worker**
- **Issue:** Not a PWA, no offline support
- **Impact:** Requires internet connection
- **Workaround:** None
- **Fix Priority:** Medium (nice to have)

---

## 💡 Common Pitfalls to Avoid

### Pitfall 1: Forgetting to Clear Animation Classes
**Problem:**
```javascript
tile.classList.add('merge-5');
// Animation won't re-trigger on next merge!
```

**Solution:**
```javascript
tile.classList.add('merge-5');
setTimeout(() => {
    tile.classList.remove('merge-5'); // REQUIRED
}, 600);
```

### Pitfall 2: Modifying Board During Iteration
**Problem:**
```javascript
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        if (board[i][j] === 2) {
            board[i][j] = 4; // Modifies during iteration
        }
    }
}
```

**Solution:**
```javascript
// Save old state first
const oldBoard = JSON.parse(JSON.stringify(board));

// Then modify
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        if (oldBoard[i][j] === 2) {
            board[i][j] = 4;
        }
    }
}
```

### Pitfall 3: Not Checking `isMoving` Flag
**Problem:**
```javascript
function newFeature() {
    // Modifies board without checking lock
    board[0][0] = 2;
}
```

**Solution:**
```javascript
function newFeature() {
    if (isMoving) return false;
    isMoving = true;
    
    board[0][0] = 2;
    
    isMoving = false;
    return true;
}
```

### Pitfall 4: Hardcoding Colors
**Problem:**
```css
.new-element {
    color: #00ff00; /* Wrong color! */
}
```

**Solution:**
```css
.new-element {
    color: #00ffff; /* Use theme colors */
}
```

### Pitfall 5: Using Inline Styles
**Problem:**
```javascript
element.style.color = '#00ffff';
element.style.fontSize = '20px';
element.style.padding = '10px';
```

**Solution:**
```javascript
// Add class instead
element.className = 'styled-element';

// Define in CSS
.styled-element {
    color: #00ffff;
    font-size: 20px;
    padding: 10px;
}
```

### Pitfall 6: Forgetting Mobile Responsiveness
**Problem:**
```css
.new-feature {
    width: 500px; /* Fixed width breaks mobile */
}
```

**Solution:**
```css
.new-feature {
    width: 100%;
    max-width: 500px;
}

@media (max-width: 768px) {
    .new-feature {
        width: 90%;
    }
}
```

### Pitfall 7: Not Testing on Actual Mobile Device
**Problem:** Only testing in browser DevTools mobile emulation.

**Solution:** Always test on real phone before considering feature complete.

### Pitfall 8: Breaking localStorage Keys
**Problem:**
```javascript
// Renaming key breaks existing saves
localStorage.setItem('newBestScore', bestScore);
```

**Solution:**
```javascript
// Keep existing key or migrate data
const oldScore = localStorage.getItem('bestScore');
if (oldScore) {
    localStorage.setItem('newBestScore', oldScore);
    localStorage.removeItem('bestScore');
}
```

---

## 🎯 Code Review Checklist

Before committing any code:

- [ ] No `var` declarations (use `const`/`let`)
- [ ] All animations have cleanup (remove class after duration)
- [ ] `isMoving` flag checked before state changes
- [ ] Colors match theme (cyan/magenta/purple)
- [ ] localStorage saves new persistent data
- [ ] Mobile responsive (test on phone)
- [ ] No console errors
- [ ] Existing animations still work
- [ ] Code follows existing patterns
- [ ] Comments added for complex logic
- [ ] No inline styles in HTML
- [ ] No hardcoded values (use calculations)
