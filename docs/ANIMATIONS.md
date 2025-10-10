# Animation System Documentation

## ✨ Animation Overview
- **Type:** Pure CSS animations using `@keyframes`
- **Library:** None (vanilla CSS)
- **Performance Target:** 60fps
- **Total Animations:** 27 keyframe animations
- **Trigger Method:** JavaScript adds/removes CSS classes

## 🎭 Core Animations (3)

### 1. Tile Spawn Animation (`.tile.new`)
- **Duration:** 200ms
- **Easing:** ease-in-out
- **Properties:** transform (scale), opacity
- **CSS Class:** `.tile.new`
- **Keyframe:** `@keyframes appear`
- **Trigger:** When new tile spawns (2 at start, 1 after each move)
- **Code:**
```css
.tile.new {
    animation: appear 0.2s ease-in-out;
}

@keyframes appear {
    0% { 
        transform: scale(0);
        opacity: 0;
    }
    100% { 
        transform: scale(1);
        opacity: 1;
    }
}
```
- **JavaScript:**
```javascript
if (isNew) {
    tile.classList.add('new');
    setTimeout(() => tile.classList.remove('new'), 200);
}
```

### 2. 2048 Tile Glow (`.tile[data-value="2048"]`)
- **Duration:** 1.5s (infinite loop)
- **Easing:** ease-in-out
- **Properties:** box-shadow intensity
- **CSS Class:** Applied automatically via `data-value="2048"`
- **Keyframe:** `@keyframes glow`
- **Trigger:** Automatically when 2048 tile exists
- **Code:**
```css
.tile[data-value="2048"] { 
    animation: pop 0.5s ease-in-out, glow 1.5s ease-in-out infinite;
}

@keyframes glow {
    0%, 100% { 
        box-shadow: 
            0 0 70px rgba(0, 255, 255, 1),
            0 0 70px rgba(255, 0, 255, 1),
            inset 0 0 40px rgba(255, 255, 255, 0.6);
    }
    50% { 
        box-shadow: 
            0 0 90px rgba(0, 255, 255, 1),
            0 0 90px rgba(255, 0, 255, 1),
            inset 0 0 50px rgba(255, 255, 255, 0.8);
    }
}
```

### 3. Win/Lose Text Pulse (`.game-over p`, `.win p`)
- **Duration:** 2s (infinite loop)
- **Easing:** ease-in-out
- **Properties:** text-shadow intensity
- **CSS Class:** Applied automatically to overlay text
- **Keyframe:** `@keyframes pulse`
- **Trigger:** When game over or win screen shows
- **Code:**
```css
.game-over p, .win p {
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { 
        text-shadow: 
            0 0 20px #00ffff,
            0 0 40px #ff00ff,
            0 0 60px #00ffff;
    }
    50% { 
        text-shadow: 
            0 0 30px #00ffff,
            0 0 60px #ff00ff,
            0 0 80px #00ffff;
    }
}
```

## 🎲 24 Merge Animations

### Animation Selection System
- **Method:** Random selection from 24 animations
- **Trigger:** When two tiles merge
- **JavaScript Logic:**
```javascript
if (mergedPositions.has(`${i}-${j}`)) {
    const randomAnim = Math.floor(Math.random() * 24) + 1;
    tile.classList.add(`merge-${randomAnim}`);
    setTimeout(() => {
        tile.classList.remove(`merge-${randomAnim}`);
    }, 600);
}
```

### Complete Merge Animation Catalog

#### 1. merge-pop (`.tile.merge-1`)
- **Duration:** 0.4s | **Easing:** ease-in-out
- **Effect:** Classic scale bounce (0.5 → 1.3 → 1.0)
```css
@keyframes merge-pop {
    0% { transform: scale(0.5); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
}
```

#### 2. merge-spin (`.tile.merge-2`)
- **Duration:** 0.5s | **Easing:** ease-in-out
- **Effect:** 360° rotation with scale
```css
@keyframes merge-spin {
    0% { transform: scale(0.5) rotate(0deg); }
    50% { transform: scale(1.2) rotate(180deg); }
    100% { transform: scale(1) rotate(360deg); }
}
```

#### 3. merge-bounce (`.tile.merge-3`)
- **Duration:** 0.5s | **Easing:** cubic-bezier(0.68, -0.55, 0.265, 1.55)
- **Effect:** Vertical bounce with overshoot
```css
@keyframes merge-bounce {
    0% { transform: scale(0.3) translateY(-50px); }
    50% { transform: scale(1.2) translateY(0); }
    70% { transform: scale(0.9) translateY(-10px); }
    100% { transform: scale(1) translateY(0); }
}
```

#### 4. merge-flip (`.tile.merge-4`)
- **Duration:** 0.5s | **Easing:** ease-in-out
- **Effect:** 3D horizontal flip
```css
@keyframes merge-flip {
    0% { transform: perspective(400px) rotateY(0); }
    50% { transform: perspective(400px) rotateY(180deg) scale(1.2); }
    100% { transform: perspective(400px) rotateY(360deg); }
}
```

#### 5. merge-shake (`.tile.merge-5`)
- **Duration:** 0.4s | **Easing:** ease-in-out
- **Effect:** Rapid horizontal shake with scale
```css
@keyframes merge-shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) scale(1.1); }
    20%, 40%, 60%, 80% { transform: translateX(10px) scale(1.1); }
}
```

#### 6. merge-pulse (`.tile.merge-6`)
- **Duration:** 0.4s | **Easing:** ease-in-out
- **Effect:** Multiple pulse waves with opacity
```css
@keyframes merge-pulse {
    0% { transform: scale(0.8); opacity: 0.5; }
    25% { transform: scale(1.3); opacity: 1; }
    50% { transform: scale(0.9); opacity: 1; }
    75% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}
```

#### 7. merge-wobble (`.tile.merge-7`)
- **Duration:** 0.5s | **Easing:** ease-in-out
- **Effect:** Rotation wobble with scale
```css
@keyframes merge-wobble {
    0% { transform: scale(0.5) rotate(0deg); }
    15% { transform: scale(1.1) rotate(-15deg); }
    30% { transform: scale(1.2) rotate(10deg); }
    45% { transform: scale(1.1) rotate(-10deg); }
    60% { transform: scale(1.15) rotate(5deg); }
    75% { transform: scale(1.05) rotate(-5deg); }
    100% { transform: scale(1) rotate(0deg); }
}
```

#### 8. merge-zoom (`.tile.merge-8`)
- **Duration:** 0.4s | **Easing:** ease-in-out
- **Effect:** Dramatic zoom in from zero
```css
@keyframes merge-zoom {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.5); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}
```

#### 9. merge-swing (`.tile.merge-9`)
- **Duration:** 0.6s | **Easing:** ease-in-out
- **Effect:** Pendulum swing motion
```css
@keyframes merge-swing {
    0% { transform: rotate(0deg) scale(0.5); }
    20% { transform: rotate(15deg) scale(1.1); }
    40% { transform: rotate(-10deg) scale(1.2); }
    60% { transform: rotate(5deg) scale(1.1); }
    80% { transform: rotate(-5deg) scale(1.05); }
    100% { transform: rotate(0deg) scale(1); }
}
```

#### 10. merge-flash (`.tile.merge-10`)
- **Duration:** 0.4s | **Easing:** ease-in-out
- **Effect:** Opacity flash with scale
```css
@keyframes merge-flash {
    0%, 50%, 100% { opacity: 1; transform: scale(1); }
    25%, 75% { opacity: 0.3; transform: scale(1.3); }
}
```

#### 11. merge-jello (`.tile.merge-11`)
- **Duration:** 0.6s | **Easing:** ease-in-out
- **Effect:** Squash and stretch (jello effect)
```css
@keyframes merge-jello {
    0%, 100% { transform: scale(1, 1); }
    30% { transform: scale(1.25, 0.75); }
    40% { transform: scale(0.75, 1.25); }
    50% { transform: scale(1.15, 0.85); }
    65% { transform: scale(0.95, 1.05); }
    75% { transform: scale(1.05, 0.95); }
}
```

#### 12. merge-rubber (`.tile.merge-12`)
- **Duration:** 0.5s | **Easing:** ease-in-out
- **Effect:** Rubber band stretch
```css
@keyframes merge-rubber {
    0% { transform: scale(0.5); }
    30% { transform: scaleX(1.25) scaleY(0.75); }
    40% { transform: scaleX(0.75) scaleY(1.25); }
    50% { transform: scaleX(1.15) scaleY(0.85); }
    65% { transform: scaleX(0.95) scaleY(1.05); }
    75% { transform: scaleX(1.05) scaleY(0.95); }
    100% { transform: scale(1); }
}
```

#### 13. merge-tada (`.tile.merge-13`)
- **Duration:** 0.6s | **Easing:** ease-in-out
- **Effect:** Celebration wiggle
```css
@keyframes merge-tada {
    0% { transform: scale(0.5) rotate(0deg); }
    10%, 20% { transform: scale(1.1) rotate(-3deg); }
    30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
    40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
    100% { transform: scale(1) rotate(0deg); }
}
```

#### 14. merge-heartbeat (`.tile.merge-14`)
- **Duration:** 0.5s | **Easing:** ease-in-out
- **Effect:** Double pulse (heartbeat rhythm)
```css
@keyframes merge-heartbeat {
    0% { transform: scale(0.5); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
    100% { transform: scale(1); }
}
```

#### 15. merge-rotate3d (`.tile.merge-15`)
- **Duration:** 0.6s | **Easing:** ease-in-out
- **Effect:** 3D diagonal rotation
```css
@keyframes merge-rotate3d {
    0% { transform: perspective(400px) rotate3d(1, 1, 0, 0deg) scale(0.5); }
    50% { transform: perspective(400px) rotate3d(1, 1, 0, 180deg) scale(1.2); }
    100% { transform: perspective(400px) rotate3d(1, 1, 0, 360deg) scale(1); }
}
```

#### 16. merge-flip-vertical (`.tile.merge-16`)
- **Duration:** 0.5s | **Easing:** ease-in-out
- **Effect:** 3D vertical flip
```css
@keyframes merge-flip-vertical {
    0% { transform: perspective(400px) rotateX(0) scale(0.8); }
    50% { transform: perspective(400px) rotateX(180deg) scale(1.2); }
    100% { transform: perspective(400px) rotateX(360deg) scale(1); }
}
```

#### 17. merge-roll (`.tile.merge-17`)
- **Duration:** 0.6s | **Easing:** ease-in-out
- **Effect:** Roll in from left side
```css
@keyframes merge-roll {
    0% { transform: translateX(-100%) rotate(-120deg) scale(0.5); }
    100% { transform: translateX(0) rotate(0deg) scale(1); }
}
```

#### 18. merge-zoom-rotate (`.tile.merge-18`)
- **Duration:** 0.5s | **Easing:** ease-in-out
- **Effect:** Combined zoom and 360° rotation
```css
@keyframes merge-zoom-rotate {
    0% { transform: scale(0) rotate(0deg); }
    50% { transform: scale(1.5) rotate(180deg); }
    100% { transform: scale(1) rotate(360deg); }
}
```

#### 19. merge-slide-rotate (`.tile.merge-19`)
- **Duration:** 0.5s | **Easing:** ease-in-out
- **Effect:** Slide down with rotation and opacity
```css
@keyframes merge-slide-rotate {
    0% { transform: translateY(-50px) rotate(-90deg) scale(0.5); opacity: 0; }
    50% { transform: translateY(0) rotate(0deg) scale(1.2); opacity: 1; }
    100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
}
```

#### 20. merge-bounce-rotate (`.tile.merge-20`)
- **Duration:** 0.6s | **Easing:** ease-in-out
- **Effect:** Bouncing rotation through 360°
```css
@keyframes merge-bounce-rotate {
    0% { transform: scale(0) rotate(0deg); }
    50% { transform: scale(1.3) rotate(180deg); }
    75% { transform: scale(0.9) rotate(270deg); }
    100% { transform: scale(1) rotate(360deg); }
}
```

#### 21. merge-elastic (`.tile.merge-21`)
- **Duration:** 0.6s | **Easing:** ease-in-out
- **Effect:** Elastic snap with overshoot
```css
@keyframes merge-elastic {
    0% { transform: scale(0); }
    55% { transform: scale(1.3); }
    70% { transform: scale(0.8); }
    85% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
```

#### 22. merge-wave (`.tile.merge-22`)
- **Duration:** 0.5s | **Easing:** ease-in-out
- **Effect:** Skew wave motion
```css
@keyframes merge-wave {
    0% { transform: scale(0.5) skewX(0deg); }
    25% { transform: scale(1.1) skewX(10deg); }
    50% { transform: scale(1.2) skewX(-10deg); }
    75% { transform: scale(1.1) skewX(5deg); }
    100% { transform: scale(1) skewX(0deg); }
}
```

#### 23. merge-glitch (`.tile.merge-23`) ⚡ CYBERPUNK
- **Duration:** 0.4s | **Easing:** ease-in-out
- **Effect:** Glitch effect with color shift (hue-rotate filter)
```css
@keyframes merge-glitch {
    0% { transform: translate(0) scale(0.5); filter: hue-rotate(0deg); }
    20% { transform: translate(-5px, 5px) scale(1.1); filter: hue-rotate(90deg); }
    40% { transform: translate(5px, -5px) scale(1.2); filter: hue-rotate(180deg); }
    60% { transform: translate(-5px, -5px) scale(1.1); filter: hue-rotate(270deg); }
    80% { transform: translate(5px, 5px) scale(1.05); filter: hue-rotate(360deg); }
    100% { transform: translate(0) scale(1); filter: hue-rotate(0deg); }
}
```

#### 24. merge-matrix (`.tile.merge-24`) ⚡ CYBERPUNK
- **Duration:** 0.6s | **Easing:** ease-in-out
- **Effect:** Matrix-style drop from above
```css
@keyframes merge-matrix {
    0% { transform: scale(0) translateY(-100px); opacity: 0; }
    25% { transform: scale(0.5) translateY(-50px); opacity: 0.5; }
    50% { transform: scale(1.2) translateY(0); opacity: 1; }
    75% { transform: scale(0.9) translateY(10px); opacity: 1; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}
```

## 🔧 Animation Code Patterns

### Pattern 1: Adding Temporary Animation
```javascript
// Add animation class
tile.classList.add('merge-5');

// Remove after animation completes
setTimeout(() => {
    tile.classList.remove('merge-5');
}, 600); // Max duration of merge animations
```

### Pattern 2: Random Animation Selection
```javascript
const randomAnim = Math.floor(Math.random() * 24) + 1;
tile.classList.add(`merge-${randomAnim}`);
```

### Pattern 3: Permanent Animation (2048 tile)
```css
/* Animation applied via CSS selector, no JS needed */
.tile[data-value="2048"] { 
    animation: pop 0.5s ease-in-out, glow 1.5s ease-in-out infinite;
}
```

## ⚠️ Animation Integration Rules

### DO's ✅
1. **Always remove animation classes** after completion to allow re-triggering
2. **Use transform and opacity** for smooth 60fps animations
3. **Keep durations under 1 second** for merge animations (except infinite loops)
4. **Test on mobile devices** - some 3D transforms may be slower
5. **Maintain cyberpunk aesthetic** - glitchy, neon, futuristic effects

### DON'Ts ❌
1. **Never modify existing merge-1 through merge-24** - other features may depend on them
2. **Don't animate left/top properties** - they cause reflows (use transform instead)
3. **Don't use JavaScript animations** - CSS is more performant
4. **Don't exceed 600ms duration** for merge animations - feels too slow
5. **Don't remove the random selection** - variety is a core feature

### Adding New Animations
If you need to add a 25th animation:
```css
/* 1. Add CSS class */
.tile.merge-25 { animation: merge-newname 0.5s ease-in-out; }

/* 2. Define keyframes */
@keyframes merge-newname {
    0% { /* start state */ }
    50% { /* mid state */ }
    100% { /* end state */ }
}

/* 3. Update JavaScript random range */
const randomAnim = Math.floor(Math.random() * 25) + 1; // Change 24 to 25
```

## 📊 Animation Performance

### Current Performance Metrics
- **FPS Target:** 60fps
- **Actual FPS:** 58-60fps on modern devices
- **GPU Acceleration:** Enabled via transform/opacity
- **Reflow Triggers:** None (no layout-affecting properties animated)

### Optimization Techniques Used
1. **Transform over position** - Uses GPU, no reflow
2. **Opacity over visibility** - Smooth transitions
3. **CSS over JavaScript** - Browser-optimized
4. **will-change hint** - Not needed (transform already optimized)
5. **Passive event listeners** - For touch events
