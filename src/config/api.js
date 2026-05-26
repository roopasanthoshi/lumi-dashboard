// ─── API KEYS ───────────────────────────────────────────────────────────────
// Replace these with your actual API keys or use .env variables

export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "YOUR_OPENWEATHER_API_KEY";
export const NEWS_API_KEY    = import.meta.env.VITE_NEWS_API_KEY    || "YOUR_NEWSDATA_API_KEY";
export const GEMINI_API_KEY  = import.meta.env.VITE_GEMINI_API_KEY  || "YOUR_GEMINI_API_KEY";

// ─── ENDPOINTS ──────────────────────────────────────────────────────────────
export const WEATHER_BASE  = "https://api.openweathermap.org/data/2.5";
export const NEWS_BASE     = "https://newsdata.io/api/1";
export const GEMINI_BASE   = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
export const GITHUB_BASE   = "https://api.github.com";
