<template>
  <article class="main-service-card" @click="handleOpen">
    <div class="main-card-top">
      <BasePlatformPill :platform="normalizedCategory" />
      <div v-if="icon" class="main-card-icon-wrap" :style="{ borderColor: color + '33' }">
        <img :src="icon" :alt="normalizedCategory" class="main-card-icon" />
      </div>
    </div>

    <div class="main-card-body">
      <h3>{{ getCardTitle(normalizedCategory) }}</h3>
      <p>{{ service.description }}</p>
    </div>

    <div class="main-card-footer">
      <button class="main-card-btn" type="button" @click.stop="handleOpen">
        Ver servicios
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14m0 0l-7-7m7 7l-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { normalizeCategory } from "@/utils/normalizeCategory";
import { usePlatformTheme } from "@/composables/usePlatformTheme";
import BasePlatformPill from "@/components/BasePlatformPill.vue";

const props = defineProps({
  service: { type: Object, required: true },
});

const emit = defineEmits(["open"]);
const { getIcon, getColor } = usePlatformTheme();

const handleOpen = () => emit("open", props.service);

const normalizedCategory = computed(() =>
  normalizeCategory(props.service.category)
);

const icon = computed(() => getIcon(normalizedCategory.value));
const color = computed(() => getColor(normalizedCategory.value));

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
</script>

<style scoped>
.main-service-card {
  position: relative;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-xl, 20px);
  padding: var(--space-5, 20px);
  cursor: pointer;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
  transition: all var(--transition-fast, 150ms ease);
}

.main-service-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-border-strong, #d1d5db);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
}

.main-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3, 12px);
  margin-bottom: var(--space-5, 20px);
}

.main-card-icon-wrap {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg, 16px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-alt, #f9fafb);
  border: 1px solid var(--color-border, #e5e7eb);
}

.main-card-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.main-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 8px);
}

.main-card-body h3 {
  margin: 0;
  font-size: var(--text-xl, 1.25rem);
  line-height: 1.15;
  font-weight: var(--font-bold, 700);
  color: var(--color-text, #111827);
}

.main-card-body p {
  margin: 0;
  font-size: var(--text-sm, 0.875rem);
  line-height: 1.7;
  color: var(--color-text-secondary, #6b7280);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.main-card-footer {
  margin-top: auto;
  padding-top: var(--space-4, 16px);
}

.main-card-btn {
  width: 100%;
  min-height: 44px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-md, 12px);
  padding: 10px 16px;
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
  cursor: pointer;
  color: var(--color-text, #111827);
  background: var(--color-surface, #fff);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 8px);
  transition: all var(--transition-fast, 150ms ease);
}

.main-card-btn:hover {
  background: var(--color-surface-alt, #f3f4f6);
  border-color: var(--color-border-strong, #d1d5db);
}

@media (max-width: 768px) {
  .main-service-card {
    min-height: 220px;
    padding: var(--space-4, 16px);
  }

  .main-card-icon-wrap {
    width: 52px;
    height: 52px;
  }

  .main-card-icon {
    width: 28px;
    height: 28px;
  }

  .main-card-body h3 {
    font-size: var(--text-lg, 1.125rem);
  }
}
</style>
