import { computed, ref } from "vue";

const cart = ref([]);

export function useCart() {
  const normalizeProfile = (value) => {
    return (value || "").trim().replace(/\/+$/, "");
  };

  const buildCartItemKey = (service) => {
    return `${service.id}::${normalizeProfile(service.profile)}`;
  };

  const cloneService = (service) => {
    const normalizedProfile = normalizeProfile(service.profile);

    return {
      ...service,
      cartId: crypto.randomUUID(),
      quantity: Number(service.quantity ?? 100),
      profile: normalizedProfile,
      cartType: service.cartType || "service",
    };
  };

  const addToCart = (service) => {
    const isPlan = service.cartType === "plan";

    if (isPlan) {
      cart.value.push({
        ...service,
        cartId: crypto.randomUUID(),
        quantity: Number(service.quantity ?? 1),
      });
      return;
    }

    const normalizedProfile = normalizeProfile(service.profile);
    const incomingQuantity = Number(service.quantity ?? 100);

    const existing = cart.value.find(
      (item) =>
        item.cartType !== "plan" &&
        item.id === service.id &&
        normalizeProfile(item.profile) === normalizedProfile,
    );

    if (existing) {
      existing.quantity += incomingQuantity;
      return;
    }

    cart.value.push({
      ...cloneService(service),
      quantity: incomingQuantity,
      profile: normalizedProfile,
      cartType: "service",
    });
  };

  const removeFromCart = (cartId) => {
    cart.value = cart.value.filter((item) => item.cartId !== cartId);
  };

  const updateQuantity = (cartId, quantity) => {
    const item = cart.value.find((item) => item.cartId === cartId);

    if (!item) return;

    const parsedQuantity = Number(quantity);

    if (Number.isNaN(parsedQuantity)) {
      item.quantity = item.cartType === "plan" ? 1 : 100;
      return;
    }

    if (item.cartType === "plan") {
      item.quantity = Math.max(1, parsedQuantity);
      return;
    }

    if (parsedQuantity < 100) {
      item.quantity = 100;
      return;
    }

    item.quantity = parsedQuantity;
  };

  const increaseQuantity = (cartId) => {
    const item = cart.value.find((item) => item.cartId === cartId);

    if (!item) return;

    if (item.cartType === "plan") {
      item.quantity += 1;
      return;
    }

    item.quantity += 100;
  };

  const decreaseQuantity = (cartId) => {
    const item = cart.value.find((item) => item.cartId === cartId);

    if (!item) return;

    if (item.cartType === "plan") {
      item.quantity = Math.max(1, item.quantity - 1);
      return;
    }

    item.quantity = Math.max(100, item.quantity - 100);
  };

  const getItemUnitPrice = (item) => {
    return Number(item.price || 0);
  };

  const getItemTotal = (item) => {
    if (item.cartType === "plan") {
      return Number(item.price || 0) * Number(item.quantity || 1);
    }

    return (getItemUnitPrice(item) / 100) * Number(item.quantity || 0);
  };

  const subtotal = computed(() => {
    return cart.value.reduce((sum, item) => sum + getItemTotal(item), 0);
  });

  const totalUnits = computed(() => {
    return cart.value.reduce((sum, item) => {
      if (item.cartType === "plan") {
        return (
          sum +
          (item.planItems || []).reduce(
            (innerSum, planItem) => innerSum + (Number(planItem.quantity) || 0),
            0,
          ) * Number(item.quantity || 1)
        );
      }

      return sum + (Number(item.quantity) || 0);
    }, 0);
  });

  const discountPercentage = computed(() => {
    const count = cart.value.length;

    if (count > 10) return 15;
    if (count >= 2) return 10;
    return 0;
  });

  const discountAmount = computed(() => {
    return subtotal.value * (discountPercentage.value / 100);
  });
  

  const total = computed(() => {
    return subtotal.value - discountAmount.value;
  });
  
  const clearCart = () => {
  cart.value = [];
};

  return {
    cart,
    subtotal,
    totalUnits,
    discountPercentage,
    discountAmount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    getItemUnitPrice,
    getItemTotal,
    cloneService,
    buildCartItemKey,
    clearCart,
  };
}