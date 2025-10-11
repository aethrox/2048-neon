# 2048 Neon Game - Core Memory
Last Updated: 2025-10-11 (Version 2.3.4)

## 🎮 Project Quick Facts
- **Name:** 2048 Cyberpunk Edition
- **Version:** 2.3.4 - UX Improvements & Language Selection
- **Tech Stack:** Vanilla JavaScript (ES6 Modules), HTML5, CSS3
- **Grid:** 4x4 (16 cells)
- **Theme:** Neon cyberpunk aesthetic with glowing effects
- **Dependencies:** Google Fonts (Orbitron), no npm packages
- **Build:** None - pure client-side application with ES6 modules
- **Architecture:** Modular structure with 16 JS modules & 13 CSS modules

## 📁 File Structure

### Entry Points
- **`index.html`** - Main HTML entry point (uses ES6 modules)
- **`src/css/main.css`** - CSS entry point (imports all modules)
- **`src/js/main.js`** - JavaScript entry point (imports all modules)
- **`favicon.svg`** - Game icon

### Module Organization

**JavaScript Modules (16):**
```
src/js/
├── main.js                    # Entry point & initialization
├── config/
│   ├── translations.js        # TR/EN translation system
│   └── constants.js           # Game constants
├── core/
│   ├── GameState.js          # Centralized state management
│   ├── TileManager.js        # Tile creation & rendering
│   ├── MovementEngine.js     # Movement logic
│   ├── ScoreManager.js       # Score tracking
│   └── GameController.js     # Main game loop
├── features/
│   ├── Feedback.js           # Feedback system
│   ├── Streaks.js            # Streak tracking
│   ├── Milestones.js         # Milestone rewards
│   ├── PowerUps.js           # Power-up system
│   └── GhostMode.js          # Ghost overlay
└── ui/
    ├── Notifications.js      # Notifications
    ├── Menu.js               # Hamburger menu
    ├── Modals.js             # Info & language modals
    └── EventHandlers.js      # Input events
```

**CSS Modules (13):**
```
src/css/
├── main.css                  # Entry point
├── base/
│   ├── reset.css
│   └── variables.css
├── layout/
│   ├── grid.css
│   ├── container.css
│   └── responsive.css
├── components/
│   ├── tiles.css
│   ├── buttons.css
│   ├── modals.css
│   └── feedback.css
├── features/
│   ├── powerups.css
│   └── menu.css
└── animations/
    ├── merge-animations.css  # 24 unique animations
    └── effects.css
```

## ⚙️ Core Game Loop

1. **User Input** → Arrow keys or swipe
2. **Validation** → Check `isMoving` flag
3. **Movement** → Call direction function
4. **Merging** → Detect and merge matching tiles
5. **Score Update** → Add points, update display
6. **Animation** → Apply merge animation
7. **New Tile** → Spawn 2 or 4 after delay
8. **State Check** → Win (2048) or lose (no moves)
9. **Reset** → Ready for next input

**Timing:**
- Move animation: 150ms
- New tile spawn: 150ms delay
- Merge animation: 400-600ms
- Total cycle: ~300-450ms

## 💾 State Structure

```javascript
// GameState (Singleton)
{
    board: Array<Array<number>>,     // 4x4 grid
    score: number,                    // Current score
    bestScore: number,                // Best score
    hasWon: boolean,                  // Win state
    ghostData: Object | null          // Ghost mode data
}

// Power-Ups
{
    undo: { count: 3, history: [] },
    hint: { count: 5 },
    remove: { count: 2 }
}

// Features
{
    currentStreak: number,            // Current merge streak
    milestones: Set<number>,          // Reached milestones
    specialCards: Array               // Active special tiles
}
```

## 🎨 Color Palette

### Primary Colors
- **Cyan:** `#00ffff` - Primary accent, borders, icons
- **Magenta:** `#ff00ff` - Secondary accent, hover states
- **Dark Background:** `#0a0e27` - Main background

### Tile Colors (by value)
| Value | Background | Text | Border |
|-------|-----------|------|--------|
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
| 2048 | Rainbow gradient | `#ffffff` | `#ffffff` |

## 🔧 Key Features

### Power-Ups
- **Undo (↶)** - 3 uses, reverts last move
- **Hint (💡)** - 5 uses, suggests best move
- **Remove (✕)** - 2 uses, removes any tile

### Special Cards
- **⚡ Lightning** - 5% spawn, +50 points, chain reaction
- **🌟 Star** - 3% spawn, +100 points, 2x multiplier
- **💎 Diamond** - 4% spawn, 5x value bonus

### Streak Rewards
- 3 Streak: +50 points
- 5 Streak: +150 points
- 7 Streak: +300 points
- 10 Streak: +500 points + Random Power-Up
- 15+ Streak: +1000 points + Rainbow effects

### Multi-Language Support
- First-visit language selection modal
- Turkish and English translations
- Instant language switching
- localStorage persistence

## 📝 Code Style

### Naming Conventions
- **Variables:** camelCase (`currentStreak`, `hasWon`)
- **Functions:** camelCase (`moveTiles`, `checkWin`)
- **Classes:** PascalCase (`GameState`, `TileManager`)
- **CSS:** kebab-case (`.game-container`, `.powerup-btn`)
- **Constants:** UPPER_SNAKE_CASE (`GRID_SIZE`, `SPAWN_DELAY`)

### ES6+ Features
- ES6 Modules (`import`/`export`)
- Classes with singleton pattern
- Arrow functions
- Template literals
- Destructuring
- Async/await
- Set/Map data structures

## 🚫 Critical Code - Do Not Modify

### 1. Merge Animation System
24 unique keyframe animations in `merge-animations.css`
```css
.tile.merge-1 through .tile.merge-24
@keyframes merge-pop through @keyframes merge-matrix
```

### 2. Tile Positioning
Uses `left/top` instead of `transform` for precise positioning
```javascript
const x = col * (cellSize + gap);
const y = row * (cellSize + gap);
tile.style.left = x + 'px';
tile.style.top = y + 'px';
```

### 3. Movement Algorithm
Slide → Merge → Slide pattern in all 4 directions

### 4. localStorage Keys
- `game-language` - User's language preference
- `has-visited-game` - First-visit flag
- `bestScore` - Best score
- `feedback-dismissed` - Feedback modal state

## 📊 Performance Metrics

- **60 FPS** animations (GPU-accelerated)
- **<100ms** language switching
- **<50ms** tile movement response
- **~200KB** total size (uncompressed)
- **GPU-accelerated** CSS animations with `will-change`

## 🎯 Version History

- **v2.3.4** - UX improvements, language selection modal, icon visibility fix
- **v2.3.3** - Mobile readability improvements
- **v2.3.2** - Performance optimization
- **v2.3.0** - Modular architecture refactor
- **v2.2.0** - Multi-language & feedback system
- **v2.1.0** - Power-ups & special cards
- **v2.0.0** - Streak system & milestones
- **v1.0.0** - Initial release

## 📚 Related Documentation

- [CHANGELOG.md](CHANGELOG.md) - Detailed version history
- [ANIMATIONS.md](ANIMATIONS.md) - Animation system
- [MODULAR_STRUCTURE.md](MODULAR_STRUCTURE.md) - Architecture details
- [DEVELOPMENT_RULES.md](DEVELOPMENT_RULES.md) - Development guidelines
