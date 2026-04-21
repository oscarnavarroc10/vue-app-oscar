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
          class="nav-cta nav-cta--secondary"
          type="button"
          @click="goToCustomBuilder"
        >
          Personalizar
        </button>

        <button
          v-if="cartItemsCount > 0"
          class="nav-cta nav-cta--cart"
          type="button"
          @click="goToCartView"
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

      <div v-else class="nav-actions">
        <button
          class="nav-cta nav-cta--secondary"
          type="button"
          @click="goToLanding"
        >
          Volver a home
        </button>

        <button
          v-if="cartItemsCount > 0"
          class="nav-cta nav-cta--cart"
          type="button"
          @click="goToCartView"
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

    <!-- CUSTOM BUILDER -->
    <section v-else-if="viewMode === 'customize'" class="builder-layout">
      <div class="details-main">
        <div class="section-header details-header">
          <div>
            <button class="back-btn" type="button" @click="goToLanding">
              ← Atrás
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
      </div>
    </section>

    <!-- CART FULL VIEW -->
    <section v-else class="cart-view-layout">
      <div class="cart-view-main">
        <div class="section-header cart-view-header">
          <div>
            <button class="back-btn" type="button" @click="goToLanding">
              ← Volver a home
            </button>

            <h2>Tu carrito</h2>

            <p class="selected-description">
              Revisa tus paquetes y servicios agregados antes de enviar tu
              solicitud.
            </p>
          </div>

          <div class="selected-chip">
            {{ cartItemsCount }} elementos
          </div>
        </div>

        <div v-if="cartItemsCount > 0" class="cart-items-list">
          <article
            v-for="item in cart"
            :key="item.cartId || `${item.id}-${item.profile || 'noprof'}`"
            class="cart-view-card"
          >
            <!-- PLAN -->
            <template v-if="item.cartType === 'plan'">
              <div class="cart-view-card-top">
                <div class="cart-view-card-copy">
                  <div class="cart-view-card-chips">
                    <span class="cart-view-chip cart-view-chip--plan">
                      Paquete
                    </span>

                    <span class="cart-view-chip cart-view-chip--muted">
                      {{ item.planItems?.length || 0 }} servicios
                    </span>
                  </div>

                  <h3>{{ item.name }}</h3>

                  <p class="cart-view-muted">
                    Plan listo para pedir con todos sus servicios incluidos.
                  </p>
                </div>

                <div class="cart-view-card-side">
                  <strong class="cart-view-price">
                    ${{ formatPrice(getItemTotal(item)) }}
                  </strong>

                  <button
                    class="cart-view-remove"
                    type="button"
                    @click="removeFromCart(item.cartId)"
                  >
                    Quitar
                  </button>
                </div>
              </div>

              <ul class="cart-view-plan-list">
                <li
                  v-for="planItem in item.planItems || []"
                  :key="`${item.cartId}-${planItem.id}`"
                  class="cart-view-plan-item"
                >
                  <div class="cart-view-plan-item-left">
                    <span
                      class="cart-view-category-pill"
                      :class="getCategoryPillClass(planItem.category)"
                    >
                      {{ planItem.category }}
                    </span>

                    <span class="cart-view-plan-item-name">
                      {{ planItem.name }}
                    </span>
                  </div>

                  <span class="cart-view-plan-item-qty">
                    {{ planItem.quantity }}
                  </span>
                </li>
              </ul>
            </template>

            <!-- SERVICE -->
            <template v-else>
              <div class="cart-view-card-top">
                <div class="cart-view-card-copy">
                  <div class="cart-view-card-chips">
                    <span
                      class="cart-view-category-pill"
                      :class="getCategoryPillClass(item.category)"
                    >
                      {{ item.category }}
                    </span>

                    <span class="cart-view-chip cart-view-chip--muted">
                      Servicio
                    </span>
                  </div>

                  <h3>{{ item.name }}</h3>

                  <p v-if="item.profile" class="cart-view-profile">
                    {{ item.profile }}
                  </p>

                  <p class="cart-view-muted">
                    ${{ formatPrice(item.price) }} / 100 · {{ item.quantity }} unidades
                  </p>
                </div>

                <div class="cart-view-card-side">
                  <strong class="cart-view-price">
                    ${{ formatPrice(getItemTotal(item)) }}
                  </strong>

                  <button
                    class="cart-view-remove"
                    type="button"
                    @click="removeFromCart(item.cartId)"
                  >
                    Quitar
                  </button>
                </div>
              </div>

              <div class="cart-view-controls">
                <button
                  class="cart-view-qty-btn"
                  type="button"
                  @click="decreaseQuantity(item.cartId)"
                >
                  −
                </button>

                <input
                  class="cart-view-qty-input"
                  :value="item.quantity"
                  type="number"
                  min="100"
                  step="100"
                  @change="updateQuantity(item.cartId, $event.target.value)"
                />

                <button
                  class="cart-view-qty-btn"
                  type="button"
                  @click="increaseQuantity(item.cartId)"
                >
                  +
                </button>
              </div>
            </template>
          </article>
        </div>

        <div v-else class="cart-empty-state">
          <div class="cart-empty-icon">🛒</div>

          <h3>Tu carrito está vacío</h3>

          <p>
            Agrega un paquete o arma uno personalizado para empezar.
          </p>

          <div class="cart-empty-actions">
            <button class="nav-cta" type="button" @click="goToLanding">
              Ver planes
            </button>

            <button
              class="nav-cta nav-cta--secondary"
              type="button"
              @click="goToCustomBuilder"
            >
              Personalizar
            </button>
          </div>
        </div>
      </div>

      <div class="cart-summary-panel">
        <CartPanel
          :cart="cart"
          :subtotal="subtotal"
          :discount-percentage="discountPercentage"
          :discount-amount="discountAmount"
          :total="total"
          :format-price="formatPrice"
          @clear-cart="clearCart"
          @close-cart="goToLanding"
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
const viewMode = ref("landing"); // landing | customize | cart
const selectedService = ref(null);

const enabledServices = computed(() => {
  return availableServices.value.filter((service) => service.isEnabled);
});

const cartItemsCount = computed(() => cart.value.length);

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
  selectedService.value = null;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goToCartView = () => {
  viewMode.value = "cart";
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goToCustomBuilder = () => {
  viewMode.value = "customize";
  selectedService.value = null;

  window.scrollTo({ top: 0, behavior: "smooth" });
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

const getItemTotal = (item) => {
  if (item.cartType === "plan") {
    return Number(item.price || 0) * Number(item.quantity || 1);
  }

  return (Number(item.price || 0) / 100) * (Number(item.quantity) || 0);
};

const getCategoryPillClass = (category) => {
  const classMap = {
    Instagram: "pill-instagram",
    Facebook: "pill-facebook",
    TikTok: "pill-tiktok",
    YouTube: "pill-youtube",
    Snapchat: "pill-snapchat",
    X: "pill-x",
    Discord: "pill-discord",
    Twitch: "pill-twitch",
    Spotify: "pill-spotify",
    Telegram: "pill-telegram",
    WhatsApp: "pill-whatsapp",
  };

  return classMap[category] || "pill-default";
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
.builder-layout,
.cart-view-layout {
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

.builder-layout {
  max-width: 1180px;
}

.details-main,
.cart-view-main {
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

.details-header,
.cart-view-header {
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

/* CART FULL VIEW */
.cart-view-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 380px;
  gap: 20px;
  align-items: start;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-view-card {
  border-radius: 24px;
  padding: 20px;
  background: linear-gradient(
    180deg,
    rgba(10, 18, 34, 0.86) 0%,
    rgba(8, 14, 26, 0.92) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow:
    0 16px 32px rgba(2, 6, 23, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.cart-view-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
}

.cart-view-card-copy {
  flex: 1;
  min-width: 0;
}

.cart-view-card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.cart-view-chip {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 800;
}

.cart-view-chip--plan {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.18),
    rgba(37, 99, 235, 0.16)
  );
  color: #c4b5fd;
}

.cart-view-chip--muted {
  background: rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
}

.cart-view-category-pill {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 800;
  border: 1px solid transparent;
}

.pill-instagram {
  background: linear-gradient(
    135deg,
    rgba(245, 133, 41, 0.14),
    rgba(221, 42, 123, 0.18),
    rgba(129, 52, 175, 0.14)
  );
  color: #f9a8d4;
}

.pill-facebook {
  background: linear-gradient(
    135deg,
    rgba(24, 119, 242, 0.14),
    rgba(96, 165, 250, 0.18)
  );
  color: #93c5fd;
}

.pill-tiktok {
  background: linear-gradient(
    135deg,
    rgba(37, 244, 238, 0.12),
    rgba(17, 24, 39, 0.12),
    rgba(254, 44, 85, 0.14)
  );
  color: #d1d5db;
}

.pill-youtube {
  background: linear-gradient(
    135deg,
    rgba(255, 0, 0, 0.12),
    rgba(239, 68, 68, 0.16)
  );
  color: #fca5a5;
}

.pill-snapchat {
  background: linear-gradient(
    135deg,
    rgba(250, 204, 21, 0.14),
    rgba(245, 158, 11, 0.14)
  );
  color: #fde68a;
}

.pill-x {
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.16),
    rgba(71, 85, 105, 0.18)
  );
  color: #cbd5e1;
}

.pill-discord {
  background: linear-gradient(
    135deg,
    rgba(88, 101, 242, 0.14),
    rgba(129, 140, 248, 0.18)
  );
  color: #c4b5fd;
}

.pill-twitch {
  background: linear-gradient(
    135deg,
    rgba(145, 70, 255, 0.14),
    rgba(168, 85, 247, 0.18)
  );
  color: #d8b4fe;
}

.pill-spotify {
  background: linear-gradient(
    135deg,
    rgba(29, 185, 84, 0.14),
    rgba(34, 197, 94, 0.18)
  );
  color: #86efac;
}

.pill-telegram {
  background: linear-gradient(
    135deg,
    rgba(0, 136, 204, 0.14),
    rgba(56, 189, 248, 0.18)
  );
  color: #7dd3fc;
}

.pill-whatsapp {
  background: linear-gradient(
    135deg,
    rgba(37, 211, 102, 0.14),
    rgba(74, 222, 128, 0.18)
  );
  color: #86efac;
}

.pill-default {
  background: rgba(148, 163, 184, 0.14);
  color: #cbd5e1;
}

.cart-view-card h3 {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 1.22rem;
  line-height: 1.15;
}

.cart-view-muted {
  margin: 0;
  color: #94a3b8;
  line-height: 1.6;
}

.cart-view-profile {
  margin: 0 0 8px;
  color: #60a5fa;
  line-height: 1.5;
  word-break: break-all;
}

.cart-view-card-side {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.cart-view-price {
  color: #ffffff;
  font-size: 1.18rem;
  line-height: 1;
}

.cart-view-remove {
  border: none;
  background: transparent;
  color: #f87171;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
}

.cart-view-plan-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-view-plan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.cart-view-plan-item-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex-wrap: wrap;
}

.cart-view-plan-item-name {
  color: #e5e7eb;
  font-weight: 700;
}

.cart-view-plan-item-qty {
  color: #60a5fa;
  font-weight: 800;
  flex-shrink: 0;
}

.cart-view-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.cart-view-qty-btn {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 800;
  cursor: pointer;
}

.cart-view-qty-input {
  width: 120px;
  height: 40px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 12px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-weight: 700;
}

.cart-summary-panel {
  width: 380px;
}

.cart-empty-state {
  padding: 48px 24px;
  border-radius: 24px;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.cart-empty-icon {
  font-size: 2.4rem;
  margin-bottom: 12px;
}

.cart-empty-state h3 {
  margin: 0 0 10px;
  color: #ffffff;
}

.cart-empty-state p {
  margin: 0;
  color: #94a3b8;
}

.cart-empty-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
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

  .main-services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .subservices-grid {
    grid-template-columns: 1fr;
  }

  .cart-view-layout {
    grid-template-columns: 1fr 360px;
  }

  .cart-summary-panel {
    width: 360px;
  }
}

@media (max-width: 1100px) {
  .cart-view-layout {
    grid-template-columns: 1fr;
  }

  .cart-summary-panel {
    width: 100%;
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
  .subservices-stage-head,
  .cart-view-header,
  .cart-view-card-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .details-main,
  .cart-view-main {
    padding: 18px;
    border-radius: 22px;
  }

  .main-services-grid,
  .subservices-grid {
    grid-template-columns: 1fr;
  }

  .cart-view-card-side {
    align-items: flex-start;
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

  .details-main,
  .cart-view-main {
    padding: 16px;
  }

  .back-btn,
  .subservices-back-btn {
    width: 100%;
    justify-content: center;
  }

  .cart-empty-actions {
    flex-direction: column;
  }
}
</style>