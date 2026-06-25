<template>
  <section class="builder-layout">
    <SectionShell class="builder-shell">
      <div class="services-stage" :style="viewStyle">
        <section class="subservices-stage-head">
          <button class="subservices-back-btn" type="button" @click="goBack">
            ← Cambiar plataforma
          </button>

          <div class="subservices-stage-copy">
            <span class="subservices-kicker">
              {{ selectedServiceCategory }}
            </span>

            <h3>Servicios para {{ selectedServiceCategory }}</h3>

            <p>
              Elige los servicios que quieras agregar a tu carrito y arma tu
              paquete personalizado.
            </p>
          </div>

          <div class="subservices-counter">
            {{ formatNumber(filteredSubServices.length) }} servicios
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
            Estamos preparando más opciones para {{ selectedServiceCategory }}.
          </p>
        </div>
      </div>
    </SectionShell>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { flyToCart } from "@/utils/flyToCart";
import serviceOptionsData from "@/data/service-options.json";
import { useCart } from "@/composables/useCart";
import {
  normalizeCategory,
  usePlatformTheme,
} from "@/composables/usePlatformTheme.js";
import { formatNumber, formatPrice } from "@/utils/format.js";
import SectionShell from "@/components/SectionShell.vue";
import SubServiceCard from "@/components/SubServiceCard.vue";

const route = useRoute();
const router = useRouter();

const { cart, addToCart } = useCart();
const serviceOptions = ref(serviceOptionsData);

const selectedServiceCategory = computed(() => {
  return normalizeCategory(route.params.category);
});

const platformTheme = computed(() =>
  usePlatformTheme(selectedServiceCategory.value),
);
const colors = computed(() => platformTheme.value.colors);

const filteredSubServices = computed(() => {
  return serviceOptions.value.filter(
    (item) =>
      item.category?.toLowerCase() ===
      String(route.params.category).toLowerCase(),
  );
});

const handleAddSubService = async ({ service, sourceEl }) => {
  const cartTarget = document.querySelector("[data-cart-target='true']");

  await flyToCart(sourceEl, cartTarget);

  addToCart({
    ...service,
    id: service.id,
    price: Number(service.price || 0),
    quantity: Number(service.quantity || 100),
    cartType: "service",
  });
};

const goBack = () => {
  router.push("/social-categories");
};

const hexToRgba = (hexColor, alpha) => {
  const hex = hexColor?.replace("#", "");

  if (!hex || hex.length !== 6) {
    return `rgba(37, 99, 235, ${alpha})`;
  }

  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const viewStyle = computed(() => ({
  "--platform-accent": colors.value.accent,
  "--platform-accent-soft": colors.value.bg,
  "--platform-text": colors.value.text,
  "--platform-border-strong": hexToRgba(colors.value.accent, 0.18),
  "--platform-shadow": hexToRgba(colors.value.accent, 0.14),
}));
</script>

<style scoped>
.builder-layout {
  max-width: 1400px;
  margin: 0 auto;
}

.services-stage {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.subservices-stage-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-5);
  padding: clamp(20px, 4vw, 30px);
  border-radius: var(--radius-2xl);
  background:
    linear-gradient(
      135deg,
      var(--platform-accent-soft),
      rgba(255, 255, 255, 0.96)
    ),
    var(--color-surface-subtle);
  border: 1px solid var(--platform-border-strong);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.subservices-stage-copy {
  flex: 1;
  min-width: 0;
}

.subservices-kicker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
  padding: 8px 14px;
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--platform-text);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1px solid var(--platform-border-strong);
}

.subservices-stage-copy h3 {
  margin: 0 0 var(--space-3);
  color: var(--color-text-primary);
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
}

.subservices-stage-copy p {
  margin: 0;
  max-width: 760px;
  color: var(--color-text-secondary);
  line-height: 1.75;
  font-size: var(--text-base);
}

.subservices-counter {
  flex-shrink: 0;
  padding: 12px 16px;
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  color: var(--platform-text);
  font-weight: var(--font-bold);
  text-align: center;
  border: 1px solid var(--platform-border-strong);
  box-shadow: var(--shadow-sm);
  white-space: nowrap;
}

.subservices-back-btn {
  flex-shrink: 0;
  min-height: 46px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-lg);
  cursor: pointer;
  color: var(--platform-text);
  font-weight: var(--font-bold);
  background: var(--color-surface);
  border: 1px solid var(--platform-border-strong);
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    border-color var(--transition-fast);
}

.subservices-back-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  border-color: var(--platform-accent);
}

.subservices-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
}

.subservices-empty {
  padding: clamp(32px, 5vw, 48px) var(--space-5);
  border-radius: var(--radius-2xl);
  text-align: center;
  background: var(--color-surface-subtle);
  border: 1px dashed var(--platform-border-strong);
}

.subservices-empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: var(--space-3);
  border-radius: var(--radius-full);
  background: var(--platform-accent-soft);
  font-size: 1.6rem;
}

.subservices-empty h4 {
  margin: 0 0 var(--space-2);
  color: var(--color-text-primary);
  font-size: var(--text-xl);
}

.subservices-empty p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 1200px) {
  .subservices-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .subservices-stage-head {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .subservices-back-btn,
  .subservices-counter {
    width: 100%;
  }
}
</style>
