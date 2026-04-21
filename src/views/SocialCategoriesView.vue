<template>
  <section class="builder-layout">
    <div class="details-main">
      <div class="section-header details-header">
        <div>
          <button class="back-btn" type="button" @click="goHome">
            ← Volver a home
          </button>

          <h2>Crea tu paquete personalizado</h2>

          <p class="selected-description">
            Elige una red social para comenzar y después selecciona los servicios
            que quieres agregar a tu carrito.
          </p>
        </div>

        <div class="selected-chip">
          {{ enabledServices.length }} categorías
        </div>
      </div>

      <section class="custom-builder-hero">
        <div class="custom-builder-copy">
          <span class="custom-builder-kicker">
            Constructor personalizado
          </span>

          <h3>Selecciona una plataforma para empezar</h3>

          <p>
            Aquí puedes construir tu paquete a la medida. Primero elige la red
            social que quieres impulsar y después selecciona los servicios que
            deseas agregar.
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
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import servicesData from "@/data/services.json";
import MainServiceCard from "@/components/MainServiceCard.vue";

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
  max-width: 1180px;
  margin: 0 auto;
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

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 14px;
  margin-bottom: 18px;
}

.details-header {
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  color: white;
  line-height: 1.08;
}

.selected-description {
  color: #94a3b8;
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
}

.selected-chip {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.14);
  color: #93c5fd;
  font-weight: 800;
  border: 1px solid rgba(59, 130, 246, 0.12);
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

.custom-builder-kicker {
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

.custom-builder-copy h3 {
  margin: 0 0 10px;
  color: #ffffff;
  font-size: clamp(1.45rem, 3vw, 2rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.custom-builder-copy p {
  margin: 0;
  max-width: 760px;
  color: #94a3b8;
  line-height: 1.7;
}

.custom-builder-badge {
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

  .details-main {
    padding: 18px;
    border-radius: 22px;
  }

  .main-services-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .details-main {
    padding: 16px;
  }

  .back-btn {
    width: 100%;
  }
}
</style>