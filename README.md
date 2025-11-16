# 2048 Neon Game - Cyberpunk Edition

<div align="center">
  <img src="favicon.svg" alt="2048 Neon Game Icon" width="120" height="120">
  <br><br>
</div>

![Version](https://img.shields.io/badge/version-2.4.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-production-brightgreen)

A modern, modular implementation of the classic 2048 game with neon aesthetics, cyberpunk visuals, advanced features, and clean architecture.

## 🎮 [Play Now](https://2048-neon.netlify.app/)

## ✨ Features

### Core Gameplay
- **Classic 2048 Mechanics** - Merge tiles to reach 2048 and beyond
- **Cyberpunk Visual Theme** - Dark scanned grid background with neon aesthetics
- **Neon Title Animation** - Flashing title effect mimicking real neon signs
- **24 Unique Merge Animations** - Random animation effects for each merge
- **Responsive Design** - Optimized for desktop and mobile devices
- **Persistent Progress** - Game state saved in localStorage

### Advanced Features
- **👻 Ghost Mode** - Overlay your best game to track progress
- **🔥 Streak System** - Bonus points for consecutive merges (3, 5, 7, 10, 15+ streaks)
- **⚡ Special Cards** - Lightning, Star, and Diamond tiles with unique effects
- **🎯 Milestones** - Bonus points and celebrations for reaching tile values
- **💪 Power-Ups** - Undo (3 uses), Hint (5 uses), Remove (2 uses)
- **🌐 Multi-Language** - Full Turkish and English support with first-visit selection
- **💬 Feedback System** - In-game feedback modal with webhook integration

## 🏗️ Modular Architecture

**Version 2.4.1+** - Modular structure now **active by default**:
- **1,800+ lines** of JavaScript → **16 clean ES6 modules**
- **2,000+ lines** of CSS → **14 organized files**
- **Maintainable, Testable, Scalable** - Easy to understand and extend
- **Modern Standards** - ES6 imports/exports with full module support

### JavaScript Structure (16 Modules)

```
src/js/
├── main.js                    # Entry point
├── config/                    # Configuration
│   ├── translations.js        # TR/EN translations
│   └── constants.js           # Game constants
├── core/                      # Core game logic
│   ├── GameState.js          # State management
│   ├── TileManager.js        # Tile creation & rendering
│   ├── MovementEngine.js     # Movement logic
│   ├── ScoreManager.js       # Score tracking
│   └── GameController.js     # Main game loop
├── features/                  # Game features
│   ├── Feedback.js           # Feedback system
│   ├── Streaks.js            # Streak tracking
│   ├── Milestones.js         # Milestone rewards
│   ├── PowerUps.js           # Power-up system
│   └── GhostMode.js          # Ghost overlay
└── ui/                        # User interface
    ├── Notifications.js      # Notifications
    ├── Menu.js               # Hamburger menu
    ├── Modals.js             # Info & language modals
    └── EventHandlers.js      # Input events
```

### CSS Structure (14 Files)

```
src/css/
├── main.css                  # Entry point
├── animations.css            # Title flash & grid background
├── base/                     # Reset & variables
├── layout/                   # Grid & container
├── components/               # Tiles, buttons, modals
├── features/                 # Power-ups, menu
└── animations/               # 24 merge animations
```

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- **Local web server required** (ES6 modules)

### Running Locally

```bash
# Clone repository
git clone https://github.com/aethrox/2048-neon.git
cd 2048-neon

# Option 1: Live Server (recommended)
npm install -g live-server
live-server

# Option 2: Python
python -m http.server 8000

# Option 3: Node.js
npm install -g http-server
http-server -p 8000
```

## 📱 Controls

### Desktop
- **Arrow Keys** - Move tiles
- **N** - New game
- **G** - Toggle ghost mode
- **Menu (☰)** - Access all features

### Mobile
- **Swipe** - Move tiles
- **Tap** - Use buttons and menu

## 🔧 Development

### Adding New Features

1. Create module in appropriate directory
2. Export using ES6 syntax
3. Import in `main.js`
4. Update documentation

Example:
```javascript
// src/js/features/NewFeature.js
class NewFeature {
    init() { /* logic */ }
}
export default new NewFeature();

// src/js/main.js
import NewFeature from './features/NewFeature.js';
NewFeature.init();
```

### Module Dependencies

Initialization order in `main.js`:
1. Managers (TileManager, ScoreManager, GameController)
2. Features (GhostMode, PowerUps, Streaks, Milestones)
3. UI (Menu, Modals, EventHandlers)
4. Language setup
5. Game start

## 📊 Performance

- **60 FPS** animations
- **<100ms** language switching
- **<50ms** tile movement response
- **~200KB** total size (uncompressed)
- **GPU-accelerated** CSS animations
- **Lightweight background effects** - No performance impact

## 🌐 Browser Support

✅ Chrome, Firefox, Safari, Edge (Desktop & Mobile)

## 📝 License

MIT License - see [LICENSE](LICENSE) file

## 👤 Author

**Aethrox**
- GitHub: [@aethrox](https://github.com/aethrox)
- Website: [aethrox.com](https://aethrox.me)
- Support: [buymeacoffee.com](buymeacoffee.com/kaan.demirel)

## 📚 Documentation

- [CHANGELOG.md](docs/CHANGELOG.md) - Version history
- [CORE_MEMORY.md](docs/CORE_MEMORY.md) - Core mechanics
- [ANIMATIONS.md](docs/ANIMATIONS.md) - Animation system
- [MODULAR_STRUCTURE.md](docs/MODULAR_STRUCTURE.md) - Architecture
- [DEVELOPMENT_RULES.md](docs/DEVELOPMENT_RULES.md) - Guidelines

## 🐛 Bug Reports

- Use in-game feedback (☰ → Give Feedback)
- Or create a GitHub issue

## 🚀 Deployment

```bash
# Netlify (netlify.toml configured)
netlify deploy --prod

# Vercel (vercel.json configured)
vercel --prod
```

## 📈 Roadmap

- [ ] Sound effects
- [ ] Theme customization
- [ ] Leaderboard system
- [ ] Achievement badges
- [ ] Additional languages

## ⭐ Show Your Support

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- ☕ [Buy me a coffee](buymeacoffee.com/kaan.demirel)

---

**Version 2.4.1** - Modular Structure Active  
Made with ⚡ neon lights, 🌌 cyberpunk aesthetics, and 🏗️ modern architecture
