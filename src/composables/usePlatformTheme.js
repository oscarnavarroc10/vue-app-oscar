/**
 * Composable: usePlatformTheme
 *
 * Consolidates all platform color/icon maps in a single place
 * so MainServiceCard, SubServiceCard, SocialTabsBuilder, CartView
 * can reference them without duplication.
 */
import { computed } from "vue";

import instagramIcon from "@/assets/instagram_neon.svg";
import facebookIcon from "@/assets/facebook_neon.svg";
import tiktokIcon from "@/assets/tiktok_neon.svg";
import youtubeIcon from "@/assets/youtube_neon.svg";
import snapchatIcon from "@/assets/snapchat_neon.svg";
import xIcon from "@/assets/twitter_neon.svg";
import discordIcon from "@/assets/discord_neon.svg";
import twitchIcon from "@/assets/twitch_neon.svg";
import spotifyIcon from "@/assets/spotify_neon.svg";
import whatsappIcon from "@/assets/whatsapp_neon.svg";
import telegramIcon from "@/assets/telegram_neon.svg";

const PLATFORM_MAP = {
  Instagram: {
    icon: instagramIcon,
    color: "#e1306c",
    softBg: "rgba(225, 48, 108, 0.08)",
    pillClass: "pill-instagram",
    themeClass: "theme-instagram",
  },
  Facebook: {
    icon: facebookIcon,
    color: "#1877f2",
    softBg: "rgba(24, 119, 242, 0.08)",
    pillClass: "pill-facebook",
    themeClass: "theme-facebook",
  },
  TikTok: {
    icon: tiktokIcon,
    color: "#111827",
    softBg: "rgba(17, 24, 39, 0.06)",
    pillClass: "pill-tiktok",
    themeClass: "theme-tiktok",
  },
  X: {
    icon: xIcon,
    color: "#334155",
    softBg: "rgba(51, 65, 85, 0.08)",
    pillClass: "pill-x",
    themeClass: "theme-x",
  },
  YouTube: {
    icon: youtubeIcon,
    color: "#dc2626",
    softBg: "rgba(220, 38, 38, 0.08)",
    pillClass: "pill-youtube",
    themeClass: "theme-youtube",
  },
  Spotify: {
    icon: spotifyIcon,
    color: "#1db954",
    softBg: "rgba(29, 185, 84, 0.08)",
    pillClass: "pill-spotify",
    themeClass: "theme-spotify",
  },
  Telegram: {
    icon: telegramIcon,
    color: "#0088cc",
    softBg: "rgba(0, 136, 204, 0.08)",
    pillClass: "pill-telegram",
    themeClass: "theme-telegram",
  },
  WhatsApp: {
    icon: whatsappIcon,
    color: "#25d366",
    softBg: "rgba(37, 211, 102, 0.08)",
    pillClass: "pill-whatsapp",
    themeClass: "theme-whatsapp",
  },
  Discord: {
    icon: discordIcon,
    color: "#5865f2",
    softBg: "rgba(88, 101, 242, 0.08)",
    pillClass: "pill-discord",
    themeClass: "theme-discord",
  },
  Twitch: {
    icon: twitchIcon,
    color: "#9146ff",
    softBg: "rgba(145, 70, 255, 0.08)",
    pillClass: "pill-twitch",
    themeClass: "theme-twitch",
  },
  Snapchat: {
    icon: snapchatIcon,
    color: "#f59e0b",
    softBg: "rgba(245, 158, 11, 0.08)",
    pillClass: "pill-snapchat",
    themeClass: "theme-snapchat",
  },
};

const DEFAULT_THEME = {
  icon: null,
  color: "#6b7280",
  softBg: "rgba(107, 114, 128, 0.08)",
  pillClass: "pill-default",
  themeClass: "theme-default",
};

export function usePlatformTheme() {
  const getPlatform = (category) => {
    return PLATFORM_MAP[category] || DEFAULT_THEME;
  };

  const getIcon = (category) => {
    return PLATFORM_MAP[category]?.icon || null;
  };

  const getThemeClass = (category) => {
    return (PLATFORM_MAP[category] || DEFAULT_THEME).themeClass;
  };

  const getPillClass = (category) => {
    return (PLATFORM_MAP[category] || DEFAULT_THEME).pillClass;
  };

  return {
    PLATFORM_MAP,
    getPlatform,
    getIcon,
    getThemeClass,
    getPillClass,
  };
}
