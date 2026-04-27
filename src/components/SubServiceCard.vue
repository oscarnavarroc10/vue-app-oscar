<template>
  <article class="sub-service-card" :style="cardStyle">
    <div class="card-glow card-glow--one"></div>
    <div class="card-glow card-glow--two"></div>
    <div class="card-grid"></div>
    <div class="card-noise"></div>

    <header class="sub-card-header">
      <div class="platform-info">
        <span class="platform-badge">
          <img
            v-if="platformIcon"
            :src="platformIcon"
            :alt="service.category"
            class="platform-icon"
            aria-hidden="true"
          />
          {{ service.category }}
        </span>

        <span class="safe-chip">Sin contraseña</span>
      </div>

      <div class="price-box">
        <span>Desde</span>
        <strong>
          ${{ formatPrice(service.price) }}
        </strong>
        <small>
          por cada {{ formatNumber(service.unitBase || 100) }}
        </small>
      </div>
    </header>

    <section class="sub-card-body">
      <h3>{{ service.name }}</h3>

      <p>
        {{
          service.description ||
          "Agrega la cantidad que necesitas y el enlace donde quieres aplicar el servicio."
        }}
      </p>

      <div
        v-if="entriesReadyCount > 0 || existingCartRowsCount > 0"
        class="selected-info"
      >
        <span>{{ entriesReadyCount }}</span>

        <small>
          {{ entriesReadyCount === 1 ? "fila lista" : "filas listas" }}
          <template v-if="existingCartRowsCount > 0">
            · {{ existingCartRowsCount }} en carrito
          </template>
        </small>
      </div>
    </section>

    <section class="sub-card-form">
      <div class="field-heading">
        <div>
          <strong>{{ service.linkDescription || "Link del perfil o página" }}</strong>
          <small>Mínimo {{ formatNumber(service.minQuantity || 100) }} por fila</small>
        </div>

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
            aria-label="Ayuda sobre múltiples links"
          >
            ?
          </button>

          <div v-if="showHelp" class="profile-help-tooltip">
            Puedes agregar hasta {{ maxRows }} filas. Cada fila permite un link
            con su propia cantidad y se enviará como un servicio separado al carrito.
          </div>
        </div>
      </div>

      <div class="rows-stack">
        <div
          v-for="(entry, index) in entries"
          :key="`${service.id}-entry-${index}`"
          class="service-row"
        >
          <div class="row-main">
            <label class="input-shell link-shell" :for="`profile-${service.id}-${index}`">
              <span class="input-icon">🔗</span>

              <input
                :id="`profile-${service.id}-${index}`"
                v-model.trim="entry.profile"
                class="field-input"
                :class="{ 'field-input-error': entry.profileError }"
                type="url"
                :placeholder="buildProfilePlaceholder(index)"
              />
            </label>

            <label class="input-shell qty-shell" :for="`qty-${service.id}-${index}`">
              <span class="input-icon">#</span>

              <input
                :id="`qty-${service.id}-${index}`"
                v-model.number="entry.quantity"
                class="field-input field-input--qty"
                :class="{ 'field-input-error': entry.quantityError }"
                type="number"
                :min="service.minQuantity || 100"
                :step="service.step || 100"
                :placeholder="String(service.minQuantity || 100)"
              />
            </label>

            <div class="row-actions">
              <button
                v-if="entries.length < maxRows && index === entries.length - 1"
                type="button"
                class="row-action-btn row-action-btn--add"
                @click="addEntry"
                aria-label="Agregar otra fila"
                title="Agregar otra fila"
              >
                +
              </button>

              <button
                v-if="entries.length > 1"
                type="button"
                class="row-action-btn row-action-btn--remove"
                @click="removeEntry(index)"
                aria-label="Quitar fila"
                title="Quitar fila"
              >
                −
              </button>
            </div>
          </div>

          <div class="row-meta">
            <small v-if="entry.profileError" class="field-error-label">
              Indica un link válido.
            </small>

            <small v-else-if="entry.quantityError" class="field-error-label">
              La cantidad mínima es {{ formatNumber(service.minQuantity || 100) }}.
            </small>

            <small v-else class="field-note">
              Link {{ index + 1 }} · cantidad independiente
            </small>
          </div>
        </div>
      </div>
    </section>

    <footer class="sub-card-footer">
      <button
        ref="addBtnRef"
        class="sub-card-btn"
        type="button"
        @click="handleAddToCart"
      >
        <span>
          {{
            entriesReadyCount > 1
              ? `Agregar ${entriesReadyCount} servicios`
              : "Agregar al carrito"
          }}
        </span>
        <strong>→</strong>
      </button>
    </footer>
  </article>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

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

const addBtnRef = ref(null);
const showHelp = ref(false);
const maxRows = 10;

const createEntry = () => ({
  profile: "",
  quantity: Number(props.service.minQuantity || 100),
  profileError: false,
  quantityError: false,
});

const entries = ref([createEntry()]);

const normalizeProfile = (value) => {
  const cleaned = (value || "").trim().replace(/\/+$/, "");

  if (!cleaned) return "";

  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
    return cleaned;
  }

  return `https://${cleaned}`;
};

const formatNumber = (value) => {
  return new Intl.NumberFormat("es-MX").format(Number(value || 0));
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

const isValidQuantity = (value) => {
  const parsed = Number(value);
  const min = Number(props.service.minQuantity || 100);
  return Number.isFinite(parsed) && parsed >= min;
};

const addEntry = () => {
  if (entries.value.length >= maxRows) return;
  entries.value.push(createEntry());
};

const removeEntry = (index) => {
  if (entries.value.length === 1) {
    entries.value[0] = createEntry();
    return;
  }

  entries.value.splice(index, 1);
};

const existingCartRowsCount = computed(() => {
  return props.cart.filter((item) => item.id === props.service.id).length;
});

const entriesReadyCount = computed(() => {
  return entries.value.filter((entry) => {
    const normalizedProfile = normalizeProfile(entry.profile);
    return normalizedProfile && isValidProfileUrl(normalizedProfile);
  }).length;
});

const buildProfilePlaceholder = (index) => {
  const base = profilePlaceholder.value;
  return index === 0 ? base : `${base} (${index + 1})`;
};

const validateEntry = (entry) => {
  const normalizedProfile = normalizeProfile(entry.profile);
  const profileFilled = Boolean(normalizedProfile);
  const quantityFilled =
    entry.quantity !== null &&
    entry.quantity !== undefined &&
    String(entry.quantity).trim() !== "";

  const isCompletelyEmpty = !profileFilled && !quantityFilled;

  if (isCompletelyEmpty) {
    entry.profileError = false;
    entry.quantityError = false;
    return { valid: false, empty: true, normalizedProfile: "" };
  }

  entry.profileError = !isValidProfileUrl(normalizedProfile);
  entry.quantityError = !isValidQuantity(entry.quantity);

  return {
    valid: !entry.profileError && !entry.quantityError,
    empty: false,
    normalizedProfile,
  };
};

const handleAddToCart = () => {
  let hasAnyFilledRow = false;
  let hasInvalidRows = false;
  const rowsToAdd = [];

  entries.value.forEach((entry) => {
    const result = validateEntry(entry);

    if (!result.empty) {
      hasAnyFilledRow = true;
    }

    if (!result.empty && !result.valid) {
      hasInvalidRows = true;
      return;
    }

    if (result.valid) {
      rowsToAdd.push({
        profile: result.normalizedProfile,
        quantity: Number(entry.quantity),
      });
    }
  });

  if (!hasAnyFilledRow) {
    entries.value[0].profileError = true;
    entries.value[0].quantityError = true;
    return;
  }

  if (hasInvalidRows || !rowsToAdd.length) {
    return;
  }

  rowsToAdd.forEach((row) => {
    emit("add", {
      service: {
        ...props.service,
        profile: row.profile,
        quantity: row.quantity,
        unitBase: Number(props.service.unitBase || 100),
        minQuantity: Number(props.service.minQuantity || 100),
        step: Number(props.service.step || 100),
      },
      sourceEl: addBtnRef.value,
    });
  });

  entries.value = [createEntry()];
};

const SOCIAL_THEME_MAP = {
  Instagram: {
    glow1: "rgba(236, 72, 153, 0.32)",
    glow2: "rgba(249, 115, 22, 0.22)",
    badgeBg:
      "linear-gradient(135deg, rgba(249, 115, 22, 0.16), rgba(236, 72, 153, 0.18), rgba(139, 92, 246, 0.14))",
    badgeColor: "#f9a8d4",
    badgeBorder: "rgba(236, 72, 153, 0.22)",
    buttonGradient: "linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)",
    icon: instagramIcon,
    accent: "#f9a8d4",
  },
  Facebook: {
    glow1: "rgba(59, 130, 246, 0.32)",
    glow2: "rgba(96, 165, 250, 0.18)",
    badgeBg:
      "linear-gradient(135deg, rgba(37, 99, 235, 0.16), rgba(96, 165, 250, 0.16))",
    badgeColor: "#93c5fd",
    badgeBorder: "rgba(59, 130, 246, 0.22)",
    buttonGradient: "linear-gradient(135deg, #2563eb, #60a5fa)",
    icon: facebookIcon,
    accent: "#93c5fd",
  },
  TikTok: {
    glow1: "rgba(34, 211, 238, 0.26)",
    glow2: "rgba(236, 72, 153, 0.2)",
    badgeBg:
      "linear-gradient(135deg, rgba(34, 211, 238, 0.13), rgba(236, 72, 153, 0.13))",
    badgeColor: "#e2e8f0",
    badgeBorder: "rgba(148, 163, 184, 0.18)",
    buttonGradient: "linear-gradient(135deg, #111827, #22d3ee, #ec4899)",
    icon: tiktokIcon,
    accent: "#e2e8f0",
  },
  YouTube: {
    glow1: "rgba(239, 68, 68, 0.28)",
    glow2: "rgba(248, 113, 113, 0.16)",
    badgeBg:
      "linear-gradient(135deg, rgba(220, 38, 38, 0.14), rgba(248, 113, 113, 0.14))",
    badgeColor: "#fca5a5",
    badgeBorder: "rgba(239, 68, 68, 0.2)",
    buttonGradient: "linear-gradient(135deg, #dc2626, #ef4444)",
    icon: youtubeIcon,
    accent: "#fca5a5",
  },
  Snapchat: {
    glow1: "rgba(250, 204, 21, 0.26)",
    glow2: "rgba(245, 158, 11, 0.16)",
    badgeBg:
      "linear-gradient(135deg, rgba(250, 204, 21, 0.16), rgba(245, 158, 11, 0.14))",
    badgeColor: "#fde68a",
    badgeBorder: "rgba(250, 204, 21, 0.2)",
    buttonGradient: "linear-gradient(135deg, #facc15, #f97316)",
    icon: snapchatIcon,
    accent: "#fde68a",
  },
  X: {
    glow1: "rgba(148, 163, 184, 0.22)",
    glow2: "rgba(255, 255, 255, 0.1)",
    badgeBg:
      "linear-gradient(135deg, rgba(148, 163, 184, 0.12), rgba(30, 41, 59, 0.16))",
    badgeColor: "#cbd5e1",
    badgeBorder: "rgba(148, 163, 184, 0.18)",
    buttonGradient: "linear-gradient(135deg, #111827, #334155, #64748b)",
    icon: xIcon,
    accent: "#cbd5e1",
  },
  Discord: {
    glow1: "rgba(129, 140, 248, 0.28)",
    glow2: "rgba(168, 85, 247, 0.16)",
    badgeBg:
      "linear-gradient(135deg, rgba(88, 101, 242, 0.16), rgba(168, 85, 247, 0.14))",
    badgeColor: "#c4b5fd",
    badgeBorder: "rgba(129, 140, 248, 0.2)",
    buttonGradient: "linear-gradient(135deg, #5865f2, #8b5cf6)",
    icon: discordIcon,
    accent: "#c4b5fd",
  },
  Twitch: {
    glow1: "rgba(168, 85, 247, 0.3)",
    glow2: "rgba(196, 181, 253, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(124, 58, 237, 0.16), rgba(168, 85, 247, 0.14))",
    badgeColor: "#d8b4fe",
    badgeBorder: "rgba(168, 85, 247, 0.2)",
    buttonGradient: "linear-gradient(135deg, #7c3aed, #a855f7)",
    icon: twitchIcon,
    accent: "#d8b4fe",
  },
  Spotify: {
    glow1: "rgba(34, 197, 94, 0.26)",
    glow2: "rgba(134, 239, 172, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(134, 239, 172, 0.12))",
    badgeColor: "#86efac",
    badgeBorder: "rgba(34, 197, 94, 0.2)",
    buttonGradient: "linear-gradient(135deg, #16a34a, #22c55e)",
    icon: spotifyIcon,
    accent: "#86efac",
  },
  Telegram: {
    glow1: "rgba(56, 189, 248, 0.28)",
    glow2: "rgba(14, 165, 233, 0.16)",
    badgeBg:
      "linear-gradient(135deg, rgba(14, 165, 233, 0.16), rgba(56, 189, 248, 0.14))",
    badgeColor: "#7dd3fc",
    badgeBorder: "rgba(56, 189, 248, 0.2)",
    buttonGradient: "linear-gradient(135deg, #0284c7, #38bdf8)",
    icon: telegramIcon,
    accent: "#7dd3fc",
  },
  WhatsApp: {
    glow1: "rgba(37, 211, 102, 0.26)",
    glow2: "rgba(134, 239, 172, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(37, 211, 102, 0.15), rgba(134, 239, 172, 0.12))",
    badgeColor: "#86efac",
    badgeBorder: "rgba(37, 211, 102, 0.2)",
    buttonGradient: "linear-gradient(135deg, #16a34a, #25d366)",
    icon: whatsappIcon,
    accent: "#86efac",
  },
  default: {
    glow1: "rgba(148, 163, 184, 0.18)",
    glow2: "rgba(203, 213, 225, 0.1)",
    badgeBg:
      "linear-gradient(135deg, rgba(148, 163, 184, 0.12), rgba(203, 213, 225, 0.1))",
    badgeColor: "#cbd5e1",
    badgeBorder: "rgba(148, 163, 184, 0.16)",
    buttonGradient: "linear-gradient(135deg, #334155, #64748b)",
    icon: null,
    accent: "#cbd5e1",
  },
};

const socialTheme = computed(() => {
  return SOCIAL_THEME_MAP[props.service.category] || SOCIAL_THEME_MAP.default;
});

const platformIcon = computed(() => socialTheme.value.icon);

const profilePlaceholder = computed(() => {
  const map = {
    Instagram: "https://www.instagram.com/tu_usuario/",
    Facebook: "https://www.facebook.com/tu_pagina/",
    TikTok: "https://www.tiktok.com/@tu_usuario",
    YouTube: "https://www.youtube.com/@tu_canal",
    Snapchat: "https://www.snapchat.com/add/tu_usuario",
    X: "https://x.com/tu_usuario",
    Discord: "https://discord.gg/tu-servidor",
    Twitch: "https://www.twitch.tv/tu_canal",
    Spotify: "https://open.spotify.com/artist/...",
    Telegram: "https://t.me/tu_canal",
    WhatsApp: "https://wa.me/5219999999999",
  };

  return map[props.service.category] || "Pega aquí tu perfil o enlace";
});

const cardStyle = computed(() => ({
  "--glow-1": socialTheme.value.glow1,
  "--glow-2": socialTheme.value.glow2,
  "--badge-bg": socialTheme.value.badgeBg,
  "--badge-color": socialTheme.value.badgeColor,
  "--badge-border": socialTheme.value.badgeBorder,
  "--button-gradient": socialTheme.value.buttonGradient,
  "--accent-color": socialTheme.value.accent,
}));
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.sub-service-card {
  position: relative;
  overflow: hidden;
  min-height: auto;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 24px;
  background:
    radial-gradient(circle at 92% 0%, var(--glow-1), transparent 28%),
    radial-gradient(circle at 8% 100%, var(--glow-2), transparent 34%),
    linear-gradient(180deg, rgba(15, 12, 34, 0.88), rgba(7, 9, 22, 0.97));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 22px 44px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  isolation: isolate;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.sub-service-card:hover {
  transform: translateY(-4px);
  border-color: var(--badge-border);
  box-shadow:
    0 30px 58px rgba(0, 0, 0, 0.38),
    0 0 24px var(--glow-1),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

.card-glow,
.card-grid,
.card-noise {
  position: absolute;
  pointer-events: none;
}

.card-glow {
  z-index: -1;
  border-radius: 999px;
  filter: blur(36px);
}

.card-glow--one {
  top: -60px;
  right: -54px;
  width: 180px;
  height: 180px;
  background: var(--glow-1);
  opacity: 0.7;
}

.card-glow--two {
  left: -46px;
  bottom: -60px;
  width: 140px;
  height: 140px;
  background: var(--glow-2);
  opacity: 0.58;
}

.card-grid {
  inset: 0;
  z-index: -1;
  opacity: 0.045;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 78%);
}

.card-noise {
  inset: 0;
  z-index: -1;
  opacity: 0.04;
  background-image:
    repeating-radial-gradient(
      circle at 18% 24%,
      rgba(255, 255, 255, 0.8) 0 1px,
      transparent 1px 4px
    );
}

.sub-card-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: start;
}

.platform-info {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.platform-badge,
.safe-chip {
  min-height: 30px;
  padding: 0 11px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.72rem;
  font-weight: 950;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.platform-badge {
  color: var(--badge-color);
  background: var(--badge-bg);
  border-color: var(--badge-border);
}

.safe-chip {
  color: #bbf7d0;
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.14);
}

.platform-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.price-box {
  min-width: 116px;
  padding: 10px 12px;
  border-radius: 18px;
  text-align: right;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.price-box span {
  display: block;
  color: #94a3b8;
  font-size: 0.65rem;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.price-box strong {
  display: block;
  margin-top: 2px;
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 950;
}

.price-box small {
  display: block;
  margin-top: 5px;
  color: #cbd5e1;
  font-size: 0.68rem;
  line-height: 1.15;
  font-weight: 750;
}

.sub-card-body {
  margin-top: 14px;
}

.sub-card-body h3 {
  margin: 0;
  color: #ffffff;
  font-size: 1.22rem;
  line-height: 1.08;
  letter-spacing: -0.04em;
  font-weight: 950;
}

.sub-card-body p {
  margin: 8px 0 0;
  color: #aab6ca;
  font-size: 0.82rem;
  line-height: 1.5;
  font-weight: 650;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.selected-info {
  width: fit-content;
  margin-top: 10px;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.selected-info span {
  min-width: 22px;
  height: 22px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 950;
  background: var(--button-gradient);
}

.selected-info small {
  color: #cbd5e1;
  font-size: 0.72rem;
  font-weight: 800;
}

.sub-card-form {
  margin-top: 14px;
}

.field-heading {
  margin-bottom: 9px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.field-heading strong {
  display: block;
  color: #ffffff;
  font-size: 0.82rem;
  line-height: 1.25;
  font-weight: 900;
}

.field-heading small {
  display: block;
  margin-top: 3px;
  color: var(--accent-color);
  font-size: 0.7rem;
  font-weight: 850;
}

.rows-stack {
  display: grid;
  gap: 9px;
}

.service-row {
  padding: 10px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.055);
}

.row-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px auto;
  gap: 8px;
  align-items: center;
}

.input-shell {
  min-width: 0;
  min-height: 42px;
  padding: 0 12px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(7, 10, 24, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.14);
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.input-shell:focus-within {
  border-color: var(--badge-border);
  box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
  background: rgba(7, 10, 24, 0.88);
}

.input-icon {
  flex-shrink: 0;
  color: #94a3b8;
  font-size: 0.82rem;
  font-weight: 900;
}

.field-input {
  width: 100%;
  min-width: 0;
  border: none;
  outline: none;
  color: #ffffff;
  background: transparent;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
}

.field-input--qty {
  text-align: center;
}

.field-input::placeholder {
  color: rgba(148, 163, 184, 0.82);
}

.input-shell:has(.field-input-error) {
  border-color: rgba(248, 113, 113, 0.5);
  box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.08);
}

.row-actions {
  display: inline-flex;
  gap: 6px;
}

.row-action-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 13px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 950;
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    background 0.18s ease;
}

.row-action-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.06);
}

.row-action-btn--add {
  background: var(--button-gradient);
}

.row-action-btn--remove {
  color: #fca5a5;
  background: rgba(248, 113, 113, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.12);
}

.row-meta {
  min-height: 18px;
  margin-top: 5px;
}

.field-note,
.field-error-label {
  font-size: 0.7rem;
  line-height: 1.25;
}

.field-note {
  color: #94a3b8;
}

.field-error-label {
  color: #fca5a5;
  font-weight: 800;
}

.profile-help-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.profile-help-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 999px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 950;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

.profile-help-tooltip {
  position: absolute;
  top: 50%;
  left: calc(100% + 10px);
  transform: translateY(-50%);
  z-index: 30;
  width: 250px;
  padding: 12px 13px;
  border-radius: 16px;
  color: #ffffff;
  background: rgba(7, 10, 24, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 18px 34px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
  line-height: 1.45;
}

.sub-card-footer {
  margin-top: auto;
  padding-top: 14px;
}

.sub-card-btn {
  width: 100%;
  min-height: 50px;
  border: none;
  border-radius: 17px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 950;
  background: var(--button-gradient);
  box-shadow:
    0 18px 34px rgba(0, 0, 0, 0.28),
    0 0 20px var(--glow-1),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  transition:
    transform 0.18s ease,
    filter 0.18s ease;
}

.sub-card-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.06);
}

.sub-card-btn strong {
  font-size: 1.1rem;
}

@media (max-width: 780px) {
  .sub-service-card {
    padding: 15px;
    border-radius: 22px;
  }

  .sub-card-header {
    grid-template-columns: 1fr;
  }

  .price-box {
    width: 100%;
    text-align: left;
  }

  .row-main {
    grid-template-columns: 1fr;
  }

  .field-input--qty {
    text-align: left;
  }

  .row-actions {
    justify-content: flex-end;
  }

  .profile-help-tooltip {
    left: auto;
    right: 0;
    top: calc(100% + 8px);
    transform: none;
    width: min(260px, 80vw);
  }
}
</style>