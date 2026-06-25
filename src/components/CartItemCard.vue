<template>
  <article class="cart-item-card">
    <template v-if="item.cartType === 'plan'">
      <div class="cart-item-top">
        <div class="cart-item-info">
          <div class="cart-item-chips">
            <span class="chip chip--accent">Paquete</span>
            <span class="chip chip--muted">
              {{ item.planItems?.length || 0 }} servicios
            </span>
          </div>
          <h3 class="cart-item-title">{{ item.name }}</h3>
          <p class="cart-item-sub">
            Plan listo para pedir con todos sus servicios incluidos.
          </p>
        </div>

        <div class="cart-item-side">
          <strong class="cart-item-price">
            ${{ formatPrice(getItemTotal(item)) }}
          </strong>
          <button
            class="cart-item-remove"
            type="button"
            @click="$emit('remove', item.cartId)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Quitar
          </button>
        </div>
      </div>

      <ul class="cart-plan-list">
        <li
          v-for="planItem in item.planItems || []"
          :key="`${item.cartId}-${planItem.id}`"
          class="cart-plan-row"
        >
          <div class="cart-plan-row-left">
            <BasePlatformPill :category="planItem.category" />
            <span class="cart-plan-row-name">{{ planItem.name }}</span>
          </div>
          <span class="cart-plan-row-qty">{{ planItem.quantity }}</span>
        </li>
      </ul>
    </template>

    <template v-else>
      <div class="cart-item-top">
        <div class="cart-item-info">
          <div class="cart-item-chips">
            <BasePlatformPill :category="item.category" />
            <span class="chip chip--muted">Servicio</span>
          </div>
          <h3 class="cart-item-title">{{ item.name }}</h3>
          <p v-if="item.profile" class="cart-item-profile">{{ item.profile }}</p>
          <p class="cart-item-sub">
            ${{ formatPrice(item.price) }} / {{ item.unitBase || 100 }} · {{ item.quantity }} unidades
          </p>
        </div>

        <div class="cart-item-side">
          <strong class="cart-item-price">
            ${{ formatPrice(getItemTotal(item)) }}
          </strong>
          <button
            class="cart-item-remove"
            type="button"
            @click="$emit('remove', item.cartId)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Quitar
          </button>
        </div>
      </div>

      <div class="cart-item-controls">
        <button
          class="qty-btn"
          type="button"
          @click="$emit('decrease', item.cartId)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <input
          class="qty-input"
          :value="item.quantity"
          type="number"
          min="100"
          step="100"
          @change="$emit('update-quantity', item.cartId, $event.target.value)"
        />

        <button
          class="qty-btn"
          type="button"
          @click="$emit('increase', item.cartId)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </template>
  </article>
</template>

<script setup>
import BasePlatformPill from "@/components/BasePlatformPill.vue";
import { formatPrice } from "@/utils/format";
import { useCart } from "@/composables/useCart";

const { getItemTotal } = useCart();

defineProps({
  item: { type: Object, required: true },
});

defineEmits(["remove", "decrease", "increase", "update-quantity"]);
</script>

<style scoped>
.cart-item-card {
  border-radius: var(--radius-lg, 16px);
  padding: var(--space-5, 20px);
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
}

.cart-item-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4, 16px);
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2, 8px);
  margin-bottom: var(--space-2, 8px);
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: var(--radius-full, 9999px);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
}

.chip--accent {
  background: var(--color-accent-soft, rgba(124,58,237,0.08));
  color: var(--color-accent, #7c3aed);
}

.chip--muted {
  background: var(--color-surface-alt, #f3f4f6);
  color: var(--color-text-secondary, #6b7280);
}

.cart-item-title {
  margin: 0 0 4px;
  font-size: var(--text-lg, 1.125rem);
  font-weight: var(--font-semibold, 600);
  color: var(--color-text, #111827);
  line-height: 1.3;
}

.cart-item-sub {
  margin: 0;
  color: var(--color-text-muted, #9ca3af);
  font-size: var(--text-sm, 0.875rem);
}

.cart-item-profile {
  margin: 0 0 4px;
  color: var(--color-primary, #2563eb);
  font-size: var(--text-sm, 0.875rem);
  word-break: break-all;
}

.cart-item-side {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2, 8px);
}

.cart-item-price {
  font-size: var(--text-lg, 1.125rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-text, #111827);
  white-space: nowrap;
}

.cart-item-remove {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--color-danger, #dc2626);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-medium, 500);
  padding: 0;
}

.cart-item-remove:hover {
  opacity: 0.8;
}

/* Plan items list */
.cart-plan-list {
  list-style: none;
  margin: var(--space-4, 16px) 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 8px);
}

.cart-plan-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3, 12px);
  padding: var(--space-2, 8px) var(--space-3, 12px);
  border-radius: var(--radius-md, 12px);
  background: var(--color-surface-alt, #f3f4f6);
}

.cart-plan-row-left {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  min-width: 0;
  flex-wrap: wrap;
}

.cart-plan-row-name {
  color: var(--color-text, #111827);
  font-weight: var(--font-medium, 500);
  font-size: var(--text-sm, 0.875rem);
}

.cart-plan-row-qty {
  color: var(--color-primary, #2563eb);
  font-weight: var(--font-bold, 700);
  flex-shrink: 0;
  font-size: var(--text-sm, 0.875rem);
}

/* Quantity controls */
.cart-item-controls {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  margin-top: var(--space-4, 16px);
}

.qty-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-md, 12px);
  background: var(--color-surface, #fff);
  color: var(--color-text, #111827);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background var(--transition-fast, 150ms ease);
}

.qty-btn:hover {
  background: var(--color-surface-alt, #f3f4f6);
}

.qty-input {
  width: 100px;
  height: 36px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-md, 12px);
  padding: 0 var(--space-3, 12px);
  background: var(--color-surface, #fff);
  color: var(--color-text, #111827);
  font-weight: var(--font-medium, 500);
  text-align: center;
}

.qty-input:focus {
  border-color: var(--color-primary, #2563eb);
  box-shadow: 0 0 0 3px var(--color-primary-soft, rgba(37,99,235,0.08));
}

/* Responsive */
@media (max-width: 768px) {
  .cart-item-top {
    flex-direction: column;
  }

  .cart-item-side {
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .cart-plan-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .cart-item-card {
    padding: var(--space-4, 16px);
  }

  .qty-input {
    flex: 1;
    width: auto;
    min-width: 0;
  }
}
</style>
