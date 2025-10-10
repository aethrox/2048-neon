// ============================================================================
// LOCAL STORAGE UTILITY FUNCTIONS
// ============================================================================

export class StorageManager {
    static get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error(`Error loading ${key}:`, e);
            return defaultValue;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error saving ${key}:`, e);
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error(`Error removing ${key}:`, e);
        }
    }

    static clear() {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Error clearing storage:', e);
        }
    }
}
