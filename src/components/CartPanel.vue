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
        class="summary-mini-card"
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
        Solicitar servicios
      </button>

      <p class="summary-note">
        Revisa los servicios del lado izquierdo y, cuando estés listo, envía tu
        solicitud por WhatsApp.
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

  const finalMessage = `Hola Emmanuel

Quiero solicitar lo(s) siguiente(s):

${servicesText}

Resumen:
- Seleccionados: ${props.cart.length}
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
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.close-cart-btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.08);
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

.summary-cards {
  display: grid;
  gap: 10px;
  margin-bottom: 18px;
}

.summary-mini-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.summary-note {
  margin: 6px 0 0;
  color: #94a3b8;
  line-height: 1.6;
  font-size: 0.9rem;
}

@media (max-width: 900px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-header-actions {
    align-items: flex-start;
  }
}
</style>