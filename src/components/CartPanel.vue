<template>
  <aside class="cart-panel">
    <div class="cart-bg cart-bg--one"></div>
    <div class="cart-bg cart-bg--two"></div>
    <div class="cart-grid"></div>

    <header class="cart-header">
      <div>
        <span class="cart-kicker">Resumen</span>
        <h2>Tu pedido</h2>
        <p>Revisa tus servicios antes de enviarlos por WhatsApp.</p>
      </div>

      <div class="cart-actions">
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
          Vaciar
        </button>
      </div>
    </header>

    <section class="cart-score">
      <div class="score-main">
        <span>Total estimado</span>
        <strong>${{ formatPrice(total) }}</strong>
        <small>MXN</small>
      </div>

      <div class="score-pill">
        {{ cart.length }} {{ cart.length === 1 ? "elemento" : "elementos" }}
      </div>
    </section>

    <section class="summary-cards">
      <article class="summary-mini-card">
        <span>Subtotal</span>
        <strong>${{ formatPrice(subtotal) }}</strong>
      </article>

      <article
        v-if="discountPercentage > 0"
        class="summary-mini-card summary-mini-card--discount"
      >
        <span>Descuento {{ discountPercentage }}%</span>
        <strong>- ${{ formatPrice(discountAmount) }}</strong>
      </article>

      <article class="summary-mini-card">
        <span>Total</span>
        <strong>${{ formatPrice(total) }}</strong>
      </article>
    </section>

    <section class="trust-box">
      <div>
        <span>⚡</span>
        <small>Entrega rápida</small>
      </div>

      <div>
        <span>🛡️</span>
        <small>Sin contraseña</small>
      </div>

      <div>
        <span>💬</span>
        <small>Seguimiento WA</small>
      </div>
    </section>

    <button
      class="quote-btn"
      :disabled="cart.length === 0"
      type="button"
      @click="sendWhatsApp"
    >
      <span>Solicitar por WhatsApp</span>
      <strong>→</strong>
    </button>

    <p class="summary-note">
      Te mandaremos seguimiento para confirmar enlaces, cantidades y disponibilidad
      del servicio.
    </p>
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
  const phone = "528122126718";

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

  const finalMessage = `Hola

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
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 22px;
  border-radius: 30px;
  background:
    radial-gradient(circle at 82% 12%, rgba(34, 197, 94, 0.16), transparent 28%),
    radial-gradient(circle at 10% 100%, rgba(124, 58, 237, 0.18), transparent 34%),
    linear-gradient(180deg, rgba(15, 12, 34, 0.92), rgba(7, 9, 22, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.065);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.cart-bg,
.cart-grid {
  position: absolute;
  pointer-events: none;
  z-index: -1;
}

.cart-bg {
  border-radius: 999px;
  filter: blur(42px);
}

.cart-bg--one {
  width: 180px;
  height: 180px;
  right: -70px;
  top: -70px;
  background: rgba(34, 197, 94, 0.32);
}

.cart-bg--two {
  width: 160px;
  height: 160px;
  left: -70px;
  bottom: -80px;
  background: rgba(139, 92, 246, 0.28);
}

.cart-grid {
  inset: 0;
  opacity: 0.045;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, black, transparent 82%);
}

.cart-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
}

.cart-kicker {
  display: inline-flex;
  margin-bottom: 8px;
  color: #86efac;
  font-size: 0.76rem;
  font-weight: 950;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.cart-header h2 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 2.7rem);
  line-height: 0.95;
  letter-spacing: -0.055em;
  font-weight: 950;
}

.cart-header p {
  max-width: 300px;
  margin: 10px 0 0;
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.45;
  font-weight: 650;
}

.cart-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.close-cart-btn,
.clear-cart-btn {
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-weight: 950;
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    background 0.18s ease;
}

.close-cart-btn:hover,
.clear-cart-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
}

.close-cart-btn {
  width: 42px;
  height: 42px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.065);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

.clear-cart-btn {
  min-height: 42px;
  padding: 0 14px;
  border-radius: 15px;
  color: #fca5a5;
  background: rgba(127, 29, 29, 0.16);
  border: 1px solid rgba(248, 113, 113, 0.16);
}

.cart-score {
  position: relative;
  overflow: hidden;
  margin-bottom: 14px;
  padding: 18px;
  border-radius: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 14px;
  background:
    radial-gradient(circle at 100% 0%, rgba(34, 197, 94, 0.18), transparent 32%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.035));
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.score-main span {
  display: block;
  color: #94a3b8;
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.score-main strong {
  display: inline-block;
  margin-top: 8px;
  color: #ffffff;
  font-size: 2.15rem;
  line-height: 1;
  letter-spacing: -0.05em;
  font-weight: 950;
}

.score-main small {
  margin-left: 6px;
  color: #cbd5e1;
  font-weight: 850;
}

.score-pill {
  min-height: 36px;
  padding: 0 13px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  color: #bbf7d0;
  font-size: 0.82rem;
  font-weight: 950;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.16);
}

.summary-cards {
  display: grid;
  gap: 9px;
  margin-bottom: 14px;
}

.summary-mini-card {
  min-height: 54px;
  padding: 0 15px;
  border-radius: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.summary-mini-card span {
  color: #94a3b8;
  font-weight: 800;
}

.summary-mini-card strong {
  color: #ffffff;
  font-weight: 950;
}

.summary-mini-card--discount strong {
  color: #86efac;
}

.trust-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  margin: 14px 0;
}

.trust-box div {
  min-height: 78px;
  padding: 12px 10px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.055);
}

.trust-box span {
  font-size: 1.25rem;
}

.trust-box small {
  color: #e5e7eb;
  font-size: 0.72rem;
  line-height: 1.2;
  font-weight: 800;
}

.quote-btn {
  width: 100%;
  min-height: 56px;
  border: none;
  border-radius: 18px;
  padding: 0 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 950;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow:
    0 20px 38px rgba(34, 197, 94, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

.quote-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow:
    0 26px 48px rgba(34, 197, 94, 0.36),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.quote-btn:disabled {
  opacity: 0.52;
  cursor: not-allowed;
}

.quote-btn strong {
  font-size: 1.1rem;
}

.summary-note {
  margin: 14px 0 0;
  color: #94a3b8;
  font-size: 0.85rem;
  line-height: 1.55;
}

@media (max-width: 900px) {
  .cart-panel {
    padding: 18px;
    border-radius: 26px;
  }

  .cart-header {
    flex-direction: column;
  }

  .cart-actions {
    width: 100%;
  }

  .clear-cart-btn {
    flex: 1;
  }
}

@media (max-width: 520px) {
  .cart-panel {
    padding: 16px;
    border-radius: 24px;
  }

  .cart-score {
    flex-direction: column;
    align-items: flex-start;
  }

  .score-main strong {
    font-size: 1.9rem;
  }

  .trust-box {
    grid-template-columns: 1fr;
  }

  .trust-box div {
    min-height: 54px;
    grid-template-columns: auto 1fr;
    justify-items: start;
    text-align: left;
  }

  .close-cart-btn,
  .clear-cart-btn {
    width: 100%;
  }

  .cart-actions {
    flex-direction: column;
  }
}
</style>