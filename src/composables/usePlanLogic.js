/**
 * Composable: usePlanLogic
 *
 * Extracts the shared plan-loading and plan-choosing logic
 * used by both HomeView and PlansView.
 */
import { computed, ref } from "vue";
import { useCart } from "@/composables/useCart";
import { flyToCart } from "@/utils/flyToCart";

import servicesData from "@/data/services.json";
import packagePlansData from "@/data/package-plans.json";
import serviceOptionsData from "@/data/service-options.json";

export function usePlanLogic() {
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
        (item) => item.id === included.optionId,
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

  return {
    availableServices,
    packagePlans,
    serviceOptions,
    enabledServices,
    getPlanItems,
    choosePlan,
  };
}
