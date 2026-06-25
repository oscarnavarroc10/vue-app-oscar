<template>
  <section class="cart-layout">
    <div class="cart-main">
      <GlassCard>
        <div class="cart-header">
          <div>
            <button class="back-btn" type="button" @click="goHome">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m0 0l7 7m-7-7l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Volver
            </button>
            <h2>Tu carrito</h2>
            <p class="cart-subtitle">
              Revisa tus paquetes y servicios agregados antes de enviar tu solicitud.
            </p>
          </div>
          <span class="count-chip">{{ cartItemsCount }} elementos</span>
        </div>

        <div v-if="cartItemsCount > 0" class="cart-items-list">
          <CartItemCard
            v-for="item in cart"
            :key="item.cartId || item.id"
            :item="item"
            @remove="removeFromCart"
            @decrease="decreaseQuantity"
            @increase="increaseQuantity"
            @update-quantity="updateQuantity"
          />
        </div>

        <div v-else class="cart-empty">
          <div class="cart-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 4h2l2.2 10.2a1 1 0 0 0 .98.8H17a1 1 0 0 0 .97-.76L20 7H7" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="10" cy="19" r="1.6" fill="#9ca3af"/>
              <circle cx="17" cy="19" r="1.6" fill="#9ca3af"/>
            </svg>
          </div>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega un paquete o arma uno personalizado para empezar.</p>
          <div class="cart-empty-actions">
            <button class="action-btn action-btn--primary" type="button" @click="goHome">
              Ver planes
            </button>
            <button class="action-btn action-btn--ghost" type="button" @click="goCustom">
              Personalizar
            </button>
          </div>
        </div>
      </GlassCard>
    </div>

    <div class="cart-sidebar">
      <CartPanel
        :cart="cart"
        :subtotal="subtotal"
        :discount-percentage="discountPercentage"
        :discount-amount="discountAmount"
        :total="total"
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
import GlassCard from "@/components/GlassCard.vue";
import CartPanel from "@/components/CartPanel.vue";
import CartItemCard from "@/components/CartItemCard.vue";

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

const goHome = () => router.push("/");
const goCustom = () => router.push("/social-categories");
</script>

<style scoped>
.cart-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 380px;
  gap: var(--space-5, 20px);
  align-items: start;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-4, 16px);
  margin-bottom: var(--space-5, 20px);
}

.cart-header h2 {
  margin: 0;
  font-size: var(--text-2xl, 1.5rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-text, #111827);
}

.cart-subtitle {
  margin: var(--space-1, 4px) 0 0;
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  border: 1px solid var(--color-border, #e5e7eb);
  padding: 8px 16px;
  border-radius: var(--radius-md, 12px);
  background: var(--color-surface, #fff);
  color: var(--color-text, #111827);
  font-weight: var(--font-medium, 500);
  font-size: var(--text-sm, 0.875rem);
  margin-bottom: var(--space-3, 12px);
  transition: background var(--transition-fast, 150ms ease);
}

.back-btn:hover {
  background: var(--color-surface-alt, #f3f4f6);
}

.count-chip {
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
  flex-shrink: 0;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4, 16px);
}

/* Empty state */
.cart-empty {
  text-align: center;
  padding: var(--space-12, 48px) var(--space-6, 24px);
}

.cart-empty-icon {
  margin-bottom: var(--space-4, 16px);
}

.cart-empty h3 {
  margin: 0 0 var(--space-2, 8px);
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-semibold, 600);
  color: var(--color-text, #111827);
}

.cart-empty p {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
}

.cart-empty-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-3, 12px);
  margin-top: var(--space-5, 20px);
  flex-wrap: wrap;
}

.action-btn {
  height: 42px;
  padding: 0 20px;
  border-radius: var(--radius-md, 12px);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
  border: none;
  transition: all var(--transition-fast, 150ms ease);
}

.action-btn--primary {
  background: var(--color-primary, #2563eb);
  color: #fff;
}

.action-btn--primary:hover {
  background: var(--color-primary-hover, #1d4ed8);
}

.action-btn--ghost {
  background: var(--color-surface, #fff);
  color: var(--color-text, #111827);
  border: 1px solid var(--color-border, #e5e7eb);
}

.action-btn--ghost:hover {
  background: var(--color-surface-alt, #f3f4f6);
}

.cart-sidebar {
  width: 380px;
  min-width: 0;
}

@media (max-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .cart-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }

  .cart-empty-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}
</style>
