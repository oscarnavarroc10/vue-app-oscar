<template>
  <article class="sub-service-card" :style="cardStyle">
    <div class="sub-card-glow glow-1"></div>
    <div class="sub-card-glow glow-2"></div>
    <div class="sub-card-grid"></div>

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

      <div class="sub-card-price-wrap">
        <span class="sub-card-price-label">Precio</span>
        <strong class="sub-card-price">
          ${{ formatPrice(service.price) }} por cada
          {{ formatNumber(service.unitBase || 100) }}
        </strong>
      </div>
    </div>

    <div class="sub-card-body">
      <h3>{{ service.name }}</h3>

      <p class="sub-card-description">
        {{
          service.description ||
          "Agrega la cantidad que necesitas y el enlace del perfil o página donde quieres aplicar el servicio."
        }}
      </p>

      <div
        v-if="entriesReadyCount > 0 || existingCartRowsCount > 0"
        class="selected-info"
      >
        <span class="selected-badge">
          {{ entriesReadyCount }}
        </span>
        <small>
          {{ entriesReadyCount === 1 ? "fila lista" : "filas listas" }}
          <template v-if="existingCartRowsCount > 0">
            · {{ existingCartRowsCount }} en carrito
          </template>
        </small>
      </div>
    </div>

    <div class="sub-card-form">
      <div class="field-topline">
        <label class="field-label field-label--multi">
          {{ service.linkDescription || "Link del perfil o página" }}
        </label>

        <div class="field-topline-actions">
          <span class="field-help-text">
            Mínimo {{ formatNumber(service.minQuantity || 100) }} por fila
          </span>

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
              ?
            </button>

            <div v-if="showHelp" class="profile-help-tooltip">
              Puedes agregar hasta {{ maxRows }} filas. Cada fila permite un
              link con su propia cantidad y se enviará como un servicio separado
              al carrito.
            </div>
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
            <div class="row-link-col">
              <label
                class="sr-only"
                :for="`profile-${service.id}-${index}`"
              >
                Link {{ index + 1 }}
              </label>

              <input
                :id="`profile-${service.id}-${index}`"
                v-model.trim="entry.profile"
                class="field-input"
                :class="{ 'field-input-error': entry.profileError }"
                type="url"
                :placeholder="buildProfilePlaceholder(index)"
              />
            </div>

            <div class="row-qty-col">
              <label class="sr-only" :for="`qty-${service.id}-${index}`">
                Cantidad {{ index + 1 }}
              </label>

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
            </div>

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
              La cantidad mínima es
              {{ formatNumber(service.minQuantity || 100) }}.
            </small>

            <small v-else class="field-note">
              Link {{ index + 1 }} · cantidad independiente
            </small>
          </div>
        </div>
      </div>

      <small class="field-note field-note--muted">
        Máximo {{ maxRows }} filas por servicio.
      </small>
    </div>

    <div class="sub-card-footer">
      <button
        ref="addBtnRef"
        class="sub-card-btn"
        type="button"
        @click="handleAddToCart"
      >
        {{
          entriesReadyCount > 1
            ? `Agregar ${entriesReadyCount} servicios al carrito`
            : "Agregar al carrito"
        }}
      </button>
    </div>
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
  return (value || "").trim().replace(/\/+$/, "");
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
    glow1: "rgba(225, 48, 108, 0.18)",
    glow2: "rgba(245, 133, 41, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(245, 133, 41, 0.18), rgba(221, 42, 123, 0.20), rgba(129, 52, 175, 0.18))",
    badgeColor: "#f9a8d4",
    badgeBorder: "rgba(221, 42, 123, 0.20)",
    badgeShadow: "rgba(221, 42, 123, 0.18)",
    buttonGradient: "linear-gradient(135deg, #f58529, #dd2a7b, #8134af)",
    icon: instagramIcon,
    accent: "#f9a8d4",
  },
  Facebook: {
    glow1: "rgba(24, 119, 242, 0.18)",
    glow2: "rgba(96, 165, 250, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(24, 119, 242, 0.16), rgba(96, 165, 250, 0.18))",
    badgeColor: "#93c5fd",
    badgeBorder: "rgba(24, 119, 242, 0.20)",
    badgeShadow: "rgba(24, 119, 242, 0.16)",
    buttonGradient: "linear-gradient(135deg, #1877f2, #60a5fa)",
    icon: facebookIcon,
    accent: "#93c5fd",
  },
  TikTok: {
    glow1: "rgba(37, 244, 238, 0.16)",
    glow2: "rgba(254, 44, 85, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(37, 244, 238, 0.14), rgba(17, 24, 39, 0.18), rgba(254, 44, 85, 0.14))",
    badgeColor: "#e2e8f0",
    badgeBorder: "rgba(148, 163, 184, 0.16)",
    badgeShadow: "rgba(17, 24, 39, 0.10)",
    buttonGradient: "linear-gradient(135deg, #111827, #25f4ee, #fe2c55)",
    icon: tiktokIcon,
    accent: "#e2e8f0",
  },
  YouTube: {
    glow1: "rgba(255, 0, 0, 0.18)",
    glow2: "rgba(248, 113, 113, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(255, 0, 0, 0.14), rgba(239, 68, 68, 0.18))",
    badgeColor: "#fca5a5",
    badgeBorder: "rgba(220, 38, 38, 0.20)",
    badgeShadow: "rgba(220, 38, 38, 0.16)",
    buttonGradient: "linear-gradient(135deg, #dc2626, #ef4444)",
    icon: youtubeIcon,
    accent: "#fca5a5",
  },
  Snapchat: {
    glow1: "rgba(250, 204, 21, 0.18)",
    glow2: "rgba(253, 224, 71, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(250, 204, 21, 0.22), rgba(245, 158, 11, 0.18))",
    badgeColor: "#fde68a",
    badgeBorder: "rgba(245, 158, 11, 0.20)",
    badgeShadow: "rgba(245, 158, 11, 0.18)",
    buttonGradient: "linear-gradient(135deg, #facc15, #f59e0b)",
    icon: snapchatIcon,
    accent: "#fde68a",
  },
  X: {
    glow1: "rgba(15, 23, 42, 0.18)",
    glow2: "rgba(71, 85, 105, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(30, 41, 59, 0.14), rgba(71, 85, 105, 0.16))",
    badgeColor: "#cbd5e1",
    badgeBorder: "rgba(148, 163, 184, 0.14)",
    badgeShadow: "rgba(15, 23, 42, 0.12)",
    buttonGradient: "linear-gradient(135deg, #111827, #334155)",
    icon: xIcon,
    accent: "#cbd5e1",
  },
  Discord: {
    glow1: "rgba(88, 101, 242, 0.18)",
    glow2: "rgba(129, 140, 248, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(88, 101, 242, 0.16), rgba(129, 140, 248, 0.18))",
    badgeColor: "#c4b5fd",
    badgeBorder: "rgba(88, 101, 242, 0.20)",
    badgeShadow: "rgba(88, 101, 242, 0.16)",
    buttonGradient: "linear-gradient(135deg, #5865f2, #818cf8)",
    icon: discordIcon,
    accent: "#c4b5fd",
  },
  Twitch: {
    glow1: "rgba(145, 70, 255, 0.18)",
    glow2: "rgba(196, 181, 253, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(145, 70, 255, 0.16), rgba(168, 85, 247, 0.18))",
    badgeColor: "#d8b4fe",
    badgeBorder: "rgba(145, 70, 255, 0.20)",
    badgeShadow: "rgba(145, 70, 255, 0.16)",
    buttonGradient: "linear-gradient(135deg, #9146ff, #a855f7)",
    icon: twitchIcon,
    accent: "#d8b4fe",
  },
  Spotify: {
    glow1: "rgba(29, 185, 84, 0.18)",
    glow2: "rgba(74, 222, 128, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(29, 185, 84, 0.16), rgba(34, 197, 94, 0.18))",
    badgeColor: "#86efac",
    badgeBorder: "rgba(29, 185, 84, 0.20)",
    badgeShadow: "rgba(29, 185, 84, 0.16)",
    buttonGradient: "linear-gradient(135deg, #1db954, #22c55e)",
    icon: spotifyIcon,
    accent: "#86efac",
  },
  Telegram: {
    glow1: "rgba(0, 136, 204, 0.18)",
    glow2: "rgba(56, 189, 248, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(0, 136, 204, 0.16), rgba(56, 189, 248, 0.18))",
    badgeColor: "#7dd3fc",
    badgeBorder: "rgba(0, 136, 204, 0.20)",
    badgeShadow: "rgba(0, 136, 204, 0.16)",
    buttonGradient: "linear-gradient(135deg, #0088cc, #38bdf8)",
    icon: telegramIcon,
    accent: "#7dd3fc",
  },
  WhatsApp: {
    glow1: "rgba(37, 211, 102, 0.18)",
    glow2: "rgba(134, 239, 172, 0.14)",
    badgeBg:
      "linear-gradient(135deg, rgba(37, 211, 102, 0.16), rgba(74, 222, 128, 0.18))",
    badgeColor: "#86efac",
    badgeBorder: "rgba(37, 211, 102, 0.20)",
    badgeShadow: "rgba(37, 211, 102, 0.16)",
    buttonGradient: "linear-gradient(135deg, #25d366, #4ade80)",
    icon: whatsappIcon,
    accent: "#86efac",
  },
  default: {
    glow1: "rgba(148, 163, 184, 0.16)",
    glow2: "rgba(203, 213, 225, 0.12)",
    badgeBg:
      "linear-gradient(135deg, rgba(148, 163, 184, 0.12), rgba(203, 213, 225, 0.16))",
    badgeColor: "#cbd5e1",
    badgeBorder: "rgba(148, 163, 184, 0.14)",
    badgeShadow: "rgba(148, 163, 184, 0.12)",
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
    Instagram: "Ejemplo: https://www.instagram.com/tu_usuario/",
    Facebook: "Ejemplo: https://www.facebook.com/tu_pagina/",
    TikTok: "Ejemplo: https://www.tiktok.com/@tu_usuario",
    YouTube: "Ejemplo: https://www.youtube.com/@tu_canal",
    Snapchat: "Ejemplo: https://www.snapchat.com/add/tu_usuario",
    X: "Ejemplo: https://x.com/tu_usuario",
    Discord: "Ejemplo: https://discord.gg/tu-servidor",
    Twitch: "Ejemplo: https://www.twitch.tv/tu_canal",
    Spotify: "Ejemplo: https://open.spotify.com/artist/...",
    Telegram: "Ejemplo: https://t.me/tu_canal",
    WhatsApp: "Ejemplo: https://wa.me/5219999999999",
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
  "--accent-color": socialTheme.value.accent,
}));
</script>

<style scoped>
.sub-service-card {
  position: relative;
  min-height: 278px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  padding: 14px;
  background: linear-gradient(
    180deg,
    rgba(10, 18, 34, 0.9) 0%,
    rgba(8, 14, 26, 0.95) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 16px 28px rgba(2, 6, 23, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.sub-service-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow:
    0 20px 34px rgba(2, 6, 23, 0.24),
    0 0 14px rgba(59, 130, 246, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.sub-card-glow,
.sub-card-grid {
  position: absolute;
  pointer-events: none;
}

.sub-card-glow {
  border-radius: 999px;
  filter: blur(24px);
  z-index: 0;
}

.glow-1 {
  width: 112px;
  height: 112px;
  top: -22px;
  right: -18px;
  opacity: 0.68;
  background: var(--glow-1);
}

.glow-2 {
  width: 82px;
  height: 82px;
  bottom: -18px;
  left: -10px;
  opacity: 0.42;
  background: var(--glow-2);
}

.sub-card-grid {
  inset: 0;
  z-index: 0;
  opacity: 0.04;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.85), transparent 88%);
}

.sub-card-top,
.sub-card-body,
.sub-card-form,
.sub-card-footer {
  position: relative;
  z-index: 1;
}

.sub-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.sub-card-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  background: var(--badge-bg);
  color: var(--badge-color);
  border: 1px solid var(--badge-border);
  box-shadow:
    0 8px 18px var(--badge-shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.sub-card-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.12));
}

.sub-card-price-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  text-align: right;
}

.sub-card-price-label {
  color: #94a3b8;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.sub-card-price {
  color: #ffffff;
  font-size: 0.82rem;
  line-height: 1.14;
}

.sub-card-body {
  margin-top: 8px;
}

.sub-card-body h3 {
  margin: 0 0 5px;
  font-size: 1.06rem;
  line-height: 1.02;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #ffffff;
}

.sub-card-description {
  margin: 0;
  color: #94a3b8;
  font-size: 0.75rem;
  line-height: 1.32;
}

.selected-info {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
}

.selected-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 800;
}

.selected-info small {
  color: #94a3b8;
  font-weight: 700;
  font-size: 0.68rem;
}

.sub-card-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.field-topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.field-topline-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.field-label {
  color: #e2e8f0;
  font-size: 0.74rem;
  font-weight: 800;
}

.field-label--multi {
  line-height: 1.16;
  max-width: 68%;
}

.field-help-text {
  color: var(--accent-color);
  font-size: 0.64rem;
  font-weight: 800;
  white-space: nowrap;
}

.field-note {
  color: #94a3b8;
  font-size: 0.64rem;
  line-height: 1.22;
}

.field-note--muted {
  margin-top: 2px;
}

.field-error-label {
  font-size: 0.65rem;
  color: #fca5a5;
  line-height: 1.2;
}

.rows-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.row-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 92px auto;
  gap: 8px;
  align-items: center;
}

.row-link-col,
.row-qty-col {
  min-width: 0;
}

.field-input {
  width: 100%;
  box-sizing: border-box;
  min-height: 35px;
  border-radius: 11px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  padding: 0 10px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.field-input--qty {
  text-align: center;
  padding: 0 8px;
}

.field-input::placeholder {
  color: #94a3b8;
}

.field-input:focus {
  outline: none;
  border-color: rgba(96, 165, 250, 0.4);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
  background: rgba(255, 255, 255, 0.07);
}

.field-input-error {
  border-color: rgba(248, 113, 113, 0.45);
  box-shadow: 0 0 0 4px rgba(248, 113, 113, 0.08);
}

.row-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.row-action-btn {
  width: 32px;
  min-width: 32px;
  height: 32px;
  border: none;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    background 0.18s ease;
  font-size: 1rem;
  font-weight: 900;
  line-height: 1;
}

.row-action-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.row-action-btn--add {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.row-action-btn--remove {
  background: rgba(248, 113, 113, 0.12);
  color: #fca5a5;
}

.row-meta {
  min-height: 15px;
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
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
  transition: background 0.18s ease, transform 0.18s ease;
}

.profile-help-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.profile-help-tooltip {
  position: absolute;
  top: 50%;
  left: calc(100% + 10px);
  transform: translateY(-50%);
  z-index: 30;
  min-width: 220px;
  max-width: 280px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(7, 12, 24, 0.96);
  color: #ffffff;
  font-size: 0.72rem;
  line-height: 1.35;
  box-shadow:
    0 14px 28px rgba(2, 6, 23, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
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
  border-right: 6px solid rgba(7, 12, 24, 0.96);
}

.sub-card-footer {
  margin-top: auto;
  padding-top: 10px;
}

.sub-card-btn {
  width: 100%;
  min-height: 38px;
  border: none;
  border-radius: 13px;
  padding: 9px 12px;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.01em;
  cursor: pointer;
  color: #ffffff;
  background: var(--button-gradient);
  box-shadow:
    0 12px 20px rgba(15, 23, 42, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.sub-card-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
  box-shadow:
    0 16px 24px rgba(15, 23, 42, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .sub-service-card {
    min-height: 320px;
    padding: 14px;
    border-radius: 18px;
  }

  .sub-card-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .sub-card-price-wrap {
    align-items: flex-start;
    text-align: left;
  }

  .sub-card-body h3 {
    font-size: 1rem;
  }

  .sub-card-description {
    font-size: 0.76rem;
  }

  .field-label--multi {
    max-width: 100%;
  }

  .field-topline-actions {
    width: 100%;
    justify-content: space-between;
    margin-left: 0;
  }

  .row-main {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .row-actions {
    justify-content: flex-end;
  }

  .field-input--qty {
    text-align: left;
  }

  .sub-card-btn {
    min-height: 40px;
    font-size: 0.84rem;
  }

  .profile-help-tooltip {
    left: auto;
    right: 0;
    top: calc(100% + 8px);
    transform: none;
  }

  .profile-help-tooltip::before {
    left: auto;
    right: 10px;
    top: -6px;
    transform: rotate(-90deg);
  }
}
</style>