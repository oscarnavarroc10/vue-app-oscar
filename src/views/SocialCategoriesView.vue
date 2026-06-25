<template>
  <section class="builder-layout">
    <GlassCard>
      <div class="categories-header">
        <div>
          <button class="back-btn" type="button" @click="goHome">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m0 0l7 7m-7-7l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Volver
          </button>
          <h2>Crea tu paquete personalizado</h2>
          <p class="categories-subtitle">
            Elige una red social para comenzar y después selecciona los servicios que quieres agregar a tu carrito.
          </p>
        </div>
        <span class="count-chip">{{ enabledServices.length }} categorías</span>
      </div>

      <section class="builder-hero">
        <div class="builder-hero-copy">
          <span class="builder-kicker">Constructor personalizado</span>
          <h3>Selecciona una plataforma para empezar</h3>
          <p>
            Aquí puedes construir tu paquete a la medida. Primero elige la red
            social que quieres impulsar y después selecciona los servicios que
            deseas agregar.
          </p>
        </div>
        <span class="builder-badge">Tú eliges qué incluir</span>
      </section>

      <section class="main-services-grid">
        <MainServiceCard
          v-for="service in enabledServices"
          :key="service.id"
          :service="service"
          @open="handleOpenMainService"
        />
      </section>
    </GlassCard>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import servicesData from "@/data/services.json";
import GlassCard from "@/components/GlassCard.vue";
import MainServiceCard from "@/components/MainServiceCard.vue";

const router = useRouter();
const availableServices = ref(servicesData);

const enabledServices = computed(() =>
  availableServices.value.filter((s) => s.isEnabled)
);

const handleOpenMainService = (service) => {
  router.push(`/social-services/${service.category.toLowerCase()}`);
};

const goHome = () => router.push("/");
</script>

<style scoped>
.builder-layout {
  max-width: 1180px;
  margin: 0 auto;
}

.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-4, 16px);
  margin-bottom: var(--space-5, 20px);
}

.categories-header h2 {
  margin: 0;
  font-size: var(--text-2xl, 1.5rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-text, #111827);
}

.categories-subtitle {
  margin: var(--space-1, 4px) 0 0;
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
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
  margin-bottom: var(--space-3, 12px);
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

/* Builder hero */
.builder-hero {
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

.builder-kicker {
  display: inline-flex;
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
  margin-bottom: var(--space-3, 12px);
}

.builder-hero-copy h3 {
  margin: 0 0 var(--space-2, 8px);
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-text, #111827);
}

.builder-hero-copy p {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
  line-height: 1.7;
}

.builder-badge {
  flex-shrink: 0;
  padding: var(--space-3, 12px) var(--space-4, 16px);
  border-radius: var(--radius-md, 12px);
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  color: var(--color-text, #111827);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
}

.main-services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4, 16px);
}

@media (max-width: 1024px) {
  .main-services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .categories-header,
  .builder-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-services-grid {
    grid-template-columns: 1fr;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
