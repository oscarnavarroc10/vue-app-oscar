<template>
  <article class="main-service-card" :style="cardStyle" @click="handleOpen">
    <div class="main-card-glow glow-1"></div>
    <div class="main-card-glow glow-2"></div>

    <div v-if="categoryTheme.icon" class="main-card-icon-wrap">
      <img
        :src="categoryTheme.icon"
        :alt="normalizedCategory"
        class="main-card-icon"
      />
    </div>

    <div class="main-card-top">
      <span class="main-card-badge">{{ normalizedCategory }}</span>
    </div>

    <div class="main-card-body">
      <br />
      <p>{{ service.description }}</p>
    </div>

    <div class="main-card-footer">
      <button class="main-card-btn" type="button" @click.stop="handleOpen">
        Ver servicios
      </button>
    </div>
  </article>
</template>

<script setup>
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

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["open"]);

const handleOpen = () => {
  emit("open", props.service);
};

const normalizeCategory = (cat) => {
  const map = {
    tiktok: "TikTok",
    youtube: "YouTube",
  };

  return map[cat?.toLowerCase()] || cat;
};

const normalizedCategory = computed(() =>
  normalizeCategory(props.service.category),
);

const CATEGORY_THEME_MAP = {
  Instagram: {
    icon: instagramIcon,
    glow1: "rgba(225, 48, 108, 0.16)",
    glow2: "rgba(245, 133, 41, 0.12)",
    badgeBg: "rgba(225, 48, 108, 0.10)",
    badgeColor: "#a61e62",
    buttonGradient: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af)",
    iconBg:
      "linear-gradient(135deg, rgba(245, 133, 41, 0.10), rgba(221, 42, 123, 0.10), rgba(129, 52, 175, 0.10))",
    iconBorder: "rgba(221, 42, 123, 0.14)",
  },
  Facebook: {
    icon: facebookIcon,
    glow1: "rgba(24, 119, 242, 0.16)",
    glow2: "rgba(96, 165, 250, 0.12)",
    badgeBg: "rgba(24, 119, 242, 0.10)",
    badgeColor: "#1857c9",
    buttonGradient: "linear-gradient(135deg, #1877f2, #60a5fa)",
    iconBg:
      "linear-gradient(135deg, rgba(24, 119, 242, 0.08), rgba(96, 165, 250, 0.10))",
    iconBorder: "rgba(24, 119, 242, 0.14)",
  },
  TikTok: {
    icon: tiktokIcon,
    glow1: "rgba(37, 244, 238, 0.12)",
    glow2: "rgba(254, 44, 85, 0.12)",
    badgeBg: "rgba(17, 24, 39, 0.07)",
    badgeColor: "#111827",
    buttonGradient: "linear-gradient(135deg, #111827, #25f4ee, #fe2c55)",
    iconBg:
      "linear-gradient(135deg, rgba(37, 244, 238, 0.08), rgba(254, 44, 85, 0.08))",
    iconBorder: "rgba(17, 24, 39, 0.10)",
  },
  X: {
    icon: xIcon,
    glow1: "rgba(15, 23, 42, 0.12)",
    glow2: "rgba(71, 85, 105, 0.10)",
    badgeBg: "rgba(15, 23, 42, 0.08)",
    badgeColor: "#0f172a",
    buttonGradient: "linear-gradient(135deg, #111827, #334155)",
    iconBg:
      "linear-gradient(135deg, rgba(15, 23, 42, 0.06), rgba(71, 85, 105, 0.08))",
    iconBorder: "rgba(51, 65, 85, 0.12)",
  },
  Discord: {
    icon: discordIcon,
    glow1: "rgba(88, 101, 242, 0.16)",
    glow2: "rgba(129, 140, 248, 0.12)",
    badgeBg: "rgba(88, 101, 242, 0.10)",
    badgeColor: "#4a43d5",
    buttonGradient: "linear-gradient(135deg, #5865f2, #818cf8)",
    iconBg:
      "linear-gradient(135deg, rgba(88, 101, 242, 0.08), rgba(129, 140, 248, 0.10))",
    iconBorder: "rgba(88, 101, 242, 0.14)",
  },
  YouTube: {
    icon: youtubeIcon,
    glow1: "rgba(255, 0, 0, 0.14)",
    glow2: "rgba(248, 113, 113, 0.12)",
    badgeBg: "rgba(220, 38, 38, 0.10)",
    badgeColor: "#c72222",
    buttonGradient: "linear-gradient(135deg, #dc2626, #ef4444)",
    iconBg:
      "linear-gradient(135deg, rgba(255, 0, 0, 0.08), rgba(248, 113, 113, 0.10))",
    iconBorder: "rgba(220, 38, 38, 0.14)",
  },
  Twitch: {
    icon: twitchIcon,
    glow1: "rgba(145, 70, 255, 0.16)",
    glow2: "rgba(196, 181, 253, 0.12)",
    badgeBg: "rgba(145, 70, 255, 0.10)",
    badgeColor: "#7a2fe2",
    buttonGradient: "linear-gradient(135deg, #9146ff, #a855f7)",
    iconBg:
      "linear-gradient(135deg, rgba(145, 70, 255, 0.08), rgba(168, 85, 247, 0.10))",
    iconBorder: "rgba(145, 70, 255, 0.14)",
  },
  Spotify: {
    icon: spotifyIcon,
    glow1: "rgba(29, 185, 84, 0.16)",
    glow2: "rgba(74, 222, 128, 0.12)",
    badgeBg: "rgba(29, 185, 84, 0.10)",
    badgeColor: "#15803d",
    buttonGradient: "linear-gradient(135deg, #1db954, #22c55e)",
    iconBg:
      "linear-gradient(135deg, rgba(29, 185, 84, 0.08), rgba(74, 222, 128, 0.10))",
    iconBorder: "rgba(29, 185, 84, 0.14)",
  },
  Snapchat: {
    icon: snapchatIcon,
    glow1: "rgba(250, 204, 21, 0.16)",
    glow2: "rgba(245, 158, 11, 0.12)",
    badgeBg: "rgba(250, 204, 21, 0.16)",
    badgeColor: "#8a5a00",
    buttonGradient: "linear-gradient(135deg, #facc15, #f59e0b)",
    iconBg:
      "linear-gradient(135deg, rgba(250, 204, 21, 0.10), rgba(245, 158, 11, 0.10))",
    iconBorder: "rgba(245, 158, 11, 0.14)",
  },
  default: {
    icon: null,
    glow1: "rgba(148, 163, 184, 0.14)",
    glow2: "rgba(203, 213, 225, 0.10)",
    badgeBg: "rgba(148, 163, 184, 0.10)",
    badgeColor: "#475569",
    buttonGradient: "linear-gradient(135deg, #334155, #64748b)",
    iconBg:
      "linear-gradient(135deg, rgba(148, 163, 184, 0.08), rgba(203, 213, 225, 0.10))",
    iconBorder: "rgba(148, 163, 184, 0.14)",
  },
};

const categoryTheme = computed(() => {
  return (
    CATEGORY_THEME_MAP[normalizedCategory.value] || CATEGORY_THEME_MAP.default
  );
});

const cardStyle = computed(() => ({
  "--glow-1": categoryTheme.value.glow1,
  "--glow-2": categoryTheme.value.glow2,
  "--badge-bg": categoryTheme.value.badgeBg,
  "--badge-color": categoryTheme.value.badgeColor,
  "--button-gradient": categoryTheme.value.buttonGradient,
  "--icon-bg": categoryTheme.value.iconBg,
  "--icon-border": categoryTheme.value.iconBorder,
}));
</script>

<style scoped>
.main-service-card {
  position: relative;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 26px;
  padding: 20px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(203, 213, 225, 0.85);
  box-shadow:
    0 18px 35px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.75);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.main-card-icon-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.main-card-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(22px);
  pointer-events: none;
  z-index: 0;
}

.glow-1 {
  width: 120px;
  height: 120px;
  top: -20px;
  right: -15px;
  background: var(--glow-1);
  opacity: 0.9;
}

.glow-2 {
  width: 90px;
  height: 90px;
  bottom: -15px;
  left: -10px;
  background: var(--glow-2);
  opacity: 0.6;
}

.main-card-icon-wrap {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 74px;
  height: 74px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--icon-bg);
  border: 1px solid var(--icon-border);
  box-shadow:
    0 10px 24px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  z-index: 1;
}

.main-card-icon {
  width: 42px;
  height: 42px;
  object-fit: contain;
  opacity: 0.95;
  filter: none;
}

.main-card-top,
.main-card-body,
.main-card-footer {
  position: relative;
  z-index: 2;
}

.main-card-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 800;
  background: var(--badge-bg);
  color: var(--badge-color);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
}

.main-card-body {
  max-width: calc(100% - 88px);
}

.main-card-body h3 {
  margin: 16px 0 10px;
  font-size: 1.28rem;
  color: #0f172a;
  line-height: 1.15;
  font-weight: 800;
}

.main-card-body p {
  margin: 0;
  color: #475569;
  line-height: 1.55;
  font-size: 0.98rem;
}

.main-card-footer {
  margin-top: 18px;
}

.main-card-btn {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 14px 16px;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  color: #ffffff;
  background: var(--button-gradient);
  box-shadow:
    0 14px 24px rgba(15, 23, 42, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

@media (max-width: 768px) {
  .main-service-card {
    min-height: 210px;
    padding: 18px;
  }

  .main-card-icon-wrap {
    width: 66px;
    height: 66px;
    top: 16px;
    right: 16px;
  }

  .main-card-icon {
    width: 38px;
    height: 38px;
  }

  .main-card-body {
    max-width: calc(100% - 78px);
  }

  .main-card-body h3 {
    font-size: 1.18rem;
  }

  .main-card-body p {
    font-size: 0.94rem;
  }
}
</style>
