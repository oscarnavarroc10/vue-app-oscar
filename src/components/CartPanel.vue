<template>
  <aside class="cart-panel">
    <div class="section-header">
  <div class="section-header-left">
    <h2>Tu carrito</h2>
    <p class="section-subtitle">
      {{ uniqueServicesCount }} seleccionado<span v-if="uniqueServicesCount !== 1">s</span>
      · {{ totalUnits }} unidades
    </p>
  </div>

  <div class="cart-header-actions">
    <span>{{ cart.length }} seleccionados</span>

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
                  <span class="cart-item-category-pill pill-plan">
                    Paquete
                  </span>

                  <h3>{{ element.name }}</h3>

                  <div class="cart-item-meta">
                    <span>{{ element.planItems?.length || 0 }} servicios incluidos</span>
                  </div>
                </div>

                <div class="cart-item-right cart-item-right--plan">
                  <span class="quantity-badge">
                    Plan
                  </span>

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
        <span>Servicios</span>
        <strong>{{ uniqueServicesCount }}</strong>
      </div>

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
          (innerSum, planItem) =>
            innerSum + (Number(planItem.quantity) || 0),
          0,
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
              `   - ${planItem.category}: ${planItem.name} (${planItem.quantity})`,
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
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
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
  gap: 4px;
}

.section-header h2 {
  margin: 0;
  font-size: 1.35rem;
}

.section-header span,
.section-subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 140px;
}

.cart-item {
  border: 1.5px solid #111827;
  border-radius: 14px;
  padding: 12px 14px;
  background: #ffffff;
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
  font-size: 1rem;
  line-height: 1.25;
  color: #111827;
}

.cart-item-category-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 34px;
  padding: 0 18px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1;
  border: 1px solid transparent;
}

.pill-plan {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.1),
    rgba(37, 99, 235, 0.12)
  );
  color: #5b21b6;
  border-color: rgba(124, 58, 237, 0.15);
}

.pill-instagram {
  background: linear-gradient(
    135deg,
    rgba(245, 133, 41, 0.1),
    rgba(221, 42, 123, 0.12),
    rgba(129, 52, 175, 0.1)
  );
  color: #b4236b;
}

.pill-facebook {
  background: linear-gradient(
    135deg,
    rgba(24, 119, 242, 0.1),
    rgba(96, 165, 250, 0.12)
  );
  color: #1454b8;
}

.pill-tiktok {
  background: linear-gradient(
    135deg,
    rgba(37, 244, 238, 0.08),
    rgba(17, 24, 39, 0.1),
    rgba(254, 44, 85, 0.08)
  );
  color: #111827;
}

.pill-youtube {
  background: linear-gradient(
    135deg,
    rgba(255, 0, 0, 0.08),
    rgba(239, 68, 68, 0.1)
  );
  color: #b91c1c;
}

.pill-snapchat {
  background: linear-gradient(
    135deg,
    rgba(250, 204, 21, 0.14),
    rgba(245, 158, 11, 0.1)
  );
  color: #854d0e;
}

.pill-x {
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.08),
    rgba(71, 85, 105, 0.1)
  );
  color: #0f172a;
}

.pill-discord {
  background: linear-gradient(
    135deg,
    rgba(88, 101, 242, 0.1),
    rgba(129, 140, 248, 0.12)
  );
  color: #4338ca;
}

.pill-twitch {
  background: linear-gradient(
    135deg,
    rgba(145, 70, 255, 0.1),
    rgba(168, 85, 247, 0.12)
  );
  color: #6d28d9;
}

.pill-spotify {
  background: linear-gradient(
    135deg,
    rgba(29, 185, 84, 0.1),
    rgba(34, 197, 94, 0.12)
  );
  color: #166534;
}

.pill-telegram {
  background: linear-gradient(
    135deg,
    rgba(0, 136, 204, 0.1),
    rgba(56, 189, 248, 0.12)
  );
  color: #0b6fa4;
}

.pill-whatsapp {
  background: linear-gradient(
    135deg,
    rgba(37, 211, 102, 0.1),
    rgba(74, 222, 128, 0.12)
  );
  color: #15803d;
}

.pill-default {
  background: rgba(148, 163, 184, 0.1);
  color: #475569;
}

.quantity-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 42px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.85rem;
  font-weight: 800;
}

.cart-item-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: #6b7280;
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

.cart-item-right strong {
  color: #111827;
  font-size: 1rem;
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
  color: #374151;
}

.cart-item-profile-link {
  font-size: 0.82rem;
  line-height: 1.35;
  color: #2563eb;
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
  width: 36px;
  height: 36px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #f8fafc;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
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
  border: 1px solid rgba(220, 38, 38, 0.22);
  background: rgba(220, 38, 38, 0.08);
  color: #dc2626;
  border-radius: 12px;
  padding: 0 14px;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition:    
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.clear-cart-btn:hover {
  background: rgba(220, 38, 38, 0.14);
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(220, 38, 38, 0.12);
}

.trash-icon {
  font-size: 1rem;
  line-height: 1;
}

.qty-input {
  width: 110px;
  height: 36px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 0.95rem;
  font-weight: 700;
}

.remove-btn {
  border: none;
  background: transparent;
  color: #dc2626;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
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
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
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
  font-size: 0.75rem;
}

.cart-plan-item-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #111827;
}

.cart-plan-item-qty {
  font-size: 0.85rem;
  font-weight: 800;
  color: #2563eb;
  flex-shrink: 0;
}

.summary {
  margin-top: 20px;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-row {
  font-size: 1.08rem;
}

.quote-btn {
  border: none;
  border-radius: 14px;
  padding: 14px 18px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  background: #111827;
  color: #fff;
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