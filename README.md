# 🎮 2048 Neon - Cyberpunk Edition

<div align="center">

**A stunning cyberpunk-themed 2048 game with advanced features and beautiful neon aesthetics**

![Version](https://img.shields.io/badge/version-2.1.0-blue)
![Status](https://img.shields.io/badge/status-production%20ready-green)
![Languages](https://img.shields.io/badge/languages-TR%20%7C%20EN-orange)
![License](https://img.shields.io/badge/license-MIT-purple)

[Play Now](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [Support](#-support)

---

</div>

## ✨ Features

### 🎮 Core Gameplay
- **Classic 2048 mechanics** with modern enhancements
- **24 unique merge animations** for smooth gameplay
- **Auto-save progress** using localStorage
- **Fully responsive design** for desktop and mobile
- **Keyboard controls** (Arrow keys) and **touch controls** (Swipe)

### 🚀 Advanced Features

| Feature | Description |
|---------|-------------|
| 👻 **Ghost Mode** | Overlay your best game to compare and improve performance |
| 🔥 **Streak System** | Build consecutive merge streaks for bonus points and rewards |
| ⚡ **Special Cards** | Lightning (chain reaction), Star (2x multiplier), Diamond (5x points) |
| 🎯 **Milestones** | Earn bonus points at 128, 256, 512, 1024, 2048, 4096, 8192 |
| 💪 **Power-Ups** | Undo moves, get hints, or remove tiles strategically |
| 🌐 **Multi-Language** | Full Turkish (TR) and English (EN) support with instant switching |
| 💡 **Info Modal** | Complete in-game guide with tips and strategies |

### 🎨 Visual Design
- **Cyberpunk neon aesthetic** with cyan, magenta, and purple colors
- **Smooth 60fps animations** powered by GPU-accelerated CSS
- **Dynamic glow effects** and scanline overlays
- **Confetti celebrations** for major achievements
- **Modern UI** with clean typography and intuitive layout

## 🎮 How to Play

1. **Move tiles** using arrow keys (or swipe on mobile)
2. **Merge tiles** with the same number
3. **Reach 2048** to win (but you can continue!)
4. **Build streaks** for bonus points
5. **Use power-ups** strategically when stuck

### Option 1: Play Directly
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Click **"NEW GAME"** to start playing
4. Use arrow keys (or swipe on mobile) to move tiles

### Option 2: Run with Web Server (for modular version)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code
# Install "Live Server" extension and click "Go Live"
```

Then open `http://localhost:8000` in your browser.

## 💪 Power-Ups

| Power-Up | Icon | Uses | Description |
|----------|------|------|-------------|
| **Undo** | ↶ | 3 | Revert your last move |
| **Hint** | 💡 | 5 | Show the best move direction |
| **Remove** | ✕ | 2 | Remove any tile from the board |

**Earn More:**
- Every 1000 points: +1 Hint
- At 2500 points: +1 Undo
- At 5000 points: +1 Remove
- 10 Streak: Random power-up

## ⚡ Special Cards

| Card | Spawn Rate | Effect |
|------|------------|--------|
| **⚡ Lightning** | 5% | Chain reaction, +50 bonus points |
| **🌟 Star** | 3% | 2x multiplier, +100 bonus points |
| **💎 Diamond** | 4% | 5x points multiplier |

**Rules:**
- Max 2 special cards on board
- No spawns in first 5 moves
- No spawns when board >75% full

## 🔥 Streak Rewards

| Streak | Reward |
|--------|--------|
| 3 merges | +50 points |
| 5 merges | +150 points |
| 7 merges | +300 points |
| 10 merges | +500 points + Random Power-Up |
| 15+ merges | +1000 points + Rainbow effects |

## 🎯 Milestones

| Tile | Bonus Points | Special Effect |
|------|--------------|----------------|
| 128 | +100 | Good Start! 🎯 |
| 256 | +200 | Nice Progress! ⭐ |
| 512 | +500 | Halfway There! 🚀 |
| 1024 | +1000 | Almost There! 💫 + Confetti |
| 2048 | +5000 | YOU WIN! 🎉 + Confetti |
| 4096 | +10000 | UNSTOPPABLE! 👑 + Confetti |
| 8192 | +20000 | LEGENDARY! 🌟 + Confetti |

## 🌐 Language Support

Switch between Turkish and English instantly:
- Click the 🌐 button in the top-right corner
- All UI elements update immediately
- Language preference is saved automatically

**Supported Languages:**
- 🇹🇷 Turkish (Türkçe)
- 🇺🇸 English

## 🎨 UI Layout

```
🌐 TR/EN (top-right)          💡 Info (bottom-left)

        2048 (title)
        
Merge the neon blocks to reach 2048!

[New Game] [👻 Ghost Mode]

┌─────────────┬─────────────┐
│             │   SCORE     │
│             │   BEST      │
│  Game Grid  │             │
│   (4x4)     │   [UNDO]    │
│             │   [HINT]    │
│             │   [REMOVE]  │
└─────────────┴─────────────┘

HOW TO PLAY: Use your arrow keys...
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ↑ ↓ ← → | Move tiles |
| G | Toggle Ghost Mode |

## 📱 Mobile Support

- ✅ Responsive design
- ✅ Touch controls (swipe)
- ✅ Optimized layout
- ✅ Readable fonts
- ✅ Touch-friendly buttons

## 🛠️ Technical Details

### Technologies
- **HTML5** - Semantic structure
- **CSS3** - Animations & styling
- **JavaScript (ES6+)** - Game logic
- **localStorage** - Data persistence

### Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

### Performance
- 60fps animations
- <100ms language switching
- <1s initial load
- GPU-accelerated CSS

## 📁 File Structure

```
2048/
├── assets/                         # Static assets
│   └── favicon.svg                # Game icon
├── src/                           # Source code (modular)
│   ├── css/                       # Modular CSS
│   │   ├── base/
│   │   ├── layout/
│   │   ├── components/
│   │   └── main.css
│   └── js/                        # Modular JavaScript
│       ├── config/
│       ├── utils/
│       ├── core/
│       └── main.js
├── docs/                          # Documentation
│   ├── ANIMATIONS.md             # Animation guide
│   ├── CHANGELOG.md              # Update history
│   ├── CORE_MEMORY.md            # Core documentation
│   ├── DEVELOPMENT_RULES.md      # Development patterns
│   ├── FEATURE_INTEGRATION.md    # Feature integration
│   ├── FOLDER_STRUCTURE.md       # Modular structure
│   ├── GAME_REVIEW.md            # Complete review
│   ├── MODULAR_STRUCTURE.md      # Modular guide
│   └── MODULARIZATION_SUMMARY.md # Modularization summary
├── index.html                     # Main HTML (legacy)
├── index-modular.html            # Modular HTML (new)
├── style.css                      # Legacy CSS
├── game.js                        # Legacy JS
├── favicon.svg                    # Icon (legacy location)
└── README.md                      # This file
```

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

| Document | Description |
|----------|-------------|
| **[CORE_MEMORY.md](docs/CORE_MEMORY.md)** | Essential project information and architecture |
| **[ANIMATIONS.md](docs/ANIMATIONS.md)** | Complete animation system guide |
| **[DEVELOPMENT_RULES.md](docs/DEVELOPMENT_RULES.md)** | Coding patterns and best practices |
| **[FEATURE_INTEGRATION.md](docs/FEATURE_INTEGRATION.md)** | How to add new features |
| **[FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md)** | Modular directory structure |
| **[GAME_REVIEW.md](docs/GAME_REVIEW.md)** | Complete code review and verification |
| **[MODULAR_STRUCTURE.md](docs/MODULAR_STRUCTURE.md)** | Modular code organization guide |
| **[MODULARIZATION_SUMMARY.md](docs/MODULARIZATION_SUMMARY.md)** | Modularization details and progress |
| **[CHANGELOG.md](docs/CHANGELOG.md)** | Version history and updates |

## 🎯 Technical Details

### Statistics
- **Lines of Code:** ~3,500
- **JavaScript Modules:** 6 (modular architecture)
- **CSS Modules:** 4 (modular architecture)
- **Features:** 7 major systems
- **Animations:** 24 unique merge animations
- **Languages:** 2 (Turkish & English)
- **Power-Ups:** 3 types
- **Special Cards:** 3 types
- **Milestones:** 7 achievement levels

### Technologies
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Architecture:** Modular ES6 modules with class-based design
- **Storage:** localStorage for persistence
- **Fonts:** Orbitron (Google Fonts)
- **Performance:** 60fps animations, GPU-accelerated CSS
- **Browser Support:** All modern browsers (Chrome, Firefox, Safari, Edge)

## 🔮 Roadmap

### Planned Features
- [ ] 🔊 Sound effects and audio feedback
- [ ] 🎵 Background music with volume control
- [ ] 🌍 Additional language support (ES, DE, FR, etc.)
- [ ] 🎨 Theme customization (color schemes)
- [ ] 🏆 Online leaderboard system
- [ ] 🏅 Achievement badges and unlockables
- [ ] 📊 Detailed statistics dashboard
- [ ] 💾 Cloud save synchronization
- [ ] 🎮 Game mode variations

## 💖 Support

If you enjoy this game and want to support its development:

<div align="center">

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/aethrox)

**[☕ Buy me a coffee](https://buymeacoffee.com/aethrox)**

Your support helps maintain and improve this project!

</div>

### Other Ways to Support
- ⭐ **Star this repository** on GitHub
- 🐛 **Report bugs** and suggest features
- 🔀 **Contribute** code improvements
- 📢 **Share** the game with friends
- 📝 **Write** about your experience

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

Please read our [DEVELOPMENT_RULES.md](docs/DEVELOPMENT_RULES.md) before contributing.

## 📝 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2025 2048 Neon Game

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 🙏 Credits & Acknowledgments

- **Original 2048 Game:** Created by [Gabriele Cirulli](https://github.com/gabrielecirulli/2048)
- **Design Inspiration:** Cyberpunk and neon aesthetics
- **Typography:** [Orbitron](https://fonts.google.com/specimen/Orbitron) by Google Fonts
- **Icons:** Unicode emoji characters
- **Community:** Thanks to all contributors and players!

## 📞 Contact & Support

### Need Help?
1. 💡 Check the **in-game Info modal** (click the lightbulb icon)
2. 📖 Read the **[documentation](docs/)** in the `/docs` folder
3. 🐛 Check the **browser console** for error messages
4. 💬 Open an **issue** on GitHub

### Connect
- 🌐 **Website:** [Your Website](https://aethrox.me)
- 📧 **Email:** kaand3mirel@gmail.com
- 🐦 **Twitter:** [@kaandemirel](https://x.com/_kaandemirel_)
- 💼 **LinkedIn:** [Your Profile](https://linkedin.com/in/kaan-demirel)

---

<div align="center">

**Version:** 2.1.0 (Modular Architecture)  
**Status:** ✅ Production Ready  
**Last Updated:** October 10, 2025

Made with 💜 and ⚡ by passionate developers

**[⬆ Back to Top](#-2048-neon---cyberpunk-edition)**

</div>
