<template>
  <section class="builder-layout">
    <div class="details-main">
      <section class="subservices-stage-head">
        <button
          class="subservices-back-btn"
          type="button"
          @click="goBack"
        >
          ← Cambiar de red social
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
          Estamos preparando más opciones para {{ selectedServiceCategory }}.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { flyToCart } from "@/utils/flyToCart";
import serviceOptionsData from "@/data/service-options.json";
import { useCart } from "@/composables/useCart";
import SubServiceCard from "@/components/SubServiceCard.vue";

const route = useRoute();
const router = useRouter();

const { cart, addToCart } = useCart();
const serviceOptions = ref(serviceOptionsData);

const normalizeCategory = (value) => {
  const map = {
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
    youtube: "YouTube",
    x: "X",
    discord: "Discord",
    twitch: "Twitch",
    spotify: "Spotify",
    snapchat: "Snapchat",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
  };

  return map[value?.toLowerCase()] || value;
};

const selectedServiceCategory = computed(() => {
  return normalizeCategory(route.params.category);
});

const filteredSubServices = computed(() => {
  return serviceOptions.value.filter(
    (item) =>
      item.category?.toLowerCase() === String(route.params.category).toLowerCase()
  );
});

const handleAddSubService = async ({ service, sourceEl }) => {
  try {
    addToCart({
      ...service,
      id: service.id,
      price: Number(service.price || 0),
      quantity: Number(service.quantity || service.minQuantity || 100),
      profile: service.profile,
      cartType: "service",
    });    
  } catch (error) {
    console.error(error);
  }
};

const goBack = () => {
  router.push("/social-categories");
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
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

.subservices-stage-copy h3 {
  margin: 0 0 10px;
  color: #ffffff;
  font-size: clamp(1.45rem, 3vw, 2rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.subservices-stage-copy p {
  margin: 0;
  max-width: 760px;
  color: #94a3b8;
  line-height: 1.7;
}

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

  .details-main {
    padding: 18px;
    border-radius: 22px;
  }
}

@media (max-width: 600px) {
  .details-main {
    padding: 16px;
  }

  .subservices-back-btn {
    width: 100%;
  }
}
</style>