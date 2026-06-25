<template>
  <section class="social-tabs-builder">
    <div class="builder-header">
      <span class="builder-kicker">Planes por red social</span>

      <h2>Elige tu plataforma y encuentra el paquete ideal</h2>

      <p>
        Cambia entre pestañas para ver planes diseñados específicamente para
        cada red social.
      </p>
    </div>

    <div class="tabs-shell">
      <div class="tabs-bar">
        <button
          v-for="service in enabledServices"
          :key="service.id"
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === service.category }"
          :style="getTabStyle(service.category)"
          :aria-pressed="activeTab === service.category"
          @click="activeTab = service.category"
        >
          <span class="tab-icon-wrap">
            <img
              v-if="getIcon(service.category)"
              :src="getIcon(service.category)"
              :alt="service.name"
              class="tab-icon-img"
            />
          </span>

          <span class="tab-label">{{ service.name }}</span>
        </button>
      </div>

      <div class="tabs-content" :style="currentThemeStyle">
        <div class="content-head">
          <div class="content-copy">
            <h3>{{ currentService?.name }}</h3>

            <p>
              {{ currentService?.description }}
            </p>
          </div>

          <div class="plans-counter">{{ filteredPlans.length }} planes</div>
        </div>

        <div v-if="filteredPlans.length" class="plans-wrapper">
          <div v-if="filteredPlans.length > 1" class="mobile-swipe-hint">
            <span class="swipe-hint-arrow">←</span>
            <span>Desliza para ver más paquetes</span>
            <span class="swipe-hint-arrow">→</span>
          </div>

          <button
            v-if="canGoLeft"
            class="slider-arrow left"
            type="button"
            @click="slideLeft"
            aria-label="Ver paquetes anteriores"
          >
            ‹
          </button>

          <div ref="sliderRef" class="plans-slider" @scroll="handleScroll">
            <PackagePlanCard
              v-for="plan in filteredPlans"
              :key="plan.id"
              :plan="plan"
              :resolved-items="getPlanItems(plan)"
              @choose="emitChoose"
            />
          </div>

          <button
            v-if="canGoRight"
            class="slider-arrow right"
            type="button"
            @click="slideRight"
            aria-label="Ver más paquetes"
          >
            ›
          </button>

          <div
            v-if="filteredPlans.length > 1"
            class="mobile-carousel-indicator"
          >
            <span class="carousel-dot active"></span>
            <span class="carousel-line"></span>
            <span class="carousel-dot"></span>
          </div>
        </div>

        <div v-else class="empty-state" :style="currentThemeStyle">
          <div class="empty-icon">✨</div>

          <h4>Próximamente más planes</h4>

          <p>Estamos preparando nuevos paquetes para {{ activeTab }}.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import PackagePlanCard from "./PackagePlanCard.vue";
import {
  normalizeCategory,
  PLATFORM_ICON_MAP,
  usePlatformTheme,
} from "@/composables/usePlatformTheme.js";

const props = defineProps({
  services: {
    type: Array,
    required: true,
  },
  packagePlans: {
    type: Array,
    required: true,
  },
  getPlanItems: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["choose"]);

const sliderRef = ref(null);
const canGoLeft = ref(false);
const canGoRight = ref(false);
const activeTab = ref("");

const enabledServices = computed(() => {
  return props.services.filter((item) => item.isEnabled);
});

watch(
  enabledServices,
  (value) => {
    if (!value.length) return;

    const exists = value.some((item) => item.category === activeTab.value);

    if (!exists) {
      activeTab.value = value[0].category;
    }
  },
  { immediate: true },
);

const currentService = computed(() => {
  return enabledServices.value.find(
    (item) => item.category === activeTab.value,
  );
});

const filteredPlans = computed(() => {
  return props.packagePlans.filter((plan) => plan.category === activeTab.value);
});

const getPlatformTheme = (category) => {
  const normalized = normalizeCategory(category);
  const theme = usePlatformTheme(normalized);

  return {
    normalized,
    colors: theme.colors,
    icon: theme.icon || PLATFORM_ICON_MAP[normalized] || null,
  };
};

const currentThemeStyle = computed(() => {
  const { colors } = getPlatformTheme(activeTab.value);

  return {
    "--platform-accent": colors.accent,
    "--platform-accent-bg": colors.bg,
    "--platform-text": colors.text,
  };
});

const getTabStyle = (category) => {
  const { colors } = getPlatformTheme(category);
  const isActive = activeTab.value === category;

  return {
    "--platform-accent": colors.accent,
    "--platform-accent-bg": colors.bg,
    "--platform-text": colors.text,
    borderColor: isActive ? colors.accent : "var(--color-border)",
    background: isActive ? "rgba(37, 99, 235, 0.08)" : "var(--color-surface)",
    color: isActive ? colors.text : "var(--color-text-secondary)",
  };
};

watch(
  () => filteredPlans.value,
  async () => {
    await nextTick();

    if (sliderRef.value) {
      sliderRef.value.scrollLeft = 0;
    }

    updateArrows();
  },
  { immediate: true },
);

const emitChoose = (payload) => {
  emit("choose", payload);
};

const updateArrows = () => {
  const el = sliderRef.value;
  if (!el) return;

  canGoLeft.value = el.scrollLeft > 10;
  canGoRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 10;
};

const handleScroll = () => {
  updateArrows();
};

const slideLeft = () => {
  sliderRef.value?.scrollBy({
    left: -360,
    behavior: "smooth",
  });
};

const slideRight = () => {
  sliderRef.value?.scrollBy({
    left: 360,
    behavior: "smooth",
  });
};

const getIcon = (category) => {
  const normalized = normalizeCategory(category);
  return (
    getPlatformTheme(normalized).icon || PLATFORM_ICON_MAP[normalized] || null
  );
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.social-tabs-builder {
  --builder-surface: var(--color-surface);
  --builder-surface-subtle: var(--color-surface-subtle);
  --builder-border: var(--color-border);
  --builder-border-subtle: var(--color-border-subtle);
  --builder-text: var(--color-text-primary);
  --builder-text-secondary: var(--color-text-secondary);
  --builder-text-muted: var(--color-text-muted);
  --builder-accent-soft: rgba(37, 99, 235, 0.08);
  --builder-shadow: var(--shadow-lg);
  --builder-shadow-soft: var(--shadow-md);
  margin-top: var(--space-5);
}

.builder-header {
  text-align: center;
  margin-bottom: var(--space-6);
}

.builder-kicker {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  margin-bottom: var(--space-3);
  border-radius: var(--radius-full);
  border: 1px solid rgba(37, 99, 235, 0.14);
  background: rgba(37, 99, 235, 0.08);
  color: var(--color-accent);
  font-size: 0.82rem;
  font-weight: var(--font-bold);
}

.builder-header h2 {
  margin: 0 0 var(--space-2);
  color: var(--builder-text);
  font-size: clamp(1.9rem, 4vw, 2.7rem);
  line-height: 1.08;
}

.builder-header p {
  max-width: 760px;
  margin: 0 auto;
  color: var(--builder-text-secondary);
  line-height: 1.6;
}

.tabs-shell {
  overflow: hidden;
  border: 1px solid var(--builder-border);
  border-radius: var(--radius-2xl);
  background: var(--builder-surface);
  box-shadow: var(--builder-shadow);
}

.tabs-bar {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: 1px solid var(--builder-border);
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}

.tab-btn {
  width: 100%;
  min-height: 62px;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  background: var(--builder-surface);
  color: var(--builder-text-secondary);
  font-size: 0.96rem;
  font-weight: var(--font-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base),
    background var(--transition-base),
    color var(--transition-base);
}

.tab-btn:hover {
  transform: translateY(-1px);
  border-color: var(--platform-accent);
  box-shadow: var(--builder-shadow-soft);
}

.tab-btn.active {
  background: var(--builder-accent-soft);
  border-color: var(--platform-accent);
  color: var(--platform-text);
  box-shadow: var(--builder-shadow-soft);
}

.tab-icon-wrap {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--platform-accent-bg);
}

.tab-icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
  transition: transform var(--transition-base);
}

.tab-btn:hover .tab-icon-img,
.tab-btn.active .tab-icon-img {
  transform: scale(1.05);
}

.tab-label {
  min-width: 0;
  text-align: center;
  line-height: 1.15;
  color: inherit;
}

.tabs-content {
  padding: var(--space-6);
}

.content-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
  padding: var(--space-5);
  border: 1px solid var(--builder-border);
  border-radius: var(--radius-xl);
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.content-copy {
  min-width: 0;
}

.content-head h3 {
  margin: 0 0 var(--space-2);
  color: var(--builder-text);
  font-size: 1.55rem;
  line-height: 1.08;
}

.content-head p {
  margin: 0;
  max-width: 760px;
  color: var(--builder-text-secondary);
  line-height: 1.6;
}

.plans-counter {
  min-width: 120px;
  flex-shrink: 0;
  height: fit-content;
  padding: 14px;
  border: 1px solid var(--platform-accent);
  border-radius: 18px;
  background: var(--platform-accent-bg);
  color: var(--platform-text);
  font-weight: var(--font-bold);
  text-align: center;
}

.plans-wrapper {
  position: relative;
  padding: var(--space-4);
  border: 1px solid var(--builder-border);
  border-radius: var(--radius-xl);
  background: var(--builder-surface-subtle);
}

.mobile-swipe-hint,
.mobile-carousel-indicator {
  display: none;
}

.plans-slider {
  display: flex;
  gap: var(--space-5);
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: var(--space-2) 42px var(--space-2);
  scrollbar-width: none;
  scroll-snap-type: x proximity;
}

.plans-slider::-webkit-scrollbar {
  display: none;
}

.plans-slider > * {
  flex: 0 0 auto;
  scroll-snap-align: start;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 44px;
  height: 44px;
  border: 1px solid var(--builder-border);
  border-radius: var(--radius-full);
  background: var(--builder-surface);
  color: var(--builder-text);
  cursor: pointer;
  font-size: 1.75rem;
  font-weight: var(--font-bold);
  line-height: 1;
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.slider-arrow.left {
  left: var(--space-1);
}

.slider-arrow.right {
  right: var(--space-1);
}

.slider-arrow:hover {
  transform: translateY(-50%) scale(1.03);
  border-color: var(--platform-accent);
  color: var(--platform-text);
  box-shadow: var(--builder-shadow-soft);
}

.empty-state {
  padding: 50px var(--space-5);
  text-align: center;
  border: 1px dashed var(--platform-accent);
  border-radius: var(--radius-xl);
  background: var(--platform-accent-bg);
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: var(--space-2);
}

.empty-state h4 {
  margin: 0 0 var(--space-2);
  color: var(--builder-text);
}

.empty-state p {
  margin: 0;
  color: var(--builder-text-secondary);
}

@media (max-width: 1100px) {
  .tabs-bar {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .tabs-content {
    padding: var(--space-5);
  }

  .content-head {
    flex-direction: column;
    align-items: stretch;
  }

  .plans-counter {
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 700px) {
  .builder-header h2 {
    font-size: 1.55rem;
  }

  .builder-header p {
    font-size: 0.95rem;
  }

  .tabs-shell {
    border-radius: 24px;
  }

  .tabs-bar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    padding: var(--space-3);
  }

  .tab-btn {
    min-height: 54px;
    padding: 0 10px;
    font-size: 0.9rem;
    border-radius: 16px;
    gap: var(--space-2);
  }

  .tab-icon-wrap {
    width: 24px;
    height: 24px;
  }

  .tab-icon-img {
    width: 16px;
    height: 16px;
  }

  .tabs-content {
    padding: var(--space-4);
  }

  .content-head {
    margin-bottom: var(--space-4);
    padding: var(--space-4);
  }

  .content-head h3 {
    font-size: 1.22rem;
  }

  .content-head p {
    font-size: 0.93rem;
  }

  .plans-counter {
    padding: 12px 14px;
    border-radius: 16px;
    font-size: 0.92rem;
  }

  .mobile-swipe-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    margin: 0 0 var(--space-3);
    text-align: center;
    color: var(--builder-text-muted);
    font-size: 0.82rem;
    font-weight: var(--font-bold);
  }

  .swipe-hint-arrow {
    color: var(--builder-text-secondary);
    font-size: 0.9rem;
    line-height: 1;
  }

  .plans-slider {
    gap: 14px;
    padding: var(--space-4) 22px var(--space-3);
    scroll-snap-type: x mandatory;
  }

  .slider-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    font-size: 1.6rem;
  }

  .slider-arrow.left {
    left: -2px;
  }

  .slider-arrow.right {
    right: -2px;
  }

  .mobile-carousel-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: var(--space-3);
  }

  .carousel-dot {
    width: 7px;
    height: 7px;
    border-radius: var(--radius-full);
    background: rgba(148, 163, 184, 0.38);
  }

  .carousel-dot.active {
    background: var(--color-accent);
  }

  .carousel-line {
    width: 22px;
    height: 2px;
    border-radius: var(--radius-full);
    background: rgba(148, 163, 184, 0.3);
  }
}

@media (max-width: 480px) {
  .social-tabs-builder {
    margin-top: 10px;
  }

  .builder-kicker {
    font-size: 0.76rem;
    padding: 7px 12px;
  }

  .builder-header h2 {
    font-size: 1.35rem;
  }

  .tabs-bar {
    padding: 10px;
    gap: var(--space-2);
  }

  .tab-btn {
    min-height: 48px;
    border-radius: 14px;
    font-size: 0.84rem;
    gap: 6px;
  }

  .tab-label {
    font-size: 0.82rem;
  }

  .tabs-content {
    padding: 14px;
  }

  .plans-wrapper {
    padding: var(--space-3);
  }

  .plans-slider {
    padding: 14px 18px 12px;
  }

  .slider-arrow {
    width: 36px;
    height: 36px;
    font-size: 1.5rem;
  }
}
</style>
