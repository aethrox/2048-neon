# Feature Integration Guide

## 🚀 Planned Features Status

- [ ] **Combo System** - Track consecutive merges, bonus points
- [ ] **Power-Up System** - Undo, Hint, Remove tile
- [ ] **Special Cards** - Lightning, Star, Diamond effects
- [ ] **Streak & Milestones** - Daily streaks, achievements
- [ ] **Ghost Tile** - Best score replay visualization

## 📋 Pre-Integration Checklist

Before adding any feature, complete these steps:

- [ ] **Read CORE_MEMORY.md** - Understand project structure and state management
- [ ] **Read ANIMATIONS.md** - Know existing animations to avoid conflicts
- [ ] **Identify files to modify** - List specific files and line ranges
- [ ] **Plan state changes** - Define new variables and data structures
- [ ] **Design UI placement** - Sketch where new elements go
- [ ] **Consider localStorage needs** - What data needs persistence?
- [ ] **Check mobile compatibility** - Will it work on touch devices?
- [ ] **Plan animation integration** - How will it animate in/out?

## 🎯 Integration Points by Feature

---

### 1. Combo System

**Purpose:** Reward consecutive merges in a single move with bonus points and visual feedback.

**Files to Modify:**
- `game.js` (lines 12-17, 119-205, 208-366) - Add combo tracking
- `style.css` (lines 38-45, 100-105) - Combo display styling
- `index.html` (lines 28-32) - Add combo counter UI

**State Additions:**
```javascript
// Add to global state (after line 17 in game.js)
let currentCombo = 0;        // Current combo count
let maxCombo = 0;            // Best combo this game
let comboMultiplier = 1.0;   // Score multiplier (1.0, 1.5, 2.0)
```

**UI Location:**
- Place combo counter below score boxes in `.header`
- Show "COMBO x3" with pulsing animation
- Display multiplier: "1.5x POINTS"

**Functions to Hook:**
```javascript
// In moveTiles() function (line 155-182)
// After merge detection, increment combo
if (mergedPositions.size > 0) {
    currentCombo += mergedPositions.size;
    updateComboDisplay();
}

// Reset combo when no merge happens
if (!moved) {
    currentCombo = 0;
}

// New function to add
function updateComboDisplay() {
    const comboElement = document.getElementById('combo-counter');
    comboElement.textContent = currentCombo;
    
    // Apply multiplier
    if (currentCombo >= 5) comboMultiplier = 2.0;
    else if (currentCombo >= 3) comboMultiplier = 1.5;
    else comboMultiplier = 1.0;
    
    // Animate combo display
    comboElement.classList.add('combo-pulse');
    setTimeout(() => comboElement.classList.remove('combo-pulse'), 300);
}
```

**LocalStorage:**
```javascript
// Save max combo
localStorage.setItem('maxCombo', maxCombo);
```

**CSS to Add:**
```css
.combo-counter {
    background: rgba(255, 0, 255, 0.1);
    border: 2px solid #ff00ff;
    padding: 5px 10px;
    border-radius: 5px;
    text-align: center;
}

.combo-pulse {
    animation: combo-pulse-anim 0.3s ease-out;
}

@keyframes combo-pulse-anim {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}
```

---

### 2. Power-Up System

**Purpose:** Give players strategic tools (Undo, Hint, Remove) with limited uses.

**Files to Modify:**
- `game.js` (lines 12-17, 119-205) - Power-up logic, state history
- `style.css` (lines 107-130) - Power-up button styling
- `index.html` (lines 29-32) - Power-up buttons

**State Additions:**
```javascript
// Add to global state
let moveHistory = [];        // Array of board states
let undoCount = 3;           // Remaining undos
let hintCount = 3;           // Remaining hints
let removeCount = 1;         // Remaining removes

// Power-up state object
const powerUps = {
    undo: { count: 3, max: 3 },
    hint: { count: 3, max: 3 },
    remove: { count: 1, max: 1 }
};
```

**UI Location:**
- Add power-up bar between `.game-intro` and `.game-container`
- Three buttons: "↶ UNDO (3)", "💡 HINT (3)", "✖ REMOVE (1)"
- Disable button when count = 0

**Functions to Hook:**
```javascript
// In moveTiles() - Save state before move (line 126)
moveHistory.push({
    board: JSON.parse(JSON.stringify(board)),
    score: score,
    timestamp: Date.now()
});

// Keep only last 10 moves
if (moveHistory.length > 10) moveHistory.shift();

// New functions to add
function usePowerUpUndo() {
    if (powerUps.undo.count === 0 || moveHistory.length === 0) return;
    
    const lastState = moveHistory.pop();
    board = lastState.board;
    score = lastState.score;
    powerUps.undo.count--;
    
    // Refresh display
    refreshBoard();
    updatePowerUpDisplay();
}

function usePowerUpHint() {
    if (powerUps.hint.count === 0) return;
    
    // Calculate best move direction
    const bestDirection = calculateBestMove();
    
    // Show arrow indicator
    showHintArrow(bestDirection);
    powerUps.hint.count--;
    updatePowerUpDisplay();
}

function usePowerUpRemove() {
    if (powerUps.remove.count === 0) return;
    
    // Enable tile selection mode
    document.body.classList.add('remove-mode');
    
    // Add click listeners to tiles
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', handleTileRemove, { once: true });
    });
}

function handleTileRemove(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    
    board[row][col] = 0;
    powerUps.remove.count--;
    
    document.body.classList.remove('remove-mode');
    refreshBoard();
    updatePowerUpDisplay();
}
```

**LocalStorage:**
```javascript
// Save power-up counts
localStorage.setItem('powerUps', JSON.stringify(powerUps));
```

**CSS to Add:**
```css
.power-up-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
    justify-content: center;
}

.power-up-btn {
    background: rgba(0, 255, 255, 0.1);
    border: 2px solid #00ffff;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
}

.power-up-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.remove-mode .tile {
    cursor: pointer;
    border-color: #ff0000 !important;
}
```

---

### 3. Special Cards

**Purpose:** Rare power-ups with dramatic effects (Lightning, Star, Diamond).

**Files to Modify:**
- `game.js` (lines 12-17, 48-73) - Card inventory, activation
- `style.css` (lines 107-130) - Card UI styling
- `index.html` (lines 33-44) - Card inventory display

**State Additions:**
```javascript
// Add to global state
const cardInventory = {
    lightning: 0,  // Clears all tiles of selected value
    star: 0,       // Doubles a tile's value
    diamond: 0     // Prevents next game over
};

let diamondActive = false;  // Diamond shield status
```

**UI Location:**
- Add card inventory panel to right side of `.header`
- Show card icons with count badges
- Click to activate card

**Functions to Hook:**
```javascript
// Card spawn logic - add to addRandomTile() (line 61-72)
// 1% chance to spawn card instead of tile
if (Math.random() < 0.01) {
    const cardTypes = ['lightning', 'star', 'diamond'];
    const randomCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    cardInventory[randomCard]++;
    showCardNotification(randomCard);
    return true;
}

// New functions to add
function useCardLightning() {
    if (cardInventory.lightning === 0) return;
    
    // Enable tile selection mode
    document.body.classList.add('lightning-mode');
    
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', (e) => {
            const value = parseInt(e.target.dataset.value);
            clearAllTilesWithValue(value);
            cardInventory.lightning--;
            document.body.classList.remove('lightning-mode');
        }, { once: true });
    });
}

function clearAllTilesWithValue(value) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === value) {
                board[i][j] = 0;
                // Add lightning animation
                createLightningEffect(i, j);
            }
        }
    }
    refreshBoard();
}

function useCardStar() {
    if (cardInventory.star === 0) return;
    
    // Enable tile selection mode
    document.body.classList.add('star-mode');
    
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('click', (e) => {
            const row = parseInt(e.target.dataset.row);
            const col = parseInt(e.target.dataset.col);
            board[row][col] *= 2;
            cardInventory.star--;
            document.body.classList.remove('star-mode');
            refreshBoard();
        }, { once: true });
    });
}

function useCardDiamond() {
    if (cardInventory.diamond === 0) return;
    
    diamondActive = true;
    cardInventory.diamond--;
    
    // Show shield indicator
    document.body.classList.add('diamond-shield');
}

// Modify gameOver() function (line 412-416)
function gameOver() {
    if (diamondActive) {
        diamondActive = false;
        document.body.classList.remove('diamond-shield');
        showNotification('Diamond Shield Protected You!');
        return; // Don't show game over
    }
    
    setTimeout(() => {
        gameOverScreen.classList.add('show');
    }, 300);
}
```

**LocalStorage:**
```javascript
localStorage.setItem('cardInventory', JSON.stringify(cardInventory));
```

**CSS to Add:**
```css
.card-inventory {
    display: flex;
    gap: 5px;
}

.card-item {
    background: rgba(255, 0, 255, 0.1);
    border: 2px solid #ff00ff;
    padding: 5px;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
}

.card-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff00ff;
    color: #0a0e27;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightning-mode .tile,
.star-mode .tile {
    cursor: pointer;
    animation: card-highlight 1s ease-in-out infinite;
}

@keyframes card-highlight {
    0%, 100% { border-color: inherit; }
    50% { border-color: #ffff00; }
}
```

---

### 4. Streak & Milestones

**Purpose:** Track daily play streaks and achievement milestones.

**Files to Modify:**
- `game.js` (lines 12-17, 19-46) - Streak tracking, achievements
- `style.css` (lines 512-584) - Achievement notification styling
- `index.html` (lines 16-28) - Streak display in header

**State Additions:**
```javascript
// Add to global state
let dailyStreak = 0;
let lastPlayDate = null;
let achievements = {
    first512: false,
    first1024: false,
    first2048: false,
    score10k: false,
    score50k: false,
    streak7: false,
    streak30: false
};
```

**UI Location:**
- Add streak counter to `.header` (small flame icon + number)
- Show achievement popup overlay when unlocked
- Achievement list in settings/menu

**Functions to Hook:**
```javascript
// In initGame() - Check daily streak (line 20-46)
function checkDailyStreak() {
    const today = new Date().toDateString();
    const lastPlay = localStorage.getItem('lastPlayDate');
    
    if (lastPlay === today) {
        // Already played today
        return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastPlay === yesterday.toDateString()) {
        // Consecutive day
        dailyStreak++;
    } else if (lastPlay !== null) {
        // Streak broken
        dailyStreak = 1;
    } else {
        // First time playing
        dailyStreak = 1;
    }
    
    localStorage.setItem('lastPlayDate', today);
    localStorage.setItem('dailyStreak', dailyStreak);
    
    // Check streak achievements
    if (dailyStreak >= 7 && !achievements.streak7) {
        unlockAchievement('streak7', '7 Day Streak!');
    }
    if (dailyStreak >= 30 && !achievements.streak30) {
        unlockAchievement('streak30', '30 Day Streak!');
    }
}

// In moveTiles() - Check tile achievements (line 194-197)
if (!hasWon && checkWin()) {
    if (!achievements.first2048) {
        unlockAchievement('first2048', 'First 2048 Tile!');
    }
}

// Check for 512 and 1024
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        if (board[i][j] === 512 && !achievements.first512) {
            unlockAchievement('first512', 'First 512 Tile!');
        }
        if (board[i][j] === 1024 && !achievements.first1024) {
            unlockAchievement('first1024', 'First 1024 Tile!');
        }
    }
}

// In updateScore() - Check score achievements (line 107-117)
if (score >= 10000 && !achievements.score10k) {
    unlockAchievement('score10k', '10,000 Points!');
}
if (score >= 50000 && !achievements.score50k) {
    unlockAchievement('score50k', '50,000 Points!');
}

// New function to add
function unlockAchievement(id, title) {
    achievements[id] = true;
    localStorage.setItem('achievements', JSON.stringify(achievements));
    
    // Show achievement notification
    showAchievementPopup(title);
}

function showAchievementPopup(title) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-title">${title}</div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.classList.add('show'), 100);
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}
```

**LocalStorage:**
```javascript
localStorage.setItem('dailyStreak', dailyStreak);
localStorage.setItem('lastPlayDate', today);
localStorage.setItem('achievements', JSON.stringify(achievements));
```

**CSS to Add:**
```css
.streak-display {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255, 0, 255, 0.1);
    border: 2px solid #ff00ff;
    padding: 5px 10px;
    border-radius: 5px;
}

.achievement-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: rgba(10, 14, 39, 0.95);
    border: 3px solid #ffbe0b;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    z-index: 1000;
    box-shadow: 0 0 50px rgba(255, 190, 11, 0.8);
    transition: transform 0.3s ease-out;
}

.achievement-popup.show {
    transform: translate(-50%, -50%) scale(1);
}

.achievement-icon {
    font-size: 60px;
    margin-bottom: 10px;
}

.achievement-title {
    font-size: 24px;
    color: #ffbe0b;
    text-shadow: 0 0 10px #ffbe0b;
}
```

---

### 5. Ghost Tile (Best Score Replay)

**Purpose:** Show semi-transparent tiles from best game as visual guide.

**Files to Modify:**
- `game.js` (lines 12-17, 119-205) - Move history recording
- `style.css` (lines 161-172) - Ghost tile styling
- `index.html` (lines 33-44) - Replay toggle button

**State Additions:**
```javascript
// Add to global state
let bestGameMoves = [];      // Array of move sequences
let showGhostTiles = false;  // Toggle ghost display
let currentMoveIndex = 0;    // Playback position
```

**UI Location:**
- Add toggle button in `.game-intro`: "👻 GHOST MODE"
- Ghost tiles appear as semi-transparent overlays
- Show "Best Game: Move 5/42" indicator

**Functions to Hook:**
```javascript
// In moveTiles() - Record moves for best game (line 155-200)
if (score > bestScore) {
    // This is a new best game, record moves
    bestGameMoves.push({
        direction: direction,
        boardBefore: JSON.parse(JSON.stringify(oldBoard)),
        boardAfter: JSON.parse(JSON.stringify(board)),
        score: score
    });
}

// When game ends, save best game moves
function savebestGameMoves() {
    localStorage.setItem('bestGameMoves', JSON.stringify(bestGameMoves));
}

// New functions to add
function toggleGhostMode() {
    showGhostTiles = !showGhostTiles;
    
    if (showGhostTiles) {
        loadBestGameMoves();
        displayGhostTiles();
    } else {
        clearGhostTiles();
    }
}

function loadBestGameMoves() {
    const saved = localStorage.getItem('bestGameMoves');
    if (saved) {
        bestGameMoves = JSON.parse(saved);
        currentMoveIndex = 0;
    }
}

function displayGhostTiles() {
    if (currentMoveIndex >= bestGameMoves.length) return;
    
    const move = bestGameMoves[currentMoveIndex];
    const ghostBoard = move.boardAfter;
    
    // Create ghost tiles
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (ghostBoard[i][j] !== 0) {
                createGhostTile(i, j, ghostBoard[i][j]);
            }
        }
    }
}

function createGhostTile(row, col, value) {
    const tile = createTile(row, col, value, false);
    tile.classList.add('ghost-tile');
    return tile;
}

function clearGhostTiles() {
    document.querySelectorAll('.ghost-tile').forEach(tile => tile.remove());
}

// Advance ghost on each move
// In moveTiles() after successful move (line 200)
if (showGhostTiles) {
    currentMoveIndex++;
    clearGhostTiles();
    displayGhostTiles();
}
```

**LocalStorage:**
```javascript
localStorage.setItem('bestGameMoves', JSON.stringify(bestGameMoves));
```

**CSS to Add:**
```css
.ghost-tile {
    opacity: 0.3;
    pointer-events: none;
    z-index: 0;
    border-style: dashed !important;
}

.ghost-mode-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 0, 255, 0.1);
    border: 2px solid #ff00ff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
}
```

---

## ✅ Post-Integration Checklist

After adding any feature, verify:

- [ ] **Existing animations still work** - Test all 24 merge animations
- [ ] **No visual glitches** - Check tile positioning, overlays
- [ ] **localStorage persists** - Refresh page, data should remain
- [ ] **Performance maintained** - Game still runs at 60fps
- [ ] **Neon theme consistent** - New UI matches cyan/magenta palette
- [ ] **Mobile responsive** - Test on phone, touch controls work
- [ ] **No console errors** - Check browser console for errors
- [ ] **Win/lose conditions work** - Game over and win screens still trigger
- [ ] **Score updates correctly** - Points calculated properly
- [ ] **Best score saves** - Best score persists across sessions

## 🔗 Cross-Feature Dependencies

### Dependency Map
```
Combo System
  └── (standalone, no dependencies)

Power-Up System
  ├── Requires: Move history tracking
  └── Blocks: Ghost Tile (uses same history)

Special Cards
  ├── Requires: Notification system
  └── Enhances: Power-Up System (similar UI)

Streak & Milestones
  ├── Requires: Date tracking
  └── Enhances: Special Cards (card rewards)

Ghost Tile
  ├── Requires: Move history tracking
  └── Conflicts: Power-Up Undo (same history)
```

### Implementation Order (Recommended)
1. **Combo System** (easiest, no dependencies)
2. **Streak & Milestones** (independent, adds engagement)
3. **Power-Up System** (adds move history for Ghost Tile)
4. **Special Cards** (builds on power-up UI patterns)
5. **Ghost Tile** (uses move history from Power-Ups)

### Shared Systems to Build First
- **Move History Tracking** - Needed by Power-Ups and Ghost Tile
- **Notification System** - Needed by Achievements and Cards
- **Modal/Overlay System** - Needed by multiple features
