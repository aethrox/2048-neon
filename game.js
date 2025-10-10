// ============================================================================
// 2048 NEON GAME - MODULAR JAVASCRIPT
// ============================================================================
// File Structure:
// 1. DOM Elements & Constants
// 2. Translation System
// 3. Game State Variables
// 4. Core Game Functions
// 5. Movement & Merge Logic
// 6. Special Features (Ghost, Power-ups, Special Cards)
// 7. Streak & Milestone System
// 8. UI & Notification Functions
// 9. Event Listeners
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================================================
    // SECTION 1: DOM ELEMENTS & CONSTANTS
    // ========================================================================
    
    // Core Game Elements
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const bestScoreDisplay = document.getElementById('best-score');
    
    // Button Elements
    const tryAgainBtn = document.getElementById('try-again');
    const keepGoingBtn = document.getElementById('keep-going');
    const newGameBtn2 = document.getElementById('new-game-2');
    
    // Screen Elements
    const gameOverScreen = document.querySelector('.game-over');
    const winScreen = document.querySelector('.win');
    const streakDisplay = document.getElementById('streak-display');
    const streakCount = document.querySelector('.streak-count');
    
    // Feature Buttons
    const infoModal = document.getElementById('info-modal');
    const infoClose = document.querySelector('.info-close');
    
    // Power-up Elements
    const undoBtn = document.getElementById('undo-btn');
    const hintBtn = document.getElementById('hint-btn');
    const removeBtn = document.getElementById('remove-btn');
    const undoCountDisplay = document.getElementById('undo-count');
    const hintCountDisplay = document.getElementById('hint-count');
    const removeCountDisplay = document.getElementById('remove-count');
    
    // Feedback Modal Elements
    const feedbackModal = document.getElementById('feedback-modal');
    const feedbackClose = document.querySelector('.feedback-close');
    const stars = document.querySelectorAll('.star');
    const feedbackComment = document.getElementById('feedback-comment');
    const charCount = document.getElementById('char-count');
    const submitFeedbackBtn = document.getElementById('submit-feedback-btn');
    const skipFeedbackBtn = document.getElementById('skip-feedback-btn');
    const dontShowCheckbox = document.getElementById('dont-show-again');
    const feedbackBtnMenu = document.getElementById('feedback-btn-menu');
    
    // ========================================================================
    // SECTION 2: TRANSLATION SYSTEM
    // ========================================================================
    const translations = {
        tr: {
            title: "Neon blokları birleştirerek <strong>2048'e ulaş!</strong>",
            score: "SKOR",
            best: "EN İYİ",
            newGame: "YENİ OYUN",
            ghostMode: "👻 HAYALET MOD",
            undo: "GERİ AL",
            hint: "İPUCU",
            remove: "SİL",
            gameOver: "SİSTEM HATASI",
            youWin: "ZAFER!",
            tryAgain: "Yeniden Dene",
            keepGoing: "Devam Et",
            restart: "Yeniden Başlat",
            enhancements: "GÜÇLENDİRMELER",
            menuTitle: "MENÜ",
            settings: "AYARLAR",
            howToPlay: "Nasıl Oynanır",
            language: "Dil",
            buyMeCoffee: "Bana Kahve Al",
            goodStart: "İyi Başlangıç! 🎯",
            niceProgress: "Güzel İlerleme! ⭐",
            halfwayThere: "Yarı Yoldasın! 🚀",
            almostThere: "Neredeyse Tamam! 💫",
            youWinMsg: "KAZANDIN! 🎉",
            unstoppable: "DURDURULAMAZ! 👑",
            legendary: "EFSANEVİ! 🌟",
            comboStreak: "KOMBO SIRA! 🔥",
            onFire: "ATEŞ GİBİSİN! 🔥🔥",
            unstoppableStreak: "DURDURULAMAZ! 🔥🔥🔥",
            legendaryStreak: "EFSANEVİ! ⚡",
            languageChanged: "🌐 Dil: Türkçe",
            // Info Modal
            infoTitle: "🎮 2048 NEON OYUN",
            howToPlayTitle: "📖 Nasıl Oynanır",
            howToPlayText: "<strong>Ok tuşlarınızı</strong> (veya mobilde kaydırma) kullanarak kartları hareket ettirin. Aynı sayıya sahip iki kart birleştiğinde, tek kart olurlar! Amacınız <strong>2048</strong> sayısına sahip bir kart oluşturmaktır.",
            featuresTitle: "✨ Özellikler",
            feature1: "<strong>👻 Hayalet Modu:</strong> En iyi oyununuzu görerek karşılaştırın ve geliştirin",
            feature2: "<strong>🔥 Sıra Sistemi:</strong> Ardışık birleştirmeler için bonus puanlar ve ödüller kazanın",
            feature3: "<strong>⚡ Özel Kartlar:</strong> Şimşek (zincirleme), Yıldız (2x çarpan), Elmas (5x puan)",
            feature4: "<strong>🎯 Kilometre Taşları:</strong> 128, 256, 512, 1024, 2048+ değerlerine ulaşarak bonus puanlar kazanın",
            feature5: "<strong>💪 Güçlendirmeler:</strong> Hamleleri geri alın, ipucu alın veya kartları stratejik olarak silin",
            rewardsTitle: "🎁 Ödüller",
            reward1: "<strong>3 Sıra:</strong> +50 puan",
            reward2: "<strong>5 Sıra:</strong> +150 puan",
            reward3: "<strong>7 Sıra:</strong> +300 puan",
            reward4: "<strong>10 Sıra:</strong> +500 puan + Rastgele Güçlendirme",
            reward5: "<strong>15+ Sıra:</strong> +1000 puan + Gökkuşağı efektleri",
            controlsTitle: "🎮 Kontroller",
            control1: "<strong>Ok Tuşları:</strong> Kartları hareket ettir",
            control2: "<strong>G Tuşu:</strong> Hayalet Modunu aç/kapat",
            control3: "<strong>Kaydırma:</strong> Mobilde kartları hareket ettir",
            tipsTitle: "💡 İpuçları",
            tip1: "En yüksek kartınızı bir köşede tutun",
            tip2: "Kartları belirli bir yönde oluşturun",
            tip3: "Sıkıştığınızda güçlendirmeleri stratejik kullanın",
            tip4: "Maksimum puan için sıraları koruyun",
            tip5: "Özel kartlar 5. hamlede ve tahta %75'ten az doluyken görünür",
            infoFooter: "İyi şanslar ve iyi eğlenceler! 🎉",
            howToPlayLabel: "NASIL OYNANIR:",
            howToPlayInstruction: "<strong>Ok tuşlarınızı</strong> kullanarak kartları hareket ettirin. Aynı sayıdaki iki kart birleştiğinde, <strong>tek kart olurlar!</strong>",
            // Feedback Modal
            feedbackSection: "GERİ BİLDİRİM",
            giveFeedback: "Geri Bildirim Ver",
            feedbackTitle: "💬 Görüşlerinizi Bekliyoruz!",
            feedbackQuestion: "Deneyiminizi nasıl değerlendirirsiniz?",
            feedbackCommentLabel: "Daha fazlasını söyleyin (isteğe bağlı):",
            feedbackPlaceholder: "Oyun hakkındaki düşüncelerinizi paylaşın...",
            submitFeedback: "Geri Bildirim Gönder",
            skipFeedback: "Belki Sonra",
            dontShowAgain: "Bunu tekrar gösterme",
            feedbackThankYou: "Teşekkürler! Geri bildiriminiz gönderildi. 🎉",
            feedbackError: "Geri bildirim gönderilemedi. Lütfen tekrar deneyin."
        },
        en: {
            title: "Merge the <strong>neon blocks</strong> to reach <strong>2048!</strong>",
            score: "SCORE",
            best: "BEST",
            newGame: "NEW GAME",
            ghostMode: "👻 GHOST MODE",
            undo: "UNDO",
            hint: "HINT",
            remove: "REMOVE",
            gameOver: "SYSTEM FAILURE",
            youWin: "VICTORY!",
            tryAgain: "Reboot",
            keepGoing: "Continue",
            restart: "Restart",
            enhancements: "ENHANCEMENTS",
            menuTitle: "MENU",
            settings: "SETTINGS",
            howToPlay: "How to Play",
            language: "Language",
            buyMeCoffee: "Buy Me a Coffee",
            goodStart: "Good Start! 🎯",
            niceProgress: "Nice Progress! ⭐",
            halfwayThere: "Halfway There! 🚀",
            almostThere: "Almost There! 💫",
            youWinMsg: "YOU WIN! 🎉",
            unstoppable: "UNSTOPPABLE! 👑",
            legendary: "LEGENDARY! 🌟",
            comboStreak: "COMBO STREAK! 🔥",
            onFire: "ON FIRE! 🔥🔥",
            unstoppableStreak: "UNSTOPPABLE! 🔥🔥🔥",
            legendaryStreak: "LEGENDARY! ⚡",
            languageChanged: "🌐 Language: English",
            // Info Modal
            infoTitle: "🎮 2048 NEON GAME",
            howToPlayTitle: "📖 How to Play",
            howToPlayText: "Use your <strong>arrow keys</strong> (or swipe on mobile) to move tiles. When two tiles with the same number touch, they merge into one! Your goal is to create a tile with the number <strong>2048</strong>.",
            featuresTitle: "✨ Features",
            feature1: "<strong>👻 Ghost Mode:</strong> See your best game overlay to compare and improve",
            feature2: "<strong>🔥 Streak System:</strong> Build consecutive merge streaks for bonus points and rewards",
            feature3: "<strong>⚡ Special Cards:</strong> Lightning (chain reaction), Star (2x multiplier), Diamond (5x points)",
            feature4: "<strong>🎯 Milestones:</strong> Earn bonus points for reaching 128, 256, 512, 1024, 2048+",
            feature5: "<strong>💪 Power-Ups:</strong> Undo moves, get hints, or remove tiles strategically",
            rewardsTitle: "🎁 Rewards",
            reward1: "<strong>3 Streak:</strong> +50 points",
            reward2: "<strong>5 Streak:</strong> +150 points",
            reward3: "<strong>7 Streak:</strong> +300 points",
            reward4: "<strong>10 Streak:</strong> +500 points + Random Power-Up",
            reward5: "<strong>15+ Streak:</strong> +1000 points + Rainbow effects",
            controlsTitle: "🎮 Controls",
            control1: "<strong>Arrow Keys:</strong> Move tiles",
            control2: "<strong>G Key:</strong> Toggle Ghost Mode",
            control3: "<strong>Swipe:</strong> Move tiles on mobile",
            tipsTitle: "💡 Tips",
            tip1: "Keep your highest tile in a corner",
            tip2: "Build tiles in a specific direction",
            tip3: "Use power-ups strategically when stuck",
            tip4: "Maintain streaks for maximum points",
            tip5: "Special cards appear after move 5 when board is less than 75% full",
            infoFooter: "Good luck and have fun! 🎉",
            howToPlayLabel: "HOW TO PLAY:",
            howToPlayInstruction: "Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>",
            // Feedback Modal
            feedbackSection: "FEEDBACK",
            giveFeedback: "Give Feedback",
            feedbackTitle: "💬 We'd Love Your Feedback!",
            feedbackQuestion: "How would you rate your experience?",
            feedbackCommentLabel: "Tell us more (optional):",
            feedbackPlaceholder: "Share your thoughts about the game...",
            submitFeedback: "Submit Feedback",
            skipFeedback: "Maybe Later",
            dontShowAgain: "Don't show this again",
            feedbackThankYou: "Thank you! Your feedback has been sent. 🎉",
            feedbackError: "Failed to send feedback. Please try again."
        }
    };
    
    // Current language
    let currentLanguage = localStorage.getItem('game-language') || 'en';
    
    // Translation function
    function t(key) {
        return translations[currentLanguage][key] || key;
    }
    
    // Update all UI texts
    function updateAllTexts() {
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.innerHTML = t(key);
        });
        
        // Update game over/win screens
        const gameOverText = gameOverScreen.querySelector('p');
        if (gameOverText) gameOverText.textContent = t('gameOver');
        
        const winText = winScreen.querySelector('p');
        if (winText) winText.textContent = t('youWin');
        
        // Update button texts
        if (tryAgainBtn) tryAgainBtn.textContent = t('tryAgain');
        if (keepGoingBtn) keepGoingBtn.textContent = t('keepGoing');
        if (newGameBtn2) newGameBtn2.textContent = t('restart');
        
        // Update feedback textarea placeholder
        if (feedbackComment) feedbackComment.placeholder = t('feedbackPlaceholder');
    }
    
    // Toggle language
    function toggleLanguage() {
        currentLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
        localStorage.setItem('game-language', currentLanguage);
        
        // Update all UI texts
        updateAllTexts();
        
        // Show notification
        showNotification(t('languageChanged'));
    }
    
    // Initialize language on load
    updateAllTexts();

    // ========================================================================
    // SECTION 3: GAME STATE VARIABLES
    // ========================================================================
    
    // Core Game State
    let board = [];
    let specialTiles = {}; // Track special card types by position "row-col"
    let score = 0;
    let bestScore = localStorage.getItem('bestScore') || 0;
    let isMoving = false;
    let hasWon = false;
    let mergedPositions = new Set(); // Track merged tile positions
    
    // Ghost system state
    let ghostModeEnabled = localStorage.getItem('ghostModeEnabled') === 'true' || false;
    let ghostData = null;
    let moveCount = 0;
    
    // Power-up system state
    let powerUps = {
        undo: { count: 3, max: 5 },
        hint: { count: 5, max: 10 },
        remove: { count: 2, max: 5 }
    };
    let moveHistory = [];
    let removeModeActive = false;
    let lastScoreMilestone = 0;
    
    // Special cards system
    let specialCardsOnBoard = 0;
    let specialCardsCollected = {
        lightning: 0,
        star: 0,
        diamond: 0
    };
    
    // Streak & Milestone system
    let streaks = {
        currentMergeStreak: 0,
        bestMergeStreak: 0,
        currentPerfectStreak: 0,
        bestPerfectStreak: 0
    };
    let milestones = {
        tilesReached: [],
        scoreThresholds: []
    };
    let mergeCountThisMove = 0;
    
    // Feedback system state
    let feedbackRating = 0;
    let gamesPlayed = parseInt(localStorage.getItem('games-played')) || 0;
    
    // Load ghost data with error handling
    try {
        const savedGhostData = localStorage.getItem('ghostData');
        if (savedGhostData && savedGhostData !== 'null') {
            ghostData = JSON.parse(savedGhostData);
        }
    } catch (e) {
        console.error('Error loading ghost data:', e);
        ghostData = null;
    }
    
    // Load power-ups from localStorage
    try {
        const savedPowerUps = localStorage.getItem('powerUps');
        if (savedPowerUps) {
            powerUps = JSON.parse(savedPowerUps);
        }
    } catch (e) {
        console.error('Error loading power-ups:', e);
    }

    // ========================================================================
    // SECTION 4: CORE GAME FUNCTIONS
    // ========================================================================
    
    // Initialize the game
    function initGame() {
        // Track games played
        gamesPlayed++;
        localStorage.setItem('games-played', gamesPlayed);
        
        // Clear the board
        board = Array(4).fill().map(() => Array(4).fill(0));
        specialTiles = {};
        score = 0;
        hasWon = false;
        moveCount = 0;
        moveHistory = [];
        lastScoreMilestone = 0;
        specialCardsOnBoard = 0;
        mergeCountThisMove = 0;
        scoreDisplay.textContent = score;
        
        // Reset streaks
        streaks.currentMergeStreak = 0;
        streaks.currentPerfectStreak = 0;
        updateStreakDisplay();
        
        // Reset power-ups to default
        powerUps = {
            undo: { count: 3, max: 5 },
            hint: { count: 5, max: 10 },
            remove: { count: 2, max: 5 }
        };
        updatePowerUpDisplay();
        
        // Re-enable power-up buttons when starting new game
        undoBtn.disabled = false;
        hintBtn.disabled = false;
        removeBtn.disabled = false;
        
        // Clear the grid
        grid.innerHTML = '';
        
        // Create empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                grid.appendChild(cell);
            }
        }
        
        // Update ghost display if enabled (before adding tiles)
        if (ghostModeEnabled && ghostData) {
            displayGhostTiles();
        }
        
        // Add initial tiles
        addRandomTile();
        addRandomTile();
        
        // Hide game over and win screens
        gameOverScreen.classList.remove('show');
        winScreen.classList.remove('show');
    }

    // Add a random tile (2 or 4) to an empty cell
    function addRandomTile() {
        const emptyCells = [];
        
        // Find all empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }
        
        if (emptyCells.length > 0) {
            // Choose a random empty cell
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            // 90% chance for 2, 10% chance for 4
            const value = Math.random() < 0.9 ? 2 : 4;
            
            // Determine if special card should spawn
            let specialType = null;
            const boardFullness = (16 - emptyCells.length) / 16;
            
            if (specialCardsOnBoard < 2 && moveCount > 5 && boardFullness < 0.75) {
                const random = Math.random();
                if (random < 0.05) {
                    specialType = 'lightning';
                    specialCardsOnBoard++;
                } else if (random < 0.08) {
                    specialType = 'star';
                    specialCardsOnBoard++;
                } else if (random < 0.12) {
                    specialType = 'diamond';
                    specialCardsOnBoard++;
                }
            }
            
            board[row][col] = value;
            
            // Store special card type
            if (specialType) {
                specialTiles[`${row}-${col}`] = specialType;
            }
            
            // Create and animate the new tile
            createTile(row, col, value, true, specialType);
            
            return true;
        }
        return false;
    }

    // Create a tile element at the specified position
    function createTile(row, col, value, isNew = false, specialType = null) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = value;
        tile.dataset.value = value;
        tile.dataset.row = row;
        tile.dataset.col = col;
        
        // Add special card type
        if (specialType) {
            tile.dataset.special = specialType;
            tile.classList.add(`special-${specialType}`);
            
            // Add icon
            const icon = document.createElement('span');
            icon.className = 'special-icon';
            if (specialType === 'lightning') icon.textContent = '⚡';
            else if (specialType === 'star') icon.textContent = '🌟';
            else if (specialType === 'diamond') icon.textContent = '💎';
            tile.appendChild(icon);
        }
        
        if (isNew) {
            tile.classList.add('new');
            // Remove the 'new' class after the animation completes
            setTimeout(() => tile.classList.remove('new'), 200);
        }
        
        // Calculate position based on cell size
        const cellSize = (grid.offsetWidth - 45) / 4; // 45 = 15px gap * 3
        const gap = 15;
        const x = col * (cellSize + gap);
        const y = row * (cellSize + gap);
        
        tile.style.width = cellSize + 'px';
        tile.style.height = cellSize + 'px';
        // Use left/top for positioning instead of transform
        tile.style.left = x + 'px';
        tile.style.top = y + 'px';
        
        grid.appendChild(tile);
        return tile;
    }

    // Update the score
    function updateScore(points) {
        score += points;
        scoreDisplay.textContent = score;
        
        // Update best score if needed
        if (score > bestScore) {
            bestScore = score;
            bestScoreDisplay.textContent = bestScore;
            localStorage.setItem('bestScore', bestScore);
            
            // Save ghost data when new best is achieved
            saveGhostData();
        }
        
        // Check for power-up milestones
        checkScoreMilestones();
    }
    
    // Save ghost data when achieving new best score
    function saveGhostData() {
        const data = {
            score: bestScore,
            board: JSON.parse(JSON.stringify(board)),
            moveCount: moveCount,
            timestamp: new Date().toISOString()
        };
        
        ghostData = data;
        localStorage.setItem('ghostData', JSON.stringify(data));
    }
    
    // Display ghost tiles
    function displayGhostTiles() {
        // Remove existing ghost tiles
        document.querySelectorAll('.ghost-tile').forEach(tile => tile.remove());
        
        if (!ghostModeEnabled || !ghostData || !ghostData.board) {
            return;
        }
        
        // Create ghost tiles from saved board
        const ghostBoard = ghostData.board;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (ghostBoard[i][j] !== 0) {
                    createGhostTile(i, j, ghostBoard[i][j]);
                }
            }
        }
    }
    
    // Create a ghost tile
    function createGhostTile(row, col, value) {
        const tile = document.createElement('div');
        tile.className = 'tile ghost-tile';
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
    
    // ========================================================================
    // SECTION 6: SPECIAL FEATURES
    // ========================================================================
    
    // 6.1 Ghost Mode
    // ------------------------------------------------------------------------
    
    // Toggle ghost mode
    function toggleGhostMode() {
        ghostModeEnabled = !ghostModeEnabled;
        localStorage.setItem('ghostModeEnabled', ghostModeEnabled);
        
        if (ghostModeEnabled) {
            // Check if ghost data exists
            if (!ghostData || !ghostData.board) {
                console.warn('No ghost data available. Play a game to record your best score!');
                alert('👻 No ghost data yet!\n\nPlay a game and achieve a score to record your ghost board.');
                ghostModeEnabled = false;
                localStorage.setItem('ghostModeEnabled', false);
                return;
            }
            
            displayGhostTiles();
        } else {
            document.querySelectorAll('.ghost-tile').forEach(tile => tile.remove());
        }
    }
    
    // Power-Up Functions
    function updatePowerUpDisplay() {
        undoCountDisplay.textContent = powerUps.undo.count;
        hintCountDisplay.textContent = powerUps.hint.count;
        removeCountDisplay.textContent = powerUps.remove.count;
        
        // Enable/disable buttons
        undoBtn.disabled = powerUps.undo.count === 0 || moveHistory.length === 0;
        hintBtn.disabled = powerUps.hint.count === 0;
        removeBtn.disabled = powerUps.remove.count === 0;
        
        // Save to localStorage
        localStorage.setItem('powerUps', JSON.stringify(powerUps));
    }
    
    // 6.2 Power-Ups System
    // ------------------------------------------------------------------------
    
    function usePowerUpUndo() {
        if (powerUps.undo.count === 0 || moveHistory.length === 0 || isMoving) return;
        
        // Get last move
        const lastMove = moveHistory.pop();
        
        // Restore state
        board = JSON.parse(JSON.stringify(lastMove.board));
        score = lastMove.score;
        scoreDisplay.textContent = score;
        
        // Decrease count
        powerUps.undo.count--;
        
        // Add animation
        undoBtn.classList.add('in-use');
        setTimeout(() => undoBtn.classList.remove('in-use'), 600);
        
        // Refresh board
        refreshBoard();
        updatePowerUpDisplay();
    }
    
    function usePowerUpHint() {
        if (powerUps.hint.count === 0 || isMoving) return;
        
        // Calculate best move
        const bestDirection = calculateBestMove();
        
        if (!bestDirection) {
            alert('No valid moves available!');
            return;
        }
        
        // Decrease count
        powerUps.hint.count--;
        
        // Add animation
        hintBtn.classList.add('in-use');
        setTimeout(() => hintBtn.classList.remove('in-use'), 600);
        
        // Show hint arrow
        showHintArrow(bestDirection);
        updatePowerUpDisplay();
    }
    
    function usePowerUpRemove() {
        if (powerUps.remove.count === 0 || isMoving) return;
        
        // Enter remove mode
        removeModeActive = true;
        document.body.classList.add('remove-mode');
        
        // Add animation
        removeBtn.classList.add('in-use');
        setTimeout(() => removeBtn.classList.remove('in-use'), 600);
        
        // Add click listeners to tiles
        const tiles = document.querySelectorAll('.tile:not(.ghost-tile)');
        tiles.forEach(tile => {
            tile.addEventListener('click', handleTileRemove, { once: true });
        });
        
        // Cancel if clicked outside
        document.addEventListener('click', cancelRemoveMode, { once: true });
    }
    
    function handleTileRemove(e) {
        e.stopPropagation();
        
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        
        // Remove tile
        board[row][col] = 0;
        
        // Decrease count
        powerUps.remove.count--;
        
        // Exit remove mode
        removeModeActive = false;
        document.body.classList.remove('remove-mode');
        
        // Refresh board
        refreshBoard();
        updatePowerUpDisplay();
    }
    
    function cancelRemoveMode(e) {
        if (removeModeActive && !e.target.closest('.tile')) {
            removeModeActive = false;
            document.body.classList.remove('remove-mode');
        }
    }
    
    function calculateBestMove() {
        const directions = ['up', 'down', 'left', 'right'];
        let bestDirection = null;
        let bestScore = -1;
        
        directions.forEach(dir => {
            const testBoard = JSON.parse(JSON.stringify(board));
            let moved = false;
            
            switch (dir) {
                case 'up': moved = moveUp(testBoard); break;
                case 'down': moved = moveDown(testBoard); break;
                case 'left': moved = moveLeft(testBoard); break;
                case 'right': moved = moveRight(testBoard); break;
            }
            
            if (moved) {
                // Count empty cells and potential merges
                let emptyCount = 0;
                let mergeCount = 0;
                
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (testBoard[i][j] === 0) emptyCount++;
                        
                        // Check for potential merges
                        if (j < 3 && testBoard[i][j] === testBoard[i][j + 1] && testBoard[i][j] !== 0) mergeCount++;
                        if (i < 3 && testBoard[i][j] === testBoard[i + 1][j] && testBoard[i][j] !== 0) mergeCount++;
                    }
                }
                
                const moveScore = emptyCount * 10 + mergeCount * 50;
                
                if (moveScore > bestScore) {
                    bestScore = moveScore;
                    bestDirection = dir;
                }
            }
        });
        
        return bestDirection;
    }
    
    function showHintArrow(direction) {
        const arrow = document.createElement('div');
        arrow.className = 'hint-arrow';
        
        const arrows = {
            'up': '↑',
            'down': '↓',
            'left': '←',
            'right': '→'
        };
        
        arrow.textContent = arrows[direction];
        document.querySelector('.game-container').appendChild(arrow);
        
        setTimeout(() => arrow.remove(), 2000);
    }
    
    function refreshBoard() {
        // Remove all tiles
        document.querySelectorAll('.tile:not(.ghost-tile)').forEach(tile => tile.remove());
        
        // Re-create ghost tiles if enabled
        if (ghostModeEnabled && ghostData) {
            displayGhostTiles();
        }
        
        // Create tiles
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] !== 0) {
                    const specialType = specialTiles[`${i}-${j}`] || null;
                    createTile(i, j, board[i][j], false, specialType);
                }
            }
        }
        
        // Update special card count
        countSpecialCardsOnBoard();
    }
    
    function checkScoreMilestones() {
        // Check for power-up rewards
        if (score >= lastScoreMilestone + 1000 && Math.floor(score / 1000) > Math.floor(lastScoreMilestone / 1000)) {
            if (powerUps.hint.count < powerUps.hint.max) {
                powerUps.hint.count++;
                showNotification('POWER-UP EARNED! +1 HINT 💡');
            }
            lastScoreMilestone = Math.floor(score / 1000) * 1000;
        }
        
        if (score >= 2500 && lastScoreMilestone < 2500) {
            if (powerUps.undo.count < powerUps.undo.max) {
                powerUps.undo.count++;
                showNotification('POWER-UP EARNED! +1 UNDO ↶');
            }
        }
        
        if (score >= 5000 && lastScoreMilestone < 5000) {
            if (powerUps.remove.count < powerUps.remove.max) {
                powerUps.remove.count++;
                showNotification('POWER-UP EARNED! +1 REMOVE ✕');
            }
        }
        
        updatePowerUpDisplay();
    }
    
    // ========================================================================
    // SECTION 8: UI & NOTIFICATION FUNCTIONS
    // ========================================================================
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            transform: translateX(400px);
            background: rgba(10, 14, 39, 0.95);
            border: 2px solid #00ffff;
            border-radius: 8px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: bold;
            color: #00ffff;
            text-shadow: 0 0 8px #00ffff;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            z-index: 1000;
            transition: transform 0.3s ease-out;
            max-width: 250px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    // Special Card Functions
    function countSpecialCardsOnBoard() {
        specialCardsOnBoard = Object.keys(specialTiles).length;
    }
    
    function moveSpecialTile(fromRow, fromCol, toRow, toCol) {
        const key = `${fromRow}-${fromCol}`;
        if (specialTiles[key]) {
            specialTiles[`${toRow}-${toCol}`] = specialTiles[key];
            delete specialTiles[key];
        }
    }
    
    function mergeSpecialTiles(row1, col1, row2, col2, targetRow, targetCol) {
        const key1 = `${row1}-${col1}`;
        const key2 = `${row2}-${col2}`;
        const types = [];
        
        if (specialTiles[key1]) {
            types.push(specialTiles[key1]);
            delete specialTiles[key1];
        }
        if (specialTiles[key2]) {
            types.push(specialTiles[key2]);
            delete specialTiles[key2];
        }
        
        // Keep one special type if any existed (prefer first)
        if (types.length > 0) {
            specialTiles[`${targetRow}-${targetCol}`] = types[0];
        }
        
        return types;
    }
    
    function processSpecialCardEffects(row, col, value, specialTypes) {
        let bonusPoints = 0;
        let newValue = value;
        
        // Check if any special cards were merged
        if (specialTypes.length === 0) return { newValue, bonusPoints };
        
        // Lightning effect
        if (specialTypes.includes('lightning')) {
            bonusPoints += 50 * specialTypes.filter(t => t === 'lightning').length;
            showSpecialEffect(row, col, '⚡ CHAIN!', '#ffbe0b');
            specialCardsCollected.lightning++;
        }
        
        // Star effect (multiplier)
        if (specialTypes.includes('star')) {
            const starCount = specialTypes.filter(t => t === 'star').length;
            const multiplier = Math.pow(2, starCount);
            newValue = value * multiplier;
            bonusPoints += 100 * starCount;
            showSpecialEffect(row, col, `×${multiplier}!`, '#ff00ff');
            specialCardsCollected.star++;
        }
        
        // Diamond effect (point boost)
        if (specialTypes.includes('diamond')) {
            const diamondCount = specialTypes.filter(t => t === 'diamond').length;
            bonusPoints += value * 5 * diamondCount;
            showSpecialEffect(row, col, `+${value * 5}!`, '#00ffff');
            specialCardsCollected.diamond++;
        }
        
        return { newValue, bonusPoints };
    }
    
    function showSpecialEffect(row, col, text, color) {
        const cellSize = (grid.offsetWidth - 45) / 4;
        const gap = 15;
        const x = col * (cellSize + gap) + cellSize / 2;
        const y = row * (cellSize + gap) + cellSize / 2;
        
        const effect = document.createElement('div');
        effect.className = 'special-effect-text';
        effect.textContent = text;
        effect.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            color: ${color};
            text-shadow: 0 0 10px ${color};
        `;
        
        grid.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }
    
    // Streak & Milestone Functions
    function updateStreak(mergeCount) {
        if (mergeCount > 0) {
            streaks.currentMergeStreak++;
            
            if (mergeCount >= 2) {
                streaks.currentPerfectStreak++;
            } else {
                streaks.currentPerfectStreak = 0;
            }
            
            // Update best streaks
            if (streaks.currentMergeStreak > streaks.bestMergeStreak) {
                streaks.bestMergeStreak = streaks.currentMergeStreak;
            }
            if (streaks.currentPerfectStreak > streaks.bestPerfectStreak) {
                streaks.bestPerfectStreak = streaks.currentPerfectStreak;
            }
            
            // Update display
            updateStreakDisplay();
            
            // Check for streak rewards
            checkStreakRewards();
        } else {
            // Reset streaks on non-merge move
            streaks.currentMergeStreak = 0;
            streaks.currentPerfectStreak = 0;
            updateStreakDisplay();
        }
        
        // Save to localStorage
        localStorage.setItem('streaks', JSON.stringify(streaks));
    }
    
    function updateStreakDisplay() {
        const streak = streaks.currentMergeStreak;
        
        if (streak >= 3) {
            streakDisplay.classList.add('show');
            streakCount.textContent = streak;
            
            // Update color based on streak level
            streakDisplay.classList.remove('streak-low', 'streak-medium', 'streak-high', 'streak-legendary');
            
            if (streak >= 15) {
                streakDisplay.classList.add('streak-legendary');
            } else if (streak >= 10) {
                streakDisplay.classList.add('streak-high');
            } else if (streak >= 7) {
                streakDisplay.classList.add('streak-medium');
            } else {
                streakDisplay.classList.add('streak-low');
            }
        } else {
            streakDisplay.classList.remove('show');
        }
    }
    
    // ========================================================================
    // SECTION 7: STREAK & MILESTONE SYSTEM
    // ========================================================================
    
    function checkStreakRewards() {
        const streak = streaks.currentMergeStreak;
        let bonusPoints = 0;
        let message = '';
        
        if (streak === 3) {
            bonusPoints = 50;
            message = `3 ${t('comboStreak')}`;
        } else if (streak === 5) {
            bonusPoints = 150;
            message = t('onFire');
        } else if (streak === 7) {
            bonusPoints = 300;
            message = t('unstoppableStreak');
        } else if (streak === 10) {
            bonusPoints = 500;
            message = t('legendaryStreak');
            awardRandomPowerUp();
        } else if (streak >= 15) {
            bonusPoints = 1000;
            message = `${streak} ${t('comboStreak')}`;
        }
        
        if (bonusPoints > 0) {
            score += bonusPoints;
            scoreDisplay.textContent = score;
            showMilestoneNotification(message, bonusPoints);
        }
    }
    
    function awardRandomPowerUp() {
        const powerUpTypes = ['undo', 'hint', 'remove'];
        const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        
        if (powerUps[randomType].count < powerUps[randomType].max) {
            powerUps[randomType].count++;
            updatePowerUpDisplay();
            
            const icons = { undo: '↶', hint: '💡', remove: '✕' };
            showNotification(`BONUS! +1 ${randomType.toUpperCase()} ${icons[randomType]}`);
        }
    }
    
    function checkTileMilestone(value) {
        // Check if this tile value is a milestone and hasn't been reached before
        const milestoneValues = [128, 256, 512, 1024, 2048, 4096, 8192];
        
        if (milestoneValues.includes(value) && !milestones.tilesReached.includes(value)) {
            milestones.tilesReached.push(value);
            localStorage.setItem('milestones', JSON.stringify(milestones));
            
            let bonusPoints = 0;
            let message = '';
            
            switch(value) {
                case 128:
                    bonusPoints = 100;
                    message = t('goodStart');
                    break;
                case 256:
                    bonusPoints = 200;
                    message = t('niceProgress');
                    break;
                case 512:
                    bonusPoints = 500;
                    message = t('halfwayThere');
                    break;
                case 1024:
                    bonusPoints = 1000;
                    message = t('almostThere');
                    showConfetti();
                    break;
                case 2048:
                    bonusPoints = 5000;
                    message = t('youWinMsg');
                    showConfetti();
                    break;
                case 4096:
                    bonusPoints = 10000;
                    message = t('unstoppable');
                    showConfetti();
                    break;
                case 8192:
                    bonusPoints = 20000;
                    message = t('legendary');
                    showConfetti();
                    break;
            }
            
            if (bonusPoints > 0) {
                score += bonusPoints;
                scoreDisplay.textContent = score;
                showMilestoneNotification(message, bonusPoints);
            }
        }
    }
    
    function showMilestoneNotification(message, points) {
        const notification = document.createElement('div');
        notification.className = 'milestone-notification';
        notification.innerHTML = `
            <div class="milestone-message">${message}</div>
            <div class="milestone-points">+${points}</div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    function showConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = ['#00ffff', '#ff00ff', '#ffbe0b'][Math.floor(Math.random() * 3)];
            confettiContainer.appendChild(confetti);
        }
        
        document.body.appendChild(confettiContainer);
        setTimeout(() => confettiContainer.remove(), 4000);
    }
    
    // ========================================================================
    // FEEDBACK SYSTEM
    // ========================================================================
    
    // Star rating functions
    function highlightStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.classList.add('hover');
                star.textContent = '★';
            } else {
                star.classList.remove('hover');
                star.textContent = '☆';
            }
        });
    }
    
    function updateStars() {
        stars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            star.classList.remove('hover');
            if (starRating <= feedbackRating) {
                star.classList.add('selected');
                star.textContent = '★';
            } else {
                star.classList.remove('selected');
                star.textContent = '☆';
            }
        });
    }
    
    // Show feedback modal
    function showFeedbackModal(isManualTrigger = false) {
        // Only check localStorage preferences for automatic triggers
        if (!isManualTrigger) {
            const dismissed = localStorage.getItem('feedback-dismissed') === 'true';
            const submitted = localStorage.getItem('feedback-submitted') === 'true';
            
            if (dismissed || submitted) return;
        }
        
        feedbackModal.classList.add('show');
    }
    
    // Check if feedback should be triggered
    function checkFeedbackTrigger() {
        const dismissed = localStorage.getItem('feedback-dismissed') === 'true';
        const submitted = localStorage.getItem('feedback-submitted') === 'true';
        
        if (dismissed || submitted) return;
        
        // Show after game over/win with delay
        setTimeout(() => {
            showFeedbackModal();
        }, 1000);
    }
    
    // Submit feedback via webhook
    async function submitFeedback() {
        const comment = feedbackComment.value.trim();
        
        const feedbackData = {
            rating: feedbackRating,
            comment: comment || null,
            score: score,
            bestScore: bestScore,
            timestamp: new Date().toISOString(),
            language: currentLanguage,
            gamesPlayed: gamesPlayed
        };
        
        try {
            const response = await fetch('https://sldzx1zf.rcld.app/webhook/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedbackData)
            });
            
            if (response.ok) {
                localStorage.setItem('feedback-submitted', 'true');
                showNotification(t('feedbackThankYou'));
                closeFeedbackModal();
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Feedback submission error:', error);
            showNotification(t('feedbackError'));
        }
    }
    
    // Close feedback modal
    function closeFeedbackModal() {
        feedbackModal.classList.remove('show');
        // Reset form
        feedbackRating = 0;
        feedbackComment.value = '';
        charCount.textContent = '0';
        submitFeedbackBtn.disabled = true;
        dontShowCheckbox.checked = false;
        updateStars();
    }

    // ========================================================================
    // SECTION 5: MOVEMENT & MERGE LOGIC
    // ========================================================================
    
    // Move tiles in the specified direction
    async function moveTiles(direction) {
        if (isMoving) return false;
        isMoving = true;
        
        // Save move history for undo
        moveHistory.push({
            board: JSON.parse(JSON.stringify(board)),
            score: score
        });
        
        // Keep only last 3 moves
        if (moveHistory.length > 3) {
            moveHistory.shift();
        }
        
        // Reset merge count for this move
        mergeCountThisMove = 0;
        
        let moved = false;
        const tiles = document.querySelectorAll('.tile');
        const oldBoard = JSON.parse(JSON.stringify(board));
        const tileMap = new Map();
        
        // Clear merged positions
        mergedPositions.clear();
        
        // Save current tile elements with their board positions
        tiles.forEach(tile => {
            const row = parseInt(tile.dataset.row);
            const col = parseInt(tile.dataset.col);
            tileMap.set(`${row}-${col}`, tile);
        });
        
        // Process the move based on direction
        switch (direction) {
            case 'up':
                moved = moveUp(board);
                break;
            case 'right':
                moved = moveRight(board);
                break;
            case 'down':
                moved = moveDown(board);
                break;
            case 'left':
                moved = moveLeft(board);
                break;
        }
        
        if (moved) {
            // Increment move counter
            moveCount++;
            
            // Calculate cell size for positioning
            const cellSize = (grid.offsetWidth - 45) / 4;
            const gap = 15;
            
            // Remove ALL tiles (including ghost tiles)
            tiles.forEach(tile => tile.remove());
            
            // Re-create ghost tiles first (if enabled)
            if (ghostModeEnabled && ghostData) {
                displayGhostTiles();
            }
            
            // Create new tiles at their new positions
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (board[i][j] !== 0) {
                        const tile = createTile(i, j, board[i][j], false);
                        
                        // Check if this position had a merge
                        if (mergedPositions.has(`${i}-${j}`)) {
                            // Apply random merge animation (1-24)
                            const randomAnim = Math.floor(Math.random() * 24) + 1;
                            tile.classList.add(`merge-${randomAnim}`);
                            
                            // Remove animation class after it completes
                            setTimeout(() => {
                                tile.classList.remove(`merge-${randomAnim}`);
                            }, 600);
                        }
                    }
                }
            }
            
            // Add a new random tile after animation
            await new Promise(resolve => setTimeout(resolve, 150));
            addRandomTile();
            
            // Release the moving lock immediately
            isMoving = false;
            
            // Update streak based on merge count
            updateStreak(mergeCountThisMove);
            
            // Check for win (2048)
            if (!hasWon && checkWin()) {
                hasWon = true;
                winGame();
            }
            
            // Check for game over (no more moves possible)
            if (!canMove()) {
                gameOver();
            }
            
            return true;
        }
        
        isMoving = false;
        return false;
    }

    // Movement helper functions
    function moveUp(board) {
        let moved = false;
        
        for (let j = 0; j < 4; j++) {
            // Move all tiles up as far as possible
            for (let i = 1; i < 4; i++) {
                if (board[i][j] !== 0) {
                    let row = i;
                    while (row > 0 && board[row - 1][j] === 0) {
                        board[row - 1][j] = board[row][j];
                        board[row][j] = 0;
                        moveSpecialTile(row, j, row - 1, j);
                        row--;
                        moved = true;
                    }
                }
            }
            
            // Merge tiles
            for (let i = 0; i < 3; i++) {
                if (board[i][j] !== 0 && board[i][j] === board[i + 1][j]) {
                    const specialTypes = mergeSpecialTiles(i, j, i + 1, j, i, j);
                    const { newValue, bonusPoints } = processSpecialCardEffects(i, j, board[i][j] * 2, specialTypes);
                    board[i][j] = newValue;
                    updateScore(board[i][j] + bonusPoints);
                    board[i + 1][j] = 0;
                    mergedPositions.add(`${i}-${j}`);
                    mergeCountThisMove++;
                    checkTileMilestone(board[i][j]);
                    moved = true;
                }
            }
            
            // Move tiles up again after merging
            for (let i = 1; i < 4; i++) {
                if (board[i][j] !== 0) {
                    let row = i;
                    while (row > 0 && board[row - 1][j] === 0) {
                        board[row - 1][j] = board[row][j];
                        board[row][j] = 0;
                        moveSpecialTile(row, j, row - 1, j);
                        row--;
                    }
                }
            }
        }
        
        return moved;
    }

    function moveRight(board) {
        let moved = false;
        
        for (let i = 0; i < 4; i++) {
            // Move all tiles right as far as possible
            for (let j = 2; j >= 0; j--) {
                if (board[i][j] !== 0) {
                    let col = j;
                    while (col < 3 && board[i][col + 1] === 0) {
                        board[i][col + 1] = board[i][col];
                        board[i][col] = 0;
                        moveSpecialTile(i, col, i, col + 1);
                        col++;
                        moved = true;
                    }
                }
            }
            
            // Merge tiles
            for (let j = 3; j > 0; j--) {
                if (board[i][j] !== 0 && board[i][j] === board[i][j - 1]) {
                    const specialTypes = mergeSpecialTiles(i, j, i, j - 1, i, j);
                    const { newValue, bonusPoints } = processSpecialCardEffects(i, j, board[i][j] * 2, specialTypes);
                    board[i][j] = newValue;
                    updateScore(board[i][j] + bonusPoints);
                    board[i][j - 1] = 0;
                    moved = true;
                    mergedPositions.add(`${i}-${j}`);
                    mergeCountThisMove++;
                    checkTileMilestone(board[i][j]);
                    
                    // Move any tiles left after merging
                    for (let k = j - 1; k > 0; k--) {
                        if (board[i][k - 1] !== 0) {
                            board[i][k] = board[i][k - 1];
                            board[i][k - 1] = 0;
                            moveSpecialTile(i, k - 1, i, k);
                        }
                    }
                }
            }
        }
        
        return moved;
    }

    function moveDown(board) {
        let moved = false;
        
        for (let j = 0; j < 4; j++) {
            // Move all tiles down as far as possible
            for (let i = 2; i >= 0; i--) {
                if (board[i][j] !== 0) {
                    let row = i;
                    while (row < 3 && board[row + 1][j] === 0) {
                        board[row + 1][j] = board[row][j];
                        board[row][j] = 0;
                        moveSpecialTile(row, j, row + 1, j);
                        row++;
                        moved = true;
                    }
                }
            }
            
            // Merge tiles
            for (let i = 3; i > 0; i--) {
                if (board[i][j] !== 0 && board[i][j] === board[i - 1][j]) {
                    const specialTypes = mergeSpecialTiles(i, j, i - 1, j, i, j);
                    const { newValue, bonusPoints } = processSpecialCardEffects(i, j, board[i][j] * 2, specialTypes);
                    board[i][j] = newValue;
                    updateScore(board[i][j] + bonusPoints);
                    board[i - 1][j] = 0;
                    mergedPositions.add(`${i}-${j}`);
                    mergeCountThisMove++;
                    checkTileMilestone(board[i][j]);
                    moved = true;
                }
            }
            
            // Move tiles down again after merging
            for (let i = 2; i >= 0; i--) {
                if (board[i][j] !== 0) {
                    let row = i;
                    while (row < 3 && board[row + 1][j] === 0) {
                        board[row + 1][j] = board[row][j];
                        board[row][j] = 0;
                        moveSpecialTile(row, j, row + 1, j);
                        row++;
                    }
                }
            }
        }
        
        return moved;
    }

    function moveLeft(board) {
        let moved = false;
        
        for (let i = 0; i < 4; i++) {
            // Move all tiles left as far as possible
            for (let j = 1; j < 4; j++) {
                if (board[i][j] !== 0) {
                    let col = j;
                    while (col > 0 && board[i][col - 1] === 0) {
                        board[i][col - 1] = board[i][col];
                        board[i][col] = 0;
                        moveSpecialTile(i, col, i, col - 1);
                        col--;
                        moved = true;
                    }
                }
            }
            
            // Merge tiles
            for (let j = 0; j < 3; j++) {
                if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
                    const specialTypes = mergeSpecialTiles(i, j, i, j + 1, i, j);
                    const { newValue, bonusPoints } = processSpecialCardEffects(i, j, board[i][j] * 2, specialTypes);
                    board[i][j] = newValue;
                    updateScore(board[i][j] + bonusPoints);
                    board[i][j + 1] = 0;
                    moved = true;
                    mergedPositions.add(`${i}-${j}`);
                    mergeCountThisMove++;
                    checkTileMilestone(board[i][j]);
                    
                    // Move any tiles right after merging
                    for (let k = j + 1; k < 3; k++) {
                        if (board[i][k + 1] !== 0) {
                            board[i][k] = board[i][k + 1];
                            board[i][k + 1] = 0;
                            moveSpecialTile(i, k + 1, i, k);
                        }
                    }
                }
            }
        }
        
        return moved;
    }

    // Check if there are any possible moves left
    function canMove() {
        // Check for empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    return true;
                }
            }
        }
        
        // Check for possible merges (horizontal and vertical)
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const value = board[i][j];
                
                // Check right
                if (j < 3 && board[i][j + 1] === value) {
                    return true;
                }
                
                // Check down
                if (i < 3 && board[i + 1][j] === value) {
                    return true;
                }
            }
        }
        
        return false;
    }

    // Check if the player has won (reached 2048)
    function checkWin() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }

    // Game over screen
    function gameOver() {
        // Disable power-up buttons
        undoBtn.disabled = true;
        hintBtn.disabled = true;
        removeBtn.disabled = true;
        
        setTimeout(() => {
            gameOverScreen.classList.add('show');
        }, 300);
        
        // Trigger feedback modal
        checkFeedbackTrigger();
    }

    // Win screen
    function winGame() {
        // Disable power-up buttons
        undoBtn.disabled = true;
        hintBtn.disabled = true;
        removeBtn.disabled = true;
        
        setTimeout(() => {
            winScreen.classList.add('show');
        }, 300);
        
        // Trigger feedback modal
        checkFeedbackTrigger();
    }

    // ========================================================================
    // SECTION 9: EVENT LISTENERS
    // ========================================================================
    
    // 9.1 Keyboard Controls
    // ------------------------------------------------------------------------
    
    document.addEventListener('keydown', async (e) => {
        if (isMoving) return;
        
        switch (e.key) {
            case 'ArrowUp':
                await moveTiles('up');
                break;
            case 'ArrowRight':
                await moveTiles('right');
                break;
            case 'ArrowDown':
                await moveTiles('down');
                break;
            case 'ArrowLeft':
                await moveTiles('left');
                break;
        }
    });

    // Enhanced touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let isSwiping = false;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        // Prevent scrolling while swiping on the game
        if (e.target.closest('.game-container')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    document.addEventListener('touchend', async (e) => {
        if (!isSwiping || isMoving) {
            isSwiping = false;
            return;
        }
        
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Minimum swipe distance (in pixels) - reduced for better mobile responsiveness
        const minSwipeDistance = 20;
        
        // Determine if it's a valid swipe
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        
        if (absX > minSwipeDistance || absY > minSwipeDistance) {
            if (absX > absY) {
                // Horizontal swipe
                if (deltaX > 0) {
                    await moveTiles('right');
                } else {
                    await moveTiles('left');
                }
            } else {
                // Vertical swipe
                if (deltaY > 0) {
                    await moveTiles('down');
                } else {
                    await moveTiles('up');
                }
            }
        }
        
        isSwiping = false;
    }, { passive: true });

    // 9.2 Button Event Listeners
    // ------------------------------------------------------------------------
    
    tryAgainBtn.addEventListener('click', initGame);
    keepGoingBtn.addEventListener('click', () => {
        winScreen.classList.remove('show');
    });
    newGameBtn2.addEventListener('click', initGame);
    
    // Info modal listeners
    if (infoClose) {
        infoClose.addEventListener('click', () => {
            infoModal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    if (infoModal) {
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                infoModal.classList.remove('show');
            }
        });
    }
    
    // Power-up button listeners
    undoBtn.addEventListener('click', usePowerUpUndo);
    hintBtn.addEventListener('click', usePowerUpHint);
    removeBtn.addEventListener('click', usePowerUpRemove);
    
    // Keyboard shortcut for ghost mode (G key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'g' || e.key === 'G') {
            if (!isMoving) {
                toggleGhostMode();
            }
        }
    });
    
    // 9.3 Hamburger Menu Event Listeners
    // ------------------------------------------------------------------------
    
    const menuBtn = document.getElementById('menu-btn');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuClose = document.getElementById('menu-close');
    const newGameMenuBtn = document.getElementById('new-game-menu');
    const ghostToggleMenuBtn = document.getElementById('ghost-toggle-menu');
    const infoBtnMenu = document.getElementById('info-btn-menu');
    const languageBtnMenu = document.getElementById('language-btn-menu');
    const languageTextMenu = document.getElementById('language-text-menu');
    
    // Open menu
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuOverlay.classList.add('show');
        });
    }
    
    // Close menu
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            menuOverlay.classList.remove('show');
        });
    }
    
    // Close menu when clicking backdrop
    if (menuOverlay) {
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('show');
            }
        });
    }
    
    // Menu item actions
    if (newGameMenuBtn) {
        newGameMenuBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('show');
            initGame();
        });
    }
    
    if (ghostToggleMenuBtn) {
        ghostToggleMenuBtn.addEventListener('click', () => {
            toggleGhostMode();
            // Update both ghost toggle buttons
            if (ghostModeEnabled) {
                ghostToggleMenuBtn.classList.add('active');
            } else {
                ghostToggleMenuBtn.classList.remove('active');
            }
        });
    }
    
    // Info button in menu
    if (infoBtnMenu) {
        infoBtnMenu.addEventListener('click', () => {
            menuOverlay.classList.remove('show');
            infoModal.classList.add('show');
        });
    }
    
    // Language button in menu
    if (languageBtnMenu) {
        languageBtnMenu.addEventListener('click', () => {
            toggleLanguage();
            // Update menu language text
            if (languageTextMenu) {
                languageTextMenu.textContent = currentLanguage.toUpperCase();
            }
        });
    }
    
    // Initialize menu language text
    if (languageTextMenu) {
        languageTextMenu.textContent = currentLanguage.toUpperCase();
    }
    
    // 9.4 Feedback Event Listeners
    // ------------------------------------------------------------------------
    
    // Star rating listeners
    stars.forEach(star => {
        star.addEventListener('click', () => {
            feedbackRating = parseInt(star.dataset.rating);
            updateStars();
            submitFeedbackBtn.disabled = false;
        });
        
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });
    });
    
    document.querySelector('.star-rating').addEventListener('mouseleave', () => {
        updateStars();
    });
    
    // Character counter
    if (feedbackComment) {
        feedbackComment.addEventListener('input', () => {
            charCount.textContent = feedbackComment.value.length;
        });
    }
    
    // Submit button
    if (submitFeedbackBtn) {
        submitFeedbackBtn.addEventListener('click', submitFeedback);
    }
    
    // Skip button
    if (skipFeedbackBtn) {
        skipFeedbackBtn.addEventListener('click', () => {
            if (dontShowCheckbox.checked) {
                localStorage.setItem('feedback-dismissed', 'true');
            }
            closeFeedbackModal();
        });
    }
    
    // Close button
    if (feedbackClose) {
        feedbackClose.addEventListener('click', closeFeedbackModal);
    }
    
    // Close on backdrop click
    if (feedbackModal) {
        feedbackModal.addEventListener('click', (e) => {
            if (e.target === feedbackModal) {
                closeFeedbackModal();
            }
        });
    }
    
    // Feedback menu button
    if (feedbackBtnMenu) {
        feedbackBtnMenu.addEventListener('click', () => {
            menuOverlay.classList.remove('show');
            showFeedbackModal(true); // Pass true for manual trigger
        });
    }

    // Initialize the game
    bestScoreDisplay.textContent = bestScore;
    
    // Set initial ghost button state (menu button only)
    if (ghostModeEnabled && ghostToggleMenuBtn) {
        ghostToggleMenuBtn.classList.add('active');
    }
    
    // Update power-up display
    updatePowerUpDisplay();
    
    initGame();
});
