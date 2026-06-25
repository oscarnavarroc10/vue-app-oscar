<template>
  <section class="cart-view-layout">
    <SectionShell class="cart-view-main">
      <div class="section-header cart-view-header">
        <div class="cart-view-heading">
          <button class="back-btn" type="button" @click="goHome">
            ← Volver a home
          </button>

          <h2>Tu carrito</h2>

          <p class="selected-description">
            Revisa tus paquetes y servicios agregados antes de enviar tu
            solicitud.
          </p>
        </div>

        <div class="selected-chip">{{ formatNumber(cartItemsCount) }} elementos</div>
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
                  <span class="cart-view-chip cart-view-chip--plan">Paquete</span>

                  <span class="cart-view-chip cart-view-chip--muted">
                    {{ formatNumber(item.planItems?.length || 0) }} servicios
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
                  {{ formatNumber(planItem.quantity) }}
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
                  ${{ formatPrice(item.price) }} / {{ formatNumber(item.unitBase || 100) }}
                  · {{ formatNumber(item.quantity) }} unidades
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

        <p>Agrega un paquete o arma uno personalizado para empezar.</p>

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
    </SectionShell>

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
import { useCart, getItemTotal } from "@/composables/useCart";
import CartPanel from "@/components/CartPanel.vue";
import SectionShell from "@/components/SectionShell.vue";
import { formatNumber, formatPrice } from "@/utils/format.js";

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
</script>

<style scoped>
.cart-view-layout {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 380px;
  gap: var(--space-5);
  align-items: start;
}

.cart-view-main {
  min-width: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.cart-view-heading {
  min-width: 0;
}

.cart-view-header h2 {
  margin: 0;
  color: var(--color-text-primary);
  line-height: 1.15;
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
}

.selected-description {
  margin: var(--space-2) 0 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: var(--text-base);
}

.back-btn {
  border: 1px solid var(--color-border);
  padding: 10px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
  margin-bottom: var(--space-3);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background: var(--color-surface-subtle);
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast);
}

.back-btn:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
  transform: translateY(-1px);
}

.selected-chip {
  padding: 10px 16px;
  border-radius: var(--radius-full);
  background: var(--color-surface-subtle);
  color: var(--color-accent);
  font-weight: var(--font-bold);
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.cart-view-card {
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.cart-view-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
}

.cart-view-card-copy {
  flex: 1;
  min-width: 0;
}

.cart-view-card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.cart-view-chip,
.cart-view-category-pill {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 14px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-extrabold);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.cart-view-chip--plan {
  color: var(--color-accent);
}

.cart-view-chip--muted {
  color: var(--color-text-secondary);
}

.cart-view-category-pill {
  color: var(--color-text-primary);
}

.pill-instagram {
  color: var(--color-instagram);
}

.pill-facebook {
  color: var(--color-facebook);
}

.pill-tiktok {
  color: var(--color-tiktok);
}

.pill-youtube {
  color: var(--color-youtube);
}

.pill-snapchat {
  color: #f59e0b;
}

.pill-x {
  color: var(--color-text-primary);
}

.pill-discord {
  color: var(--color-discord);
}

.pill-twitch {
  color: var(--color-twitch);
}

.pill-spotify {
  color: var(--color-spotify);
}

.pill-telegram {
  color: var(--color-telegram);
}

.pill-whatsapp {
  color: var(--color-whatsapp);
}

.pill-default {
  color: var(--color-text-secondary);
}

.cart-view-card h3 {
  margin: 0 0 var(--space-2);
  color: var(--color-text-primary);
  font-size: var(--text-xl);
  line-height: 1.2;
}

.cart-view-muted {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.cart-view-profile {
  margin: 0 0 var(--space-2);
  color: var(--color-accent);
  line-height: 1.5;
  word-break: break-all;
}

.cart-view-card-side {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-3);
}

.cart-view-price {
  color: var(--color-text-primary);
  font-size: var(--text-xl);
  line-height: 1;
  white-space: nowrap;
}

.cart-view-remove {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-danger);
  font-weight: var(--font-semibold);
  cursor: pointer;
  padding: 8px 14px;
  border-radius: var(--radius-md);
  transition:
    background var(--transition-fast),
    transform var(--transition-fast),
    border-color var(--transition-fast);
}

.cart-view-remove:hover {
  transform: translateY(-1px);
  background: var(--color-surface-subtle);
  border-color: var(--color-danger);
}

.cart-view-plan-list {
  list-style: none;
  margin: var(--space-4) 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.cart-view-plan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.cart-view-plan-item-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 0;
  flex-wrap: wrap;
}

.cart-view-plan-item-name {
  color: var(--color-text-primary);
  font-weight: var(--font-semibold);
}

.cart-view-plan-item-qty {
  color: var(--color-accent);
  font-weight: var(--font-bold);
  flex-shrink: 0;
}

.cart-view-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
  flex-wrap: wrap;
}

.cart-view-qty-btn {
  width: 42px;
  height: 42px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-size: 1.15rem;
  font-weight: var(--font-bold);
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast);
}

.cart-view-qty-btn:hover {
  background: var(--color-surface-subtle);
  border-color: var(--color-accent);
  transform: translateY(-1px);
}

.cart-view-qty-input {
  width: 120px;
  max-width: 100%;
  height: 42px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0 12px;
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-weight: var(--font-semibold);
}

.cart-summary-panel {
  width: 380px;
  min-width: 0;
}

.cart-empty-state {
  padding: var(--space-12) var(--space-6);
  border-radius: var(--radius-xl);
  text-align: center;
  background: var(--color-surface-subtle);
  border: 1px dashed var(--color-border);
}

.cart-empty-icon {
  font-size: 2.4rem;
  margin-bottom: var(--space-3);
}

.cart-empty-state h3 {
  margin: 0 0 var(--space-2);
  color: var(--color-text-primary);
}

.cart-empty-state p {
  margin: 0;
  color: var(--color-text-secondary);
}

.cart-empty-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-5);
}

.nav-cta {
  min-height: 46px;
  padding: 0 20px;
  border-radius: var(--radius-lg);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-weight: var(--font-bold);
  font-size: 0.95rem;
  border: 1px solid var(--color-accent);
  background: var(--color-accent);
  transition:
    background var(--transition-fast),
    transform var(--transition-fast),
    border-color var(--transition-fast);
}

.nav-cta:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

.nav-cta--secondary {
  color: var(--color-text-primary);
  background: var(--color-surface);
  border-color: var(--color-border);
}

.nav-cta--secondary:hover {
  background: var(--color-surface-subtle);
  border-color: var(--color-accent);
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
  .cart-view-card-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-view-card-side {
    align-items: flex-start;
    width: 100%;
  }

  .cart-view-price {
    font-size: var(--text-lg);
  }

  .cart-view-plan-item {
    align-items: flex-start;
    flex-direction: column;
  }

  .selected-chip {
    align-self: flex-start;
  }
}

@media (max-width: 600px) {
  .back-btn {
    width: 100%;
  }

  .cart-view-card {
    padding: var(--space-4);
  }

  .cart-view-card h3 {
    font-size: var(--text-lg);
  }

  .cart-view-muted,
  .cart-view-profile {
    font-size: var(--text-sm);
  }

  .cart-view-chip,
  .cart-view-category-pill {
    min-height: 28px;
    padding: 0 12px;
  }

  .cart-view-controls {
    gap: var(--space-2);
  }

  .cart-view-qty-btn {
    width: 40px;
    height: 40px;
  }

  .cart-view-qty-input {
    flex: 1;
    width: auto;
    min-width: 0;
  }

  .cart-empty-actions {
    flex-direction: column;
  }

  .nav-cta {
    width: 100%;
  }
}

@media (max-width: 420px) {
  .cart-view-header h2 {
    font-size: var(--text-2xl);
  }

  .selected-description {
    font-size: var(--text-sm);
  }

  .cart-view-card-chips {
    gap: 6px;
  }

  .cart-view-plan-item-left {
    gap: var(--space-2);
  }

  .cart-view-plan-item-name,
  .cart-view-plan-item-qty {
    font-size: var(--text-sm);
  }
}
</style>
