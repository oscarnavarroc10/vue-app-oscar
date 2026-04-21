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

      <div v-if="viewMode === 'landing'" class="nav-actions">
        <button
          v-if="cartItemsCount > 0"
          class="nav-cta nav-cta--cart"
          type="button"
          @click="openCartFromNav"
        >
          <span class="nav-cart-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M3 4h2l2.2 10.2a1 1 0 0 0 .98.8H17a1 1 0 0 0 .97-.76L20 7H7"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="10" cy="19" r="1.6" fill="currentColor" />
              <circle cx="17" cy="19" r="1.6" fill="currentColor" />
            </svg>
          </span>

          <span>Carrito</span>

          <span class="nav-cart-badge">
            {{ cartItemsCount }}
          </span>
        </button>
      </div>

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

      <CustomPackageBanner @customize="goToCustomBuilder" />
      <TestimonialsSection />
      <FaqSection />
      <ContactLeadSection />
    </section>

    <!-- CUSTOMIZE / CARRITO -->
    <section
      v-else
      class="details-layout"
      :class="{ 'details-layout--full': !shouldShowCart }"
    >
      <div class="details-main">
        <!-- MODO PAQUETES -->
        <template v-if="customizeMode === 'packages'">
          <div class="section-header details-header">
            <div>
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
        </template>

        <!-- MODO BUILDER -->
        <template v-else>
          <div class="section-header details-header">
            <div>
              <button class="back-btn" type="button" @click="goToLanding">
                ← Volver a home
              </button>

              <h2>Crea tu paquete personalizado</h2>

              <p class="selected-description">
                Elige una red social, explora sus servicios y agrega únicamente lo
                que sí necesitas para tu negocio o tu página.
              </p>
            </div>

            <div class="selected-chip">
              {{ enabledServices.length }} categorías
            </div>
          </div>

          <Transition name="builder-switch" mode="out-in">
            <section
              v-if="!selectedService"
              key="platforms"
              class="builder-stage"
            >
              <section class="custom-builder-hero">
                <div class="custom-builder-copy">
                  <span class="custom-builder-kicker">
                    Constructor personalizado
                  </span>

                  <h3>Selecciona una plataforma para empezar</h3>

                  <p>
                    Aquí puedes construir tu paquete a la medida. Primero elige la
                    red social que quieres impulsar y después selecciona los
                    servicios que deseas agregar.
                  </p>
                </div>

                <div class="custom-builder-badge">
                  Tú eliges qué incluir
                </div>
              </section>

              <section class="main-services-grid">
                <MainServiceCard
                  v-for="service in enabledServices"
                  :key="service.id"
                  :service="service"
                  @open="handleOpenMainService"
                />
              </section>
            </section>

            <section
              v-else
              key="subservices"
              class="builder-stage"
            >
              <section class="subservices-stage-head">
                <button
                  class="subservices-back-btn"
                  type="button"
                  @click="handleBackToMainServices"
                >
                  ← Cambiar plataforma
                </button>

                <div class="subservices-stage-copy">
                  <span class="subservices-kicker">
                    {{ selectedService.category }}
                  </span>

                  <h3>{{ selectedService.name }}</h3>

                  <p>
                    {{ selectedService.description }}
                  </p>
                </div>

                <div class="subservices-counter">
                  {{ filteredSubServices.length }} servicios
                </div>
              </section>

              <section v-if="filteredSubServices.length" class="subservices-grid">
                <SubServiceCard
                  v-for="subService in filteredSubServices"
                  :key="subService.id"
                  :service="subService"
                  :cart="cart"
                  :format-price="formatPrice"
                  @add="handleAddSubService"
                />
              </section>

              <div v-else class="subservices-empty">
                <div class="subservices-empty-icon">✨</div>

                <h4>Próximamente más servicios</h4>

                <p>
                  Estamos preparando más opciones para
                  {{ selectedService.category }}.
                </p>
              </div>
            </section>
          </Transition>
        </template>
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
          @close-cart="closeCartPanel"
        />
      </div>
    </section>

    <div class="floating-socials-wrap">
      <FloatingSocials />
    </div>
  </main>
</template>

<script setup>
import { computed, ref, nextTick } from "vue";
import servicesData from "./data/services.json";
import packagePlansData from "./data/package-plans.json";
import serviceOptionsData from "./data/service-options.json";
import { useCart } from "./composables/useCart";
import FloatingSocials from "./components/FloatingSocials.vue";
import SocialTabsBuilder from "./components/SocialTabsBuilder.vue";
import CartPanel from "./components/CartPanel.vue";
import ContactLeadSection from "./components/ContactLeadSection.vue";
import FaqSection from "./components/FaqSection.vue";
import TestimonialsSection from "./components/TestimonialsSection.vue";
import CustomPackageBanner from "./components/CustomPackageBanner.vue";
import MainServiceCard from "./components/MainServiceCard.vue";
import SubServiceCard from "./components/SubServiceCard.vue";
import logoImpulso from "./assets/impulso_redes_logo.png";

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

const availableServices = ref(servicesData);
const packagePlans = ref(packagePlansData);
const serviceOptions = ref(serviceOptionsData);
const viewMode = ref("landing");
const customizeMode = ref("packages"); // packages | builder
const selectedService = ref(null);
const isCartOpen = ref(false);

const enabledServices = computed(() => {
  return availableServices.value.filter((service) => service.isEnabled);
});

const cartItemsCount = computed(() => cart.value.length);

const shouldShowCart = computed(() => {
  return cart.value.length > 0 && isCartOpen.value;
});

const filteredSubServices = computed(() => {
  if (!selectedService.value) return [];

  return serviceOptions.value.filter(
    (item) =>
      item.serviceId === selectedService.value.id ||
      item.category === selectedService.value.category
  );
});

const goToLanding = () => {
  viewMode.value = "landing";
  customizeMode.value = "packages";
  selectedService.value = null;
  isCartOpen.value = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goToPackagesView = ({ openCart = false } = {}) => {
  viewMode.value = "customize";
  customizeMode.value = "packages";
  selectedService.value = null;
  isCartOpen.value = openCart;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goToCustomBuilder = () => {
  viewMode.value = "customize";
  customizeMode.value = "builder";
  selectedService.value = null;
  isCartOpen.value = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const openCartFromNav = () => {
  if (!cart.value.length) return;
  goToPackagesView({ openCart: true });
};

const closeCartPanel = () => {
  isCartOpen.value = false;
};

const handleOpenMainService = async (service) => {
  selectedService.value = service;

  await nextTick();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleBackToMainServices = async () => {
  selectedService.value = null;

  await nextTick();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

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

  // Ya NO abrimos el carrito automáticamente
};

const handleAddSubService = (service) => {
  addToCart({
    ...service,
    id: service.id,
    price: Number(service.price || 0),
    quantity: Number(service.quantity || 100),
    cartType: "service",
  });
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

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
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

.nav-cta--secondary {
  background: rgba(255, 255, 255, 0.06);
  box-shadow:
    0 12px 24px rgba(2, 6, 23, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-cta--cart {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.nav-cart-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
}

.nav-cart-icon svg {
  width: 18px;
  height: 18px;
  display: block;
}

.nav-cart-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1;
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
  overflow: hidden;
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

.builder-stage {
  width: 100%;
}

.custom-builder-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 24px;
  padding: 22px 22px 20px;
  border-radius: 24px;
  background: linear-gradient(
    180deg,
    rgba(10, 18, 34, 0.74) 0%,
    rgba(8, 14, 26, 0.84) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.custom-builder-copy {
  min-width: 0;
}

.custom-builder-kicker,
.subservices-kicker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.16);
  color: #ddd6fe;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.custom-builder-copy h3,
.subservices-stage-copy h3 {
  margin: 0 0 10px;
  color: #ffffff;
  font-size: clamp(1.45rem, 3vw, 2rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.custom-builder-copy p,
.subservices-stage-copy p {
  margin: 0;
  max-width: 760px;
  color: #94a3b8;
  line-height: 1.7;
}

.custom-builder-badge,
.subservices-counter {
  flex-shrink: 0;
  padding: 12px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  font-weight: 800;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.main-services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.subservices-stage-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 22px;
  padding: 22px;
  border-radius: 24px;
  background: linear-gradient(
    180deg,
    rgba(10, 18, 34, 0.74) 0%,
    rgba(8, 14, 26, 0.84) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 16px 30px rgba(2, 6, 23, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.subservices-stage-copy {
  flex: 1;
  min-width: 0;
}

.subservices-back-btn {
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  min-height: 46px;
  padding: 0 16px;
  border-radius: 14px;
  cursor: pointer;
  color: #ffffff;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.05);
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease;
}

.subservices-back-btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
}

.subservices-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.subservices-empty {
  padding: 36px 20px;
  border-radius: 22px;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.subservices-empty-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.subservices-empty h4 {
  margin: 0 0 8px;
  color: #ffffff;
}

.subservices-empty p {
  margin: 0;
  color: #94a3b8;
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

.builder-switch-enter-active,
.builder-switch-leave-active {
  transition:
    opacity 0.34s ease,
    transform 0.34s ease,
    filter 0.34s ease;
}

.builder-switch-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.985);
  filter: blur(8px);
}

.builder-switch-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.99);
  filter: blur(8px);
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

  .main-services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .subservices-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1100px) {
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

  .nav-actions {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav-cta {
    min-height: 44px;
    padding: 0 18px;
    font-size: 0.92rem;
  }

  .section-header,
  .custom-builder-hero,
  .subservices-stage-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .details-main {
    padding: 18px;
    border-radius: 22px;
  }

  .main-services-grid,
  .subservices-grid {
    grid-template-columns: 1fr;
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

  .back-btn,
  .subservices-back-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>