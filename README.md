# 2048 Neon Game - Cyberpunk Edition

![Version](https://img.shields.io/badge/version-2.3.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-production-brightgreen)

A modern, modular implementation of the classic 2048 game with neon aesthetics, advanced features, and clean architecture.

## 🎮 [Play Now](https://2048-neon.netlify.app/)

## ✨ Features

### Core Gameplay
- **Classic 2048 Mechanics** - Merge tiles to reach 2048 and beyond
- **Neon Aesthetic** - Stunning cyan, magenta, and purple color scheme
- **24 Unique Merge Animations** - Each merge uses a random animation from 24 different effects
- **Responsive Design** - Optimized for desktop and mobile devices
- **Persistent Progress** - Game state saved in localStorage

### Advanced Features
- **👻 Ghost Mode** - Overlay your best game to track progress
- **🔥 Streak System** - Earn bonus points for consecutive merges
- **⚡ Special Cards** - Lightning, Star, and Diamond tiles with unique effects
- **🎯 Milestones** - Bonus points and celebrations for reaching tile values
- **💪 Power-Ups** - Undo, Hint, and Remove tools to help strategize
- **🌐 Multi-Language** - Full Turkish and English support
- **💬 Feedback System** - In-game feedback modal with webhook integration

### Power-Ups
- **Undo (↶)** - 3 uses - Revert your last move
- **Hint (💡)** - 5 uses - Get AI-powered move suggestions
- **Remove (✕)** - 2 uses - Remove any tile from the board

### Special Cards
- **⚡ Lightning** - 5% spawn rate, +50 bonus points
- **🌟 Star** - 3% spawn rate, 2x multiplier, +100 points
- **💎 Diamond** - 4% spawn rate, 5x value bonus

### Streak Rewards
- **3 Streak** - +50 points
- **5 Streak** - +150 points
- **7 Streak** - +300 points
- **10 Streak** - +500 points + Random Power-Up
- **15+ Streak** - +1000 points + Rainbow effects

## 🏗️ Modular Architecture

### Why Modular?

Version 2.3.0 represents a complete architectural overhaul:
- **1,800+ lines** of JavaScript → **16 clean modules**
- **2,000+ lines** of CSS → **13 organized files**
- **Maintainable** - Easy to understand, modify, and extend
- **Testable** - Isolated modules with clear responsibilities
- **Scalable** - Add new features without touching existing code

### JavaScript Structure (16 Modules)

```
src/js/
├── main.js                    # Entry point - initializes everything
├── config/
│   ├── translations.js        # TR/EN translation system
│   └── constants.js           # Game constants (grid, probabilities, etc.)
├── core/
│   ├── GameState.js          # Centralized state management (singleton)
│   ├── TileManager.js        # Tile creation & rendering (singleton)
│   ├── MovementEngine.js     # 4-direction movement logic
│   ├── ScoreManager.js       # Score tracking (singleton)
│   └── GameController.js     # Main game loop (singleton)
├── features/
│   ├── Feedback.js           # Feedback modal with webhook
│   ├── Streaks.js            # Streak tracking (singleton)
│   ├── Milestones.js         # Milestone rewards (singleton)
│   ├── PowerUps.js           # Power-up system (singleton)
│   └── GhostMode.js          # Ghost overlay (singleton)
└── ui/
    ├── Notifications.js      # Toast notifications & alerts
    ├── Menu.js               # Hamburger menu (singleton)
    ├── Modals.js             # Info modal (singleton)
    └── EventHandlers.js      # Keyboard/touch events (singleton)
```

### CSS Structure (13 Files)

```
src/css/
├── main.css                  # Entry point with @import chain
├── base/
│   ├── reset.css            # CSS reset
│   └── variables.css        # CSS custom properties
├── layout/
│   ├── grid.css             # Game grid system
│   ├── container.css        # Container layout
│   └── responsive.css       # Mobile responsive
├── components/
│   ├── tiles.css            # All tile styles
│   ├── buttons.css          # Button styles
│   ├── modals.css           # Modal styles
│   └── feedback.css         # Feedback modal styles
├── features/
│   ├── powerups.css         # Power-up styles
│   └── menu.css             # Hamburger menu
└── animations/
    ├── merge-animations.css # 24 merge animations
    └── effects.css          # Special effects
```

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for ES6 modules)

### Option 1: Live Server (Recommended)

```bash
# Install Live Server globally
npm install -g live-server

# Clone and run
git clone https://github.com/aethrox/2048-neon.git
cd 2048-neon
live-server
```

### Option 2: Python Server

```bash
# Clone the repository
git clone https://github.com/aethrox/2048-neon.git
cd 2048-neon

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Open browser to http://localhost:8000
```

### Option 3: Node.js Server

```bash
# Install http-server
npm install -g http-server

# Run server
http-server -p 8000
```

## 🎯 How to Play

1. **Merge Tiles** - Use arrow keys (desktop) or swipe (mobile) to move tiles
2. **Reach 2048** - Combine tiles with the same value to double them
3. **Strategy** - Plan ahead to create larger tiles and higher scores
4. **Power-Ups** - Use Undo, Hint, and Remove strategically
5. **Ghost Mode** - Compare your current game to your best game
6. **Streaks** - Merge multiple tiles in one move for bonus points

## 📱 Controls

### Desktop
- **Arrow Keys** - Move tiles (↑↓←→)
- **N** - New game
- **G** - Toggle ghost mode
- **U** - Use undo (if available)
- **H** - Use hint (if available)

### Mobile
- **Swipe** - Move tiles in any direction
- **Tap Buttons** - Use power-ups and menu

## 🔧 Development

### Project Structure

```
2048/
├── index.html              # Main HTML (uses ES6 modules)
├── game.js                 # Original monolithic JS (reference)
├── style.css               # Original monolithic CSS (reference)
├── favicon.svg
├── src/                    # Modular source code
│   ├── js/                 # JavaScript modules
│   └── css/                # CSS modules
├── docs/                   # Documentation
│   ├── CHANGELOG.md
│   ├── CORE_MEMORY.md
│   ├── ANIMATIONS.md
│   ├── DEVELOPMENT_RULES.md
│   ├── FEATURE_INTEGRATION.md
│   ├── MODULAR_STRUCTURE.md
│   └── MODULARIZATION_COMPLETE.md
└── assets/
    └── favicon.svg
```

### Adding New Features

1. **Create Module** - Add new file in appropriate directory
2. **Export Functions** - Use ES6 export (default or named)
3. **Import in main.js** - Add to initialization sequence
4. **Update Documentation** - Document in relevant docs files

Example:
```javascript
// src/js/features/NewFeature.js
class NewFeature {
    init() {
        // Initialization logic
    }
}

export default new NewFeature();

// src/js/main.js
import NewFeature from './features/NewFeature.js';

document.addEventListener('DOMContentLoaded', () => {
    NewFeature.init();
    // ... rest of initialization
});
```

### Module Dependencies

The initialization order in `main.js` is critical:

1. **Managers** - TileManager, ScoreManager, GameController
2. **Features** - GhostMode, PowerUps, Streaks, Milestones, Feedback
3. **UI** - Menu, Modals, EventHandlers
4. **Callbacks** - Wire up all interactions
5. **Language** - Set up translation system
6. **Start** - Initialize the game

## 🧪 Testing

### Manual Testing Checklist

- [ ] Tiles appear and move correctly
- [ ] Merging works with animations
- [ ] Score updates accurately
- [ ] Power-ups function correctly
- [ ] Ghost mode toggles properly
- [ ] Menu opens and closes
- [ ] Language switching works
- [ ] Feedback modal appears (both triggers)
- [ ] Special cards spawn and work
- [ ] Streaks track correctly
- [ ] Milestones trigger properly
- [ ] Mobile responsive works
- [ ] localStorage persists data

## 📊 Performance

- **60 FPS** - Smooth animations
- **<100ms** - Language switching
- **<50ms** - Tile movement response
- **Optimized** - CSS animations, no JavaScript animations
- **Lightweight** - ~200KB total (uncompressed)

## 🌐 Browser Support

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Edge | ✅ | ✅ |

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 👤 Author

**Aethrox**
- GitHub: [@aethrox](https://github.com/aethrox)
- Website: [aethrox.com](https://aethrox.com)
- Buy me a coffee: [buymeacoffee.com/aethrox](https://buymeacoffee.com/aethrox)

## 🙏 Acknowledgments

- Original 2048 game by Gabriele Cirulli
- Neon color palette inspiration from cyberpunk aesthetics
- Community feedback and contributions

## 📚 Documentation

- [CHANGELOG.md](docs/CHANGELOG.md) - Version history and updates
- [CORE_MEMORY.md](docs/CORE_MEMORY.md) - Core game mechanics
- [ANIMATIONS.md](docs/ANIMATIONS.md) - Animation system details
- [MODULAR_STRUCTURE.md](docs/MODULAR_STRUCTURE.md) - Architecture guide
- [DEVELOPMENT_RULES.md](docs/DEVELOPMENT_RULES.md) - Development guidelines

## 🐛 Bug Reports

Found a bug? Please report it:
1. Use the in-game feedback system (☰ → Give Feedback)
2. Or create an issue on GitHub

## 🚀 Deployment

### Netlify

```bash
# netlify.toml already configured
netlify deploy --prod
```

### Vercel

```bash
# vercel.json already configured
vercel --prod
```

### GitHub Pages

```bash
# Push to gh-pages branch
git subtree push --prefix . origin gh-pages
```

## 📈 Roadmap

- [ ] Sound effects
- [ ] Theme customization
- [ ] Leaderboard system
- [ ] Achievement badges
- [ ] Additional languages
- [ ] Dark/light mode toggle
- [ ] Custom tile colors
- [ ] Multiplayer mode (?)

## ⭐ Show Your Support

If you enjoy this game, please:
- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- ☕ [Buy me a coffee](https://buymeacoffee.com/aethrox)

---

**Version 2.3.0** - Modular Architecture  
Made with cline, vscode and ⚡ neon lights
