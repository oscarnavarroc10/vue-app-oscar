<template>
  <section class="builder-layout">
    <SectionShell class="builder-shell">
      <div class="section-header details-header">
        <div>
          <button class="back-btn" type="button" @click="goHome">
            ← Volver a home
          </button>

          <h2>Crea tu paquete personalizado</h2>

          <p class="selected-description">
            Elige una red social para comenzar y después selecciona los
            servicios que quieres agregar a tu carrito.
          </p>
        </div>

        <div class="selected-chip">{{ enabledServices.length }} categorías</div>
      </div>

      <section class="custom-builder-hero">
        <div class="custom-builder-copy">
          <span class="custom-builder-kicker"> Constructor personalizado </span>

          <h3>Selecciona una plataforma para empezar</h3>

          <p>
            Aquí puedes construir tu paquete a la medida. Primero elige la red
            social que quieres impulsar y después selecciona los servicios que
            deseas agregar.
          </p>
        </div>

        <div class="custom-builder-badge">Tú eliges qué incluir</div>
      </section>

      <section class="main-services-grid">
        <MainServiceCard
          v-for="service in enabledServices"
          :key="service.id"
          :service="service"
          @open="handleOpenMainService"
        />
      </section>
    </SectionShell>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import servicesData from "@/data/services.json";
import MainServiceCard from "@/components/MainServiceCard.vue";
import SectionShell from "@/components/SectionShell.vue";

const router = useRouter();
const availableServices = ref(servicesData);

const enabledServices = computed(() => {
  return availableServices.value.filter((service) => service.isEnabled);
});

const handleOpenMainService = (service) => {
  router.push(`/social-services/${service.category.toLowerCase()}`);
};

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.builder-layout {
  max-width: 1400px;
  margin: 0 auto;
}

.builder-shell {
  display: block;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.details-header h2 {
  margin: 0;
  color: var(--color-text-primary);
  line-height: 1.12;
  font-size: clamp(2rem, 3vw, 2.6rem);
  font-weight: var(--font-bold);
  letter-spacing: -0.03em;
}

.selected-description {
  margin: var(--space-3) 0 0;
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
  max-width: 720px;
}

.back-btn {
  border: 1px solid var(--color-border);
  min-height: 44px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-lg);
  cursor: pointer;
  margin-bottom: var(--space-3);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background: var(--color-surface);
  transition:
    border-color var(--transition-fast),
    background var(--transition-fast),
    transform var(--transition-fast);
  font-size: var(--text-sm);
  box-shadow: var(--shadow-sm);
}

.back-btn:hover {
  border-color: rgba(37, 99, 235, 0.22);
  background: var(--color-surface-subtle);
  transform: translateY(-1px);
}

.selected-chip {
  padding: 10px 16px;
  border-radius: var(--radius-full);
  background: rgba(37, 99, 235, 0.08);
  color: var(--color-accent);
  font-weight: var(--font-semibold);
  border: 1px solid rgba(37, 99, 235, 0.16);
  font-size: var(--text-sm);
  white-space: nowrap;
}

.custom-builder-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-5);
  margin-bottom: var(--space-6);
  padding: clamp(20px, 4vw, 32px);
  border-radius: var(--radius-2xl);
  background:
    linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(124, 58, 237, 0.05)),
    var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.custom-builder-copy {
  min-width: 0;
}

.custom-builder-kicker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
  padding: 8px 14px;
  border-radius: var(--radius-full);
  background: rgba(124, 58, 237, 0.1);
  color: #6d28d9;
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.custom-builder-copy h3 {
  margin: 0 0 var(--space-3);
  color: var(--color-text-primary);
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
}

.custom-builder-copy p {
  margin: 0;
  max-width: 760px;
  color: var(--color-text-secondary);
  line-height: 1.75;
  font-size: var(--text-base);
}

.custom-builder-badge {
  flex-shrink: 0;
  padding: 12px 16px;
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-weight: var(--font-semibold);
  text-align: center;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.main-services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-5);
}

@media (max-width: 1200px) {
  .main-services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .section-header,
  .custom-builder-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-services-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .back-btn {
    width: 100%;
  }

  .details-header h2 {
    font-size: clamp(1.8rem, 8vw, 2.2rem);
  }
}
</style>
