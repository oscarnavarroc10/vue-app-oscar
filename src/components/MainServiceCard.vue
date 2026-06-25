<template>
  <article class="main-service-card" :style="cardStyle" @click="handleOpen">
    <div class="main-card-accent"></div>

    <div class="main-card-top">
      <div class="main-card-platform">
        <div v-if="icon" class="main-card-icon-wrap">
          <img :src="icon" :alt="normalizedCategory" class="main-card-icon" />
        </div>

        <div class="main-card-platform-copy">
          <span class="main-card-label">Plataforma</span>
          <span class="main-card-name">{{ normalizedCategory }}</span>
        </div>
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
import {
  normalizeCategory,
  usePlatformTheme,
} from "@/composables/usePlatformTheme.js";

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

const normalizedCategory = computed(() =>
  normalizeCategory(props.service.category),
);

const platformTheme = computed(() =>
  usePlatformTheme(normalizedCategory.value),
);
const colors = computed(() => platformTheme.value.colors);
const icon = computed(() => platformTheme.value.icon);

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
  "--platform-bg": colors.value.bg,
  "--platform-text": colors.value.text,
  "--platform-button-text": getContrastText(colors.value.accent),
}));
</script>

<style scoped>
.main-service-card {
  position: relative;
  min-height: 310px;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  overflow: hidden;
  padding: var(--space-6);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
}

.main-service-card:hover {
  transform: translateY(-4px);
  border-color: var(--platform-accent);
  box-shadow: var(--shadow-xl);
}

.main-card-accent {
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  background: var(--platform-accent);
}

.main-card-top,
.main-card-body,
.main-card-footer {
  position: relative;
  z-index: 1;
}

.main-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.main-card-platform {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-width: 0;
}

.main-card-icon-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-xl);
  background: var(--platform-bg);
  border: 1px solid var(--color-border);
}

.main-card-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.main-card-platform-copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}

.main-card-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-muted);
}

.main-card-name {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  line-height: 1.2;
  color: var(--platform-text);
}

.main-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.main-card-body h3 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(1.5rem, 2vw, 1.875rem);
  font-weight: var(--font-extrabold);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.main-card-body p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.main-card-footer {
  margin-top: auto;
}

.main-card-btn {
  width: 100%;
  min-height: 52px;
  padding: 14px 16px;
  border: none;
  border-radius: var(--radius-lg);
  background: var(--platform-accent);
  color: var(--platform-button-text);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-fast),
    filter var(--transition-fast),
    box-shadow var(--transition-fast);
}

.main-card-btn:hover {
  transform: translateY(-1px);
  filter: brightness(0.98);
  box-shadow: var(--shadow-md);
}

@media (max-width: 768px) {
  .main-service-card {
    min-height: 290px;
    gap: var(--space-5);
    padding: var(--space-5);
    border-radius: var(--radius-xl);
  }

  .main-card-platform {
    gap: var(--space-3);
  }

  .main-card-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-lg);
  }

  .main-card-icon {
    width: 28px;
    height: 28px;
  }

  .main-card-name {
    font-size: var(--text-lg);
  }

  .main-card-body p {
    font-size: var(--text-sm);
    line-height: 1.65;
  }

  .main-card-btn {
    min-height: 48px;
    font-size: var(--text-sm);
  }
}
</style>
