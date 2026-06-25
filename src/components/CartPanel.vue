<template>
  <aside class="cart-panel">
    <div class="panel-header">
      <div>
        <span class="cart-kicker">Resumen</span>
        <h2>Tu pedido</h2>
      </div>

      <div class="header-actions">
        <button
          class="icon-btn"
          type="button"
          @click="$emit('close-cart')"
          aria-label="Cerrar carrito"
          title="Cerrar carrito"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <button
          v-if="cart.length > 0"
          class="clear-btn"
          type="button"
          @click="$emit('clear-cart')"
          aria-label="Vaciar carrito"
          title="Vaciar carrito"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Vaciar</span>
        </button>
      </div>
    </div>

    <div class="summary-cards">
      <div class="summary-mini-card">
        <span>Elementos</span>
        <strong>{{ cart.length }}</strong>
      </div>
      <div class="summary-mini-card">
        <span>Subtotal</span>
        <strong>${{ formatPriceFn(subtotal) }}</strong>
      </div>
      <div v-if="discountPercentage > 0" class="summary-mini-card summary-mini-card--discount">
        <span>Descuento</span>
        <strong>- ${{ formatPriceFn(discountAmount) }}</strong>
      </div>
    </div>

    <div class="summary">
      <div class="summary-row">
        <span>Subtotal</span>
        <strong>${{ formatPriceFn(subtotal) }}</strong>
      </div>
      <div v-if="discountPercentage > 0" class="summary-row">
        <span>Descuento ({{ discountPercentage }}%)</span>
        <strong class="discount-value">- ${{ formatPriceFn(discountAmount) }}</strong>
      </div>
      <div class="summary-row total-row">
        <span>Total</span>
        <strong>${{ formatPriceFn(total) }}</strong>
      </div>

      <button
        class="quote-btn"
        :disabled="cart.length === 0"
        type="button"
        @click="sendWhatsApp"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Solicitar por WhatsApp
      </button>

      <p class="summary-note">
        Revisa tus servicios y cuando estés listo, envíanos tu solicitud para darte seguimiento inmediato.
      </p>
    </div>
  </aside>
</template>

<script setup>
import { WHATSAPP_NUMBER } from "@/config/constants";
import { formatPrice } from "@/utils/format";

const props = defineProps({
  cart: { type: Array, required: true },
  subtotal: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  discountAmount: { type: Number, required: true },
  total: { type: Number, required: true },
});

defineEmits(["clear-cart", "close-cart"]);

const formatPriceFn = (value) => formatPrice(value);

const sendWhatsApp = () => {
  const servicesText = props.cart
    .map((item, index) => {
      if (item.cartType === "plan") {
        const included = (item.planItems || [])
          .map((pi) => `   - ${pi.category}: ${pi.name} (${pi.quantity})`)
          .join("\n");
        return `${index + 1}. Paquete: ${item.name}\nIncluye:\n${included}`;
      }
      return `${index + 1}. Servicio: ${item.quantity} ${item.name} para ${item.category}\nPerfil: ${item.profile || "No especificado"}`;
    })
    .join("\n\n");

  const finalMessage = `Hola ImpulsoRedes\n\nQuiero solicitar lo siguiente:\n\n${servicesText}\n\nResumen:\n- Seleccionados: ${props.cart.length}\n- Total: $${formatPrice(props.total)} MXN`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped>
.cart-panel {
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-xl, 20px);
  padding: var(--space-5, 20px);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
  position: sticky;
  top: 88px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4, 16px);
  margin-bottom: var(--space-5, 20px);
}

.cart-kicker {
  color: var(--color-primary, #2563eb);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.panel-header h2 {
  margin: var(--space-1, 4px) 0 0;
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-text, #111827);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
}

.icon-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-sm, 8px);
  background: var(--color-surface, #fff);
  color: var(--color-text-secondary, #6b7280);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast, 150ms ease);
}

.icon-btn:hover {
  background: var(--color-surface-alt, #f3f4f6);
  color: var(--color-text, #111827);
}

.clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  border-radius: var(--radius-sm, 8px);
  border: 1px solid rgba(239,68,68,0.2);
  background: rgba(239,68,68,0.06);
  color: #dc2626;
  font-weight: var(--font-medium, 500);
  font-size: var(--text-sm, 0.875rem);
  cursor: pointer;
  transition: all var(--transition-fast, 150ms ease);
}

.clear-btn:hover {
  background: rgba(239,68,68,0.12);
}

.summary-cards {
  display: grid;
  gap: var(--space-2, 8px);
  margin-bottom: var(--space-4, 16px);
}

.summary-mini-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3, 12px);
  padding: var(--space-3, 12px) var(--space-4, 16px);
  border-radius: var(--radius-sm, 8px);
  background: var(--color-surface-alt, #f9fafb);
  border: 1px solid var(--color-border-light, #f3f4f6);
}

.summary-mini-card span {
  color: var(--color-text-secondary, #6b7280);
  font-weight: var(--font-medium, 500);
  font-size: var(--text-sm, 0.875rem);
}

.summary-mini-card strong {
  color: var(--color-text, #111827);
  font-weight: var(--font-semibold, 600);
}

.summary-mini-card--discount strong {
  color: var(--color-success, #16a34a);
}

.summary {
  border-top: 1px solid var(--color-border, #e5e7eb);
  padding-top: var(--space-4, 16px);
  display: flex;
  flex-direction: column;
  gap: var(--space-3, 12px);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
}

.summary-row strong {
  color: var(--color-text, #111827);
}

.discount-value {
  color: var(--color-success, #16a34a) !important;
}

.total-row {
  margin-top: var(--space-1, 4px);
  padding-top: var(--space-2, 8px);
  font-size: var(--text-lg, 1.125rem);
  border-top: 1px solid var(--color-border, #e5e7eb);
}

.total-row span,
.total-row strong {
  color: var(--color-text, #111827);
  font-weight: var(--font-bold, 700);
}

.quote-btn {
  margin-top: var(--space-2, 8px);
  border: none;
  border-radius: var(--radius-md, 12px);
  min-height: 48px;
  padding: 0 18px;
  font-size: var(--text-base, 1rem);
  font-weight: var(--font-semibold, 600);
  cursor: pointer;
  background: var(--color-success, #16a34a);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 8px);
  transition: background var(--transition-fast, 150ms ease);
}

.quote-btn:hover:not(:disabled) {
  background: #15803d;
}

.quote-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.summary-note {
  margin: var(--space-1, 4px) 0 0;
  color: var(--color-text-muted, #9ca3af);
  line-height: 1.6;
  font-size: var(--text-xs, 0.75rem);
}

@media (max-width: 768px) {
  .panel-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    justify-content: space-between;
  }
}
</style>
