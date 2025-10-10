// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

export const GRID_SIZE = 4;
export const CELL_SIZE = 100;
export const ANIMATION_DURATION = 150;
export const NEW_TILE_DELAY = 150;
export const MERGE_ANIMATION_DURATION = 400;

export const TILE_SPAWN_PROBABILITY = {
    2: 0.9,
    4: 0.1
};

export const SPECIAL_CARD_SPAWN_RATES = {
    lightning: 0.05,
    star: 0.03,
    diamond: 0.04
};

export const SPECIAL_CARD_LIMITS = {
    maxOnBoard: 2,
    minMoves: 5,
    maxBoardFillPercentage: 0.75
};

export const POWER_UPS_INITIAL = {
    undo: { count: 3, max: 5 },
    hint: { count: 5, max: 10 },
    remove: { count: 2, max: 5 }
};

export const MILESTONE_VALUES = [128, 256, 512, 1024, 2048, 4096, 8192];

export const STREAK_REWARDS = {
    3: { points: 50, message: 'comboStreak' },
    5: { points: 150, message: 'onFire' },
    7: { points: 300, message: 'unstoppableStreak' },
    10: { points: 500, message: 'legendaryStreak', powerUp: true },
    15: { points: 1000, message: 'comboStreak', rainbow: true }
};

export const MILESTONE_REWARDS = {
    128: { points: 100, message: 'goodStart' },
    256: { points: 200, message: 'niceProgress' },
    512: { points: 500, message: 'halfwayThere' },
    1024: { points: 1000, message: 'almostThere', confetti: true },
    2048: { points: 5000, message: 'youWinMsg', confetti: true },
    4096: { points: 10000, message: 'unstoppable', confetti: true },
    8192: { points: 20000, message: 'legendary', confetti: true }
};

export const SCORE_MILESTONES = {
    1000: { powerUp: 'hint', message: 'POWER-UP EARNED! +1 HINT 💡' },
    2500: { powerUp: 'undo', message: 'POWER-UP EARNED! +1 UNDO ↶' },
    5000: { powerUp: 'remove', message: 'POWER-UP EARNED! +1 REMOVE ✕' }
};
