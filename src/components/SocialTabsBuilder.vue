<template>
  <section class="social-tabs-builder">
    <div class="builder-header">
      <span class="builder-kicker">Planes por red social</span>
      <h2>Elige tu plataforma y encuentra el paquete ideal</h2>
      <p>
        Cambia entre pestañas para ver planes diseñados específicamente para cada
        red social.
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
          :style="activeTab === service.category ? activeStyle(service.category) : {}"
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

      <div class="tabs-content">
        <div class="content-head">
          <div class="content-copy">
            <h3>{{ currentService?.name }}</h3>
            <p>{{ currentService?.description }}</p>
          </div>
          <div class="plans-counter">
            {{ filteredPlans.length }} planes
          </div>
        </div>

        <div v-if="filteredPlans.length" class="plans-wrapper">
          <div v-if="filteredPlans.length > 1" class="mobile-swipe-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m0 0l7 7m-7-7l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <span>Desliza para ver más paquetes</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m0 0l-7-7m7 7l-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </div>

          <button
            v-if="canGoLeft"
            class="slider-arrow left"
            type="button"
            @click="slideLeft"
            aria-label="Ver paquetes anteriores"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>

          <div
            ref="sliderRef"
            class="plans-slider"
            @scroll="handleScroll"
          >
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <div v-else class="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 6v6l4 2" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="10" stroke="#9ca3af" stroke-width="1.5"/>
          </svg>
          <h4>Próximamente más planes</h4>
          <p>Estamos preparando nuevos paquetes para {{ activeTab }}.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch, nextTick } from "vue";
import { usePlatformTheme } from "@/composables/usePlatformTheme";
import PackagePlanCard from "./PackagePlanCard.vue";

const props = defineProps({
  services: { type: Array, required: true },
  packagePlans: { type: Array, required: true },
  getPlanItems: { type: Function, required: true },
});

const emit = defineEmits(["choose"]);
const { getIcon, getColor } = usePlatformTheme();

const sliderRef = ref(null);
const canGoLeft = ref(false);
const canGoRight = ref(false);

const enabledServices = computed(() =>
  props.services.filter((item) => item.isEnabled)
);

const activeTab = ref("");

watch(
  enabledServices,
  (value) => {
    if (!value.length) return;
    const exists = value.some((item) => item.category === activeTab.value);
    if (!exists) activeTab.value = value[0].category;
  },
  { immediate: true }
);

const currentService = computed(() =>
  enabledServices.value.find((item) => item.category === activeTab.value)
);

const filteredPlans = computed(() =>
  props.packagePlans.filter((plan) => plan.category === activeTab.value)
);

watch(
  () => filteredPlans.value,
  async () => {
    await nextTick();
    if (sliderRef.value) sliderRef.value.scrollLeft = 0;
    updateArrows();
  },
  { immediate: true }
);

const emitChoose = (payload) => emit("choose", payload);

const activeStyle = (category) => {
  const color = getColor(category);
  return {
    borderColor: color,
    background: `${color}0d`,
    boxShadow: `0 0 0 3px ${color}14`,
  };
};

const updateArrows = () => {
  const el = sliderRef.value;
  if (!el) return;
  canGoLeft.value = el.scrollLeft > 10;
  canGoRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 10;
};

const handleScroll = () => updateArrows();

const slideLeft = () => {
  sliderRef.value?.scrollBy({ left: -360, behavior: "smooth" });
};

const slideRight = () => {
  sliderRef.value?.scrollBy({ left: 360, behavior: "smooth" });
};
</script>

<style scoped>
.social-tabs-builder {
  margin-top: var(--space-4, 16px);
}

.builder-header {
  text-align: center;
  margin-bottom: var(--space-6, 24px);
}

.builder-kicker {
  display: inline-flex;
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
  margin-bottom: var(--space-3, 12px);
}

.builder-header h2 {
  margin: 0 0 var(--space-2, 8px);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: var(--font-extrabold, 800);
  color: var(--color-text, #111827);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.builder-header p {
  margin: 0 auto;
  max-width: 600px;
  color: var(--color-text-secondary, #6b7280);
  line-height: 1.6;
}

/* Tabs Shell */
.tabs-shell {
  border-radius: var(--radius-xl, 20px);
  overflow: hidden;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
}

.tabs-bar {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: var(--space-2, 8px);
  padding: var(--space-4, 16px);
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  background: var(--color-surface-alt, #f9fafb);
}

.tab-btn {
  position: relative;
  width: 100%;
  min-height: 54px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-md, 12px);
  color: var(--color-text, #111827);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  background: var(--color-surface, #fff);
  transition: all var(--transition-fast, 150ms ease);
}

.tab-btn:hover {
  background: var(--color-surface-alt, #f3f4f6);
  border-color: var(--color-border-strong, #d1d5db);
}

.tab-btn.active {
  font-weight: var(--font-bold, 700);
}

.tab-icon-wrap {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tab-icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.tab-label {
  min-width: 0;
  text-align: center;
  line-height: 1.15;
}

/* Content */
.tabs-content {
  padding: var(--space-5, 20px);
}

.content-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4, 16px);
  margin-bottom: var(--space-5, 20px);
}

.content-copy {
  min-width: 0;
}

.content-head h3 {
  margin: 0 0 var(--space-1, 4px);
  color: var(--color-text, #111827);
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-bold, 700);
}

.content-head p {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
  line-height: 1.6;
}

.plans-counter {
  padding: 8px 16px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-surface-alt, #f3f4f6);
  color: var(--color-text-secondary, #6b7280);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
  flex-shrink: 0;
  border: 1px solid var(--color-border, #e5e7eb);
}

/* Slider */
.plans-wrapper {
  position: relative;
}

.mobile-swipe-hint {
  display: none;
}

.plans-slider {
  display: flex;
  gap: var(--space-4, 16px);
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: var(--space-3, 12px) var(--space-10, 40px) var(--space-4, 16px);
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
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-full, 9999px);
  cursor: pointer;
  color: var(--color-text, #111827);
  background: var(--color-surface, #fff);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast, 150ms ease);
}

.slider-arrow.left { left: 2px; }
.slider-arrow.right { right: 2px; }

.slider-arrow:hover {
  background: var(--color-surface-alt, #f3f4f6);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
}

/* Empty state */
.empty-state {
  padding: var(--space-12, 48px) var(--space-6, 24px);
  text-align: center;
}

.empty-state h4 {
  margin: var(--space-3, 12px) 0 var(--space-2, 8px);
  font-weight: var(--font-semibold, 600);
  color: var(--color-text, #111827);
}

.empty-state p {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
}

/* Responsive */
@media (max-width: 1024px) {
  .tabs-bar {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .tabs-bar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-2, 8px);
    padding: var(--space-3, 12px);
  }

  .tab-btn {
    min-height: 48px;
    font-size: var(--text-xs, 0.75rem);
  }

  .tabs-content {
    padding: var(--space-4, 16px);
  }

  .content-head {
    flex-direction: column;
    align-items: stretch;
  }

  .plans-counter {
    width: 100%;
    text-align: center;
  }

  .mobile-swipe-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    margin-bottom: var(--space-2, 8px);
    color: var(--color-text-muted, #9ca3af);
    font-size: var(--text-xs, 0.75rem);
  }

  .plans-slider {
    gap: var(--space-3, 12px);
    padding: var(--space-3, 12px) var(--space-5, 20px);
    scroll-snap-type: x mandatory;
  }

  .slider-arrow {
    width: 36px;
    height: 36px;
  }

  .slider-arrow.left { left: -2px; }
  .slider-arrow.right { right: -2px; }
}

@media (max-width: 480px) {
  .builder-header h2 {
    font-size: 1.35rem;
  }

  .tabs-bar {
    padding: var(--space-2, 8px);
    gap: 6px;
  }

  .tab-btn {
    min-height: 44px;
    border-radius: var(--radius-sm, 8px);
  }

  .tab-icon-img {
    width: 18px;
    height: 18px;
  }

  .tabs-content {
    padding: var(--space-3, 12px);
  }
}
</style>
