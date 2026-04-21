<template>
  <section class="social-tabs-builder">
    <!-- Header -->
    <div class="builder-header">
      <span class="builder-kicker">Planes por red social</span>

      <h2>Elige tu plataforma y encuentra el paquete ideal</h2>

      <p>
        Cambia entre pestañas para ver planes diseñados específicamente para cada
        red social.
      </p>
    </div>

    <!-- Shell -->
    <div class="tabs-shell">
      <!-- Tabs -->
      <div class="tabs-bar">
        <button
          v-for="service in enabledServices"
          :key="service.id"
          type="button"
          class="tab-btn"
          :class="[
            getThemeClass(service.category),
            { active: activeTab === service.category }
          ]"
          @click="activeTab = service.category"
        >
          <span class="tab-icon">{{ getIcon(service.category) }}</span>
          <span>{{ service.name }}</span>
        </button>
      </div>

      <!-- Content -->
      <div class="tabs-content">
        <div class="content-head">
          <div>
            <h3>{{ currentService?.name }}</h3>

            <p>
              {{ currentService?.description }}
            </p>
          </div>

          <div class="plans-counter">
            {{ filteredPlans.length }} planes
          </div>
        </div>

        <!-- Slider -->
        <div v-if="filteredPlans.length" class="plans-wrapper">
          <button
            v-if="canGoLeft"
            class="slider-arrow left"
            type="button"
            @click="slideLeft"
          >
            ‹
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
          >
            ›
          </button>
        </div>

        <!-- Empty -->
        <div v-else class="empty-state">
          <div class="empty-icon">✨</div>

          <h4>Próximamente más planes</h4>

          <p>
            Estamos preparando nuevos paquetes para {{ activeTab }}.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  computed,
  ref,
  watch,
  nextTick,
} from "vue";

import PackagePlanCard from "./PackagePlanCard.vue";

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

const enabledServices = computed(() => {
  return props.services.filter((item) => item.isEnabled);
});

const activeTab = ref("");

watch(
  enabledServices,
  (value) => {
    if (!value.length) return;

    const exists = value.some(
      (item) => item.category === activeTab.value
    );

    if (!exists) {
      activeTab.value = value[0].category;
    }
  },
  { immediate: true }
);

const currentService = computed(() => {
  return enabledServices.value.find(
    (item) => item.category === activeTab.value
  );
});

const filteredPlans = computed(() => {
  return props.packagePlans.filter(
    (plan) => plan.category === activeTab.value
  );
});

watch(
  () => filteredPlans.value,
  async () => {
    await nextTick();
    updateArrows();

    if (sliderRef.value) {
      sliderRef.value.scrollLeft = 0;
    }
  },
  { immediate: true }
);

const emitChoose = (plan) => {
  emit("choose", plan);
};

const updateArrows = () => {
  const el = sliderRef.value;

  if (!el) return;

  canGoLeft.value = el.scrollLeft > 10;

  canGoRight.value =
    el.scrollLeft + el.clientWidth <
    el.scrollWidth - 10;
};

const handleScroll = () => {
  updateArrows();
};

const slideLeft = () => {
  sliderRef.value?.scrollBy({
    left: -380,
    behavior: "smooth",
  });
};

const slideRight = () => {
  sliderRef.value?.scrollBy({
    left: 380,
    behavior: "smooth",
  });
};

const getIcon = (category) => {
  const icons = {
    Instagram: "📸",
    Facebook: "📘",
    TikTok: "🎵",
    X: "✖️",
    YouTube: "▶️",
    Spotify: "🎧",
    Telegram: "✈️",
    WhatsApp: "💬",
  };

  return icons[category] || "✨";
};

const getThemeClass = (category) => {
  const map = {
    Instagram: "theme-instagram",
    Facebook: "theme-facebook",
    TikTok: "theme-tiktok",
    X: "theme-x",
    YouTube: "theme-youtube",
    Spotify: "theme-spotify",
    Telegram: "theme-telegram",
    WhatsApp: "theme-whatsapp",
  };

  return map[category] || "theme-default";
};
</script>

<style scoped>
.social-tabs-builder {
  margin-top: 18px;
}

.builder-header {
  text-align: center;
  margin-bottom: 22px;
}

.builder-kicker {
  display: inline-flex;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.16);
  color: #ddd6fe;
  font-size: 0.82rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.builder-header h2 {
  margin: 0 0 10px;
  font-size: clamp(1.9rem, 4vw, 2.7rem);
  color: #fff;
}

.builder-header p {
  margin: 0 auto;
  max-width: 760px;
  color: #94a3b8;
  line-height: 1.6;
}

.tabs-shell {
  border-radius: 28px;
  overflow: hidden;

  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.92),
    rgba(10, 16, 28, 0.94)
  );

  border: 1px solid rgba(255,255,255,0.08);

  box-shadow: 0 22px 50px rgba(2,6,23,0.35);
}

/* Tabs */
.tabs-bar {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.tab-btn {
  width: 100%;
  min-height: 56px;

  border: none;
  border-radius: 18px;

  color: #fff;
  font-size: 1rem;
  font-weight: 800;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  opacity: 0.78;

  transition: all 0.22s ease;
}

.tab-btn:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.tab-btn.active {
  opacity: 1;
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0,0,0,.25);
}

.tabs-content {
  padding: 22px;
}

.content-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 22px;
}

.content-head h3 {
  margin: 0 0 8px;
  color: #fff;
  font-size: 1.55rem;
}

.content-head p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 760px;
}

.plans-counter {
  min-width: 120px;
  padding: 14px;
  height: fit-content;
  border-radius: 18px;
  background: rgba(255,255,255,0.05);
  color: #cbd5e1;
  font-weight: 800;
  text-align: center;
}

/* Slider */
.plans-wrapper {
  position: relative;
}

.plans-slider {
  display: flex;
  gap: 22px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 6px 42px 12px;
  scrollbar-width: none;
}

.plans-slider::-webkit-scrollbar {
  display: none;
}

.plans-slider > * {
  flex: 0 0 auto;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;

  width: 44px;
  height: 44px;

  border: none;
  border-radius: 999px;

  cursor: pointer;

  font-size: 2rem;
  font-weight: 700;
  line-height: 1;

  color: white;

  background: rgba(15,23,42,.88);
  border: 1px solid rgba(255,255,255,.08);

  backdrop-filter: blur(12px);
}

.slider-arrow.left {
  left: 0;
}

.slider-arrow.right {
  right: 0;
}

.slider-arrow:hover {
  background: rgba(30,41,59,.95);
}

/* Empty */
.empty-state {
  padding: 50px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.empty-state h4 {
  margin: 0 0 8px;
  color: #fff;
}

.empty-state p {
  margin: 0;
  color: #94a3b8;
}

/* Themes */
.theme-instagram {
  background: linear-gradient(135deg,#f58529,#dd2a7b,#8134af);
}

.theme-facebook {
  background: linear-gradient(135deg,#1877f2,#60a5fa);
}

.theme-tiktok {
  background: linear-gradient(135deg,#111827,#25f4ee,#fe2c55);
}

.theme-x {
  background: linear-gradient(135deg,#111827,#334155);
}

.theme-youtube {
  background: linear-gradient(135deg,#dc2626,#ef4444);
}

.theme-spotify {
  background: linear-gradient(135deg,#1db954,#22c55e);
}

.theme-telegram {
  background: linear-gradient(135deg,#0088cc,#38bdf8);
}

.theme-whatsapp {
  background: linear-gradient(135deg,#25d366,#4ade80);
}

.theme-default {
  background: linear-gradient(135deg,#475569,#64748b);
}

/* Responsive */
@media (max-width: 1100px) {
  .tabs-bar {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .content-head {
    flex-direction: column;
  }
}

@media (max-width: 700px) {
  .tabs-bar {
    grid-template-columns: repeat(2, 1fr);
  }

  .plans-slider {
    padding-inline: 12px;
  }

  .slider-arrow {
    display: none;
  }
}
</style>