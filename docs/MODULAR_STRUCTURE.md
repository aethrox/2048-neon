# 2048 Neon Game - Modular Structure Guide

## 📁 File Organization

The codebase has been reorganized into clear, modular sections for easy maintenance and future development.

---

## 📄 JavaScript (game.js) - Modular Structure

### File Header
```javascript
// ============================================================================
// 2048 NEON GAME - MODULAR JAVASCRIPT
// ============================================================================
```

### Section Overview

#### **Section 1: DOM Elements & Constants**
- Core game elements (grid, score displays)
- Button elements (new game, try again, etc.)
- Screen elements (game over, win screens)
- Feature buttons (ghost mode, info, language)
- Power-up elements (undo, hint, remove)

#### **Section 2: Translation System**
- `translations` object (TR/EN)
- `currentLanguage` variable
- `t()` translation function
- `updateAllTexts()` function
- `toggleLanguage()` function

#### **Section 3: Game State Variables**
- Core game state (`board`, `score`, `bestScore`)
- Special tiles tracking
- Ghost system state
- Power-ups state
- Streak & milestone tracking
- Move history for undo

#### **Section 4: Core Game Functions**
- `initGame()` - Initialize/reset game
- `addRandomTile()` - Spawn new tiles
- `createTile()` - Create tile DOM elements
- `updateGrid()` - Render board state
- `checkGameOver()` - Check win/lose conditions

#### **Section 5: Movement & Merge Logic**
- `moveTiles(direction)` - Main movement function
- `moveUp()`, `moveDown()`, `moveLeft()`, `moveRight()`
- Merge logic for combining tiles
- Animation handling
- Score calculation

#### **Section 6: Special Features**
**6.1 Ghost Mode:**
- `toggleGhostMode()` - Enable/disable ghost overlay
- `saveGhostData()` - Save best game
- `displayGhostTiles()` - Render ghost tiles

**6.2 Power-Ups System:**
- `usePowerUpUndo()` - Undo last move
- `usePowerUpHint()` - Show best move
- `usePowerUpRemove()` - Remove tile
- `updatePowerUpDisplay()` - Update UI
- `checkPowerUpRewards()` - Award power-ups

**6.3 Special Cards:**
- Lightning card logic
- Star card logic
- Diamond card logic
- Spawn rate management

#### **Section 7: Streak & Milestone System**
- `checkStreakRewards()` - Award streak bonuses
- `updateStreakDisplay()` - Update streak UI
- `checkMilestones()` - Check tile milestones
- Bonus point calculation

#### **Section 8: UI & Notification Functions**
- `showNotification()` - Power-up notifications
- `showMilestoneNotification()` - Achievement banners
- `showConfetti()` - Celebration effects
- `showSpecialEffect()` - Special card effects

#### **Section 9: Event Listeners**
**9.1 Keyboard Controls:**
- Arrow keys for movement
- G key for ghost mode

**9.2 Button Event Listeners:**
- New game buttons
- Ghost mode toggle
- Info modal
- Language toggle
- Power-up buttons

**9.3 Touch Controls:**
- Swipe gestures for mobile

---

## 🎨 CSS (style.css) - Modular Structure

### File Header
```css
/* ============================================================================
   2048 NEON GAME - MODULAR CSS
   ============================================================================ */
```

### Section Overview

#### **Section 1: Base Styles & Reset**
- Universal reset (`*`)
- Body styles
- Background gradients
- Scanline effects

#### **Section 2: Layout & Container**
- `.container` - Main wrapper
- `.header` - Top section
- `.game-layout` - Grid + sidebar layout
- `.sidebar` - Right panel

#### **Section 3: Typography & Headings**
- `h1` - Main title
- Font sizes and weights
- Text shadows and effects
- Letter spacing

#### **Section 4: Buttons & Controls**
- `button` - Base button styles
- Hover effects
- Active states
- Disabled states

#### **Section 5: Game Grid & Tiles**
- `.game-container` - Grid wrapper
- `.grid` - 4x4 grid layout
- `.tile` - Individual tiles
- Tile colors by value
- Tile animations

#### **Section 6: Score Display**
- `.score-box` - Score containers
- `.score-title` - Labels
- Score number styling
- Glow effects

#### **Section 7: Language Toggle**
- `.language-toggle-button` - Main button
- `.language-icon` - Globe icon
- `.language-text` - TR/EN text
- Hover effects

#### **Section 8: Info Modal**
- `.info-btn-corner` - Info button
- `.info-modal` - Modal overlay
- `.info-modal-content` - Content box
- `.info-close` - Close button
- `.info-section` - Content sections
- Custom scrollbar

#### **Section 9: Ghost Mode**
- `.ghost-toggle` - Toggle button
- `.ghost-tile` - Ghost tile overlay
- Opacity and blur effects
- Dashed borders

#### **Section 10: Power-Ups System**
- `.powerup-bar` - Container
- `.powerup-btn` - Individual buttons
- `.powerup-icon` - Icons
- `.powerup-name` - Labels
- `.powerup-count` - Count badges
- Disabled states

#### **Section 11: Special Cards**
- `.hint-arrow` - Hint direction indicator
- Lightning card styles
- Star card styles
- Diamond card styles
- Glow effects

#### **Section 12: Streak & Milestones**
- `.streak-display` - Streak counter
- `.milestone-notification` - Achievement banners
- Streak level colors
- Pulse animations

#### **Section 13: Notifications**
- Confetti animation
- Notification positioning
- Slide-in effects
- Fade-out animations

#### **Section 14: Animations**
- `@keyframes` definitions
- Tile merge animations (24 types)
- Spawn animations
- Pulse effects
- Slide effects

#### **Section 15: Mobile Responsive**
- `@media (max-width: 768px)`
- Touch-friendly sizes
- Stacked layout
- Reduced font sizes
- Optimized spacing

---

## 🔧 How to Modify

### Adding a New Feature

1. **JavaScript:**
   - Add state variables to Section 3
   - Create functions in appropriate section (4-8)
   - Add event listeners to Section 9
   - Update translation strings in Section 2

2. **CSS:**
   - Add styles to appropriate section (1-14)
   - Add mobile styles to Section 15
   - Follow existing naming conventions

### Modifying Existing Features

1. **Find the section** using the header comments
2. **Locate the specific function/style** within that section
3. **Make changes** while maintaining structure
4. **Test** on both desktop and mobile

### Best Practices

✅ **DO:**
- Keep related code in the same section
- Add comments for complex logic
- Follow existing naming patterns
- Test mobile responsiveness
- Update documentation

❌ **DON'T:**
- Mix unrelated code in sections
- Remove section headers
- Break existing patterns
- Forget mobile styles
- Skip testing

---

## 📊 Code Statistics

### JavaScript
- **Total Lines:** ~1,570
- **Sections:** 9 major sections
- **Functions:** ~40 functions
- **Event Listeners:** 14 listeners

### CSS
- **Total Lines:** ~1,750
- **Sections:** 15 major sections
- **Selectors:** ~200 selectors
- **Animations:** 24 keyframes

---

## 🎯 Quick Reference

### Common Tasks

**Add a new button:**
1. HTML: Add button element
2. JS Section 1: Get DOM reference
3. JS Section 9.2: Add event listener
4. CSS Section 4: Add button styles

**Add a new notification:**
1. JS Section 8: Create show function
2. CSS Section 13: Add notification styles
3. CSS Section 15: Add mobile styles

**Add a new power-up:**
1. JS Section 3: Add to powerUps object
2. JS Section 6.2: Create use function
3. CSS Section 10: Add button styles
4. HTML: Add button element

**Add a new language:**
1. JS Section 2: Add to translations object
2. Update all translation keys
3. Test all UI elements

**Add a new animation:**
1. CSS Section 14: Add @keyframes
2. CSS Section 5: Apply to tiles
3. JS Section 5: Trigger animation

---

## 📝 Maintenance Checklist

When making changes:

- [ ] Located correct section
- [ ] Followed existing patterns
- [ ] Added comments if complex
- [ ] Updated translations (if UI change)
- [ ] Added mobile styles
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Checked browser console
- [ ] Verified animations work
- [ ] Updated documentation

---

## 🚀 Future Improvements

The modular structure makes these additions easier:

1. **Sound System** - Add Section 10 in JS
2. **Theme Customization** - Extend CSS sections
3. **More Languages** - Expand Section 2
4. **Online Leaderboard** - Add Section 11 in JS
5. **Achievement System** - Extend Section 7

---

**Last Updated:** 2025-10-10  
**Structure Version:** 2.0  
**Status:** ✅ Production Ready
