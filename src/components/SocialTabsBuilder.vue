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
          :class="[
            getThemeClass(service.category),
            { active: activeTab === service.category }
          ]"
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

            <p>
              {{ currentService?.description }}
            </p>
          </div>

          <div class="plans-counter">
            {{ filteredPlans.length }} planes
          </div>
        </div>

        <div v-if="filteredPlans.length" class="plans-wrapper">
          <div
            v-if="filteredPlans.length > 1"
            class="mobile-swipe-hint"
          >
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
import { computed, ref, watch, nextTick } from "vue";
import PackagePlanCard from "./PackagePlanCard.vue";

import instagramIcon from "@/assets/instagram_neon.svg";
import facebookIcon from "@/assets/facebook_neon.svg";
import tiktokIcon from "@/assets/tiktok_neon.svg";
import youtubeIcon from "@/assets/youtube_neon.svg";
import twitterIcon from "@/assets/twitter_neon.svg";
import spotifyIcon from "@/assets/spotify_neon.svg";
import telegramIcon from "@/assets/telegram_neon.svg";
import whatsappIcon from "@/assets/whatsapp_neon.svg";

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

    const exists = value.some((item) => item.category === activeTab.value);

    if (!exists) {
      activeTab.value = value[0].category;
    }
  },
  { immediate: true }
);

const currentService = computed(() => {
  return enabledServices.value.find((item) => item.category === activeTab.value);
});

const filteredPlans = computed(() => {
  return props.packagePlans.filter((plan) => plan.category === activeTab.value);
});

watch(
  () => filteredPlans.value,
  async () => {
    await nextTick();

    if (sliderRef.value) {
      sliderRef.value.scrollLeft = 0;
    }

    updateArrows();
  },
  { immediate: true }
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
  const icons = {
    Instagram: instagramIcon,
    Facebook: facebookIcon,
    TikTok: tiktokIcon,
    X: twitterIcon,
    YouTube: youtubeIcon,
    Spotify: spotifyIcon,
    Telegram: telegramIcon,
    WhatsApp: whatsappIcon,
  };

  return icons[category] || null;
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
*,
*::before,
*::after {
  box-sizing: border-box;
}

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
  line-height: 1.08;
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
    rgba(15, 23, 42, 0.9),
    rgba(10, 16, 28, 0.94)
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 22px 50px rgba(2, 6, 23, 0.35);
}

.tabs-bar {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.tab-btn {
  position: relative;
  width: 100%;
  min-height: 62px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.96rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  opacity: 1;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease,
    filter 0.22s ease,
    background 0.22s ease,
    color 0.22s ease;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 10px 22px rgba(2, 6, 23, 0.14);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
}

.tab-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.01) 45%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.9;
}

.tab-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.1) saturate(1.1);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow:
    0 14px 26px rgba(2, 6, 23, 0.18),
    0 0 16px rgba(255, 255, 255, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.tab-btn.active {
  color: #ffffff;
  transform: translateY(-2px) scale(1.03);
  border-color: rgba(255, 255, 255, 0.26);
  filter: brightness(1.22) saturate(1.32);
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.28),
    0 0 18px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.tab-icon-wrap {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tab-icon-img {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
  opacity: 0.96;
  filter:
    brightness(1.12)
    saturate(1.15)
    drop-shadow(0 0 7px rgba(255, 255, 255, 0.08));
  transition:
    opacity 0.22s ease,
    transform 0.22s ease,
    filter 0.22s ease;
}

.tab-btn:hover .tab-icon-img {
  opacity: 1;
  transform: scale(1.06);
  filter:
    brightness(1.18)
    saturate(1.22)
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.12));
}

.tab-btn.active .tab-icon-img {
  opacity: 1;
  transform: scale(1.12);
  filter:
    brightness(1.26)
    saturate(1.35)
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.12))
    drop-shadow(0 0 16px rgba(59, 130, 246, 0.16));
}

.tab-label {
  min-width: 0;
  text-align: center;
  line-height: 1.15;
  color: inherit;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.04);
}

.tabs-content {
  padding: 22px;
}

.content-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 22px;
}

.content-copy {
  min-width: 0;
}

.content-head h3 {
  margin: 0 0 8px;
  color: #fff;
  font-size: 1.55rem;
  line-height: 1.08;
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
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
  font-weight: 800;
  text-align: center;
  flex-shrink: 0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.plans-wrapper {
  position: relative;
}

.mobile-swipe-hint {
  display: none;
}

.mobile-carousel-indicator {
  display: none;
}

.plans-slider {
  display: flex;
  gap: 22px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 12px 42px 14px;
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
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  color: white;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  box-shadow:
    0 10px 24px rgba(2, 6, 23, 0.24),
    0 0 14px rgba(59, 130, 246, 0.08);
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.slider-arrow.left {
  left: 2px;
}

.slider-arrow.right {
  right: 2px;
}

.slider-arrow:hover {
  background: rgba(30, 41, 59, 0.95);
  transform: translateY(-50%) scale(1.04);
  box-shadow:
    0 12px 28px rgba(2, 6, 23, 0.28),
    0 0 18px rgba(59, 130, 246, 0.14);
}

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

.theme-instagram {
  background: linear-gradient(
    135deg,
    rgba(245, 133, 41, 0.24),
    rgba(221, 42, 123, 0.26),
    rgba(129, 52, 175, 0.22)
  );
}

.theme-instagram.active {
  background: linear-gradient(
    135deg,
    rgba(245, 133, 41, 0.4),
    rgba(221, 42, 123, 0.42),
    rgba(129, 52, 175, 0.36)
  );
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.26),
    0 0 28px rgba(221, 42, 123, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.theme-facebook {
  background: linear-gradient(
    135deg,
    rgba(24, 119, 242, 0.24),
    rgba(96, 165, 250, 0.24)
  );
}

.theme-facebook.active {
  background: linear-gradient(
    135deg,
    rgba(24, 119, 242, 0.38),
    rgba(96, 165, 250, 0.36)
  );
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.26),
    0 0 28px rgba(59, 130, 246, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.theme-tiktok {
  background: linear-gradient(
    135deg,
    rgba(17, 24, 39, 0.28),
    rgba(37, 244, 238, 0.2),
    rgba(254, 44, 85, 0.2)
  );
}

.theme-tiktok.active {
  background: linear-gradient(
    135deg,
    rgba(17, 24, 39, 0.34),
    rgba(37, 244, 238, 0.28),
    rgba(254, 44, 85, 0.28)
  );
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.26),
    0 0 28px rgba(254, 44, 85, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.theme-x {
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.24),
    rgba(51, 65, 85, 0.24)
  );
}

.theme-x.active {
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.36),
    rgba(71, 85, 105, 0.34)
  );
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.26),
    0 0 24px rgba(148, 163, 184, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.theme-youtube {
  background: linear-gradient(
    135deg,
    rgba(220, 38, 38, 0.24),
    rgba(239, 68, 68, 0.24)
  );
}

.theme-youtube.active {
  background: linear-gradient(
    135deg,
    rgba(220, 38, 38, 0.38),
    rgba(239, 68, 68, 0.38)
  );
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.26),
    0 0 28px rgba(239, 68, 68, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.theme-spotify {
  background: linear-gradient(
    135deg,
    rgba(29, 185, 84, 0.24),
    rgba(34, 197, 94, 0.24)
  );
}

.theme-spotify.active {
  background: linear-gradient(
    135deg,
    rgba(29, 185, 84, 0.36),
    rgba(34, 197, 94, 0.38)
  );
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.26),
    0 0 28px rgba(34, 197, 94, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.theme-telegram {
  background: linear-gradient(
    135deg,
    rgba(0, 136, 204, 0.24),
    rgba(56, 189, 248, 0.24)
  );
}

.theme-telegram.active {
  background: linear-gradient(
    135deg,
    rgba(0, 136, 204, 0.36),
    rgba(56, 189, 248, 0.36)
  );
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.26),
    0 0 28px rgba(56, 189, 248, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.theme-whatsapp {
  background: linear-gradient(
    135deg,
    rgba(37, 211, 102, 0.24),
    rgba(74, 222, 128, 0.24)
  );
}

.theme-whatsapp.active {
  background: linear-gradient(
    135deg,
    rgba(37, 211, 102, 0.36),
    rgba(74, 222, 128, 0.38)
  );
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.26),
    0 0 28px rgba(74, 222, 128, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.theme-default {
  background: linear-gradient(
    135deg,
    rgba(71, 85, 105, 0.24),
    rgba(100, 116, 139, 0.24)
  );
}

.theme-default.active {
  background: linear-gradient(
    135deg,
    rgba(71, 85, 105, 0.34),
    rgba(100, 116, 139, 0.34)
  );
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.26),
    0 0 24px rgba(148, 163, 184, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

@media (max-width: 1100px) {
  .tabs-bar {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .tabs-content {
    padding: 18px;
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
    padding: 12px;
  }

  .tab-btn {
    min-height: 54px;
    padding: 0 10px;
    font-size: 0.9rem;
    border-radius: 16px;
    gap: 8px;
  }

  .tab-icon-wrap {
    width: 22px;
    height: 22px;
  }

  .tab-icon-img {
    width: 18px;
    height: 18px;
  }

  .tabs-content {
    padding: 16px;
  }

  .content-head {
    margin-bottom: 16px;
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
    background: rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
  }

  .mobile-swipe-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 0 0 10px;
    text-align: center;
    color: #94a3b8;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .swipe-hint-arrow {
    color: #cbd5e1;
    font-size: 0.9rem;
    line-height: 1;
  }

  .plans-slider {
    gap: 14px;
    padding: 16px 22px 12px;
    scroll-snap-type: x mandatory;
  }

  .slider-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    font-size: 1.7rem;
    top: 50%;
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
    margin-top: 10px;
  }

  .carousel-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.38);
  }

  .carousel-dot.active {
    background: #60a5fa;
    box-shadow: 0 0 10px rgba(96, 165, 250, 0.4);
  }

  .carousel-line {
    width: 22px;
    height: 2px;
    border-radius: 999px;
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
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    gap: 8px;
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

  .plans-slider {
    padding: 14px 18px 12px;
  }

  .slider-arrow {
    width: 36px;
    height: 36px;
    font-size: 1.55rem;
  }
}
</style>