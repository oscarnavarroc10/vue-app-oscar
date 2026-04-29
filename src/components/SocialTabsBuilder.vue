<template>
  <section class="growth-dashboard">
    <section class="hero-section">
      <div class="hero-copy">
        <span class="hero-kicker">⚡ Potencia tu presencia online</span>

        <h1>
          Impulsa tus redes sociales.
          <br />
          Resultados que <span>se notan.</span>
        </h1>

        <p>
          Planes rápidos, seguros y efectivos para crecer en Instagram,
          Facebook, TikTok y X.
        </p>

        <div class="trust-pills">
          <span>⚡ Entrega rápida</span>
          <span>🛡️ 100% seguro</span>
          <span>💎 Sin contraseña</span>
        </div>
      </div>

      <a
        class="trial-banner"
        :href="freeTrialWhatsAppUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="trial-badge">🎁 Prueba gratis</span>

        <h2>No pagues sin conocerlo primero</h2>

        <p>
          Solicita una prueba gratis y comprueba la calidad antes de armar tu
          paquete.
        </p>

        <span class="trial-cta">
          Pedir mi prueba gratis
          <strong>→</strong>
        </span>

        <div class="trial-mockup" aria-hidden="true">
          <span class="trial-card trial-card--one"></span>
          <span class="trial-card trial-card--two"></span>
          <span class="trial-card trial-card--three"></span>
        </div>

        <div class="trial-orb trial-orb--one"></div>
        <div class="trial-orb trial-orb--two"></div>
      </a>
    </section>

    <section class="platform-section">
      <div class="section-title-row section-title-row--compact">
        <h2>Elige tu plataforma</h2>
      </div>

      <div class="platform-grid">
        <button
          v-for="service in allowedServices"
          :key="service.id"
          type="button"
          class="platform-card"
          :class="[
            getThemeClass(service.category),
            { active: activeTab === service.category },
          ]"
          @click="activeTab = service.category"
        >
          <span class="platform-icon">
            <img
              v-if="getIcon(service.category)"
              :src="getIcon(service.category)"
              :alt="service.name"
            />
          </span>

          <span class="platform-copy">
            <strong>{{ service.name }}</strong>
            <small>{{ getPlatformSubtitle(service.category) }}</small>
          </span>

          <span class="platform-arrow">→</span>
        </button>
      </div>
    </section>

    <section class="plans-section">
      <div class="section-title-row">
        <div>
          <h2>🔥 Planes más populares</h2>
          <p>{{ currentService?.description }}</p>
        </div>

        <button class="view-all-btn" type="button" @click="goToPlans">
          Ver todos los planes →
        </button>
      </div>

      <div v-if="filteredPlans.length" class="plans-wrapper">
        <button          
          class="slider-arrow left"
          type="button"
          @click="slideLeft"
          aria-label="Ver paquetes anteriores"
        >
          ‹
        </button>

        <div ref="sliderRef" class="plans-slider" @scroll="handleScroll">
          <PackagePlanCard
            v-for="plan in visiblePlans"
            :key="plan.id"
            :plan="plan"
            :resolved-items="getPlanItems(plan)"
            @choose="emitChoose"
          />
        </div>

        <button          
          class="slider-arrow right"
          type="button"
          @click="slideRight"
          aria-label="Ver más paquetes"
        >
          ›
        </button>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">✨</div>
        <h3>Próximamente más planes</h3>
        <p>Estamos preparando nuevos paquetes para {{ activeTab }}.</p>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { useRouter } from "vue-router";
import PackagePlanCard from "./PackagePlanCard.vue";

import instagramIcon from "@/assets/instagram_neon.svg";
import facebookIcon from "@/assets/facebook_neon.svg";
import tiktokIcon from "@/assets/tiktok_neon.svg";
import twitterIcon from "@/assets/twitter_neon.svg";

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
const router = useRouter();

const allowedCategories = ["Instagram", "Facebook", "TikTok", "X"];

const sliderRef = ref(null);
const canGoLeft = ref(false);
const canGoRight = ref(false);
const activeTab = ref("");

const freeTrialPhone = "528122126718";

const freeTrialMessage =
  "Hola, vi su página y quiero solicitar una prueba gratis para conocer el servicio.";

const freeTrialWhatsAppUrl = `https://wa.me/${freeTrialPhone}?text=${encodeURIComponent(
  freeTrialMessage,
)}`;

const allowedServices = computed(() => {
  return props.services.filter(
    (item) => item.isEnabled && allowedCategories.includes(item.category),
  );
});

watch(
  allowedServices,
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
  return allowedServices.value.find((item) => item.category === activeTab.value);
});

const filteredPlans = computed(() => {
  return props.packagePlans.filter((plan) => plan.category === activeTab.value);
});

const visiblePlans = computed(() => {
  return filteredPlans.value;
});

const startingCustomPrice = computed(() => {
  const prices = filteredPlans.value
    .map((plan) => Number(plan.price || 0))
    .filter((price) => price > 0);

  if (!prices.length) return "350";

  return formatNumber(Math.min(...prices));
});

const quickBuilderItems = computed(() => {
  const plan = filteredPlans.value[0];
  const items = plan ? props.getPlanItems(plan).slice(0, 4) : [];

  if (!items.length) {
    return [
      { icon: "👥", label: "Seguidores", qty: "5,000" },
      { icon: "💗", label: "Likes", qty: "10,000" },
      { icon: "👁️", label: "Vistas", qty: "100,000" },
      { icon: "💬", label: "Comentarios", qty: "500" },
    ];
  }

  return items.map((item) => ({
    icon: getQuickIcon(item.name),
    label: item.name,
    qty: formatNumber(item.quantity),
  }));
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
    left: -340,
    behavior: "smooth",
  });
};

const slideRight = () => {
  sliderRef.value?.scrollBy({
    left: 340,
    behavior: "smooth",
  });
};

const goToPlans = () => {
  router.push("/plans");
};

const goToCustomBuilder = () => {
  router.push("/social-categories");
};

const formatNumber = (value) => {
  return new Intl.NumberFormat("es-MX").format(Number(value || 0));
};

const getIcon = (category) => {
  const icons = {
    Instagram: instagramIcon,
    Facebook: facebookIcon,
    TikTok: tiktokIcon,
    X: twitterIcon,
  };

  return icons[category] || null;
};

const getThemeClass = (category) => {
  const map = {
    Instagram: "theme-instagram",
    Facebook: "theme-facebook",
    TikTok: "theme-tiktok",
    X: "theme-x",
  };

  return map[category] || "theme-default";
};

const getPlatformSubtitle = (category) => {
  const map = {
    Instagram: "Visualiza y haz crecer tu comunidad",
    Facebook: "Conecta y expande tu alcance",
    TikTok: "Más vistas, más interacción",
    X: "Haz que tu voz llegue más lejos",
  };

  return map[category] || "Impulsa tu red social";
};

const getQuickIcon = (name) => {
  const normalized = String(name || "").toLowerCase();

  if (normalized.includes("seguidor")) return "👥";
  if (normalized.includes("like") || normalized.includes("gusta")) return "💗";
  if (normalized.includes("view") || normalized.includes("vista")) return "👁️";
  if (normalized.includes("coment")) return "💬";
  if (normalized.includes("share") || normalized.includes("compart")) return "🔗";
  if (normalized.includes("guard")) return "🔖";
  if (normalized.includes("repost")) return "🔁";

  return "✨";
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.growth-dashboard {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* HERO */

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(340px, 0.72fr);
  align-items: stretch;
  gap: 20px;
  padding: 18px 0 4px;
}

.hero-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-kicker {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 12px;
  padding: 8px 13px;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.16);
  color: #d8b4fe;
  border: 1px solid rgba(168, 85, 247, 0.18);
  font-size: 0.72rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.hero-copy h1 {
  margin: 0;
  max-width: 620px;
  color: #ffffff;
  font-size: clamp(2.25rem, 4vw, 3.45rem);
  line-height: 1;
  letter-spacing: -0.06em;
  font-weight: 950;
}

.hero-copy h1 span {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-copy p {
  max-width: 500px;
  margin: 14px 0 0;
  color: #cbd5e1;
  font-size: 0.98rem;
  line-height: 1.55;
}

.trust-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.trust-pills span {
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 13px;
  border-radius: 999px;
  color: #e5e7eb;
  font-size: 0.8rem;
  font-weight: 850;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

/* TRIAL BANNER */

.trial-banner {
  position: relative;
  overflow: hidden;
  min-height: 245px;
  padding: 24px;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
  background:
    radial-gradient(circle at 86% 20%, rgba(236, 72, 153, 0.28), transparent 32%),
    radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.24), transparent 34%),
    linear-gradient(135deg, rgba(22, 10, 48, 0.96), rgba(9, 8, 20, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow:
    0 26px 58px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.trial-banner:hover {
  transform: translateY(-2px);
  border-color: rgba(216, 180, 254, 0.18);
  box-shadow:
    0 32px 68px rgba(0, 0, 0, 0.42),
    0 0 28px rgba(168, 85, 247, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.trial-badge {
  position: relative;
  z-index: 2;
  width: fit-content;
  margin-bottom: 14px;
  padding: 8px 13px;
  border-radius: 999px;
  color: #fde68a;
  background: rgba(245, 158, 11, 0.16);
  border: 1px solid rgba(245, 158, 11, 0.18);
  font-size: 0.76rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.trial-banner h2 {
  position: relative;
  z-index: 2;
  margin: 0;
  max-width: 430px;
  font-size: clamp(1.65rem, 2.6vw, 2.4rem);
  line-height: 1;
  letter-spacing: -0.055em;
  font-weight: 950;
}

.trial-banner p {
  position: relative;
  z-index: 2;
  max-width: 420px;
  margin: 12px 0 0;
  color: #cbd5e1;
  line-height: 1.55;
  font-size: 0.95rem;
}

.trial-cta {
  position: relative;
  z-index: 2;
  width: fit-content;
  min-height: 46px;
  margin-top: 18px;
  padding: 0 16px;
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 950;
  background: linear-gradient(135deg, #8b5cf6, #2563eb);
  box-shadow: 0 16px 32px rgba(99, 102, 241, 0.28);
}

.trial-cta strong {
  font-size: 1.1rem;
}

.trial-mockup {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 150px;
  height: 120px;
  pointer-events: none;
  opacity: 0.9;
}

.trial-card {
  position: absolute;
  width: 76px;
  height: 58px;
  border-radius: 18px;
  box-shadow:
    0 18px 28px rgba(0, 0, 0, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

.trial-card--one {
  left: 0;
  top: 18px;
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  transform: rotate(-15deg);
}

.trial-card--two {
  right: 0;
  top: 8px;
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  transform: rotate(12deg);
}

.trial-card--three {
  left: 42px;
  bottom: 8px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  transform: rotate(5deg);
}

.trial-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(24px);
  opacity: 0.58;
  pointer-events: none;
}

.trial-orb--one {
  width: 130px;
  height: 130px;
  right: -28px;
  top: -28px;
  background: #ec4899;
}

.trial-orb--two {
  width: 150px;
  height: 150px;
  right: 70px;
  bottom: -64px;
  background: #2563eb;
}

/* PLATFORMS */

.platform-section,
.plans-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}

.section-title-row--compact {
  align-items: center;
}

.section-title-row h2,
.platform-section h2 {
  margin: 0;
  color: #ffffff;
  font-size: 1.22rem;
  letter-spacing: -0.03em;
}

.section-title-row p {
  margin: 7px 0 0;
  max-width: 720px;
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.55;
}

.platform-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.platform-card {
  position: relative;
  min-height: 96px;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border-radius: 20px;
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.075);
  box-shadow:
    0 16px 30px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.platform-card:hover,
.platform-card.active {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.16);
}

.platform-card.active {
  box-shadow:
    0 22px 40px rgba(0, 0, 0, 0.3),
    0 0 22px rgba(139, 92, 246, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.platform-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
}

.platform-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.platform-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.platform-copy strong {
  font-size: 0.95rem;
  font-weight: 950;
}

.platform-copy small {
  color: #cbd5e1;
  line-height: 1.35;
  font-size: 0.74rem;
}

.platform-arrow {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.075);
  font-weight: 900;
}

.theme-instagram.active,
.theme-instagram:hover {
  background:
    radial-gradient(circle at 18% 20%, rgba(236, 72, 153, 0.34), transparent 36%),
    rgba(255, 255, 255, 0.04);
}

.theme-facebook.active,
.theme-facebook:hover {
  background:
    radial-gradient(circle at 18% 20%, rgba(37, 99, 235, 0.34), transparent 36%),
    rgba(255, 255, 255, 0.04);
}

.theme-tiktok.active,
.theme-tiktok:hover {
  background:
    radial-gradient(circle at 18% 20%, rgba(20, 184, 166, 0.22), transparent 34%),
    radial-gradient(circle at 60% 10%, rgba(236, 72, 153, 0.18), transparent 30%),
    rgba(255, 255, 255, 0.04);
}

.theme-x.active,
.theme-x:hover {
  background:
    radial-gradient(circle at 18% 20%, rgba(148, 163, 184, 0.24), transparent 34%),
    rgba(255, 255, 255, 0.04);
}

/* PLANS */

.view-all-btn {
  flex-shrink: 0;
  border: none;
  background: transparent;
  color: #c084fc;
  font-weight: 950;
  cursor: pointer;
  font-size: 0.86rem;
}

.plans-wrapper {
  position: relative;
}

.plans-slider {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(300px, 28vw, 365px);
  gap: 14px;
  overflow-x: auto;
  padding: 0 2px 12px;
  scroll-behavior: smooth;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
}

.plans-slider::-webkit-scrollbar {
  display: none;
}

.plans-slider > * {
  scroll-snap-align: start;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  z-index: 4;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.9rem;
  line-height: 1;
  background: rgba(15, 12, 34, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.3),
    0 0 18px rgba(139, 92, 246, 0.16);
  backdrop-filter: blur(16px);
  transform: translateY(-50%);
}

.slider-arrow.left {
  left: -14px;
}

.slider-arrow.right {
  right: -14px;
}

.empty-state {
  padding: 42px 20px;
  border-radius: 26px;
  text-align: center;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

.empty-state h3 {
  color: #ffffff;
  margin: 12px 0 6px;
}

.empty-state p {
  margin: 0;
  color: #94a3b8;
}

/* CUSTOM STRIP */

.custom-plan-strip {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(360px, 1fr) minmax(230px, 0.55fr);
  gap: 18px;
  align-items: center;
  padding: 22px;
  border-radius: 28px;
  background:
    radial-gradient(circle at 14% 16%, rgba(168, 85, 247, 0.2), transparent 30%),
    radial-gradient(circle at 90% 90%, rgba(37, 99, 235, 0.18), transparent 30%),
    linear-gradient(135deg, rgba(15, 12, 34, 0.92), rgba(8, 8, 20, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 24px 54px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.custom-strip-copy span {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 10px;
  padding: 7px 11px;
  border-radius: 999px;
  color: #c084fc;
  background: rgba(124, 58, 237, 0.16);
  border: 1px solid rgba(168, 85, 247, 0.18);
  font-size: 0.72rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.custom-strip-copy h2 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.4rem, 2.4vw, 2rem);
  line-height: 1.06;
  letter-spacing: -0.045em;
}

.custom-strip-copy p {
  margin: 10px 0 0;
  color: #cbd5e1;
  font-size: 0.92rem;
  line-height: 1.5;
}

.custom-strip-items {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.quick-row {
  min-height: 44px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.quick-label {
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: 850;
}

.quick-icon {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: rgba(124, 58, 237, 0.18);
}

.quick-row strong {
  font-size: 0.82rem;
}

.custom-strip-action {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.custom-strip-action > strong {
  color: #ffffff;
  font-size: 1.55rem;
  line-height: 1;
}

.custom-strip-action button {
  min-height: 50px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  color: #ffffff;
  font-weight: 950;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  box-shadow:
    0 18px 36px rgba(124, 58, 237, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

/* STATS */

.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

.stat-item {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  column-gap: 11px;
  align-items: center;
  padding: 17px;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
}

.stat-item:last-child {
  border-right: none;
}

.stat-item span {
  grid-row: 1 / 3;
  font-size: 1.35rem;
}

.stat-item strong {
  color: #ffffff;
  font-size: 1.02rem;
}

.stat-item small {
  color: #94a3b8;
  font-size: 0.74rem;
}

/* RESPONSIVE */

@media (max-width: 1080px) {
  .hero-section {
    grid-template-columns: 1fr;
  }

  .trial-banner {
    min-height: 210px;
  }

  .platform-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .custom-plan-strip {
    grid-template-columns: 1fr;
  }

  .custom-strip-action {
    align-items: stretch;
  }
}

@media (max-width: 760px) {
  .growth-dashboard {
    gap: 18px;
  }

  .hero-section {
    gap: 14px;
    padding-top: 8px;
  }

  .hero-copy h1 {
    font-size: clamp(2rem, 9vw, 2.65rem);
  }

  .hero-copy p {
    font-size: 0.92rem;
  }

  .trust-pills span {
    min-height: 31px;
    padding: 0 9px;
    font-size: 0.68rem;
  }

  .trial-banner {
    min-height: auto;
    padding: 18px;
    border-radius: 22px;
  }

  .trial-banner h2 {
    font-size: 1.55rem;
  }

  .trial-banner p {
    font-size: 0.88rem;
  }

  .trial-cta {
    width: 100%;
    justify-content: center;
  }

  .trial-mockup {
    opacity: 0.45;
    right: -18px;
    bottom: -14px;
    transform: scale(0.82);
  }

  .platform-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .platform-card {
    min-height: 76px;
    grid-template-columns: auto 1fr;
    padding: 11px;
    border-radius: 17px;
  }

  .platform-icon {
    width: 40px;
    height: 40px;
    border-radius: 13px;
  }

  .platform-icon img {
    width: 26px;
    height: 26px;
  }

  .platform-copy strong {
    font-size: 0.84rem;
  }

  .platform-copy small,
  .platform-arrow {
    display: none;
  }

  .section-title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .plans-slider {
    grid-auto-columns: minmax(280px, 88%);
    gap: 13px;
    scroll-snap-type: x mandatory;
  }

  .slider-arrow {
    display: none;
  }

  .custom-plan-strip {
    padding: 18px;
    border-radius: 22px;
  }

  .custom-strip-items {
    grid-template-columns: 1fr;
  }

  .stats-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stat-item {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }
}

@media (max-width: 480px) {
  .hero-copy h1 {
    font-size: 2.05rem;
  }

  .plans-slider {
    grid-auto-columns: 92%;
  }

  .stats-strip {
    grid-template-columns: 1fr;
  }

  .stat-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }
}
</style>