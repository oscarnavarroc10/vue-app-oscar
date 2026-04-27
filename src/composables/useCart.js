import { computed, ref } from "vue";

const cart = ref([]);

const createCartId = () => {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    typeof window.crypto.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }

  return `cart-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

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
      cartId: createCartId(),
      quantity: Number(service.quantity ?? service.minQuantity ?? 100),
      profile: normalizedProfile,
      cartType: service.cartType || "service",
      unitBase: Number(service.unitBase ?? 100),
      minQuantity: Number(service.minQuantity ?? 100),
      step: Number(service.step ?? 100),
    };
  };

  const addToCart = (service) => {
    const isPlan = service.cartType === "plan";

    if (isPlan) {
      cart.value.push({
        ...service,
        cartId: createCartId(),
        quantity: Number(service.quantity ?? 1),
      });
      return;
    }

    const normalizedProfile = normalizeProfile(service.profile);
    const incomingQuantity = Number(
      service.quantity ?? service.minQuantity ?? 100,
    );

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
      unitBase: Number(service.unitBase ?? 100),
      minQuantity: Number(service.minQuantity ?? 100),
      step: Number(service.step ?? 100),
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
      item.quantity = item.cartType === "plan" ? 1 : Number(item.minQuantity || 100);
      return;
    }

    if (item.cartType === "plan") {
      item.quantity = Math.max(1, parsedQuantity);
      return;
    }

    const minQuantity = Number(item.minQuantity || 100);

    if (parsedQuantity < minQuantity) {
      item.quantity = minQuantity;
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

    item.quantity += Number(item.step || 100);
  };

  const decreaseQuantity = (cartId) => {
    const item = cart.value.find((item) => item.cartId === cartId);

    if (!item) return;

    if (item.cartType === "plan") {
      item.quantity = Math.max(1, item.quantity - 1);
      return;
    }

    const minQuantity = Number(item.minQuantity || 100);
    const step = Number(item.step || 100);

    item.quantity = Math.max(minQuantity, item.quantity - step);
  };

  const getItemUnitPrice = (item) => {
    return Number(item.price || 0);
  };

  const getItemUnitBase = (item) => {
    return Number(item.unitBase || 100);
  };

  const getItemTotal = (item) => {
    if (item.cartType === "plan") {
      return Number(item.price || 0) * Number(item.quantity || 1);
    }

    const quantity = Number(item.quantity || 0);
    const unitPrice = getItemUnitPrice(item);
    const unitBase = getItemUnitBase(item);

    return (quantity / unitBase) * unitPrice;
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
    getItemUnitBase,
    getItemTotal,
    cloneService,
    buildCartItemKey,
    clearCart,
  };
}