/**
 * Normalize a platform/category string to its canonical display name.
 *
 * Handles case variations (e.g. "instagram" → "Instagram", "tiktok" → "TikTok").
 *
 * @param {string} value - Raw category string
 * @returns {string} Canonical display name
 */
const CATEGORY_MAP = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
  discord: "Discord",
  twitch: "Twitch",
  spotify: "Spotify",
  snapchat: "Snapchat",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
};

export const normalizeCategory = (value) => {
  return CATEGORY_MAP[value?.toLowerCase()] || value;
};
