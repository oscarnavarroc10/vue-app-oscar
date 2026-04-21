<template>
  <article class="main-service-card" :style="cardStyle" @click="handleOpen">
    <div class="main-card-glow glow-1"></div>
    <div class="main-card-glow glow-2"></div>
    <div class="main-card-grid"></div>

    <div class="main-card-top">
      <span class="main-card-badge">{{ normalizedCategory }}</span>

      <div v-if="categoryTheme.icon" class="main-card-icon-wrap">
        <img
          :src="categoryTheme.icon"
          :alt="normalizedCategory"
          class="main-card-icon"
        />
      </div>
    </div>

    <div class="main-card-body">
      <h3>{{ getCardTitle(normalizedCategory) }}</h3>
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
import whatsappIcon from "@/assets/whatsapp_neon.svg";
import telegramIcon from "@/assets/telegram_neon.svg";

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

  return map[cat?.toLowerCase()] || cat;
};

const normalizedCategory = computed(() =>
  normalizeCategory(props.service.category)
);

const getCardTitle = (category) => {
  const titles = {
    Instagram: "Haz crecer tu perfil",
    Facebook: "Aumenta tu interacción",
    TikTok: "Haz viral tu contenido",
    X: "Impulsa tu alcance",
    YouTube: "Haz crecer tu canal",
    Spotify: "Gana más visibilidad",
    Snapchat: "Conecta con tu audiencia",
    Telegram: "Impulsa tu comunidad",
    WhatsApp: "Haz crecer tu canal",
    Discord: "Fortalece tu servidor",
    Twitch: "Aumenta tu presencia",
  };

  return titles[category] || `Servicios para ${category}`;
};

const CATEGORY_THEME_MAP = {
  Instagram: {
    icon: instagramIcon,
    glow1: "rgba(225, 48, 108, 0.18)",
    glow2: "rgba(245, 133, 41, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(245, 133, 41, 0.16), rgba(221, 42, 123, 0.18), rgba(129, 52, 175, 0.16))",
    badgeColor: "#f9a8d4",
    badgeBorder: "rgba(221, 42, 123, 0.18)",
    buttonGradient: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af)",
    iconBg:
      "linear-gradient(135deg, rgba(245, 133, 41, 0.10), rgba(221, 42, 123, 0.10), rgba(129, 52, 175, 0.10))",
    iconBorder: "rgba(221, 42, 123, 0.14)",
  },
  Facebook: {
    icon: facebookIcon,
    glow1: "rgba(24, 119, 242, 0.18)",
    glow2: "rgba(96, 165, 250, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(24, 119, 242, 0.16), rgba(96, 165, 250, 0.18))",
    badgeColor: "#93c5fd",
    badgeBorder: "rgba(24, 119, 242, 0.18)",
    buttonGradient: "linear-gradient(135deg, #1877f2, #60a5fa)",
    iconBg:
      "linear-gradient(135deg, rgba(24, 119, 242, 0.08), rgba(96, 165, 250, 0.10))",
    iconBorder: "rgba(24, 119, 242, 0.14)",
  },
  TikTok: {
    icon: tiktokIcon,
    glow1: "rgba(37, 244, 238, 0.16)",
    glow2: "rgba(254, 44, 85, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(37, 244, 238, 0.12), rgba(17, 24, 39, 0.18), rgba(254, 44, 85, 0.12))",
    badgeColor: "#e2e8f0",
    badgeBorder: "rgba(148, 163, 184, 0.14)",
    buttonGradient: "linear-gradient(135deg, #111827, #25f4ee, #fe2c55)",
    iconBg:
      "linear-gradient(135deg, rgba(37, 244, 238, 0.08), rgba(254, 44, 85, 0.08))",
    iconBorder: "rgba(148, 163, 184, 0.12)",
  },
  X: {
    icon: xIcon,
    glow1: "rgba(71, 85, 105, 0.18)",
    glow2: "rgba(148, 163, 184, 0.12)",
    badgeBg:
      "linear-gradient(135deg, rgba(30, 41, 59, 0.16), rgba(71, 85, 105, 0.18))",
    badgeColor: "#cbd5e1",
    badgeBorder: "rgba(148, 163, 184, 0.12)",
    buttonGradient: "linear-gradient(135deg, #0f172a, #334155)",
    iconBg:
      "linear-gradient(135deg, rgba(30, 41, 59, 0.08), rgba(71, 85, 105, 0.08))",
    iconBorder: "rgba(148, 163, 184, 0.10)",
  },
  Discord: {
    icon: discordIcon,
    glow1: "rgba(88, 101, 242, 0.18)",
    glow2: "rgba(129, 140, 248, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(88, 101, 242, 0.16), rgba(129, 140, 248, 0.18))",
    badgeColor: "#c4b5fd",
    badgeBorder: "rgba(88, 101, 242, 0.16)",
    buttonGradient: "linear-gradient(135deg, #5865f2, #818cf8)",
    iconBg:
      "linear-gradient(135deg, rgba(88, 101, 242, 0.08), rgba(129, 140, 248, 0.10))",
    iconBorder: "rgba(88, 101, 242, 0.14)",
  },
  YouTube: {
    icon: youtubeIcon,
    glow1: "rgba(255, 0, 0, 0.16)",
    glow2: "rgba(248, 113, 113, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(255, 0, 0, 0.12), rgba(239, 68, 68, 0.16))",
    badgeColor: "#fca5a5",
    badgeBorder: "rgba(220, 38, 38, 0.16)",
    buttonGradient: "linear-gradient(135deg, #dc2626, #ef4444)",
    iconBg:
      "linear-gradient(135deg, rgba(255, 0, 0, 0.08), rgba(248, 113, 113, 0.10))",
    iconBorder: "rgba(220, 38, 38, 0.14)",
  },
  Twitch: {
    icon: twitchIcon,
    glow1: "rgba(145, 70, 255, 0.18)",
    glow2: "rgba(196, 181, 253, 0.12)",
    badgeBg:
      "linear-gradient(135deg, rgba(145, 70, 255, 0.16), rgba(168, 85, 247, 0.18))",
    badgeColor: "#d8b4fe",
    badgeBorder: "rgba(145, 70, 255, 0.16)",
    buttonGradient: "linear-gradient(135deg, #9146ff, #a855f7)",
    iconBg:
      "linear-gradient(135deg, rgba(145, 70, 255, 0.08), rgba(168, 85, 247, 0.10))",
    iconBorder: "rgba(145, 70, 255, 0.14)",
  },
  Spotify: {
    icon: spotifyIcon,
    glow1: "rgba(29, 185, 84, 0.16)",
    glow2: "rgba(74, 222, 128, 0.12)",
    badgeBg:
      "linear-gradient(135deg, rgba(29, 185, 84, 0.16), rgba(34, 197, 94, 0.18))",
    badgeColor: "#86efac",
    badgeBorder: "rgba(29, 185, 84, 0.16)",
    buttonGradient: "linear-gradient(135deg, #1db954, #22c55e)",
    iconBg:
      "linear-gradient(135deg, rgba(29, 185, 84, 0.08), rgba(74, 222, 128, 0.10))",
    iconBorder: "rgba(29, 185, 84, 0.14)",
  },
  Snapchat: {
    icon: snapchatIcon,
    glow1: "rgba(250, 204, 21, 0.18)",
    glow2: "rgba(245, 158, 11, 0.12)",
    badgeBg:
      "linear-gradient(135deg, rgba(250, 204, 21, 0.18), rgba(245, 158, 11, 0.18))",
    badgeColor: "#fde68a",
    badgeBorder: "rgba(245, 158, 11, 0.16)",
    buttonGradient: "linear-gradient(135deg, #facc15, #f59e0b)",
    iconBg:
      "linear-gradient(135deg, rgba(250, 204, 21, 0.10), rgba(245, 158, 11, 0.10))",
    iconBorder: "rgba(245, 158, 11, 0.14)",
  },
  Telegram: {
    icon: telegramIcon,
    glow1: "rgba(0, 136, 204, 0.18)",
    glow2: "rgba(56, 189, 248, 0.12)",
    badgeBg:
      "linear-gradient(135deg, rgba(0, 136, 204, 0.16), rgba(56, 189, 248, 0.18))",
    badgeColor: "#7dd3fc",
    badgeBorder: "rgba(0, 136, 204, 0.16)",
    buttonGradient: "linear-gradient(135deg, #0088cc, #38bdf8)",
    iconBg:
      "linear-gradient(135deg, rgba(0, 136, 204, 0.08), rgba(56, 189, 248, 0.10))",
    iconBorder: "rgba(0, 136, 204, 0.14)",
  },
  WhatsApp: {
    icon: whatsappIcon,
    glow1: "rgba(37, 211, 102, 0.18)",
    glow2: "rgba(134, 239, 172, 0.12)",
    badgeBg:
      "linear-gradient(135deg, rgba(37, 211, 102, 0.16), rgba(74, 222, 128, 0.18))",
    badgeColor: "#86efac",
    badgeBorder: "rgba(37, 211, 102, 0.16)",
    buttonGradient: "linear-gradient(135deg, #25d366, #4ade80)",
    iconBg:
      "linear-gradient(135deg, rgba(37, 211, 102, 0.08), rgba(134, 239, 172, 0.10))",
    iconBorder: "rgba(37, 211, 102, 0.14)",
  },
  default: {
    icon: null,
    glow1: "rgba(148, 163, 184, 0.16)",
    glow2: "rgba(203, 213, 225, 0.10)",
    badgeBg:
      "linear-gradient(135deg, rgba(148, 163, 184, 0.12), rgba(203, 213, 225, 0.16))",
    badgeColor: "#cbd5e1",
    badgeBorder: "rgba(148, 163, 184, 0.14)",
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
  "--badge-border": categoryTheme.value.badgeBorder,
  "--button-gradient": categoryTheme.value.buttonGradient,
  "--icon-bg": categoryTheme.value.iconBg,
  "--icon-border": categoryTheme.value.iconBorder,
}));
</script>

<style scoped>
.main-service-card {
  position: relative;
  min-height: 310px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  border-radius: 28px;
  padding: 22px;

  cursor: pointer;

  background:
    linear-gradient(
      180deg,
      rgba(10, 18, 34, 0.9) 0%,
      rgba(8, 14, 26, 0.94) 100%
    );

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 20px 40px rgba(2, 6, 23, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;
}

.main-service-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.12);

  box-shadow:
    0 26px 48px rgba(2, 6, 23, 0.3),
    0 0 22px rgba(59, 130, 246, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.main-card-glow,
.main-card-grid {
  pointer-events: none;
  position: absolute;
}

.main-card-glow {
  border-radius: 999px;
  filter: blur(28px);
  z-index: 0;
}

.glow-1 {
  width: 150px;
  height: 150px;
  top: -34px;
  right: -28px;
  background: var(--glow-1);
  opacity: 0.8;
}

.glow-2 {
  width: 110px;
  height: 110px;
  bottom: -26px;
  left: -18px;
  background: var(--glow-2);
  opacity: 0.5;
}

.main-card-grid {
  inset: 0;
  z-index: 0;
  opacity: 0.06;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent 85%);
}

.main-card-top,
.main-card-body,
.main-card-footer {
  position: relative;
  z-index: 2;
}

.main-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 24px;
}

.main-card-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;

  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.01em;

  background: var(--badge-bg);
  color: var(--badge-color);
  border: 1px solid var(--badge-border);

  box-shadow:
    0 8px 18px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.main-card-icon-wrap {
  flex-shrink: 0;

  width: 84px;
  height: 84px;
  border-radius: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--icon-bg);
  border: 1px solid var(--icon-border);

  box-shadow:
    0 14px 24px rgba(2, 6, 23, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.main-card-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
  opacity: 0.96;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
}

.main-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.main-card-body h3 {
  margin: 0;
  font-size: 1.65rem;
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #ffffff;
  max-width: 90%;
}

.main-card-body p {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.01em;
  color: #94a3b8;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.main-card-footer {
  margin-top: auto;
  padding-top: 22px;
}

.main-card-btn {
  width: 100%;
  min-height: 52px;

  border: none;
  border-radius: 18px;
  padding: 14px 16px;

  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.01em;
  cursor: pointer;
  color: #ffffff;

  background: var(--button-gradient);

  box-shadow:
    0 14px 24px rgba(15, 23, 42, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.main-card-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
  box-shadow:
    0 18px 30px rgba(15, 23, 42, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

@media (max-width: 768px) {
  .main-service-card {
    min-height: 290px;
    padding: 18px;
    border-radius: 24px;
  }

  .main-card-top {
    margin-bottom: 20px;
  }

  .main-card-icon-wrap {
    width: 72px;
    height: 72px;
    border-radius: 20px;
  }

  .main-card-icon {
    width: 38px;
    height: 38px;
  }

  .main-card-body h3 {
    font-size: 1.35rem;
    max-width: 100%;
  }

  .main-card-body p {
    font-size: 0.94rem;
    line-height: 1.65;
  }

  .main-card-btn {
    min-height: 48px;
    font-size: 0.95rem;
  }
}
</style>