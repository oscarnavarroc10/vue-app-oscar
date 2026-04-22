<template>
  <section class="landing-section">
    <section id="planes">
      <SocialTabsBuilder
        :services="enabledServices"
        :package-plans="packagePlans"
        :get-plan-items="getPlanItems"
        @choose="choosePlan"
      />
    </section>

    <CustomPackageBanner @customize="goToCustomBuilder" />

    <section id="comentarios">
      <TestimonialsSection />
    </section>

    <section id="faq">
      <FaqSection />
    </section>

    <section id="contacto">
      <ContactLeadSection />
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import servicesData from "@/data/services.json";
import packagePlansData from "@/data/package-plans.json";
import serviceOptionsData from "@/data/service-options.json";

import { useCart } from "@/composables/useCart";

import SocialTabsBuilder from "@/components/SocialTabsBuilder.vue";
import CustomPackageBanner from "@/components/CustomPackageBanner.vue";
import TestimonialsSection from "@/components/TestimonialsSection.vue";
import FaqSection from "@/components/FaqSection.vue";
import ContactLeadSection from "@/components/ContactLeadSection.vue";

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

const choosePlan = ({ plan }) => {
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

const goToCustomBuilder = () => {
  router.push("/social-categories");
};
</script>

<style scoped>
.landing-section {
  max-width: 1400px;
  margin: 0 auto;
}

#planes,
#comentarios,
#faq,
#contacto {
  scroll-margin-top: 96px;
}

@media (max-width: 900px) {
  #planes,
  #comentarios,
  #faq,
  #contacto {
    scroll-margin-top: 84px;
  }
}
</style>