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
    };
  };

  const addToCart = (service) => {
    const normalizedProfile = normalizeProfile(service.profile);

    const existing = cart.value.find(
      (item) =>
        item.id === service.id &&
        normalizeProfile(item.profile) === normalizedProfile,
    );

    if (existing) {
      existing.quantity += 100;
      return;
    }

    cart.value.push({
      ...cloneService(service),
      profile: normalizedProfile,
    });
  };

  const removeFromCart = (cartId) => {
    cart.value = cart.value.filter((item) => item.cartId !== cartId);
  };

  const updateQuantity = (cartId, quantity) => {
    const item = cart.value.find((item) => item.cartId === cartId);

    if (!item) return;

    const parsedQuantity = Number(quantity);

    if (Number.isNaN(parsedQuantity) || parsedQuantity < 100) {
      item.quantity = 100;
      return;
    }

    item.quantity = parsedQuantity;
  };

  const increaseQuantity = (cartId) => {
    const item = cart.value.find((item) => item.cartId === cartId);

    if (!item) return;

    item.quantity += 100;
  };

  const decreaseQuantity = (cartId) => {
    const item = cart.value.find((item) => item.cartId === cartId);

    if (!item) return;

    item.quantity = Math.max(100, item.quantity - 100);
  };

  const getItemUnitPrice = (item) => {
    return Number(item.price || 0);
  };

  const getItemTotal = (item) => {
    return (getItemUnitPrice(item) / 100) * Number(item.quantity || 0);
  };

  const subtotal = computed(() => {
    return cart.value.reduce((sum, item) => sum + getItemTotal(item), 0);
  });

  const totalUnits = computed(() => {
    return cart.value.reduce(
      (sum, item) => sum + (Number(item.quantity) || 0),
      0,
    );
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
  };
}
