<template>
  <article class="sub-service-card" :style="cardStyle">
    <div class="sub-card-glow glow-1"></div>
    <div class="sub-card-glow glow-2"></div>
    <div class="sub-card-top">
      <span class="sub-card-badge">
        <img
          v-if="platformIcon"
          :src="platformIcon"
          :alt="service.category"
          class="sub-card-icon"
          aria-hidden="true"
        />
        {{ service.category }}
      </span>
      <strong class="sub-card-price">
        Precio: ${{ formatPrice(service.price) }} por cada 1000
      </strong>
    </div>
    <div class="sub-card-body">
      <h3>{{ service.name }}</h3>

      <div v-if="selectedQuantity > 0" class="selected-info">
        <span class="selected-badge">
          {{ selectedQuantity }}
        </span>
        <small>seleccionados</small>
      </div>
    </div>
    <div class="sub-card-profile">
      <div class="profile-label-row">
        <label class="profile-label" :for="`profile-${service.id}`">
          Link
        </label>
        <div
          class="profile-help-wrap"
          @mouseenter="showHelp = true"
          @mouseleave="showHelp = false"
        >
          <button
            type="button"
            class="profile-help-btn"
            @click.stop="showHelp = !showHelp"
            @focus="showHelp = true"
            @blur="showHelp = false"
          >
            !
          </button>
          <div v-if="showHelp" class="profile-help-tooltip">
            El link es necesario
          </div>
        </div>
      </div>
      <input
        :id="`profile-${service.id}`"
        v-model.trim="profileLink"
        class="profile-input"
        :class="{ 'profile-input-error': showProfileError }"
        type="url"
        :placeholder="profilePlaceholder"
      />
      <small v-if="showProfileError" class="profile-error-label">
        Indica un link válido
      </small>
    </div>
    <div class="sub-card-footer">
      <button class="sub-card-btn" type="button" @click="handleAddToCart">
        {{ selectedQuantity > 0 ? "Agregar más" : "Agregar al carrito" }}
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
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
  cart: {
    type: Array,
    required: true,
  },
  formatPrice: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["add"]);

const showHelp = ref(false);
const profileLink = ref("");
const showProfileError = ref(false);

const normalizeProfile = (value) => {
  return (value || "").trim().replace(/\/+$/, "");
};

const handleClickOutside = () => {
  showHelp.value = false;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const isValidProfileUrl = (value) => {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

watch(profileLink, (newValue) => {
  if (isValidProfileUrl(newValue)) {
    showProfileError.value = false;
  }
});

const selectedQuantity = computed(() => {
  const normalizedProfile = normalizeProfile(profileLink.value);

  if (!normalizedProfile) return 0;

  return props.cart
    .filter(
      (item) =>
        item.id === props.service.id &&
        normalizeProfile(item.profile) === normalizedProfile,
    )
    .reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
});

const handleAddToCart = () => {
  if (!isValidProfileUrl(profileLink.value)) {
    showProfileError.value = true;
    return;
  }

  const normalizedProfile = normalizeProfile(profileLink.value);

  showProfileError.value = false;

  emit("add", {
    ...props.service,
    profile: normalizedProfile,
  });
};

const SOCIAL_THEME_MAP = {
  Instagram: {
    glow1: "rgba(225, 48, 108, 0.18)",
    glow2: "rgba(245, 133, 41, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(245, 133, 41, 0.18), rgba(221, 42, 123, 0.20), rgba(129, 52, 175, 0.18))",
    badgeColor: "#8a1e5d",
    badgeBorder: "rgba(221, 42, 123, 0.28)",
    badgeShadow: "rgba(221, 42, 123, 0.18)",
    buttonGradient: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af)",
    icon: instagramIcon,
  },
  Facebook: {
    glow1: "rgba(24, 119, 242, 0.18)",
    glow2: "rgba(96, 165, 250, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(24, 119, 242, 0.16), rgba(96, 165, 250, 0.18))",
    badgeColor: "#1454b8",
    badgeBorder: "rgba(24, 119, 242, 0.24)",
    badgeShadow: "rgba(24, 119, 242, 0.16)",
    buttonGradient: "linear-gradient(135deg, #1877f2, #60a5fa)",
    icon: facebookIcon,
  },
  TikTok: {
    glow1: "rgba(37, 244, 238, 0.16)",
    glow2: "rgba(254, 44, 85, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(37, 244, 238, 0.14), rgba(17, 24, 39, 0.18), rgba(254, 44, 85, 0.14))",
    badgeColor: "#111827",
    badgeBorder: "rgba(17, 24, 39, 0.20)",
    badgeShadow: "rgba(17, 24, 39, 0.10)",
    buttonGradient: "linear-gradient(135deg, #111827, #25f4ee, #fe2c55)",
    icon: tiktokIcon,
  },
  YouTube: {
    glow1: "rgba(255, 0, 0, 0.18)",
    glow2: "rgba(248, 113, 113, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(255, 0, 0, 0.14), rgba(239, 68, 68, 0.18))",
    badgeColor: "#b91c1c",
    badgeBorder: "rgba(220, 38, 38, 0.24)",
    badgeShadow: "rgba(220, 38, 38, 0.16)",
    buttonGradient: "linear-gradient(135deg, #dc2626, #ef4444)",
    icon: youtubeIcon,
  },
  Snapchat: {
    glow1: "rgba(250, 204, 21, 0.18)",
    glow2: "rgba(253, 224, 71, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(250, 204, 21, 0.22), rgba(245, 158, 11, 0.18))",
    badgeColor: "#854d0e",
    badgeBorder: "rgba(245, 158, 11, 0.24)",
    badgeShadow: "rgba(245, 158, 11, 0.18)",
    buttonGradient: "linear-gradient(135deg, #facc15, #f59e0b)",
    icon: snapchatIcon,
  },
  X: {
    glow1: "rgba(15, 23, 42, 0.18)",
    glow2: "rgba(71, 85, 105, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(30, 41, 59, 0.14), rgba(71, 85, 105, 0.16))",
    badgeColor: "#0f172a",
    badgeBorder: "rgba(51, 65, 85, 0.22)",
    badgeShadow: "rgba(15, 23, 42, 0.12)",
    buttonGradient: "linear-gradient(135deg, #111827, #334155)",
    icon: xIcon,
  },
  Discord: {
    glow1: "rgba(88, 101, 242, 0.18)",
    glow2: "rgba(129, 140, 248, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(88, 101, 242, 0.16), rgba(129, 140, 248, 0.18))",
    badgeColor: "#4338ca",
    badgeBorder: "rgba(88, 101, 242, 0.26)",
    badgeShadow: "rgba(88, 101, 242, 0.16)",
    buttonGradient: "linear-gradient(135deg, #5865f2, #818cf8)",
    icon: discordIcon,
  },
  Twitch: {
    glow1: "rgba(145, 70, 255, 0.18)",
    glow2: "rgba(196, 181, 253, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(145, 70, 255, 0.16), rgba(168, 85, 247, 0.18))",
    badgeColor: "#6d28d9",
    badgeBorder: "rgba(145, 70, 255, 0.24)",
    badgeShadow: "rgba(145, 70, 255, 0.16)",
    buttonGradient: "linear-gradient(135deg, #9146ff, #a855f7)",
    icon: twitchIcon,
  },
  Spotify: {
    glow1: "rgba(29, 185, 84, 0.18)",
    glow2: "rgba(74, 222, 128, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(29, 185, 84, 0.16), rgba(34, 197, 94, 0.18))",
    badgeColor: "#166534",
    badgeBorder: "rgba(29, 185, 84, 0.24)",
    badgeShadow: "rgba(29, 185, 84, 0.16)",
    buttonGradient: "linear-gradient(135deg, #1db954, #22c55e)",
    icon: spotifyIcon,
  },
  Telegram: {
    glow1: "rgba(0, 136, 204, 0.18)",
    glow2: "rgba(56, 189, 248, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(0, 136, 204, 0.16), rgba(56, 189, 248, 0.18))",
    badgeColor: "#0b6fa4",
    badgeBorder: "rgba(0, 136, 204, 0.24)",
    badgeShadow: "rgba(0, 136, 204, 0.16)",
    buttonGradient: "linear-gradient(135deg, #0088cc, #38bdf8)",
    icon: telegramIcon,
  },
  WhatsApp: {
    glow1: "rgba(37, 211, 102, 0.18)",
    glow2: "rgba(134, 239, 172, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(37, 211, 102, 0.16), rgba(74, 222, 128, 0.18))",
    badgeColor: "#15803d",
    badgeBorder: "rgba(37, 211, 102, 0.24)",
    badgeShadow: "rgba(37, 211, 102, 0.16)",
    buttonGradient: "linear-gradient(135deg, #25d366, #4ade80)",
    icon: whatsappIcon,
  },
  default: {
    glow1: "rgba(148, 163, 184, 0.16)",
    glow2: "rgba(203, 213, 225, 0.12)",
    badgeBg:
      "linear-gradient(135deg, rgba(148, 163, 184, 0.12), rgba(203, 213, 225, 0.16))",
    badgeColor: "#475569",
    badgeBorder: "rgba(148, 163, 184, 0.20)",
    badgeShadow: "rgba(148, 163, 184, 0.12)",
    buttonGradient: "linear-gradient(135deg, #334155, #64748b)",
    icon: null,
  },
};

const socialTheme = computed(() => {
  return SOCIAL_THEME_MAP[props.service.category] || SOCIAL_THEME_MAP.default;
});

const platformIcon = computed(() => socialTheme.value.icon);

const profilePlaceholder = computed(() => {
  const map = {
    Instagram: "ejemplo: https://www.instagram.com/tu_usuario/",
    Facebook: "ejemplo: https://www.facebook.com/tu_perfil/",
    TikTok: "ejemplo: https://www.tiktok.com/@tu_usuario",
    YouTube: "ejemplo: https://www.youtube.com/@tu_canal",
    Snapchat: "ejemplo: https://www.snapchat.com/add/tu_usuario",
    X: "ejemplo: https://x.com/tu_usuario",
    Discord: "ejemplo: https://discord.gg/tu-servidor",
    Twitch: "ejemplo: https://www.twitch.tv/tu_canal",
    Spotify: "ejemplo: https://open.spotify.com/artist/...",
  };

  return map[props.service.category] || "Pega aquí tu perfil o enlace";
});

const cardStyle = computed(() => ({
  "--glow-1": socialTheme.value.glow1,
  "--glow-2": socialTheme.value.glow2,
  "--badge-bg": socialTheme.value.badgeBg,
  "--badge-color": socialTheme.value.badgeColor,
  "--badge-border": socialTheme.value.badgeBorder,
  "--badge-shadow": socialTheme.value.badgeShadow,
  "--button-gradient": socialTheme.value.buttonGradient,
}));
</script>
<style scoped>
.profile-error-label {
  font-size: 0.75rem;
  color: #ef4444; /* rojo moderno (tailwind red-500) */
  margin-top: 4px;
  display: block;
}

.profile-label-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-help-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.profile-help-btn {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 999px;
  background: #111827;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
}

.profile-help-tooltip {
  position: absolute;
  top: 50%;
  left: calc(100% + 8px);
  transform: translateY(-50%);
  z-index: 30;
  min-width: 190px;
  max-width: 240px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #111827;
  color: #ffffff;
  font-size: 0.78rem;
  line-height: 1.35;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
  white-space: normal;
}

.profile-help-tooltip::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -6px;
  transform: translateY(-50%);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #111827;
}

.sub-card-profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
  margin-bottom: 14px;
}

.profile-label {
  display: block;
  margin: 0 0 4px 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: #1f2937;
}

.profile-input {
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  padding: 0 12px;
  font-size: 0.9rem;
}

.profile-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.sub-service-card {
  position: relative;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 24px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.84);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(203, 213, 225, 0.8);
  box-shadow:
    0 18px 38px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.sub-service-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 24px 46px rgba(15, 23, 42, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.68);
}

.sub-card-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(18px);
  pointer-events: none;
}

.glow-1 {
  width: 110px;
  height: 110px;
  top: -20px;
  right: -15px;
  opacity: 0.75;
  background: var(--glow-1);
}

.glow-2 {
  width: 80px;
  height: 80px;
  bottom: -10px;
  left: -10px;
  opacity: 0.45;
  background: var(--glow-2);
}

.sub-card-top,
.sub-card-body,
.sub-card-footer {
  position: relative;
  z-index: 1;
}

.sub-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.sub-card-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 800;
  background: var(--badge-bg);
  color: var(--badge-color);
  border: 1px solid var(--badge-border);
  box-shadow:
    0 6px 18px var(--badge-shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
}

.sub-card-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.18));
}

.sub-card-price {
  color: #0f172a;
  font-size: 1rem;
}

.sub-card-body h3 {
  margin: 16px 0 10px;
  font-size: 1.1rem;
  color: #0f172a;
  line-height: 1.2;
}

.sub-card-body p {
  margin: 0;
  color: #475569;
  line-height: 1.5;
  font-size: 0.94rem;
}

.selected-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}

.selected-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 42px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.08);
  color: #0f172a;
  font-size: 0.82rem;
  font-weight: 800;
}

.selected-info small {
  color: #475569;
  font-weight: 700;
}

.sub-card-btn {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 13px 16px;
  font-size: 0.93rem;
  font-weight: 800;
  cursor: pointer;
  color: #ffffff;
  background: var(--button-gradient);
}
</style>
