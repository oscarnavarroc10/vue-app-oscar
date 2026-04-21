<template>
  <section class="cart-view-layout">
    <div class="cart-view-main">
      <div class="section-header cart-view-header">
        <div>
          <button class="back-btn" type="button" @click="goHome">
            ← Volver a home
          </button>

          <h2>Tu carrito</h2>

          <p class="selected-description">
            Revisa tus paquetes y servicios agregados antes de enviar tu
            solicitud.
          </p>
        </div>

        <div class="selected-chip">
          {{ cartItemsCount }} elementos
        </div>
      </div>

      <div v-if="cartItemsCount > 0" class="cart-items-list">
        <article
          v-for="item in cart"
          :key="item.cartId || `${item.id}-${item.profile || 'noprof'}`"
          class="cart-view-card"
        >
          <template v-if="item.cartType === 'plan'">
            <div class="cart-view-card-top">
              <div class="cart-view-card-copy">
                <div class="cart-view-card-chips">
                  <span class="cart-view-chip cart-view-chip--plan">
                    Paquete
                  </span>

                  <span class="cart-view-chip cart-view-chip--muted">
                    {{ item.planItems?.length || 0 }} servicios
                  </span>
                </div>

                <h3>{{ item.name }}</h3>

                <p class="cart-view-muted">
                  Plan listo para pedir con todos sus servicios incluidos.
                </p>
              </div>

              <div class="cart-view-card-side">
                <strong class="cart-view-price">
                  ${{ formatPrice(getItemTotal(item)) }}
                </strong>

                <button
                  class="cart-view-remove"
                  type="button"
                  @click="removeFromCart(item.cartId)"
                >
                  Quitar
                </button>
              </div>
            </div>

            <ul class="cart-view-plan-list">
              <li
                v-for="planItem in item.planItems || []"
                :key="`${item.cartId}-${planItem.id}`"
                class="cart-view-plan-item"
              >
                <div class="cart-view-plan-item-left">
                  <span
                    class="cart-view-category-pill"
                    :class="getCategoryPillClass(planItem.category)"
                  >
                    {{ planItem.category }}
                  </span>

                  <span class="cart-view-plan-item-name">
                    {{ planItem.name }}
                  </span>
                </div>

                <span class="cart-view-plan-item-qty">
                  {{ planItem.quantity }}
                </span>
              </li>
            </ul>
          </template>

          <template v-else>
            <div class="cart-view-card-top">
              <div class="cart-view-card-copy">
                <div class="cart-view-card-chips">
                  <span
                    class="cart-view-category-pill"
                    :class="getCategoryPillClass(item.category)"
                  >
                    {{ item.category }}
                  </span>

                  <span class="cart-view-chip cart-view-chip--muted">
                    Servicio
                  </span>
                </div>

                <h3>{{ item.name }}</h3>

                <p v-if="item.profile" class="cart-view-profile">
                  {{ item.profile }}
                </p>

                <p class="cart-view-muted">
                  ${{ formatPrice(item.price) }} / 100 · {{ item.quantity }} unidades
                </p>
              </div>

              <div class="cart-view-card-side">
                <strong class="cart-view-price">
                  ${{ formatPrice(getItemTotal(item)) }}
                </strong>

                <button
                  class="cart-view-remove"
                  type="button"
                  @click="removeFromCart(item.cartId)"
                >
                  Quitar
                </button>
              </div>
            </div>

            <div class="cart-view-controls">
              <button
                class="cart-view-qty-btn"
                type="button"
                @click="decreaseQuantity(item.cartId)"
              >
                −
              </button>

              <input
                class="cart-view-qty-input"
                :value="item.quantity"
                type="number"
                min="100"
                step="100"
                @change="updateQuantity(item.cartId, $event.target.value)"
              />

              <button
                class="cart-view-qty-btn"
                type="button"
                @click="increaseQuantity(item.cartId)"
              >
                +
              </button>
            </div>
          </template>
        </article>
      </div>

      <div v-else class="cart-empty-state">
        <div class="cart-empty-icon">🛒</div>

        <h3>Tu carrito está vacío</h3>

        <p>
          Agrega un paquete o arma uno personalizado para empezar.
        </p>

        <div class="cart-empty-actions">
          <button class="nav-cta" type="button" @click="goHome">
            Ver planes
          </button>

          <button
            class="nav-cta nav-cta--secondary"
            type="button"
            @click="goCustom"
          >
            Personalizar
          </button>
        </div>
      </div>
    </div>

    <div class="cart-summary-panel">
      <CartPanel
        :cart="cart"
        :subtotal="subtotal"
        :discount-percentage="discountPercentage"
        :discount-amount="discountAmount"
        :total="total"
        :format-price="formatPrice"
        @clear-cart="clearCart"
        @close-cart="goHome"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "@/composables/useCart";
import CartPanel from "@/components/CartPanel.vue";

const router = useRouter();

const {
  cart,
  subtotal,
  discountPercentage,
  discountAmount,
  total,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} = useCart();

const cartItemsCount = computed(() => cart.value.length);

const goHome = () => {
  router.push("/");
};

const goCustom = () => {
  router.push("/social-categories");
};

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

const formatPrice = (value) => {
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
</script>

<style scoped>
.cart-view-layout {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 380px;
  gap: 20px;
  align-items: start;
}

.cart-view-main {
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

.cart-view-header {
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
}

.selected-chip {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.14);
  color: #93c5fd;
  font-weight: 800;
  border: 1px solid rgba(59, 130, 246, 0.12);
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-view-card {
  border-radius: 24px;
  padding: 20px;
  background: linear-gradient(
    180deg,
    rgba(10, 18, 34, 0.86) 0%,
    rgba(8, 14, 26, 0.92) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.cart-view-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
}

.cart-view-card-copy {
  flex: 1;
  min-width: 0;
}

.cart-view-card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.cart-view-chip {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 800;
}

.cart-view-chip--plan {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.18),
    rgba(37, 99, 235, 0.16)
  );
  color: #c4b5fd;
}

.cart-view-chip--muted {
  background: rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
}

.cart-view-category-pill {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 800;
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

.cart-view-card h3 {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 1.22rem;
}

.cart-view-muted {
  margin: 0;
  color: #94a3b8;
  line-height: 1.6;
}

.cart-view-profile {
  margin: 0 0 8px;
  color: #60a5fa;
  line-height: 1.5;
  word-break: break-all;
}

.cart-view-card-side {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.cart-view-price {
  color: #ffffff;
  font-size: 1.18rem;
  line-height: 1;
}

.cart-view-remove {
  border: none;
  background: transparent;
  color: #f87171;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
}

.cart-view-plan-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-view-plan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
}

.cart-view-plan-item-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex-wrap: wrap;
}

.cart-view-plan-item-name {
  color: #e5e7eb;
  font-weight: 700;
}

.cart-view-plan-item-qty {
  color: #60a5fa;
  font-weight: 800;
  flex-shrink: 0;
}

.cart-view-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.cart-view-qty-btn {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 800;
  cursor: pointer;
}

.cart-view-qty-input {
  width: 120px;
  height: 40px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 12px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-weight: 700;
}

.cart-summary-panel {
  width: 380px;
}

.cart-empty-state {
  padding: 48px 24px;
  border-radius: 24px;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
}

.cart-empty-icon {
  font-size: 2.4rem;
  margin-bottom: 12px;
}

.cart-empty-state h3 {
  margin: 0 0 10px;
  color: #ffffff;
}

.cart-empty-state p {
  margin: 0;
  color: #94a3b8;
}

.cart-empty-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.nav-cta {
  min-height: 46px;
  padding: 0 20px;
  border-radius: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 0.95rem;
  border: none;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
}

.nav-cta--secondary {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 1200px) {
  .cart-view-layout {
    grid-template-columns: 1fr 360px;
  }

  .cart-summary-panel {
    width: 360px;
  }
}

@media (max-width: 1100px) {
  .cart-view-layout {
    grid-template-columns: 1fr;
  }

  .cart-summary-panel {
    width: 100%;
  }
}

@media (max-width: 900px) {
  .section-header,
  .cart-view-header,
  .cart-view-card-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-view-main {
    padding: 18px;
    border-radius: 22px;
  }

  .cart-view-card-side {
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .cart-view-main {
    padding: 16px;
  }

  .back-btn {
    width: 100%;
  }

  .cart-empty-actions {
    flex-direction: column;
  }
}
</style>