// ─── cache.js ────────────────────────────────────────────────────────────────
// Simple sessionStorage cache with optional TTL (minutes).
// getCachedData(key) → value string or null
// setCachedData(key, value, ttlMinutes = 60)

const PREFIX = "lumi_cache_";

export function getCachedData(key) {
  try {
    const raw = sessionStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const { value, expires } = JSON.parse(raw);
    if (expires && Date.now() > expires) {
      sessionStorage.removeItem(PREFIX + key);
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

export function setCachedData(key, value, ttlMinutes = 60) {
  try {
    const expires = ttlMinutes > 0 ? Date.now() + ttlMinutes * 60 * 1000 : null;
    sessionStorage.setItem(PREFIX + key, JSON.stringify({ value, expires }));
  } catch {
    // sessionStorage full or blocked — silently ignore
  }
}

export function clearCachedData(key) {
  try {
    sessionStorage.removeItem(PREFIX + key);
  } catch {}
}
