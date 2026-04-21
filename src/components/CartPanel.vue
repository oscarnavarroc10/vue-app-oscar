<template>
  <aside class="cart-panel">
    <div class="section-header">
      <div class="section-header-left">
        <span class="cart-kicker">Resumen</span>
        <h2>Tu carrito</h2>
      </div>

      <div class="cart-header-actions">
        <button
          v-if="cart.length > 0"
          class="clear-cart-btn"
          type="button"
          @click="$emit('clear-cart')"
          aria-label="Vaciar carrito"
          title="Vaciar carrito"
        >
          <span class="trash-icon">🗑️</span>
          <span>Vaciar carrito</span>
        </button>
      </div>
    </div>

    <draggable
      v-model="localCart"
      :group="{ name: 'service-options', pull: true, put: true }"
      item-key="cartId"
      class="cart-list"
    >
      <template #item="{ element }">
        <article class="cart-item">
          <!-- PLAN -->
          <template v-if="element.cartType === 'plan'">
            <div class="cart-item-top cart-item-top--plan">
              <div class="cart-plan-header">
                <div class="cart-plan-header-left">
                  <div class="cart-plan-topline">
                    <span class="cart-item-category-pill pill-plan">
                      Paquete
                    </span>

                    <span class="quantity-badge quantity-badge--plan">
                      Plan
                    </span>
                  </div>

                  <h3>{{ element.name }}</h3>

                  <div class="cart-item-meta">
                    <span>{{ element.planItems?.length || 0 }} servicios incluidos</span>
                  </div>
                </div>

                <div class="cart-item-right cart-item-right--plan">
                  <strong>${{ formatPrice(getItemTotal(element)) }}</strong>

                  <button
                    class="remove-btn"
                    type="button"
                    @click="$emit('remove', element.cartId)"
                  >
                    Quitar
                  </button>
                </div>
              </div>

              <ul class="cart-plan-list">
                <li
                  v-for="planItem in element.planItems || []"
                  :key="`${element.cartId}-${planItem.id}`"
                  class="cart-plan-item"
                >
                  <div class="cart-plan-item-left">
                    <span
                      class="cart-item-category-pill cart-plan-pill"
                      :class="getCategoryPillClass(planItem.category)"
                    >
                      {{ planItem.category }}
                    </span>

                    <span class="cart-plan-item-name">
                      {{ planItem.name }}
                    </span>
                  </div>

                  <span class="cart-plan-item-qty">
                    {{ planItem.quantity }}
                  </span>
                </li>
              </ul>
            </div>
          </template>

          <!-- SERVICIO NORMAL -->
          <template v-else>
            <div class="cart-item-top">
              <div class="cart-item-title-wrap">
                <div class="cart-item-heading">
                  <div class="cart-item-heading-text">
                    <span
                      class="cart-item-category-pill"
                      :class="getCategoryPillClass(element.category)"
                    >
                      {{ element.category }}
                    </span>

                    <h3>{{ element.name }}</h3>
                  </div>

                  <span v-if="element.quantity > 0" class="quantity-badge">
                    {{ element.quantity }}
                  </span>
                </div>

                <div v-if="element.profile" class="cart-item-profile">
                  <span class="cart-item-profile-label">Url del perfil:</span>

                  <a
                    :href="element.profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cart-item-profile-link"
                  >
                    {{ element.profile }}
                  </a>
                </div>

                <div class="cart-item-meta">
                  <span>${{ formatPrice(element.price) }} / 100</span>
                  <span>·</span>
                  <span>{{ element.quantity }} unidades</span>
                </div>
              </div>

              <div class="cart-item-right">
                <strong>${{ formatPrice(getItemTotal(element)) }}</strong>

                <button
                  class="remove-btn"
                  type="button"
                  @click="$emit('remove', element.cartId)"
                >
                  Quitar
                </button>
              </div>
            </div>

            <div class="cart-item-controls">
              <button
                class="qty-btn"
                type="button"
                @click="$emit('decrease', element.cartId)"
              >
                −
              </button>

              <input
                class="qty-input"
                :value="element.quantity"
                type="number"
                min="100"
                step="100"
                @change="$emit('update-quantity', element.cartId, $event.target.value)"
              />

              <button
                class="qty-btn"
                type="button"
                @click="$emit('increase', element.cartId)"
              >
                +
              </button>
            </div>
          </template>
        </article>
      </template>
    </draggable>

    <div class="summary">
      <div class="summary-row">
        <span>Subtotal</span>
        <strong>${{ formatPrice(subtotal) }}</strong>
      </div>

      <div class="summary-row" v-if="discountPercentage > 0">
        <span>Descuento ({{ discountPercentage }}%)</span>
        <strong>- ${{ formatPrice(discountAmount) }}</strong>
      </div>

      <div class="summary-row total-row">
        <span>Total</span>
        <strong>${{ formatPrice(total) }}</strong>
      </div>

      <button
        class="quote-btn"
        :disabled="cart.length === 0"
        type="button"
        @click="sendWhatsApp"
      >
        Solicitar servicios
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import draggable from "vuedraggable";

const props = defineProps({
  cart: { type: Array, required: true },
  subtotal: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  discountAmount: { type: Number, required: true },
  total: { type: Number, required: true },
  formatPrice: { type: Function, required: true },
});

const emit = defineEmits([
  "update:cart",
  "remove",
  "clear-cart",
  "increase",
  "decrease",
  "update-quantity",
]);

const localCart = computed({
  get: () => props.cart,
  set: (value) => emit("update:cart", value),
});

const uniqueServicesCount = computed(() => props.cart.length);

const totalUnits = computed(() => {
  return props.cart.reduce((sum, item) => {
    if (item.cartType === "plan") {
      return (
        sum +
        (item.planItems || []).reduce(
          (innerSum, planItem) => innerSum + (Number(planItem.quantity) || 0),
          0
        )
      );
    }

    return sum + (Number(item.quantity) || 0);
  }, 0);
});

const getItemTotal = (item) => {
  if (item.cartType === "plan") {
    return Number(item.price || 0) * Number(item.quantity || 1);
  }

  return (Number(item.price || 0) / 100) * (Number(item.quantity) || 0);
};

const getCategoryPillClass = (category) => {
  const classMap = {
    Instagram: "pill-instagram",
    Facebook: "pill-facebook",
    TikTok: "pill-tiktok",
    YouTube: "pill-youtube",
    Snapchat: "pill-snapchat",
    X: "pill-x",
    Discord: "pill-discord",
    Twitch: "pill-twitch",
    Spotify: "pill-spotify",
    Telegram: "pill-telegram",
    WhatsApp: "pill-whatsapp",
  };

  return classMap[category] || "pill-default";
};

const sendWhatsApp = () => {
  const phone = "529992649728";

  const servicesText = props.cart
    .map((item, index) => {
      if (item.cartType === "plan") {
        const included = (item.planItems || [])
          .map(
            (planItem) =>
              `   - ${planItem.category}: ${planItem.name} (${planItem.quantity})`
          )
          .join("\n");

        return `${index + 1}. Paquete: ${item.name}
Incluye:
${included}`;
      }

      return `${index + 1}. Servicio: ${item.quantity} ${item.name} para ${item.category}
Perfil: ${item.profile || "No especificado"}`;
    })
    .join("\n\n");

  const finalMessage = `Hola Porkba👋

Quiero solicitar lo(s) siguiente(s):

${servicesText}

Resumen:
- Seleccionados: ${uniqueServicesCount.value}
- Total: $${props.formatPrice(props.total)} MXN`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped>
.cart-panel {
  background:
    linear-gradient(
      180deg,
      rgba(10, 18, 34, 0.88) 0%,
      rgba(8, 14, 26, 0.92) 100%
    );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 20px;

  box-shadow:
    0 18px 40px rgba(2, 6, 23, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.section-header-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cart-kicker {
  color: #93c5fd;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.section-header h2 {
  margin: 0;
  font-size: 2rem;
  line-height: 1;
  color: #ffffff;
}

.cart-header-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.clear-cart-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 42px;
  border: 1px solid rgba(248, 113, 113, 0.16);
  background: rgba(127, 29, 29, 0.14);
  color: #fca5a5;

  border-radius: 12px;
  padding: 0 14px;

  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.clear-cart-btn:hover {
  background: rgba(127, 29, 29, 0.22);
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(127, 29, 29, 0.14);
}

.trash-icon {
  font-size: 1rem;
  line-height: 1;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 140px;
}

.cart-item {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 14px;
  background:
    linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.82) 0%,
      rgba(17, 24, 39, 0.84) 100%
    );

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 10px 24px rgba(2, 6, 23, 0.18);
}

.cart-item-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
}

.cart-item-top--plan {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}

.cart-plan-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
}

.cart-plan-header-left,
.cart-item-title-wrap {
  flex: 1;
  min-width: 0;
}

.cart-plan-header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-plan-topline {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.cart-item-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.cart-item-heading-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.cart-item h3 {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.25;
  color: #ffffff;
}

.cart-item-category-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 800;
  line-height: 1;
  border: 1px solid transparent;
}

.pill-plan {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.18),
    rgba(37, 99, 235, 0.16)
  );
  color: #c4b5fd;
  border-color: rgba(124, 58, 237, 0.16);
}

.pill-instagram {
  background: linear-gradient(
    135deg,
    rgba(245, 133, 41, 0.14),
    rgba(221, 42, 123, 0.18),
    rgba(129, 52, 175, 0.14)
  );
  color: #f9a8d4;
}

.pill-facebook {
  background: linear-gradient(
    135deg,
    rgba(24, 119, 242, 0.14),
    rgba(96, 165, 250, 0.18)
  );
  color: #93c5fd;
}

.pill-tiktok {
  background: linear-gradient(
    135deg,
    rgba(37, 244, 238, 0.12),
    rgba(17, 24, 39, 0.12),
    rgba(254, 44, 85, 0.14)
  );
  color: #d1d5db;
}

.pill-youtube {
  background: linear-gradient(
    135deg,
    rgba(255, 0, 0, 0.12),
    rgba(239, 68, 68, 0.16)
  );
  color: #fca5a5;
}

.pill-snapchat {
  background: linear-gradient(
    135deg,
    rgba(250, 204, 21, 0.14),
    rgba(245, 158, 11, 0.14)
  );
  color: #fde68a;
}

.pill-x {
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.16),
    rgba(71, 85, 105, 0.18)
  );
  color: #cbd5e1;
}

.pill-discord {
  background: linear-gradient(
    135deg,
    rgba(88, 101, 242, 0.14),
    rgba(129, 140, 248, 0.18)
  );
  color: #c4b5fd;
}

.pill-twitch {
  background: linear-gradient(
    135deg,
    rgba(145, 70, 255, 0.14),
    rgba(168, 85, 247, 0.18)
  );
  color: #d8b4fe;
}

.pill-spotify {
  background: linear-gradient(
    135deg,
    rgba(29, 185, 84, 0.14),
    rgba(34, 197, 94, 0.18)
  );
  color: #86efac;
}

.pill-telegram {
  background: linear-gradient(
    135deg,
    rgba(0, 136, 204, 0.14),
    rgba(56, 189, 248, 0.18)
  );
  color: #7dd3fc;
}

.pill-whatsapp {
  background: linear-gradient(
    135deg,
    rgba(37, 211, 102, 0.14),
    rgba(74, 222, 128, 0.18)
  );
  color: #86efac;
}

.pill-default {
  background: rgba(148, 163, 184, 0.14);
  color: #cbd5e1;
}

.quantity-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;

  background: rgba(37, 99, 235, 0.14);
  color: #93c5fd;
  font-size: 0.82rem;
  font-weight: 800;
}

.quantity-badge--plan {
  background: rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
}

.cart-item-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: #94a3b8;
  font-size: 0.82rem;
  font-weight: 600;
}

.cart-item-right,
.cart-item-right--plan {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.cart-item-right {
  align-items: flex-end;
}

.cart-item-right--plan {
  align-items: flex-end;
  text-align: right;
}

.cart-item-right strong,
.cart-item-right--plan strong {
  color: #ffffff;
  font-size: 1.18rem;
  line-height: 1;
}

.cart-item-profile {
  margin: 0 0 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cart-item-profile-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #cbd5e1;
}

.cart-item-profile-link {
  font-size: 0.82rem;
  line-height: 1.35;
  color: #60a5fa;
  text-decoration: none;
  word-break: break-all;
}

.cart-item-profile-link:hover {
  text-decoration: underline;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

.qty-btn {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
}

.qty-btn:hover {
  background: rgba(255, 255, 255, 0.09);
  transform: translateY(-1px);
}

.qty-input {
  width: 110px;
  height: 38px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 12px;
  padding: 0 12px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.remove-btn {
  border: none;
  background: transparent;
  color: #f87171;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  transition: color 0.18s ease;
}

.remove-btn:hover {
  color: #fca5a5;
}

.cart-plan-list {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-plan-item {
  width: 100%;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  padding: 10px 12px;
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.cart-plan-item-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex-wrap: wrap;
  flex: 1;
}

.cart-plan-pill {
  min-height: 28px;
  padding: 0 12px;
  font-size: 0.74rem;
}

.cart-plan-item-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: #e5e7eb;
}

.cart-plan-item-qty {
  font-size: 0.9rem;
  font-weight: 800;
  color: #60a5fa;
  flex-shrink: 0;
}

.summary {
  margin-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 18px;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #cbd5e1;
}

.summary-row strong {
  color: #ffffff;
}

.total-row {
  margin-top: 2px;
  padding-top: 6px;
  font-size: 1.18rem;
}

.total-row span,
.total-row strong {
  color: #ffffff;
  font-weight: 900;
}

.quote-btn {
  margin-top: 8px;
  border: none;
  border-radius: 16px;
  padding: 16px 18px;

  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;

  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #ffffff;

  box-shadow: 0 14px 26px rgba(37, 99, 235, 0.24);

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.quote-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: brightness(1.03);
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.28);
}

.quote-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .section-header,
  .cart-plan-header,
  .cart-item-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-header-actions {
    align-items: flex-start;
  }

  .cart-item-right,
  .cart-item-right--plan {
    align-items: flex-start;
    text-align: left;
  }

  .cart-item-controls {
    width: 100%;
  }

  .qty-input {
    flex: 1;
  }

  .cart-plan-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-plan-item-left {
    width: 100%;
  }
}
</style>