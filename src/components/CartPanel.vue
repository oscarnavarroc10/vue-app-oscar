<template>
  <aside class="cart-panel">
    <p class="cart-panel-offer">
      Agrega 2 o más servicios y obtén 10% de descuento
    </p>

    <div class="section-header">
      <div class="section-header-left">
        <span class="cart-kicker">Resumen</span>
        <h2>Tu pedido</h2>
      </div>

      <div class="cart-header-actions">
        <button
          class="close-cart-btn"
          type="button"
          @click="$emit('close-cart')"
          aria-label="Cerrar carrito"
          title="Cerrar carrito"
        >
          ✕
        </button>

        <button
          v-if="cart.length > 0"
          class="clear-cart-btn"
          type="button"
          @click="$emit('clear-cart')"
          aria-label="Vaciar carrito"
          title="Vaciar carrito"
        >
          <svg
            class="trash-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M9 3.75h6a1.5 1.5 0 0 1 1.5 1.5v.75H21a.75.75 0 0 1 0 1.5h-1.08l-.78 11.01A2.25 2.25 0 0 1 16.9 20.6H7.1a2.25 2.25 0 0 1-2.24-2.09L4.08 7.5H3a.75.75 0 0 1 0-1.5h4.5v-.75A1.5 1.5 0 0 1 9 3.75Zm6 2.25v-.75h-6V6h6Zm-8.42 1.5.77 10.9a.75.75 0 0 0 .75.7h9.8a.75.75 0 0 0 .75-.7l.77-10.9H6.58Zm3 2.25c.41 0 .75.34.75.75v5.25a.75.75 0 0 1-1.5 0V10.5c0-.41.34-.75.75-.75Zm4.84 0c.41 0 .75.34.75.75v5.25a.75.75 0 0 1-1.5 0V10.5c0-.41.34-.75.75-.75Z"
            />
          </svg>
          <span>Vaciar carrito</span>
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
        <strong>${{ formatPrice(subtotal) }}</strong>
      </div>

      <div
        v-if="discountPercentage > 0"
        class="summary-mini-card summary-mini-card--discount"
      >
        <span>Descuento</span>
        <strong>- ${{ formatPrice(discountAmount) }}</strong>
      </div>
    </div>

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
        📲 Solicitar servicios por WhatsApp
      </button>

      <p class="summary-note">
        Revisa tus servicios y cuando estés listo, envíanos tu solicitud para
        darte seguimiento inmediato.
      </p>
    </div>
  </aside>
</template>

<script setup>
import { WHATSAPP_NUMBER } from "@/config/constants.js";

const props = defineProps({
  cart: { type: Array, required: true },
  subtotal: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  discountAmount: { type: Number, required: true },
  total: { type: Number, required: true },
  formatPrice: { type: Function, required: true },
});

defineEmits(["clear-cart", "close-cart"]);

const sendWhatsApp = () => {
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

  const finalMessage = `Hola ImpulsoRedes

Quiero solicitar lo siguiente:

${servicesText}

Resumen:
- Seleccionados: ${props.cart.length}
- Total: $${props.formatPrice(props.total)} MXN`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;

  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped>
.cart-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-5);
  box-shadow: var(--shadow-md);
}

.cart-panel-offer {
  margin: 0 0 var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  color: var(--color-success);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  line-height: 1.5;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.section-header-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cart-kicker {
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: var(--font-extrabold);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.section-header h2 {
  margin: 0;
  font-size: var(--text-3xl);
  line-height: 1.05;
  color: var(--color-text-primary);
}

.cart-header-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
}

.close-cart-btn,
.clear-cart-btn,
.quote-btn {
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast),
    color var(--transition-fast);
}

.close-cart-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-subtle);
  color: var(--color-text-primary);
  font-size: 1rem;
  font-weight: var(--font-bold);
  cursor: pointer;
}

.close-cart-btn:hover {
  transform: translateY(-1px);
  background: var(--color-surface);
  border-color: var(--color-accent);
}

.clear-cart-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 42px;
  padding: 0 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-danger);
  font-weight: var(--font-bold);
  cursor: pointer;
}

.clear-cart-btn:hover {
  transform: translateY(-1px);
  background: var(--color-surface-subtle);
  border-color: var(--color-danger);
}

.trash-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  flex-shrink: 0;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.summary-mini-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
}

.summary-mini-card span {
  color: var(--color-text-secondary);
  font-weight: var(--font-semibold);
}

.summary-mini-card strong {
  color: var(--color-text-primary);
}

.summary-mini-card--discount {
  grid-column: 1 / -1;
}

.summary-mini-card--discount strong {
  color: var(--color-success);
}

.summary {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.summary-row strong {
  color: var(--color-text-primary);
}

.total-row {
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
}

.total-row strong {
  color: var(--color-text-primary);
  font-weight: var(--font-extrabold);
}

.quote-btn {
  margin-top: var(--space-2);
  border: 1px solid var(--color-success);
  border-radius: var(--radius-lg);
  min-height: 54px;
  padding: 0 18px;
  font-size: 1rem;
  font-weight: var(--font-extrabold);
  cursor: pointer;
  background: var(--color-success);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
}

.quote-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  background: var(--color-success-hover);
  border-color: var(--color-success-hover);
}

.quote-btn:disabled {
  background: var(--color-text-muted);
  border-color: var(--color-text-muted);
  opacity: 0.75;
  cursor: not-allowed;
}

.summary-note {
  margin: var(--space-1) 0 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: var(--text-sm);
}

@media (max-width: 900px) {
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }

  .cart-header-actions {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

@media (max-width: 600px) {
  .cart-panel {
    padding: var(--space-4);
    border-radius: var(--radius-xl);
  }

  .section-header h2 {
    font-size: var(--text-2xl);
  }

  .summary-cards {
    grid-template-columns: 1fr;
  }

  .summary-mini-card--discount {
    grid-column: auto;
  }

  .quote-btn {
    min-height: 50px;
    font-size: 0.95rem;
  }

  .clear-cart-btn {
    flex: 1;
    justify-content: center;
  }
}

@media (max-width: 420px) {
  .cart-header-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .close-cart-btn,
  .clear-cart-btn {
    width: 100%;
  }

  .summary-row,
  .summary-mini-card {
    font-size: 0.92rem;
  }

  .summary-note,
  .cart-panel-offer {
    font-size: 0.84rem;
  }
}
</style>
