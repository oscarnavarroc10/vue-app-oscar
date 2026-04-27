<template>
  <article class="main-service-card" :style="cardStyle" @click="handleOpen">
    <div class="card-noise"></div>
    <div class="card-grid"></div>
    <div class="card-glow card-glow--one"></div>
    <div class="card-glow card-glow--two"></div>

    <div class="card-top">
      <span class="platform-pill">
        <img
          v-if="categoryTheme.icon"
          :src="categoryTheme.icon"
          :alt="normalizedCategory"
        />
        {{ normalizedCategory }}
      </span>

      <span class="status-pill">Disponible</span>
    </div>

    <div class="visual-stage">
      <div class="orbit orbit--one"></div>
      <div class="orbit orbit--two"></div>

      <div v-if="categoryTheme.icon" class="icon-capsule">
        <img
          :src="categoryTheme.icon"
          :alt="normalizedCategory"
          class="main-card-icon"
        />
      </div>

      <div class="spark spark--one"></div>
      <div class="spark spark--two"></div>
      <div class="spark spark--three"></div>
    </div>

    <div class="main-card-body">
      <h3>{{ getCardTitle(normalizedCategory) }}</h3>
      <p>{{ service.description }}</p>
    </div>

    <div class="mini-benefits">
      <span>⚡ Rápido</span>
      <span>🔒 Seguro</span>
      <span>Sin contraseña</span>
    </div>

    <button class="main-card-btn" type="button" @click.stop="handleOpen">
      Ver servicios
      <span>→</span>
    </button>
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
  normalizeCategory(props.service.category),
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
    glow1: "rgba(236, 72, 153, 0.34)",
    glow2: "rgba(249, 115, 22, 0.24)",
    accent: "#f9a8d4",
    accentSoft: "rgba(236, 72, 153, 0.16)",
    border: "rgba(236, 72, 153, 0.2)",
    buttonGradient: "linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)",
    iconBg:
      "linear-gradient(135deg, rgba(249,115,22,.18), rgba(236,72,153,.18), rgba(139,92,246,.14))",
  },
  Facebook: {
    icon: facebookIcon,
    glow1: "rgba(59, 130, 246, 0.34)",
    glow2: "rgba(96, 165, 250, 0.2)",
    accent: "#93c5fd",
    accentSoft: "rgba(59, 130, 246, 0.16)",
    border: "rgba(59, 130, 246, 0.2)",
    buttonGradient: "linear-gradient(135deg, #2563eb, #60a5fa)",
    iconBg:
      "linear-gradient(135deg, rgba(37,99,235,.18), rgba(96,165,250,.16))",
  },
  TikTok: {
    icon: tiktokIcon,
    glow1: "rgba(34, 211, 238, 0.28)",
    glow2: "rgba(236, 72, 153, 0.22)",
    accent: "#e2e8f0",
    accentSoft: "rgba(34, 211, 238, 0.13)",
    border: "rgba(148, 163, 184, 0.18)",
    buttonGradient: "linear-gradient(135deg, #111827, #22d3ee, #ec4899)",
    iconBg:
      "linear-gradient(135deg, rgba(34,211,238,.14), rgba(236,72,153,.14))",
  },
  X: {
    icon: xIcon,
    glow1: "rgba(148, 163, 184, 0.24)",
    glow2: "rgba(255, 255, 255, 0.12)",
    accent: "#cbd5e1",
    accentSoft: "rgba(148, 163, 184, 0.12)",
    border: "rgba(148, 163, 184, 0.18)",
    buttonGradient: "linear-gradient(135deg, #0f172a, #334155, #64748b)",
    iconBg:
      "linear-gradient(135deg, rgba(148,163,184,.16), rgba(30,41,59,.18))",
  },
  YouTube: {
    icon: youtubeIcon,
    glow1: "rgba(239, 68, 68, 0.28)",
    glow2: "rgba(248, 113, 113, 0.18)",
    accent: "#fca5a5",
    accentSoft: "rgba(239, 68, 68, 0.14)",
    border: "rgba(239, 68, 68, 0.18)",
    buttonGradient: "linear-gradient(135deg, #dc2626, #ef4444)",
    iconBg:
      "linear-gradient(135deg, rgba(220,38,38,.16), rgba(248,113,113,.14))",
  },
  Spotify: {
    icon: spotifyIcon,
    glow1: "rgba(34, 197, 94, 0.26)",
    glow2: "rgba(134, 239, 172, 0.16)",
    accent: "#86efac",
    accentSoft: "rgba(34, 197, 94, 0.14)",
    border: "rgba(34, 197, 94, 0.18)",
    buttonGradient: "linear-gradient(135deg, #16a34a, #22c55e)",
    iconBg:
      "linear-gradient(135deg, rgba(34,197,94,.16), rgba(134,239,172,.12))",
  },
  Telegram: {
    icon: telegramIcon,
    glow1: "rgba(56, 189, 248, 0.28)",
    glow2: "rgba(14, 165, 233, 0.16)",
    accent: "#7dd3fc",
    accentSoft: "rgba(56, 189, 248, 0.14)",
    border: "rgba(56, 189, 248, 0.18)",
    buttonGradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
    iconBg:
      "linear-gradient(135deg, rgba(14,165,233,.16), rgba(56,189,248,.14))",
  },
  WhatsApp: {
    icon: whatsappIcon,
    glow1: "rgba(37, 211, 102, 0.26)",
    glow2: "rgba(134, 239, 172, 0.16)",
    accent: "#86efac",
    accentSoft: "rgba(37, 211, 102, 0.14)",
    border: "rgba(37, 211, 102, 0.18)",
    buttonGradient: "linear-gradient(135deg, #16a34a, #25d366)",
    iconBg:
      "linear-gradient(135deg, rgba(37,211,102,.16), rgba(134,239,172,.12))",
  },
  Discord: {
    icon: discordIcon,
    glow1: "rgba(129, 140, 248, 0.28)",
    glow2: "rgba(168, 85, 247, 0.16)",
    accent: "#c4b5fd",
    accentSoft: "rgba(129, 140, 248, 0.14)",
    border: "rgba(129, 140, 248, 0.18)",
    buttonGradient: "linear-gradient(135deg, #5865f2, #8b5cf6)",
    iconBg:
      "linear-gradient(135deg, rgba(88,101,242,.16), rgba(168,85,247,.14))",
  },
  Twitch: {
    icon: twitchIcon,
    glow1: "rgba(168, 85, 247, 0.3)",
    glow2: "rgba(196, 181, 253, 0.14)",
    accent: "#d8b4fe",
    accentSoft: "rgba(168, 85, 247, 0.14)",
    border: "rgba(168, 85, 247, 0.18)",
    buttonGradient: "linear-gradient(135deg, #7c3aed, #a855f7)",
    iconBg:
      "linear-gradient(135deg, rgba(124,58,237,.16), rgba(168,85,247,.14))",
  },
  Snapchat: {
    icon: snapchatIcon,
    glow1: "rgba(250, 204, 21, 0.26)",
    glow2: "rgba(245, 158, 11, 0.16)",
    accent: "#fde68a",
    accentSoft: "rgba(250, 204, 21, 0.14)",
    border: "rgba(250, 204, 21, 0.18)",
    buttonGradient: "linear-gradient(135deg, #facc15, #f97316)",
    iconBg:
      "linear-gradient(135deg, rgba(250,204,21,.16), rgba(245,158,11,.14))",
  },
  default: {
    icon: null,
    glow1: "rgba(148, 163, 184, 0.2)",
    glow2: "rgba(203, 213, 225, 0.12)",
    accent: "#cbd5e1",
    accentSoft: "rgba(148, 163, 184, 0.12)",
    border: "rgba(148, 163, 184, 0.16)",
    buttonGradient: "linear-gradient(135deg, #334155, #64748b)",
    iconBg:
      "linear-gradient(135deg, rgba(148,163,184,.14), rgba(203,213,225,.1))",
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
  "--accent": categoryTheme.value.accent,
  "--accent-soft": categoryTheme.value.accentSoft,
  "--theme-border": categoryTheme.value.border,
  "--button-gradient": categoryTheme.value.buttonGradient,
  "--icon-bg": categoryTheme.value.iconBg,
}));
</script>

<style scoped>
.main-service-card {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 22px;
  border-radius: 30px;
  cursor: pointer;
  isolation: isolate;
  background:
    radial-gradient(circle at 80% 10%, var(--glow-1), transparent 28%),
    radial-gradient(circle at 10% 100%, var(--glow-2), transparent 32%),
    linear-gradient(180deg, rgba(15, 12, 34, 0.88), rgba(7, 9, 22, 0.97));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 26px 56px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition:
    transform 0.24s ease,
    border-color 0.24s ease,
    box-shadow 0.24s ease;
}

.main-service-card:hover {
  transform: translateY(-8px);
  border-color: var(--theme-border);
  box-shadow:
    0 36px 72px rgba(0, 0, 0, 0.44),
    0 0 34px var(--glow-1),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.card-noise,
.card-grid,
.card-glow,
.orbit,
.spark {
  position: absolute;
  pointer-events: none;
}

.card-noise {
  inset: 0;
  z-index: -1;
  opacity: 0.045;
  background-image:
    repeating-radial-gradient(
      circle at 20% 20%,
      rgba(255, 255, 255, 0.7) 0 1px,
      transparent 1px 4px
    );
}

.card-grid {
  inset: 0;
  z-index: -1;
  opacity: 0.06;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 80%);
}

.card-glow {
  z-index: -1;
  border-radius: 999px;
  filter: blur(36px);
}

.card-glow--one {
  width: 180px;
  height: 180px;
  right: -54px;
  top: -50px;
  background: var(--glow-1);
  opacity: 0.78;
}

.card-glow--two {
  width: 150px;
  height: 150px;
  left: -48px;
  bottom: -60px;
  background: var(--glow-2);
  opacity: 0.62;
}

.card-top {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.platform-pill,
.status-pill {
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 950;
  background: rgba(255, 255, 255, 0.065);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.platform-pill {
  color: var(--accent);
  background: var(--accent-soft);
  border-color: var(--theme-border);
}

.platform-pill img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.status-pill {
  color: #bbf7d0;
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.14);
}

.visual-stage {
  position: relative;
  z-index: 2;
  height: 120px;
  margin: 18px 0 6px;
  display: grid;
  place-items: center;
}

.icon-capsule {
  position: relative;
  z-index: 3;
  width: 96px;
  height: 96px;
  border-radius: 30px;
  display: grid;
  place-items: center;
  background: var(--icon-bg);
  border: 1px solid var(--theme-border);
  box-shadow:
    0 24px 44px rgba(0, 0, 0, 0.34),
    0 0 28px var(--glow-1),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  transform: rotate(-4deg);
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease;
}

.main-service-card:hover .icon-capsule {
  transform: rotate(0deg) scale(1.04);
  box-shadow:
    0 30px 52px rgba(0, 0, 0, 0.42),
    0 0 36px var(--glow-1),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

.main-card-icon {
  width: 54px;
  height: 54px;
  object-fit: contain;
  filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.18));
}

.orbit {
  border-radius: 999px;
  border: 1px solid var(--theme-border);
  opacity: 0.42;
}

.orbit--one {
  width: 170px;
  height: 70px;
  transform: rotate(-16deg);
}

.orbit--two {
  width: 130px;
  height: 54px;
  transform: rotate(18deg);
}

.spark {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 18px var(--accent);
}

.spark--one {
  top: 16px;
  left: 22%;
}

.spark--two {
  right: 22%;
  bottom: 24px;
}

.spark--three {
  right: 34%;
  top: 12px;
  width: 5px;
  height: 5px;
}

.main-card-body {
  position: relative;
  z-index: 2;
  flex: 1;
}

.main-card-body h3 {
  margin: 0;
  max-width: 92%;
  color: #ffffff;
  font-size: clamp(1.55rem, 2.4vw, 2rem);
  line-height: 1.02;
  letter-spacing: -0.055em;
  font-weight: 950;
}

.main-card-body p {
  margin: 12px 0 0;
  color: #aab6ca;
  font-size: 0.98rem;
  line-height: 1.62;
  font-weight: 650;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mini-benefits {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
}

.mini-benefits span {
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  color: #e5e7eb;
  font-size: 0.72rem;
  font-weight: 850;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.main-card-btn {
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 54px;
  margin-top: 18px;
  border: none;
  border-radius: 18px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.98rem;
  font-weight: 950;
  background: var(--button-gradient);
  box-shadow:
    0 18px 34px rgba(0, 0, 0, 0.28),
    0 0 22px var(--glow-1),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

.main-card-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.06);
}

.main-card-btn span {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .main-service-card {
    min-height: 320px;
    padding: 18px;
    border-radius: 24px;
  }

  .visual-stage {
    height: 104px;
    margin: 14px 0 4px;
  }

  .icon-capsule {
    width: 82px;
    height: 82px;
    border-radius: 25px;
  }

  .main-card-icon {
    width: 46px;
    height: 46px;
  }

  .main-card-body h3 {
    max-width: 100%;
    font-size: 1.45rem;
  }

  .main-card-body p {
    font-size: 0.92rem;
    line-height: 1.55;
  }

  .main-card-btn {
    min-height: 50px;
    border-radius: 16px;
  }

  .status-pill {
    display: none;
  }
}
</style>