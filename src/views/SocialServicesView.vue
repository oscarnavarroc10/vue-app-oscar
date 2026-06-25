<template>
  <section class="builder-layout">
    <GlassCard>
      <section class="services-head">
        <button class="back-btn" type="button" @click="goBack">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m0 0l7 7m-7-7l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Cambiar plataforma
        </button>

        <div class="services-head-copy">
          <BasePlatformPill :platform="selectedServiceCategory" />
          <h3>Servicios para {{ selectedServiceCategory }}</h3>
          <p>
            Elige los servicios que quieras agregar a tu carrito y arma tu
            paquete personalizado.
          </p>
        </div>

        <span class="count-chip">{{ filteredSubServices.length }} servicios</span>
      </section>

      <section v-if="filteredSubServices.length" class="subservices-grid">
        <SubServiceCard
          v-for="subService in filteredSubServices"
          :key="subService.id"
          :service="subService"
          :cart="cart"
          :format-price="formatPriceFn"
          @add="handleAddSubService"
        />
      </section>

      <div v-else class="services-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 6v6l4 2" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="10" stroke="#9ca3af" stroke-width="1.5"/>
        </svg>
        <h4>Próximamente más servicios</h4>
        <p>Estamos preparando más opciones para {{ selectedServiceCategory }}.</p>
      </div>
    </GlassCard>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { flyToCart } from "@/utils/flyToCart";
import { normalizeCategory } from "@/utils/normalizeCategory";
import { formatPrice } from "@/utils/format";
import serviceOptionsData from "@/data/service-options.json";
import { useCart } from "@/composables/useCart";
import GlassCard from "@/components/GlassCard.vue";
import BasePlatformPill from "@/components/BasePlatformPill.vue";
import SubServiceCard from "@/components/SubServiceCard.vue";

const route = useRoute();
const router = useRouter();

const { cart, addToCart } = useCart();
const serviceOptions = ref(serviceOptionsData);

const selectedServiceCategory = computed(() =>
  normalizeCategory(route.params.category)
);

const filteredSubServices = computed(() =>
  serviceOptions.value.filter(
    (item) =>
      item.category?.toLowerCase() === String(route.params.category).toLowerCase()
  )
);

const formatPriceFn = (value) => formatPrice(value);

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

const goBack = () => router.push("/social-categories");
</script>

<style scoped>
.builder-layout {
  max-width: 1180px;
  margin: 0 auto;
}

.services-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4, 16px);
  margin-bottom: var(--space-6, 24px);
  padding: var(--space-5, 20px);
  border-radius: var(--radius-lg, 16px);
  background: var(--color-surface-alt, #f9fafb);
  border: 1px solid var(--color-border, #e5e7eb);
}

.services-head-copy {
  flex: 1;
  min-width: 0;
}

.services-head-copy h3 {
  margin: var(--space-2, 8px) 0 var(--space-2, 8px);
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-text, #111827);
}

.services-head-copy p {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
  line-height: 1.7;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  border: 1px solid var(--color-border, #e5e7eb);
  padding: 8px 16px;
  border-radius: var(--radius-md, 12px);
  background: var(--color-surface, #fff);
  color: var(--color-text, #111827);
  font-weight: var(--font-medium, 500);
  font-size: var(--text-sm, 0.875rem);
  flex-shrink: 0;
  transition: background var(--transition-fast, 150ms ease);
}

.back-btn:hover {
  background: var(--color-surface-alt, #f3f4f6);
}

.count-chip {
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
  flex-shrink: 0;
}

.subservices-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4, 16px);
}

.services-empty {
  padding: var(--space-10, 40px) var(--space-6, 24px);
  text-align: center;
  border-radius: var(--radius-lg, 16px);
  background: var(--color-surface-alt, #f9fafb);
  border: 1px solid var(--color-border, #e5e7eb);
}

.services-empty h4 {
  margin: var(--space-3, 12px) 0 var(--space-2, 8px);
  font-weight: var(--font-semibold, 600);
  color: var(--color-text, #111827);
}

.services-empty p {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
}

@media (max-width: 1024px) {
  .subservices-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .services-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
