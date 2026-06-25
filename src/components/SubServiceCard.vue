<template>
  <article class="sub-service-card" :style="cardStyle">
    <div class="sub-card-accent"></div>

    <div class="sub-card-top">
      <span class="sub-card-badge">
        <span v-if="platformIcon" class="sub-card-icon-wrap">
          <img
            :src="platformIcon"
            :alt="normalizedCategory"
            class="sub-card-icon"
            aria-hidden="true"
          />
        </span>
        {{ normalizedCategory }}
      </span>

      <div class="sub-card-price-wrap">
        <span class="sub-card-price-label">Precio</span>
        <strong class="sub-card-price">
          ${{ displayPrice(service.price) }} por cada
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
          {{ formatNumber(entriesReadyCount) }}
        </span>
        <small>
          {{ entriesReadyCount === 1 ? "fila lista" : "filas listas" }}
          <template v-if="existingCartRowsCount > 0">
            · {{ formatNumber(existingCartRowsCount) }} en carrito
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
              <label class="sr-only" :for="`profile-${service.id}-${index}`">
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
import {
  normalizeCategory,
  usePlatformTheme,
} from "@/composables/usePlatformTheme.js";
import {
  formatNumber,
  formatPrice as sharedFormatPrice,
} from "@/utils/format.js";

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

const normalizedCategory = computed(() =>
  normalizeCategory(props.service.category),
);
const platformTheme = computed(() =>
  usePlatformTheme(normalizedCategory.value),
);
const colors = computed(() => platformTheme.value.colors);
const platformIcon = computed(() => platformTheme.value.icon);

const normalizeProfile = (value) => {
  return (value || "").trim().replace(/\/+$/, "");
};

const displayPrice = (value) => {
  return props.formatPrice?.(value) ?? sharedFormatPrice(value);
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

  return map[normalizedCategory.value] || "Pega aquí tu perfil o enlace";
});

const hexToRgba = (hexColor, alpha) => {
  const hex = hexColor?.replace("#", "");

  if (!hex || hex.length !== 6) {
    return `rgba(37, 99, 235, ${alpha})`;
  }

  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getContrastText = (hexColor) => {
  const hex = hexColor?.replace("#", "");

  if (!hex || hex.length !== 6) {
    return "var(--color-white)";
  }

  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.65 ? "var(--color-text-primary)" : "var(--color-white)";
};

const cardStyle = computed(() => ({
  "--platform-accent": colors.value.accent,
  "--platform-accent-soft": colors.value.bg,
  "--platform-text": colors.value.text,
  "--platform-border-strong": hexToRgba(colors.value.accent, 0.18),
  "--platform-shadow": hexToRgba(colors.value.accent, 0.16),
  "--platform-button-text": getContrastText(colors.value.accent),
}));
</script>

<style scoped>
.sub-service-card {
  position: relative;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  overflow: hidden;
  padding: var(--space-5);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.sub-service-card:hover {
  transform: translateY(-4px);
  border-color: var(--platform-border-strong);
  box-shadow: 0 18px 38px var(--platform-shadow);
}

.sub-card-accent {
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  background: var(--platform-accent);
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
  gap: var(--space-3);
}

.sub-card-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 40px;
  padding: 0 var(--space-3);
  border-radius: var(--radius-full);
  border: 1px solid var(--platform-border-strong);
  background: var(--platform-accent-soft);
  color: var(--platform-text);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
}

.sub-card-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.sub-card-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}

.sub-card-price-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-1);
  text-align: right;
}

.sub-card-price-label {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.sub-card-price {
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  line-height: 1.4;
}

.sub-card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sub-card-body h3 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.2;
  font-weight: var(--font-bold);
  letter-spacing: -0.02em;
}

.sub-card-description {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
}

.selected-info {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.selected-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 24px;
  padding: 0 var(--space-2);
  border-radius: var(--radius-full);
  background: var(--platform-accent-soft);
  color: var(--platform-text);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  border: 1px solid var(--platform-border-strong);
}

.selected-info small {
  color: var(--color-text-secondary);
  font-weight: var(--font-semibold);
  font-size: var(--text-xs);
}

.sub-card-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.field-topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.field-topline-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}

.field-label {
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
}

.field-label--multi {
  line-height: 1.4;
  max-width: 68%;
}

.field-help-text {
  color: var(--platform-text);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  white-space: nowrap;
}

.field-note {
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  line-height: 1.4;
}

.field-note--muted {
  margin-top: calc(var(--space-1) * -1);
}

.field-error-label {
  font-size: var(--text-xs);
  color: var(--color-danger);
  line-height: 1.35;
}

.rows-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.service-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.row-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 104px auto;
  gap: var(--space-2);
  align-items: center;
}

.row-link-col,
.row-qty-col {
  min-width: 0;
}

.field-input {
  width: 100%;
  box-sizing: border-box;
  min-height: 42px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  padding: 0 var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  background: var(--color-surface-subtle);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    background var(--transition-fast);
}

.field-input--qty {
  text-align: center;
  padding: 0 var(--space-2);
}

.field-input::placeholder {
  color: var(--color-text-muted);
}

.field-input:focus {
  outline: none;
  border-color: var(--platform-accent);
  box-shadow: 0 0 0 4px var(--platform-shadow);
  background: var(--color-surface);
}

.field-input-error {
  border-color: rgba(220, 38, 38, 0.4);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.08);
}

.row-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.row-action-btn {
  width: 36px;
  min-width: 36px;
  height: 36px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform var(--transition-fast),
    border-color var(--transition-fast),
    background var(--transition-fast);
  font-size: 1rem;
  font-weight: var(--font-bold);
  line-height: 1;
}

.row-action-btn:hover {
  transform: translateY(-1px);
}

.row-action-btn--add {
  background: var(--platform-accent-soft);
  color: var(--platform-text);
  border-color: var(--platform-border-strong);
}

.row-action-btn--remove {
  background: rgba(220, 38, 38, 0.08);
  color: var(--color-danger);
  border-color: rgba(220, 38, 38, 0.14);
}

.row-meta {
  min-height: 18px;
}

.profile-help-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.profile-help-btn {
  width: 24px;
  height: 24px;
  border: 1px solid var(--platform-border-strong);
  border-radius: var(--radius-full);
  background: var(--platform-accent-soft);
  color: var(--platform-text);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
  transition:
    transform var(--transition-fast),
    background var(--transition-fast);
}

.profile-help-btn:hover {
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
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  line-height: 1.5;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  white-space: normal;
}

.profile-help-tooltip::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -6px;
  width: 12px;
  height: 12px;
  transform: translateY(-50%) rotate(45deg);
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.sub-card-footer {
  margin-top: auto;
  padding-top: var(--space-2);
}

.sub-card-btn {
  width: 100%;
  min-height: 46px;
  border: none;
  border-radius: var(--radius-lg);
  padding: 0 var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  letter-spacing: 0.01em;
  cursor: pointer;
  color: var(--platform-button-text);
  background: var(--platform-accent);
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-fast),
    filter var(--transition-fast),
    box-shadow var(--transition-fast);
}

.sub-card-btn:hover {
  transform: translateY(-1px);
  filter: brightness(0.98);
  box-shadow: var(--shadow-md);
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
    min-height: 0;
    padding: var(--space-4);
  }

  .sub-card-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .sub-card-price-wrap {
    align-items: flex-start;
    text-align: left;
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
  }

  .row-actions {
    justify-content: flex-end;
  }

  .field-input--qty {
    text-align: left;
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
    transform: rotate(45deg);
    border-left: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
