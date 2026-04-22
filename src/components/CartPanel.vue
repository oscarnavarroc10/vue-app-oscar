<template>
  <aside class="cart-panel">
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
          <span class="trash-icon">🗑️</span>
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
        Solicitar servicios por WhatsApp
      </button>

      <p class="summary-note">
        Revisa tus servicios y cuando estés listo, envíanos tu solicitud para darte seguimiento inmediato.
      </p>
    </div>
  </aside>
</template>

<script setup>
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
  const phone = "529991519771";

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

  const finalMessage = `Hola ImpulsoRedes

Quiero solicitar lo siguiente:

${servicesText}

Resumen:
- Seleccionados: ${props.cart.length}
- Total: $${props.formatPrice(props.total)} MXN`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;

  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

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

.close-cart-btn,
.clear-cart-btn {
  transition: all 0.2s ease;
}

.close-cart-btn {
  width: 40px;
  height: 40px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;

  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
}

.close-cart-btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.08);
}

.clear-cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  min-height: 42px;
  padding: 0 14px;

  border-radius: 12px;
  border: 1px solid rgba(248, 113, 113, 0.16);

  background: rgba(127, 29, 29, 0.14);
  color: #fca5a5;

  font-weight: 800;
  cursor: pointer;
}

.clear-cart-btn:hover {
  transform: translateY(-1px);
  background: rgba(127, 29, 29, 0.22);
}

.summary-cards {
  display: grid;
  gap: 10px;
  margin-bottom: 18px;
}

.summary-mini-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 12px;
  padding: 14px 16px;

  border-radius: 16px;

  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.summary-mini-card span {
  color: #94a3b8;
  font-weight: 700;
}

.summary-mini-card strong {
  color: #ffffff;
}

.summary-mini-card--discount strong {
  color: #86efac;
}

.summary {
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
  margin-top: 4px;
  padding-top: 8px;
  font-size: 1.2rem;
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

  min-height: 54px;
  padding: 0 18px;

  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;

  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #ffffff;

  box-shadow: 0 14px 26px rgba(34, 197, 94, 0.22);

  transition: all 0.18s ease;
}

.quote-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: brightness(1.03);
}

.quote-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.summary-note {
  margin: 6px 0 0;
  color: #94a3b8;
  line-height: 1.6;
  font-size: 0.9rem;
}

/* TABLET */
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

/* MOBILE */
@media (max-width: 600px) {
  .cart-panel {
    padding: 16px;
    border-radius: 22px;
  }

  .section-header h2 {
    font-size: 1.55rem;
  }

  .summary-mini-card {
    padding: 12px 14px;
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

/* SMALL PHONE */
@media (max-width: 420px) {
  .cart-panel {
    padding: 14px;
  }

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

  .summary-note {
    font-size: 0.84rem;
  }
}
</style>