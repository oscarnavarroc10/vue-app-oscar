<template>
  <section class="plans-view">
    <div class="plans-shell">
      <div class="section-header plans-header">
        <div>
          <button class="back-btn" type="button" @click="goHome">
            ← Volver a home
          </button>

          <h2>Planes por red social</h2>

          <p class="section-subtitle">
            Explora nuestros paquetes recomendados y agrega el que mejor se adapte
            a tu negocio.
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
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { flyToCart } from "@/utils/flyToCart";

import servicesData from "@/data/services.json";
import packagePlansData from "@/data/package-plans.json";
import serviceOptionsData from "@/data/service-options.json";

import { useCart } from "@/composables/useCart";
import SocialTabsBuilder from "@/components/SocialTabsBuilder.vue";

const router = useRouter();
const { addToCart } = useCart();

const availableServices = ref(servicesData);
const packagePlans = ref(packagePlansData);
const serviceOptions = ref(serviceOptionsData);

const enabledServices = computed(() => {
  return availableServices.value.filter((service) => service.isEnabled);
});

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

const choosePlan = async ({ plan, sourceEl }) => {
  const cartTarget = document.querySelector("[data-cart-target='true']");

  await flyToCart(sourceEl, cartTarget);

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

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.plans-view {
  max-width: 1400px;
  margin: 0 auto;
}

.plans-shell {
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

.plans-header h2 {
  margin: 0;
  color: #ffffff;
  line-height: 1.08;
}

.section-subtitle {
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

@media (max-width: 900px) {
  .plans-shell {
    padding: 18px;
    border-radius: 22px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .plans-shell {
    padding: 16px;
  }

  .back-btn {
    width: 100%;
  }
}
</style>