<template>
  <main class="page">
    <header class="hero">
      <span class="hero-kicker">Impulsa tus redes</span>
      <h1>Arma tu paquete de servicios</h1>
      <p>
        Elige un paquete sugerido o personaliza tu plan seleccionando solo lo
        que realmente necesitas.
      </p>
    </header>

    <section v-if="viewMode === 'landing'" class="landing-section">
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

      <section class="customers-section">
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

      <section class="faq-section">
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

      <section class="contact-section">
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

    <section v-else class="details-layout">
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
            v-for="service in availableServices"
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

      <CartPanel
        :cart="cart"
        :subtotal="subtotal"
        :discount-percentage="discountPercentage"
        :discount-amount="discountAmount"
        :total="total"
        :format-price="formatPrice"
        @update:cart="handleCartUpdate"
        @remove="removeFromCart"
        @increase="increaseQuantity"
        @decrease="decreaseQuantity"
        @update-quantity="updateQuantity"
      />
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

const availableServices = ref(servicesData);
const serviceOptions = ref(serviceOptionsData);
const packagePlans = ref(packagePlansData);

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
  cloneService,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} = useCart();

const getCartItemKey = (item) => {
  return `${item.id}::${item.profile || ""}`;
};

const getSelectedQuantity = (serviceId) => {
  return cart.value
    .filter((item) => item.id === serviceId)
    .reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
};

const handleCartUpdate = (value) => {
  const mergedMap = new Map();

  value.forEach((item) => {
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

const getPlanItems = (plan) => {
  return serviceOptions.value.filter((item) =>
    plan.includedOptionIds.includes(item.id),
  );
};

const choosePlan = (plan) => {
  const items = getPlanItems(plan);

  items.forEach((item) => {
    addToCart({
      ...item,
      profile: item.profile || "",
    });
  });

  viewMode.value = "customize";
  selectedService.value = null;
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

.page {
  min-height: 100vh;
  padding: 32px;
  position: relative;
  overflow: hidden;

  background:
    radial-gradient(circle at 10% 20%, rgba(255, 0, 128, 0.15), transparent 25%),
    radial-gradient(circle at 90% 10%, rgba(0, 200, 255, 0.15), transparent 25%),
    radial-gradient(circle at 70% 80%, rgba(140, 82, 255, 0.12), transparent 30%),
    linear-gradient(180deg, #050816 0%, #0a0f1f 40%, #0f172a 100%);

  color: #e2e8f0;
}

.page::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  background:
    radial-gradient(circle at 20% 10%, rgba(255, 0, 153, 0.12), transparent 20%),
    radial-gradient(circle at 80% 20%, rgba(0, 224, 255, 0.12), transparent 20%),
    radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.10), transparent 25%);

  filter: blur(40px);
}

.page > * {
  position: relative;
  z-index: 1;
}

.hero {
  max-width: 1000px;
  margin: 0 auto 28px;
  text-align: center;
}

.hero-kicker {
  display: inline-flex;
  padding: 8px 14px;
  border-radius: 999px;
  margin-bottom: 14px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #7c3aed;
  background: rgba(168, 85, 247, 0.08);
  border: 1px solid rgba(168, 85, 247, 0.12);
}

.hero h1 {
  color: #ffffff;
}

.hero p {
  color: rgba(226, 232, 240, 0.7);
}

.landing-section,
.details-layout {
  max-width: 1400px;
  margin: 0 auto;
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
  color: #f1f5f9;
}

.section-header span,
.selected-chip,
.section-subtitle,
.selected-description {
  color: #64748b;
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
}

.details-main {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  background: #e2e8f0;
  color: #0f172a;
  margin-bottom: 12px;
}

.back-to-categories-btn {
  margin-bottom: 18px;
}

.selected-chip {
  background: rgba(59, 130, 246, 0.08);
  color: #2563eb;
  border-radius: 999px;
  padding: 8px 12px;
  border: 1px solid rgba(59, 130, 246, 0.14);
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

@media (max-width: 1280px) {
  .packages-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1100px) {
  .details-layout {
    grid-template-columns: 1fr;
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
    padding: 20px 20px 100px;
  }

  .hero h1 {
    font-size: 2.3rem;
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

  .main-service-card:hover {
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.08),
    0 10px 40px rgba(0, 224, 255, 0.15);
}
}
</style>
