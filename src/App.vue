<template>
  <div class="background-layer"></div>
  <div class="background-fade"></div>

  <main class="page">
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

    <section v-if="viewMode === 'landing'" class="landing-section">
      <section class="intro-section">
        <span class="intro-kicker">Impulsa tus redes</span>
        <h1>
          Servicios premium para crecer con imagen, estrategia y resultados
        </h1>
        <p>
          Elige un paquete sugerido o personaliza tu plan seleccionando solo lo
          que realmente necesitas.
        </p>
      </section>

      <section id="planes">
        <PlansBanner @customize="goToCustomize" />
        <div class="section-header">
          <div>
            <h2>Paquetes recomendados</h2>
            <p class="section-subtitle">
              Diseñados para crecer en redes con distintos niveles de alcance.
            </p>
          </div>
          <span>{{ packagePlans.length }} opciones</span>
        </div>

        <div class="packages-grid">
          <PackagePlanCard
            v-for="plan in packagePlans"
            :key="plan.id"
            :plan="plan"
            :resolved-items="getPlanItems(plan)"
            @choose="choosePlan"
          />
        </div>
      </section>

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

            <h2 v-if="!selectedService">Selecciona una categoría</h2>
            <h2 v-else>{{ selectedService.name }}</h2>

            <p class="selected-description" v-if="!selectedService">
              Elige una categoría para personalizar tu plan.
            </p>
            <p class="selected-description" v-else>
              {{ selectedService.description }}
            </p>
          </div>

          <div class="selected-chip" v-if="!selectedService">
            {{ availableServices.length }} categorías
          </div>
          <div class="selected-chip" v-else>
            {{ filteredOptions.length }} opciones
          </div>
        </div>

        <div v-if="!selectedService" class="main-services-grid">
          <MainServiceCard
            v-for="service in enabledServices"
            :key="service.id"
            :service="service"
            :background-style="getCardBackgroundStyle(service)"
            @open="selectService"
          />
        </div>

        <template v-else>
          <button
            class="back-to-categories-btn"
            type="button"
            @click="clearSelectedService"
          >
            ← Volver a categorías
          </button>

          <draggable
            :list="filteredOptions"
            :group="{ name: 'service-options', pull: 'clone', put: false }"
            item-key="id"
            :sort="false"
            :disabled="true"
            :clone="cloneService"
            class="subcards-grid"
          >
            <template #item="{ element }">
              <SubServiceCard
                :service="element"
                :cart="cart"
                :background-style="getCardBackgroundStyle(element)"
                :format-price="formatPrice"
                @add="addToCart"
              />
            </template>
          </draggable>
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
        />
      </div>
    </section>

    <FloatingSocials />
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import draggable from "vuedraggable";
import servicesData from "./data/services.json";
import serviceOptionsData from "./data/service-options.json";
import packagePlansData from "./data/package-plans.json";
import PlansBanner from "./components/PlansBanner.vue";
import FloatingSocials from "./components/FloatingSocials.vue";
import MainServiceCard from "./components/MainServiceCard.vue";
import SubServiceCard from "./components/SubServiceCard.vue";
import CartPanel from "./components/CartPanel.vue";
import PackagePlanCard from "./components/PackagePlanCard.vue";
import { useCart } from "./composables/useCart";
import { useBannerResolver } from "./composables/useBannerResolver";
import logoImpulso from "./assets/impulso_redes_logo.png";

const availableServices = ref(servicesData);
const serviceOptions = ref(serviceOptionsData);
const packagePlans = ref(packagePlansData);

const enabledServices = computed(() => {
  return availableServices.value.filter((service) => service.isEnabled);
});

const viewMode = ref("landing");
const selectedService = ref(null);

const {
  cart,
  subtotal,
  discountPercentage,
  discountAmount,
  total,
  addToCart,
  removeFromCart,
  clearCart,
  cloneService,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} = useCart();

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

const { preloadBanners, getCardBackgroundStyle } = useBannerResolver();

onMounted(() => {
  preloadBanners(availableServices.value);
  preloadBanners(serviceOptions.value);
});

const goToCustomize = () => {
  viewMode.value = "customize";
  selectedService.value = null;
};

const goToLanding = () => {
  viewMode.value = "landing";
  selectedService.value = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const selectService = (service) => {
  selectedService.value = service;
};

const clearSelectedService = () => {
  selectedService.value = null;
};

const filteredOptions = computed(() => {
  if (!selectedService.value) return [];
  return serviceOptions.value.filter(
    (item) => item.serviceId === selectedService.value.id,
  );
});

const hasCartItems = computed(() => cart.value.length > 0);

const shouldShowCart = computed(() => {
  return !!selectedService.value || hasCartItems.value;
});

const getPlanItems = (plan) => {
  return plan.includedOptions
    .map((opt) => {
      const service = serviceOptions.value.find(
        (item) => item.id === opt.optionId,
      );

      if (!service) return null;

      return {
        ...service,
        quantity: opt.quantity,
      };
    })
    .filter(Boolean);
};

const choosePlan = (plan) => {
  const items = getPlanItems(plan);

  const planTotal = items.reduce((sum, item) => {
    return sum + (Number(item.price || 0) / 100) * Number(item.quantity || 0);
  }, 0);

  addToCart({
    id: `plan-${plan.id}`,
    cartType: "plan",
    name: plan.name,
    category: "Paquete",
    price: plan.price ?? planTotal,
    quantity: 1,
    profile: "",
    planId: plan.id,
    planItems: items.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
    })),
  });

  viewMode.value = "customize";
  selectedService.value = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  pointer-events: none;
  background: url("./assets/background.png") center top / cover no-repeat;
}

.background-fade {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(3, 7, 18, 0.18) 0%,
    rgba(3, 7, 18, 0.34) 22%,
    rgba(3, 7, 18, 0.62) 42%,
    rgba(7, 12, 24, 0.86) 58%,
    rgba(10, 16, 28, 0.96) 74%,
    rgba(15, 23, 42, 1) 100%
  );
}

.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 24px 32px 32px;
  color: #1f2937;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.top-nav {
  position: sticky;
  top: 14px;
  z-index: 30;
  max-width: 1400px;
  margin: 0 auto 22px;
  padding: 6px 22px;
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-radius: 24px;
  background: rgba(9, 15, 30, 0.45);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 18px 45px rgba(2, 6, 23, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-logo {
  height: 152px;
  width: auto;
  max-width: 240px;
  object-fit: contain;
  display: block;
  transition: transform 0.25s ease;
}

.brand-logo:hover {
  transform: scale(1.03);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav-links a {
  color: rgba(226, 232, 240, 0.86);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.98rem;
  transition:
    color 0.18s ease,
    text-shadow 0.18s ease,
    opacity 0.18s ease;
}

.nav-links a:hover {
  color: #ffffff;
  text-shadow: 0 0 18px rgba(96, 165, 250, 0.38);
}

.nav-cta {
  border: none;
  border-radius: 14px;
  padding: 11px 16px;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  color: #ffffff;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  box-shadow:
    0 12px 24px rgba(37, 99, 235, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.top-spacer {
  height: 8px;
}

.intro-section {
  max-width: 900px;
  margin: 34px auto 42px;
  text-align: center;
  padding: 34px 20px 10px;
}

.intro-kicker {
  display: inline-flex;
  padding: 8px 14px;
  border-radius: 999px;
  margin-bottom: 16px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #e9d5ff;
  background: rgba(124, 58, 237, 0.16);
  border: 1px solid rgba(168, 85, 247, 0.24);
  backdrop-filter: blur(10px);
}

.intro-section h1 {
  margin: 0 0 14px;
  font-size: clamp(2.2rem, 5vw, 4.2rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-shadow: 0 8px 35px rgba(15, 23, 42, 0.3);
}

.intro-section p {
  margin: 0 auto;
  max-width: 760px;
  color: rgba(226, 232, 240, 0.82);
  font-size: 1.08rem;
  line-height: 1.65;
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
  scroll-margin-top: 110px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  margin-bottom: 20px;
}

.section-header-left {
  justify-content: flex-start;
}

.section-header h2 {
  margin: 0;
  font-size: 1.6rem;
  color: #f8fafc;
}

.section-header span,
.selected-chip,
.section-subtitle,
.selected-description {
  color: #cbd5e1;
}

.section-subtitle {
  margin: 6px 0 0;
  color: #94a3b8;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
  margin-bottom: 40px;
}

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
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 18px 42px rgba(2, 6, 23, 0.28);
  min-width: 0;
}

.main-services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.subcards-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.selected-description {
  margin: 8px 0 0;
  color: #94a3b8;
}

.back-btn,
.back-to-categories-btn {
  border: none;
  border-radius: 14px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  background: rgba(226, 232, 240, 0.9);
  color: #0f172a;
  margin-bottom: 12px;
}

.back-to-categories-btn {
  margin-bottom: 18px;
}

.selected-chip {
  background: rgba(59, 130, 246, 0.12);
  color: #93c5fd;
  border-radius: 999px;
  padding: 8px 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.customers-section,
.faq-section,
.contact-section {
  margin-top: 36px;
}

.customers-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.customer-card {
  border-radius: 22px;
  padding: 22px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow: 0 12px 24px rgba(2, 6, 23, 0.2);
}

.stars {
  margin-bottom: 14px;
  color: #fbbf24;
  letter-spacing: 2px;
}

.customer-card p {
  margin: 0 0 18px;
  line-height: 1.6;
  color: #cbd5e1;
}

.customer-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.customer-meta strong {
  color: #f8fafc;
}

.customer-meta span {
  color: #94a3b8;
  font-size: 0.92rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.faq-item {
  border-radius: 18px;
  padding: 18px 20px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.14);
}

.faq-item summary {
  cursor: pointer;
  font-weight: 700;
  color: #f8fafc;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item p {
  margin: 14px 0 0;
  color: #cbd5e1;
  line-height: 1.6;
}

.contact-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-radius: 28px;
  padding: 28px;
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.96),
    rgba(17, 24, 39, 0.96)
  );
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.contact-kicker {
  display: inline-flex;
  margin-bottom: 10px;
  color: #93c5fd;
  font-weight: 700;
}

.contact-copy h2 {
  margin: 0 0 8px;
  font-size: 1.9rem;
  color: #f8fafc;
}

.contact-copy p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 680px;
}

.contact-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.contact-btn {
  text-decoration: none;
  border-radius: 14px;
  padding: 14px 18px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
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

@media (max-width: 1280px) {
  .packages-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
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

  .main-services-grid,
  .customers-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-section {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 900px) {
  .page {
    padding: 16px 20px 100px;
  }

  .top-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    padding: 14px;
    min-height: unset;
  }

  .brand-logo {
    height: 58px;
    max-width: 180px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px 18px;
  }

  .intro-section {
    margin-top: 16px;
    padding-top: 22px;
  }

  .packages-grid,
  .main-services-grid,
  .subcards-grid,
  .customers-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>