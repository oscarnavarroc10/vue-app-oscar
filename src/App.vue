<template>
  <div class="background-layer"></div>
  <div class="background-fade"></div>

  <main class="page">
    <!-- NAV -->
    <header class="top-nav">
      <a class="brand" href="#top" aria-label="Impulso Redes">
        <img
          :src="logoImpulso"
          alt="Impulso Redes Logo"
          class="brand-logo"
        />
      </a>

      <nav class="nav-links">
        <a href="#planes">Planes</a>
        <a href="#comentarios">Comentarios</a>
        <a href="#faq">Preguntas</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <button
        v-if="viewMode === 'landing'"
        class="nav-cta"
        type="button"
        @click="goToCustomize"
      >
        Personalizar
      </button>

      <button
        v-else
        class="nav-cta"
        type="button"
        @click="goToLanding"
      >
        Volver a home
      </button>
    </header>

    <section id="top" class="top-spacer"></section>

    <!-- LANDING -->
    <section v-if="viewMode === 'landing'" class="landing-section">
      <section id="planes">
        <SocialTabsBuilder
          :services="enabledServices"
          :package-plans="packagePlans"
          :get-plan-items="getPlanItems"
          @choose="choosePlan"
        />
      </section>

      <!-- CUSTOMER BANNER -->
      <CustomPackageBanner @customize="goToCustomize" />

      <!-- TESTIMONIOS -->
      <TestimonialsSection />

      <!-- FAQ -->
      <FaqSection />

      <!-- CONTACTO -->
      <ContactLeadSection />
    </section>

    <!-- CUSTOMIZE / CARRITO -->
    <section
      v-else
      class="details-layout"
      :class="{ 'details-layout--full': !shouldShowCart }"
>
      <div class="details-main">
        <div class="section-header details-header">
          <div>
            <button class="back-btn" type="button" @click="goToLanding">
              ← Volver a home
            </button>

            <h2>Paquetes por red social</h2>

            <p class="selected-description">
              Selecciona una pestaña, revisa los planes disponibles y agrégalos
              al carrito.
            </p>
          </div>

          <div class="selected-chip">
            {{ enabledServices.length }} categorías
          </div>
        </div>

        <SocialTabsBuilder
          :services="enabledServices"
          :package-plans="packagePlans"
          :get-plan-items="getPlanItems"
          @choose="choosePlan"
        />
      </div>

      <div
        class="cart-panel-wrap"
        :class="{ 'cart-panel-wrap--hidden': !shouldShowCart }"
      >
        <CartPanel
          :cart="cart"
          :subtotal="subtotal"
          :discount-percentage="discountPercentage"
          :discount-amount="discountAmount"
          :total="total"
          :format-price="formatPrice"
          @update:cart="handleCartUpdate"
          @remove="removeFromCart"
          @clear-cart="clearCart"
          @increase="increaseQuantity"
          @decrease="decreaseQuantity"
          @update-quantity="updateQuantity"
        />
      </div>
    </section>

    <div class="floating-socials-wrap">
      <FloatingSocials />
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import servicesData from "./data/services.json";
import packagePlansData from "./data/package-plans.json";
import serviceOptionsData from "./data/service-options.json";
import { useCart } from "./composables/useCart";
import FloatingSocials from "./components/FloatingSocials.vue";
import SocialTabsBuilder from "./components/SocialTabsBuilder.vue";
import CartPanel from "./components/CartPanel.vue";
import logoImpulso from "./assets/impulso_redes_logo.png";
import ContactLeadSection from "./components/ContactLeadSection.vue";
import FaqSection from "./components/FaqSection.vue";
import TestimonialsSection from "./components/TestimonialsSection.vue";
import CustomPackageBanner from "./components/CustomPackageBanner.vue";
import MainServiceCard from "./components/MainServiceCard.vue";

/* =========================
   CART
========================= */
const {
  cart,
  subtotal,
  discountPercentage,
  discountAmount,
  total,
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} = useCart();

/* =========================
   DATA
========================= */
const availableServices = ref(servicesData);
const packagePlans = ref(packagePlansData);
const serviceOptions = ref(serviceOptionsData);
const viewMode = ref("landing");

/* =========================
   COMPUTED
========================= */
const enabledServices = computed(() => {
  return availableServices.value.filter((service) => service.isEnabled);
});

const shouldShowCart = computed(() => {
  return cart.value.length > 0;
});

/* =========================
   NAVIGATION
========================= */
const goToCustomize = () => {
  viewMode.value = "customize";
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goToLanding = () => {
  viewMode.value = "landing";
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* =========================
   PLAN HELPERS
========================= */
const getPlanItems = (plan) => {
  return (plan.includedOptions || []).map((included) => {
    const option = serviceOptions.value.find(
      (item) => item.id === included.optionId
    );

    return {
      id: included.optionId,
      optionId: included.optionId,
      quantity: Number(included.quantity || 0),
      name: option?.name || "",
      description: option?.description || "",
      category: option?.category || plan.category || "",
      price: Number(option?.price || 0),
    };
  });
};

const choosePlan = (plan) => {
  addToCart({
    ...plan,
    id: `plan-${plan.id}`,
    price: Number(plan.price || 0),
    oldPrice: Number(plan.oldPrice || 0),
    quantity: 1,
    profile: "",
    cartType: "plan",
    planItems: getPlanItems(plan),
  });

  goToCustomize();
};

const getCartItemKey = (item) => {
  return `${item.id}::${item.profile || ""}`;
};

const handleCartUpdate = (value) => {
  const mergedMap = new Map();

  value.forEach((item) => {
    if (item.cartType === "plan") {
      mergedMap.set(item.cartId, {
        ...item,
        cartId: item.cartId,
        quantity: Number(item.quantity || 1),
      });
      return;
    }

    const key = getCartItemKey(item);
    const existing = mergedMap.get(key);

    if (existing) {
      existing.quantity += Number(item.quantity || 100);
    } else {
      mergedMap.set(key, {
        ...item,
        cartId: item.cartId || key,
        quantity: Number(item.quantity || 100),
        profile: item.profile || "",
        cartType: "service",
      });
    }
  });

  cart.value = Array.from(mergedMap.values());
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

.background-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: url("./assets/background.png") center top / cover no-repeat;
}

.background-fade {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    to bottom,
    rgba(3, 7, 18, 0.14) 0%,
    rgba(3, 7, 18, 0.3) 22%,
    rgba(3, 7, 18, 0.6) 46%,
    rgba(15, 23, 42, 0.96) 100%
  );
}

.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 18px 28px 56px;
  font-family:
    Inter,
    system-ui,
    sans-serif;
}

.top-nav {
  position: sticky;
  top: 12px;
  z-index: 30;
  max-width: 1400px;
  margin: 0 auto 18px;
  padding: 12px 22px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);

  background: linear-gradient(
    180deg,
    rgba(7, 12, 24, 0.82) 0%,
    rgba(7, 12, 24, 0.72) 100%
  );

  box-shadow:
    0 18px 36px rgba(2, 6, 23, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.brand-logo {
  height: 84px;
  display: block;
  object-fit: contain;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  flex: 1;
}

.nav-links a {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 800;
  font-size: 1rem;
  transition:
    color 0.18s ease,
    opacity 0.18s ease;
}

.nav-links a:hover {
  color: #ffffff;
  opacity: 1;
}

.nav-cta {
  flex-shrink: 0;
  border: none;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 14px;
  cursor: pointer;

  color: white;
  font-weight: 800;
  font-size: 0.95rem;

  background: linear-gradient(135deg, #7c3aed, #2563eb);
  box-shadow: 0 12px 24px rgba(99, 102, 241, 0.22);

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.nav-cta:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
  box-shadow: 0 16px 28px rgba(99, 102, 241, 0.26);
}

.top-spacer {
  height: 4px;
}

.landing-section,
.details-layout {
  max-width: 1400px;
  margin: 0 auto;
}

#planes,
#comentarios,
#faq,
#contacto {
  scroll-margin-top: 96px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 14px;
  margin-bottom: 18px;
}

.section-header h2 {
  margin: 0;
  color: white;
  line-height: 1.08;
}

.section-header span,
.section-subtitle,
.selected-description {
  color: #94a3b8;
}

.customers-section,
.faq-section,
.contact-section {
  margin-top: 34px;
}

.customers-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.customer-card,
.faq-item {
  border-radius: 22px;
  padding: 22px;
  background: rgba(15, 23, 42, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 14px 30px rgba(2, 6, 23, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.customer-card p,
.faq-item p {
  color: #cbd5e1;
  line-height: 1.6;
}

.customer-meta strong,
.faq-item summary {
  color: white;
}

.stars {
  color: #fbbf24;
  margin-bottom: 12px;
}

.customer-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.customer-meta span {
  color: #94a3b8;
}

.faq-list {
  display: grid;
  gap: 14px;
}

.faq-item summary {
  cursor: pointer;
  font-weight: 800;
}

.contact-section {
  display: flex;
  justify-content: space-between;
  gap: 22px;
  padding: 28px;
  border-radius: 28px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 18px 40px rgba(2, 6, 23, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.contact-copy h2 {
  color: white;
  margin: 0 0 8px;
  line-height: 1.08;
}

.contact-copy p {
  color: #94a3b8;
  line-height: 1.6;
  max-width: 640px;
}

.contact-kicker {
  color: #93c5fd;
  font-weight: 800;
}

.contact-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.contact-btn {
  text-decoration: none;
  padding: 14px 18px;
  border-radius: 14px;
  color: white;
  font-weight: 800;
  box-shadow: 0 10px 20px rgba(2, 6, 23, 0.16);
  transition:
    transform 0.18s ease,
    filter 0.18s ease;
}

.contact-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
}

.whatsapp-btn {
  background: #25d366;
}

.instagram-btn {
  background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af);
}

.mail-btn {
  background: #2563eb;
}

/* CUSTOMIZE LAYOUT */
.details-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 380px;
  gap: 20px;
  align-items: start;
  transition:
    grid-template-columns 0.45s ease,
    gap 0.45s ease;
}

.details-layout--full {
  grid-template-columns: minmax(0, 1fr) 0;
  gap: 0;
}

.details-main {
  background: rgba(15, 23, 42, 0.7);
  border-radius: 26px;
  padding: 24px;
  overflow: visible;
  min-width: 0;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 18px 40px rgba(2, 6, 23, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.details-header {
  margin-bottom: 20px;
}

.back-btn {
  border: none;
  padding: 11px 16px;
  border-radius: 14px;
  cursor: pointer;
  margin-bottom: 12px;
  font-weight: 800;
  color: #0f172a;
  background: #f8fafc;
  box-shadow: 0 10px 18px rgba(2, 6, 23, 0.12);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.back-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.01);
  box-shadow: 0 12px 22px rgba(2, 6, 23, 0.16);
}

.selected-chip {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.14);
  color: #93c5fd;
  font-weight: 800;
  border: 1px solid rgba(59, 130, 246, 0.12);
}

.cart-panel-wrap {
  width: 380px;
  min-width: 0;
  overflow: hidden;
  opacity: 1;
  transform: translateX(0);
  transition:
    width 0.45s ease,
    opacity 0.35s ease,
    transform 0.45s ease;
  will-change: width, opacity, transform;
}

.cart-panel-wrap--hidden {
  width: 0;
  opacity: 0;
  transform: translateX(28px);
  pointer-events: none;
}

.floating-socials-wrap {
  position: relative;
  z-index: 8;
}

@media (max-width: 1200px) {
  .top-nav {
    padding: 12px 18px;
  }

  .brand-logo {
    height: 72px;
  }

  .nav-links {
    gap: 20px;
  }

  .details-layout {
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 18px;
  }

  .cart-panel-wrap {
    width: 360px;
  }
}

@media (max-width: 1100px) {
  .customers-grid {
    grid-template-columns: 1fr 1fr;
  }

  .contact-section {
    flex-direction: column;
  }

  .details-layout {
    grid-template-columns: 1fr;
  }

  .details-layout--full {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .cart-panel-wrap,
  .cart-panel-wrap--hidden {
    width: 100%;
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }
}

@media (max-width: 900px) {
  .page {
    padding: 14px 16px 76px;
  }

  .top-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 20px;
  }

  .brand-logo {
    height: 58px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px 18px;
  }

  .nav-links a {
    font-size: 0.95rem;
  }

  .nav-cta {
    min-height: 44px;
    padding: 0 18px;
    font-size: 0.92rem;
  }

  .customers-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .details-main {
    padding: 18px;
    border-radius: 22px;
  }

  .contact-section {
    padding: 22px;
    border-radius: 22px;
  }

  #planes,
  #comentarios,
  #faq,
  #contacto {
    scroll-margin-top: 84px;
  }
}

@media (max-width: 600px) {
  .top-nav {
    margin-bottom: 14px;
  }

  .brand-logo {
    height: 52px;
  }

  .details-main {
    padding: 16px;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }

  .contact-actions {
    width: 100%;
  }

  .contact-btn {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
</style>