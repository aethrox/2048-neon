# 2048 Neon Game - Core Memory
Last Updated: 2025-10-10

## 🎮 Project Quick Facts
- **Name:** 2048 Cyberpunk Edition
- **Tech Stack:** Vanilla JavaScript (ES6 Modules), HTML5, CSS3
- **Grid:** 4x4 (16 cells)
- **Theme:** Neon cyberpunk aesthetic with glowing effects
- **Dependencies:** Google Fonts (Orbitron), no npm packages
- **Build:** None - pure client-side application with ES6 modules
- **Architecture:** Modular structure with separated concerns

## 📁 Critical Files & Their Purpose

### Legacy Files (Working - Single File Architecture)
- **`index.html`** - Main HTML entry point (legacy)
- **`style.css`** (~1,750 lines) - All styles in one file
- **`game.js`** (~1,570 lines) - All game logic in one file
- **`favicon.svg`** - Game icon

### Modular Files (New Architecture)
- **`index-modular.html`** - Modular HTML entry point
- **`src/css/main.css`** - CSS entry point (imports all modules)
- **`src/js/main.js`** - JavaScript entry point (imports all modules)
- **`assets/favicon.svg`** - Game icon (new location)

### File Relationships (Modular Architecture)
```
index-modular.html (entry point)
    │
    ├── src/css/main.css (CSS entry)
    │   ├── base/reset.css
    │   ├── layout/container.css
    │   ├── components/typography.css
    │   └── [other CSS modules...]
    │
    ├── src/js/main.js (JS entry - ES6 module)
    │   ├── config/
    │   │   ├── constants.js (game settings)
    │   │   └── translations.js (TR/EN translations)
    │   ├── utils/
    │   │   ├── dom.js (DOM helpers)
    │   │   └── storage.js (localStorage wrapper)
    │   ├── core/
    │   │   ├── GameState.js (state management)
    │   │   ├── TileManager.js (tile operations)
    │   │   ├── MovementEngine.js (movement logic)
    │   │   └── MergeEngine.js (merge logic)
    │   ├── features/
    │   │   ├── GhostMode.js
    │   │   ├── PowerUps.js
    │   │   ├── SpecialCards.js
    │   │   ├── Streaks.js
    │   │   └── Milestones.js
    │   └── ui/
    │       ├── Notifications.js
    │       ├── Animations.js
    │       └── EventHandlers.js
    │
    └── assets/
        └── favicon.svg

Legacy Structure (Still Functional):
index.html → style.css + game.js
```

### Module Organization

**JavaScript Modules:**
- **config/** - Configuration & constants
- **utils/** - Utility functions & helpers
- **core/** - Core game logic & state
- **features/** - Game features (ghost, power-ups, etc.)
- **ui/** - UI components & interactions

**CSS Modules:**
- **base/** - Reset & base styles
- **layout/** - Layout & containers
- **components/** - UI components
- **features/** - Feature-specific styles
- **animations/** - Animation definitions
- **responsive/** - Mobile breakpoints

## ⚙️ Core Game Loop

**Main Flow:**
1. **User Input** → Arrow keys (desktop) or swipe (mobile)
2. **Input Validation** → Check `isMoving` flag to prevent concurrent moves
3. **Tile Movement** → Call direction-specific function (moveUp/Down/Left/Right)
4. **Tile Merging** → Detect matching adjacent tiles, merge and track positions
5. **Score Update** → Add merged tile value to score, update best score
6. **Board Refresh** → Remove old tiles, create new tiles with animations
7. **New Tile Spawn** → Add random 2 or 4 tile after 150ms delay
8. **Win/Lose Check** → Check for 2048 tile or no valid moves
9. **State Reset** → Clear `isMoving` flag, ready for next input

**Timing:**
- Move animation: 150ms
- New tile spawn delay: 150ms
- Merge animation: 400-600ms (varies by animation)
- Total move cycle: ~300-450ms

## 🎯 Key Functions Reference

### Initialization & Setup
- **`initGame()`** - Reset board to empty 4x4 array, clear score, spawn 2 initial tiles, hide overlays
- **`createTile(row, col, value, isNew)`** - Create DOM tile element, position with left/top CSS, add data attributes, return tile element

### Tile Management
- **`addRandomTile()`** - Find empty cells, pick random one, spawn 2 (90%) or 4 (10%), animate with `.new` class
- **`updateScore(points)`** - Add points to score, update display, check/update best score, save to localStorage

### Movement Core
- **`moveTiles(direction)`** - Main async handler, validates input, calls direction function, manages animations, spawns new tile
- **`moveUp(board)`** - Slide tiles up, merge matching pairs, return true if board changed
- **`moveDown(board)`** - Slide tiles down, merge matching pairs, return true if board changed
- **`moveLeft(board)`** - Slide tiles left, merge matching pairs, return true if board changed
- **`moveRight(board)`** - Slide tiles right, merge matching pairs, return true if board changed

### Game State Checks
- **`canMove()`** - Check for empty cells OR adjacent matching tiles, return boolean
- **`checkWin()`** - Scan board for 2048 tile, return boolean
- **`gameOver()`** - Show `.game-over` overlay after 300ms delay
- **`winGame()`** - Show `.win` overlay after 300ms delay

### Event Handlers
- **Keyboard:** `keydown` listener → maps ArrowUp/Down/Left/Right to `moveTiles(direction)`
- **Touch:** `touchstart/touchmove/touchend` → calculates swipe direction, calls `moveTiles(direction)`
- **Buttons:** Click listeners on `#new-game`, `#try-again`, `#keep-going`, `#new-game-2`

## 💾 State Structure

```javascript
// Global State Variables
let board = [];              // 4x4 array of numbers (0 = empty)
let score = 0;               // Current game score (integer)
let bestScore = 0;           // Best score from localStorage (integer)
let isMoving = false;        // Animation lock flag (boolean)
let hasWon = false;          // Win state tracker (boolean)
let mergedPositions = new Set(); // Merged tile positions (Set of "row-col" strings)

// Board Structure Example
board = [
    [2, 4, 8, 16],    // Row 0
    [0, 0, 2, 4],     // Row 1 (0 = empty)
    [2, 0, 0, 8],     // Row 2
    [4, 2, 16, 32]    // Row 3
];

// DOM Element References (const)
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const gameOverScreen = document.querySelector('.game-over');
const winScreen = document.querySelector('.win');
const newGameBtn = document.getElementById('new-game');
const tryAgainBtn = document.getElementById('try-again');
const keepGoingBtn = document.getElementById('keep-going');
const newGameBtn2 = document.getElementById('new-game-2');

// Touch State (for mobile)
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isSwiping = false;
```

## 🎨 Color Palette (Hex Codes)

### Primary Theme Colors
- **Primary Cyan:** `#00ffff` (main accent, borders, text)
- **Primary Magenta:** `#ff00ff` (secondary accent, highlights)
- **Primary Purple:** `#7b2cbf`, `#533483` (mid-range tiles)
- **White:** `#ffffff` (high-value tile text)

### Background Colors
- **Dark Blue:** `#0a0e27` (primary background)
- **Deep Purple:** `#1a0b2e` (gradient middle)
- **Dark Purple:** `#16003b` (gradient end)

### Tile Value Colors (data-value attribute)
| Value | Background Gradient | Text | Border |
|-------|-------------------|------|--------|
| 2 | `#1a1a2e → #16213e` | `#00ffff` | `#00ffff` |
| 4 | `#16213e → #0f3460` | `#00ffff` | `#00ffff` |
| 8 | `#0f3460 → #533483` | `#ff00ff` | `#ff00ff` |
| 16 | `#533483 → #7b2cbf` | `#ff00ff` | `#ff00ff` |
| 32 | `#7b2cbf → #c77dff` | `#ffffff` | `#c77dff` |
| 64 | `#c77dff → #e0aaff` | `#0a0e27` | `#e0aaff` |
| 128 | `#ff006e → #ff4d6d` | `#ffffff` | `#ff006e` |
| 256 | `#ff4d6d → #ff758f` | `#ffffff` | `#ff4d6d` |
| 512 | `#06ffa5 → #00d9ff` | `#0a0e27` | `#06ffa5` |
| 1024 | `#ffbe0b → #fb5607` | `#0a0e27` | `#ffbe0b` |
| 2048 | `#00ffff → #ff00ff → #00ffff` | `#ffffff` | `#ffffff` |

## 📝 Code Style Rules

### Naming Conventions
- **Variables:** camelCase (`bestScore`, `isMoving`, `mergedPositions`)
- **Functions:** camelCase (`moveTiles`, `addRandomTile`, `checkWin`)
- **CSS Classes:** kebab-case (`.game-container`, `.score-box`, `.merge-1`)
- **CSS IDs:** kebab-case (`#new-game`, `#best-score`)
- **Data Attributes:** kebab-case (`data-value`, `data-row`, `data-col`)

### ES6+ Features Used
- `const` and `let` (no `var`)
- Arrow functions `() => {}`
- Template literals `` `${row}-${col}` ``
- Destructuring `const { row, col } = emptyCells[index]`
- Array methods `.fill()`, `.map()`, `.forEach()`, `.querySelectorAll()`
- Set data structure `new Set()`
- Async/await for timing `await new Promise(resolve => setTimeout(resolve, 150))`
- JSON methods `JSON.parse()`, `JSON.stringify()`

### Comment Style
- Single-line: `// Description`
- Section headers: `// Movement helper functions`
- Inline explanations for complex logic

### Code Organization Pattern
1. DOM element references (top of file)
2. State variable declarations
3. Initialization function
4. Helper functions (tile creation, scoring)
5. Core game logic (movement, merging)
6. Win/lose detection functions
7. Event listeners
8. Game initialization call (last line)

## 🚫 Never Touch

### Critical Code Sections

**1. Merge Animation System (lines 310-512 in style.css)**
```css
/* DO NOT MODIFY: 24 merge animation classes and keyframes */
.tile.merge-1 through .tile.merge-24
@keyframes merge-pop through @keyframes merge-matrix
```

**2. Tile Positioning Logic (lines 90-100 in game.js)**
```javascript
// DO NOT CHANGE: Uses left/top instead of transform for positioning
const cellSize = (grid.offsetWidth - 45) / 4;
const gap = 15;
const x = col * (cellSize + gap);
const y = row * (cellSize + gap);
tile.style.left = x + 'px';
tile.style.top = y + 'px';
```

**3. Movement Algorithm Core (lines 208-366 in game.js)**
```javascript
// DO NOT MODIFY: Slide → Merge → Slide pattern in all 4 directions
// Changing this breaks game logic
```

**4. Color Palette (lines 174-270 in style.css)**
```css
/* DO NOT CHANGE: Tile color progression is carefully designed */
.tile[data-value="2"] through .tile[data-value="2048"]
```

**5. LocalStorage Key**
```javascript
// DO NOT RENAME: 'bestScore' is the persistent key
localStorage.getItem('bestScore')
localStorage.setItem('bestScore', bestScore)
```

## 🔧 Common Code Patterns

### Pattern 1: Guard Clause with Lock
```javascript
if (isMoving) return false;
isMoving = true;
// ... perform operation
isMoving = false;
```

### Pattern 2: Board Iteration (Row-Column)
```javascript
for (let i = 0; i < 4; i++) {      // rows
    for (let j = 0; j < 4; j++) {  // columns
        // Access: board[i][j]
    }
}
```

### Pattern 3: Tile Creation
```javascript
const tile = document.createElement('div');
tile.className = 'tile';
tile.dataset.value = value;
tile.dataset.row = row;
tile.dataset.col = col;
grid.appendChild(tile);
```

### Pattern 4: Animation Application
```javascript
tile.classList.add('animation-class');
setTimeout(() => {
    tile.classList.remove('animation-class');
}, duration);
```

### Pattern 5: Async Timing
```javascript
await new Promise(resolve => setTimeout(resolve, milliseconds));
```

## 📊 Quick Stats
- **Total Lines:** 1,336 (52 HTML + 766 CSS + 518 JS)
- **Functions:** 15 core functions
- **Animations:** 27 keyframe animations
- **Tile Values:** 11 (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048)
- **Event Listeners:** 8 total
- **LocalStorage Keys:** 1 (bestScore)
- **Mobile Breakpoints:** 2 (768px, 480px)
