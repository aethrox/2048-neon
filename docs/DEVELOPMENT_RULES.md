# 2048 Neon Game - Development Rules
Last Updated: 2025-10-11 (Version 2.3.4)

## 🎯 Core Principles

### 1. Modularity First
- One responsibility per module
- Clear import/export structure
- Singleton pattern for shared state
- No circular dependencies

### 2. Performance Priority
- GPU-accelerated animations
- Minimize DOM manipulation
- Use CSS transforms over position changes (except tiles)
- Debounce expensive operations

### 3. Code Quality
- ES6+ syntax throughout
- Consistent naming conventions
- Self-documenting code
- Comments for complex logic only

## 📝 Naming Conventions

### JavaScript
```javascript
// Variables & Functions: camelCase
const currentScore = 0;
function calculateScore() {}

// Classes: PascalCase
class GameController {}
class TileManager {}

// Constants: UPPER_SNAKE_CASE
const GRID_SIZE = 4;
const SPAWN_DELAY = 150;

// Private methods: _prefixed
_updateInternalState() {}

// Boolean variables: is/has/should prefix
let isMoving = false;
let hasWon = false;
let shouldUpdate = true;
```

### CSS
```css
/* Classes: kebab-case */
.game-container {}
.powerup-btn {}
.tile-2048 {}

/* IDs: kebab-case */
#new-game {}
#score-display {}

/* Data attributes: kebab-case */
[data-value="2048"] {}
[data-row="0"] {}
```

## 🏗️ Module Structure

### Required Exports
```javascript
// Default export for singletons
class GameState {
    // ...
}
export default new GameState();

// Named exports for utilities
export function formatScore(score) {}
export const CONSTANTS = {};
```

### Import Order
```javascript
// 1. Config
import { GRID_SIZE } from './config/constants.js';
import { t } from './config/translations.js';

// 2. Core
import GameState from './core/GameState.js';
import TileManager from './core/TileManager.js';

// 3. Features
import PowerUps from './features/PowerUps.js';

// 4. UI
import Notifications from './ui/Notifications.js';
```

## 🚫 Critical Rules - Never Break

### 1. Tile Positioning
**ALWAYS use `left/top`, NEVER use `transform`**
```javascript
// ✅ CORRECT
tile.style.left = x + 'px';
tile.style.top = y + 'px';

// ❌ WRONG
tile.style.transform = `translate(${x}px, ${y}px)`;
```

### 2. Animation System
**DO NOT modify the 24 merge animations**
- Located in `src/css/animations/merge-animations.css`
- Each animation is carefully balanced
- Changing timing breaks game feel

### 3. localStorage Keys
**DO NOT rename these keys**
```javascript
// Critical keys - changing breaks persistence
'bestScore'
'game-language'
'has-visited-game'
'feedback-dismissed'
'feedback-submitted'
'games-played'
```

### 4. Movement Algorithm
**DO NOT modify the slide-merge-slide pattern**
- Core logic in `MovementEngine.js`
- Tested pattern that ensures correct behavior
- Changes will break game mechanics

### 5. Color Palette
**DO NOT change tile progression colors**
- Each tile value has specific colors
- Progression is carefully designed
- Located in `src/css/components/tiles.css`

## ✅ Best Practices

### State Management
```javascript
// ✅ GOOD: Use GameState singleton
import GameState from './core/GameState.js';
const score = GameState.getScore();

// ❌ BAD: Direct state access
let globalScore = 0;
```

### DOM Manipulation
```javascript
// ✅ GOOD: Batch updates
const fragment = document.createDocumentFragment();
tiles.forEach(tile => fragment.appendChild(tile));
grid.appendChild(fragment);

// ❌ BAD: Multiple updates
tiles.forEach(tile => grid.appendChild(tile));
```

### Event Listeners
```javascript
// ✅ GOOD: Single delegated listener
grid.addEventListener('click', (e) => {
    if (e.target.matches('.tile')) {
        // Handle tile click
    }
});

// ❌ BAD: Multiple listeners
tiles.forEach(tile => {
    tile.addEventListener('click', handleClick);
});
```

### Async Operations
```javascript
// ✅ GOOD: async/await
async function moveT iles() {
    await animateMovement();
    await spawnNewTile();
}

// ❌ BAD: Callback hell
moveAnim(() => {
    spawnTile(() => {
        updateUI(() => {
            // ...
        });
    });
});
```

## 🔧 Adding New Features

### Step-by-Step Process

1. **Plan Module Location**
   - Config: Settings & constants
   - Core: Game mechanics
   - Features: Optional functionality
   - UI: User interface components

2. **Create Module File**
   ```javascript
   // src/js/features/NewFeature.js
   class NewFeature {
       constructor() {
           // Initialize
       }
       
       init() {
           // Setup
       }
   }
   
   export default new NewFeature();
   ```

3. **Import in main.js**
   ```javascript
   import NewFeature from './features/NewFeature.js';
   
   document.addEventListener('DOMContentLoaded', () => {
       // ... other initializations
       NewFeature.init();
   });
   ```

4. **Add CSS Module (if needed)**
   ```css
   /* src/css/features/new-feature.css */
   .new-feature {
       /* styles */
   }
   ```

5. **Import in main.css**
   ```css
   @import 'features/new-feature.css';
   ```

6. **Update Documentation**
   - Add to CHANGELOG.md
   - Update CORE_MEMORY.md if it affects core mechanics
   - Document in README.md if user-facing

## 🧪 Testing Checklist

Before committing code:

- [ ] Tiles move correctly in all 4 directions
- [ ] Merging works without duplication
- [ ] Score updates accurately
- [ ] Animations play smoothly
- [ ] No console errors
- [ ] localStorage persists correctly
- [ ] Mobile touch works
- [ ] Language switching works
- [ ] Power-ups function correctly
- [ ] Ghost mode toggles properly
- [ ] Responsive on mobile (768px, 480px)

## 📊 Performance Guidelines

### CSS
- Use `will-change` for animated elements
- Prefer `transform` and `opacity` for animations
- Use GPU acceleration with `translateZ(0)`
- Minimize shadow layers (max 2 per element)
- Keep blur radius ≤ 40px

### JavaScript
- Debounce rapid events (resize, scroll)
- Use `requestAnimationFrame` for animations
- Batch DOM reads and writes
- Cache DOM queries
- Use event delegation

### Example: Optimized Animation
```css
/* ✅ GOOD: GPU-accelerated */
.tile {
    will-change: transform;
    transform: translate3d(0, 0, 0);
}

@keyframes slide {
    from { transform: translate3d(0, -50px, 0); }
    to { transform: translate3d(0, 0, 0); }
}

/* ❌ BAD: CPU-bound */
@keyframes slide {
    from { top: 0px; }
    to { top: 50px; }
}
```

## 🐛 Debugging Tips

### Common Issues

**Tiles don't move:**
- Check `isMoving` flag
- Verify event listeners attached
- Check console for errors
- Ensure GameState is initialized

**Animations stuttering:**
- Check for too many shadow layers
- Verify GPU acceleration is active
- Reduce animation complexity
- Check browser performance tools

**State not persisting:**
- Verify localStorage keys are correct
- Check for JSON parse errors
- Ensure data is saved after changes
- Test in incognito mode

### Debug Mode
```javascript
// Add to main.js for debugging
if (process.env.NODE_ENV === 'development') {
    window.GameState = GameState;
    window.TileManager = TileManager;
    console.log('Debug mode active');
}
```

## 📚 Code Review Checklist

- [ ] Follows naming conventions
- [ ] No duplicate code
- [ ] Proper error handling
- [ ] Comments where needed
- [ ] No console.logs in production
- [ ] Imports organized correctly
- [ ] No unused variables
- [ ] Proper spacing and indentation
- [ ] CSS is modular
- [ ] No !important in CSS (except overrides)

## 🔄 Version Control

### Commit Message Format
```
type(scope): description

feat(power-ups): add new shuffle power-up
fix(movement): resolve merge duplication bug
docs(readme): update installation instructions
style(css): improve button hover effects
perf(animations): optimize merge animations
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code restructure
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance

## 🎨 CSS Architecture

### Organization
```css
/* 1. Base & Variables */
@import 'base/reset.css';
@import 'base/variables.css';

/* 2. Layout */
@import 'layout/grid.css';
@import 'layout/container.css';

/* 3. Components */
@import 'components/tiles.css';
@import 'components/buttons.css';

/* 4. Features */
@import 'features/powerups.css';

/* 5. Animations */
@import 'animations/merge-animations.css';

/* 6. Responsive (last) */
@import 'layout/responsive.css';
```

### BEM-like Naming (Optional)
```css
/* Block */
.game-container {}

/* Element */
.game-container__grid {}
.game-container__score {}

/* Modifier */
.game-container--mobile {}
.game-container--landscape {}
```

## 🚀 Deployment

### Pre-Deployment Checklist
- [ ] All tests pass
- [ ] No console errors
- [ ] Build succeeds
- [ ] Performance metrics met
- [ ] Cross-browser tested
- [ ] Mobile tested
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Version bumped

### Build Process
```bash
# No build process - pure client-side
# Just ensure all files are committed
git add .
git commit -m "release: v2.3.4"
git push origin main
```

## 📖 Resources

- [MDN Web Docs](https://developer.mozilla.org)
- [ES6 Modules Guide](https://javascript.info/modules)
- [CSS Performance](https://developer.mozilla.org/en-US/docs/Web/Performance/CSS_JavaScript_animation_performance)
- [Web.dev](https://web.dev)

---

**Remember:** Quality over quantity. Clean, maintainable code is better than clever, complex code.
