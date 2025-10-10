// ============================================================================
// GAME CONSTANTS
// ============================================================================
// All constant values used throughout the game
// ============================================================================

// Grid configuration
export const GRID_SIZE = 4;
export const GRID_GAP = 15;

// Special card configuration
export const MAX_SPECIAL_CARDS_ON_BOARD = 2;
export const SPECIAL_CARD_MIN_MOVES = 5;
export const SPECIAL_CARD_MAX_BOARD_FULLNESS = 0.75;

// Special card spawn probabilities
export const SPECIAL_CARD_PROBABILITIES = {
    lightning: 0.05,
    star: 0.08,
    diamond: 0.12
};

// Tile spawn probabilities
export const TILE_2_PROBABILITY = 0.9; // 90% chance for 2
export const TILE_4_PROBABILITY = 0.1; // 10% chance for 4

// Power-up default configuration
export const DEFAULT_POWER_UPS = {
    undo: { count: 3, max: 5 },
    hint: { count: 5, max: 10 },
    remove: { count: 2, max: 5 }
};

// Move history limit
export const MAX_MOVE_HISTORY = 3;

// Streak rewards
export const STREAK_REWARDS = {
    3: { points: 50, message: 'comboStreak' },
    5: { points: 150, message: 'onFire' },
    7: { points: 300, message: 'unstoppableStreak' },
    10: { points: 500, message: 'legendaryStreak', powerUp: true },
    15: { points: 1000, message: 'comboStreak', rainbow: true }
};

// Milestone tile values and rewards
export const MILESTONE_VALUES = [128, 256, 512, 1024, 2048, 4096, 8192];

export const MILESTONE_REWARDS = {
    128: { points: 100, message: 'goodStart' },
    256: { points: 200, message: 'niceProgress' },
    512: { points: 500, message: 'halfwayThere' },
    1024: { points: 1000, message: 'almostThere', confetti: true },
    2048: { points: 5000, message: 'youWinMsg', confetti: true },
    4096: { points: 10000, message: 'unstoppable', confetti: true },
    8192: { points: 20000, message: 'legendary', confetti: true }
};

// Score milestone thresholds for power-up rewards
export const SCORE_MILESTONES = {
    1000: { powerUp: 'hint', message: 'POWER-UP EARNED! +1 HINT 💡' },
    2500: { powerUp: 'undo', message: 'POWER-UP EARNED! +1 UNDO ↶' },
    5000: { powerUp: 'remove', message: 'POWER-UP EARNED! +1 REMOVE ✕' }
};

// Special card effects
export const SPECIAL_EFFECTS = {
    lightning: {
        bonusPerCard: 50,
        text: '⚡ CHAIN!',
        color: '#ffbe0b'
    },
    star: {
        multiplier: 2, // Per card (stacks exponentially)
        bonusPerCard: 100,
        text: '×{multiplier}!',
        color: '#ff00ff'
    },
    diamond: {
        pointsMultiplier: 5,
        bonusPerCard: (value) => value * 5,
        text: '+{points}!',
        color: '#00ffff'
    }
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
    tileMove: 150,
    tileSpawn: 200,
    merge: 400,
    notification: 2000,
    milestone: 2000
};

// Merge animation count
export const MERGE_ANIMATION_COUNT = 24;

// Touch/swipe configuration
export const MIN_SWIPE_DISTANCE = 20; // pixels

// Feedback system configuration
export const FEEDBACK_WEBHOOK_URL = 'https://sldzx1zf.rcld.app/webhook/feedback';
export const FEEDBACK_MAX_COMMENT_LENGTH = 500;

// LocalStorage keys
export const STORAGE_KEYS = {
    bestScore: 'bestScore',
    ghostModeEnabled: 'ghostModeEnabled',
    ghostData: 'ghostData',
    powerUps: 'powerUps',
    streaks: 'streaks',
    milestones: 'milestones',
    language: 'game-language',
    gamesPlayed: 'games-played',
    feedbackDismissed: 'feedback-dismissed',
    feedbackSubmitted: 'feedback-submitted'
};

// Win condition
export const WIN_VALUE = 2048;
