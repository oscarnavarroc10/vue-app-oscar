import instagramIcon from "@/assets/instagram_neon.svg";
import facebookIcon from "@/assets/facebook_neon.svg";
import tiktokIcon from "@/assets/tiktok_neon.svg";
import youtubeIcon from "@/assets/youtube_neon.svg";
import twitterIcon from "@/assets/twitter_neon.svg";
import spotifyIcon from "@/assets/spotify_neon.svg";
import telegramIcon from "@/assets/telegram_neon.svg";
import whatsappIcon from "@/assets/whatsapp_neon.svg";
import snapchatIcon from "@/assets/snapchat_neon.svg";
import discordIcon from "@/assets/discord_neon.svg";
import twitchIcon from "@/assets/twitch_neon.svg";

export const PLATFORM_ICON_MAP = {
  Instagram: instagramIcon,
  Facebook: facebookIcon,
  TikTok: tiktokIcon,
  X: twitterIcon,
  YouTube: youtubeIcon,
  Spotify: spotifyIcon,
  Telegram: telegramIcon,
  WhatsApp: whatsappIcon,
  Snapchat: snapchatIcon,
  Discord: discordIcon,
  Twitch: twitchIcon,
};

export const PLATFORM_COLOR_MAP = {
  Instagram: {
    accent: "#e1306c",
    bg: "rgba(225,48,108,0.08)",
    text: "#be185d",
  },
  Facebook: { accent: "#1877f2", bg: "rgba(24,119,242,0.08)", text: "#1d4ed8" },
  TikTok: { accent: "#fe2c55", bg: "rgba(254,44,85,0.08)", text: "#be123c" },
  YouTube: { accent: "#ff0000", bg: "rgba(255,0,0,0.08)", text: "#dc2626" },
  Spotify: { accent: "#1db954", bg: "rgba(29,185,84,0.08)", text: "#15803d" },
  Telegram: { accent: "#0088cc", bg: "rgba(0,136,204,0.08)", text: "#0369a1" },
  WhatsApp: { accent: "#25d366", bg: "rgba(37,211,102,0.08)", text: "#15803d" },
  Discord: { accent: "#5865f2", bg: "rgba(88,101,242,0.08)", text: "#4338ca" },
  Twitch: { accent: "#9146ff", bg: "rgba(145,70,255,0.08)", text: "#7c3aed" },
  Snapchat: { accent: "#facc15", bg: "rgba(250,204,21,0.08)", text: "#a16207" },
  X: { accent: "#0f172a", bg: "rgba(15,23,42,0.06)", text: "#334155" },
};

export const CATEGORY_NORMALIZE_MAP = {
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

export function normalizeCategory(value) {
  return CATEGORY_NORMALIZE_MAP[value?.toLowerCase()] || value;
}

export function usePlatformTheme(category) {
  const colors = PLATFORM_COLOR_MAP[category] || {
    accent: "#64748b",
    bg: "rgba(100,116,139,0.08)",
    text: "#475569",
  };
  const icon = PLATFORM_ICON_MAP[category] || null;
  return { colors, icon };
}
