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

      <!-- TESTIMONIOS -->
      <section id="comentarios" class="customers-section">
        <div class="section-header section-header-left">
          <div>
            <h2>Clientes satisfechos</h2>

            <p class="section-subtitle">
              Resultados reales para negocios que buscaban crecer en redes.
            </p>
          </div>
        </div>

        <div class="customers-grid">
          <article class="customer-card">
            <div class="stars">★★★★★</div>

            <p>
              “Nos ayudaron a organizar mejor el contenido y subir el alcance de
              Instagram en pocas semanas.”
            </p>

            <div class="customer-meta">
              <strong>Emmanuel</strong>
              <span>Moda y lifestyle</span>
            </div>
          </article>

          <article class="customer-card">
            <div class="stars">★★★★★</div>

            <p>
              “Lo mejor fue poder elegir exactamente los servicios que sí
              necesitábamos sin pagar de más.”
            </p>

            <div class="customer-meta">
              <strong>Café Central</strong>
              <span>Restaurante</span>
            </div>
          </article>

          <article class="customer-card">
            <div class="stars">★★★★★</div>

            <p>
              “Los reels y el diseño visual hicieron que nuestra marca ya se
              viera mucho más profesional.”
            </p>

            <div class="customer-meta">
              <strong>Oscar N.</strong>
              <span>Salud y bienestar</span>
            </div>
          </article>
        </div>
      </section>

      <!-- FAQ -->
      <section id="faq" class="faq-section">
        <div class="section-header section-header-left">
          <div>
            <h2>Preguntas frecuentes</h2>

            <p class="section-subtitle">
              Respuestas rápidas antes de solicitar tu plan.
            </p>
          </div>
        </div>

        <div class="faq-list">
          <details class="faq-item">
            <summary>¿Puedo contratar solo una parte del paquete?</summary>

            <p>
              Sí. Puedes personalizar tu plan y seleccionar solo los servicios
              que realmente necesites.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿La prueba gratis aplica para todos?</summary>

            <p>
              No siempre. Depende del tipo de negocio, disponibilidad y alcance
              de la propuesta solicitada.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿Puedo combinar Instagram, Facebook y diseño?</summary>

            <p>
              Sí. Justo la idea es que puedas mezclar categorías y armar un plan
              a la medida.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿También hacen edición de reels?</summary>

            <p>
              Sí. Puedes incluir reels, diseño visual, administración y otros
              servicios según tu objetivo.
            </p>
          </details>
        </div>
      </section>

      <!-- CONTACTO -->
      <section id="contacto" class="contact-section">
        <div class="contact-copy">
          <span class="contact-kicker">Contacto</span>

          <h2>Hablemos de tu negocio</h2>

          <p>
            Cuéntanos qué necesitas y te ayudamos a armar un plan que sí tenga
            sentido para tu marca.
          </p>
        </div>

        <div class="contact-actions">
          <a
            href="https://wa.me/5219999999999"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-btn whatsapp-btn"
          >
            WhatsApp
          </a>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-btn instagram-btn"
          >
            Instagram
          </a>

          <a href="mailto:hola@tuagencia.com" class="contact-btn mail-btn">
            Correo
          </a>
        </div>
      </section>
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

    <FloatingSocials />
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import servicesData from "./data/services.json";
import packagePlansData from "./data/package-plans.json";
import { useCart } from "./composables/useCart";
import serviceOptionsData from "./data/service-options.json";
import PlansBanner from "./components/PlansBanner.vue";
import FloatingSocials from "./components/FloatingSocials.vue";
import SocialTabsBuilder from "./components/SocialTabsBuilder.vue";
import CartPanel from "./components/CartPanel.vue";

import logoImpulso from "./assets/impulso_redes_logo.png";

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
    rgba(3, 7, 18, 0.18) 0%,
    rgba(3, 7, 18, 0.38) 22%,
    rgba(3, 7, 18, 0.68) 46%,
    rgba(15, 23, 42, 1) 100%
  );
}

.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 24px 32px 60px;
  font-family:
    Inter,
    system-ui,
    sans-serif;
}

.top-nav {
  position: sticky;
  top: 14px;
  z-index: 30;
  max-width: 1400px;
  margin: 0 auto 22px;
  padding: 10px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-radius: 24px;
  background: rgba(9, 15, 30, 0.45);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-logo {
  height: 152px;
  display: block;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 700;
}

.nav-cta {
  border: none;
  padding: 12px 18px;
  border-radius: 14px;
  cursor: pointer;
  color: white;
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
}

.top-spacer {
  height: 8px;
}

.landing-section,
.details-layout {
  max-width: 1400px;
  margin: 0 auto;
}

.intro-section {
  text-align: center;
  max-width: 900px;
  margin: 20px auto 44px;
}

.intro-kicker {
  display: inline-flex;
  padding: 8px 14px;
  border-radius: 999px;
  margin-bottom: 14px;
  background: rgba(124, 58, 237, 0.16);
  color: #ddd6fe;
  font-weight: 800;
}

.intro-section h1 {
  margin: 0 0 14px;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.02;
  color: white;
}

.intro-section p {
  color: #94a3b8;
  font-size: 1.06rem;
}

#planes,
#comentarios,
#faq,
#contacto {
  scroll-margin-top: 110px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 14px;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  color: white;
}

.section-header span,
.section-subtitle,
.selected-description {
  color: #94a3b8;
}

.customers-section,
.faq-section,
.contact-section {
  margin-top: 40px;
}

.customers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.customer-card,
.faq-item {
  border-radius: 22px;
  padding: 22px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.06);
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
  gap: 20px;
  padding: 28px;
  border-radius: 28px;
  background: rgba(15, 23, 42, 0.88);
}

.contact-copy h2 {
  color: white;
  margin: 0 0 8px;
}

.contact-copy p {
  color: #94a3b8;
}

.contact-kicker {
  color: #93c5fd;
  font-weight: 800;
}

.contact-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.contact-btn {
  text-decoration: none;
  padding: 14px 18px;
  border-radius: 14px;
  color: white;
  font-weight: 800;
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
  grid-template-columns: minmax(0, 2fr) 390px;
  gap: 24px;
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
  background: rgba(15, 23, 42, 0.78);
  border-radius: 24px;
  padding: 26px;
  overflow: visible;
  min-width: 0;
}

.back-btn {
  border: none;
  padding: 12px 16px;
  border-radius: 14px;
  cursor: pointer;
  margin-bottom: 12px;
  font-weight: 800;
}

.selected-chip {
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.16);
  color: #93c5fd;
  font-weight: 800;
}

.cart-panel-wrap {
  width: 390px;
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
  transform: translateX(36px);
  pointer-events: none;
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
    gap: 24px;
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
    padding: 16px 18px 80px;
  }

  .top-nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .brand-logo {
    height: 60px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .customers-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>