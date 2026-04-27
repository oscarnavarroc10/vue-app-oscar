<template>
  <article
    class="package-card"
    :class="{ 'package-card--deal': hasDiscount }"
  >
    <div class="card-shine"></div>
    <div class="card-orb card-orb--one"></div>
    <div class="card-orb card-orb--two"></div>
    <div class="card-grid"></div>

    <header class="package-header">
      <div class="package-top">
        <span class="package-badge">
          {{ displayBadge }}
        </span>

        <span v-if="hasDiscount" class="deal-badge">
          Ahorra ${{ formatNumber(savingsAmount) }}
        </span>
      </div>

      <div class="package-title-block">
        <h3 class="package-title">
          {{ cleanName }}
        </h3>

        <span v-if="hasDiscount" class="limited-label">
          Promo activa hoy
        </span>
      </div>

      <p class="package-description" v-html="formattedDescription"></p>

      <div class="price-panel">
        <div class="price-copy">
          <span v-if="hasDiscount" class="old-price">
            Antes ${{ formatNumber(plan.oldPrice) }} MXN
          </span>

          <span v-else class="price-kicker">
            Precio del paquete
          </span>

          <div class="price-line">
            <span class="price-currency">$</span>
            <strong>{{ formatNumber(plan.price) }}</strong>
            <small>MXN</small>
          </div>

          <span v-if="hasDiscount" class="today-price">
            Precio especial por tiempo limitado
          </span>
        </div>

        <div v-if="hasDiscount" class="discount-pill">
          <span>-{{ discountPercent }}%</span>
          <small>OFF</small>
        </div>
      </div>
    </header>

    <section class="package-includes">
      <div class="includes-header">
        <span>Incluye</span>
        <strong>{{ (props.resolvedItems || []).length }} servicios</strong>
      </div>

      <ul class="feature-list">
        <li
          v-for="item in props.resolvedItems || []"
          :key="item.id"
          class="feature-item"
        >
          <span class="feature-dot"></span>

          <span class="feature-text">
            <strong>{{ formatNumber(item.quantity) }}</strong>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </section>

    <footer class="package-footer">
      <button
        ref="chooseBtnRef"
        class="buy-btn buy-btn--whatsapp"
        type="button"
        @click="handlePrimaryAction"
      >
        <span class="whatsapp-icon" aria-hidden="true">☘</span>

        <span class="buy-btn-copy">
          <strong>Comprar por WhatsApp</strong>
          <small>Respuesta rápida</small>
        </span>

        <span class="buy-arrow">→</span>
      </button>

      <p class="secure-note">
        🔒 Sin contraseña · Activación segura
      </p>
    </footer>
  </article>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  plan: {
    type: Object,
    required: true,
  },
  resolvedItems: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["choose"]);
const chooseBtnRef = ref(null);

const WHATSAPP_NUMBER = "528122126718";

const formatNumber = (num) => {
  return new Intl.NumberFormat("es-MX").format(Number(num || 0));
};

const hasDiscount = computed(() => {
  return Number(props.plan.oldPrice || 0) > Number(props.plan.price || 0);
});

const savingsAmount = computed(() => {
  return Math.max(Number(props.plan.oldPrice || 0) - Number(props.plan.price || 0), 0);
});

const discountPercent = computed(() => {
  if (!hasDiscount.value) return 0;

  return Math.round((savingsAmount.value / Number(props.plan.oldPrice)) * 100);
});

const formattedDescription = computed(() => {
  return (props.plan.description || "")
    .replace(/💥/g, "•")
    .replace(/\n/g, "<br>");
});

const normalizedButtonText = computed(() => {
  return props.plan.buttonText?.trim() || "Comprar ahora";
});

const isWhatsAppAction = computed(() => {
  const text = normalizedButtonText.value.toLowerCase();
  return text.includes("whatsapp") || text.includes("whats");
});

const displayBadge = computed(() => {
  if (hasDiscount.value) return "PROMOCIÓN ACTIVA";
  if (props.plan.tag) return props.plan.tag.replace(/[🔥⭐🚀💎🏆]/g, "").trim();
  return "POPULAR";
});

const cleanName = computed(() => {
  return (props.plan.name || "")
    .replace(/[🟢🔵🟣🟠🏆🔥🚀💎📈👑⭐🥉]/g, "")
    .trim();
});

const buildWhatsAppMessage = () => {
  const includedItems = (props.resolvedItems || [])
    .map((item) => `• ${formatNumber(item.quantity)} ${item.name}`)
    .join("\n");

  const lines = [
    "Hola 👋",
    "",
    "Me interesa este paquete:",
    "",
    `📦 ${cleanName.value}`,
    props.plan.price ? `💸 $${formatNumber(props.plan.price)} MXN` : "",
    hasDiscount.value
      ? `🔥 Precio antes: $${formatNumber(props.plan.oldPrice)} MXN`
      : "",
    "",
    includedItems ? "Incluye:" : "",
    includedItems,
    "",
    "Quiero activarlo 🚀",
  ].filter(Boolean);

  return lines.join("\n");
};

const openWhatsAppCheckout = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(),
  )}`;

  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent,
    );

  if (isMobile) {
    window.location.href = url;
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
};

const handlePrimaryAction = () => {
  if (isWhatsAppAction.value) {
    openWhatsAppCheckout();
    return;
  }

  emit("choose", {
    plan: {
      ...props.plan,
      cartType: "plan",
      quantity: 1,
    },
    sourceEl: chooseBtnRef.value,
  });
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.package-card {
  zoom: 0.85;
  transform-origin: top center;
  position: relative;
  width: 100%;
  min-height: 510px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px;
  border-radius: 30px;
  background:
    radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.22), transparent 28%),
    radial-gradient(circle at 0% 100%, rgba(37, 99, 235, 0.18), transparent 32%),
    linear-gradient(180deg, rgba(14, 12, 32, 0.98), rgba(7, 8, 20, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 24px 58px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(18px);
  transition:
    transform .22s ease,
    box-shadow .22s ease,
    border-color .22s ease;
}

.package-card--deal {
  border-color: rgba(34, 197, 94, 0.28);
  box-shadow:
    0 28px 64px rgba(0, 0, 0, 0.36),
    0 0 0 1px rgba(34, 197, 94, 0.08),
    0 0 24px rgba(34, 197, 94, 0.12);
}

.package-card:hover {
  transform: translateY(-8px);
  border-color: rgba(168, 85, 247, 0.32);
  box-shadow:
    0 36px 74px rgba(0, 0, 0, 0.42),
    0 0 30px rgba(168, 85, 247, 0.12);
}

.card-shine,
.card-orb,
.card-grid {
  position: absolute;
  pointer-events: none;
}

.card-shine {
  inset: -30%;
  background: linear-gradient(
    115deg,
    transparent 35%,
    rgba(255, 255, 255, 0.05) 48%,
    transparent 58%
  );
  transform: rotate(12deg);
}

.card-orb {
  border-radius: 999px;
  filter: blur(60px);
  opacity: 0.34;
}

.card-orb--one {
  width: 180px;
  height: 180px;
  top: -70px;
  right: -60px;
  background: #8b5cf6;
}

.card-orb--two {
  width: 160px;
  height: 160px;
  left: -60px;
  bottom: -70px;
  background: #2563eb;
}

.card-grid {
  inset: 0;
  opacity: 0.035;
  background-image:
    linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px);
  background-size: 26px 26px;
}

.package-header,
.package-includes,
.package-footer {
  position: relative;
  z-index: 2;
}

.package-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.package-badge,
.deal-badge,
.limited-label {
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-size: .72rem;
  font-weight: 950;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.package-badge {
  color: #d8b4fe;
  background: rgba(168, 85, 247, 0.14);
  border: 1px solid rgba(168, 85, 247, 0.24);
}

.deal-badge {
  color: #dcfce7;
  background: rgba(34, 197, 94, 0.14);
  border: 1px solid rgba(34, 197, 94, 0.28);
}

.package-title-block {
  margin-top: 14px;
}

.package-title {
  margin: 0;
  color: #ffffff;
  font-size: 1.72rem;
  line-height: 1.02;
  letter-spacing: -0.055em;
  font-weight: 950;
}

.limited-label {
  margin-top: 10px;
  color: #fef3c7;
  background: rgba(245, 158, 11, 0.14);
  border: 1px solid rgba(245, 158, 11, 0.22);
}

.package-description {
  margin: 12px 0 0;
  color: #aab6ca;
  font-size: .92rem;
  line-height: 1.58;
  font-weight: 700;
}

.price-panel {
  margin-top: 18px;
  padding: 16px;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
  background:
    radial-gradient(circle at 100% 0%, rgba(34, 197, 94, 0.16), transparent 28%),
    linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.025));
  border: 1px solid rgba(255,255,255,.08);
}

.price-copy {
  display: grid;
  gap: 4px;
}

.old-price {
  color: #94a3b8;
  font-size: .82rem;
  font-weight: 900;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: #ef4444;
}

.price-kicker,
.today-price {
  color: #86efac;
  font-size: .76rem;
  font-weight: 900;
  letter-spacing: .02em;
}

.price-line {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-currency {
  color: #86efac;
  font-size: 1rem;
  font-weight: 950;
}

.price-line strong {
  color: #ffffff;
  font-size: 2.5rem;
  line-height: .9;
  letter-spacing: -0.06em;
  font-weight: 950;
}

.price-line small {
  color: #cbd5e1;
  font-size: .74rem;
  font-weight: 900;
}

.discount-pill {
  min-width: 74px;
  height: 74px;
  border-radius: 22px;
  display: grid;
  place-items: center;
  text-align: center;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #ffffff;
  box-shadow:
    0 18px 34px rgba(34, 197, 94, 0.26),
    inset 0 1px 0 rgba(255,255,255,.18);
}

.discount-pill span {
  display: block;
  font-size: 1.08rem;
  font-weight: 950;
  line-height: 1;
}

.discount-pill small {
  display: block;
  margin-top: 2px;
  font-size: .65rem;
  font-weight: 900;
  letter-spacing: .08em;
}

.package-includes {
  display: grid;
  gap: 12px;
  flex: 1;
}

.includes-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #94a3b8;
  font-size: .82rem;
  font-weight: 850;
}

.includes-header strong {
  color: #ffffff;
}

.feature-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.feature-item {
  min-height: 48px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background: rgba(255,255,255,.035);
  border: 1px solid rgba(255,255,255,.05);
}

.feature-dot {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #22c55e, #14b8a6);
  box-shadow: 0 0 14px rgba(34,197,94,.42);
}

.feature-text {
  color: #dbe3ef;
  font-size: .9rem;
  line-height: 1.35;
  font-weight: 750;
}

.feature-text strong {
  color: #ffffff;
  margin-right: 6px;
  font-weight: 950;
}

.package-footer {
  margin-top: auto;
}

.buy-btn {
  width: 100%;
  border: none;
  cursor: pointer;
  transition:
    transform .18s ease,
    box-shadow .18s ease,
    filter .18s ease;
}

.buy-btn--whatsapp {
  min-height: 62px;
  padding: 0 16px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 38px 1fr auto;
  align-items: center;
  gap: 12px;
  background:
    radial-gradient(circle at 20% 0%, rgba(255,255,255,.22), transparent 35%),
    linear-gradient(135deg, #25d366, #16a34a);
  color: #ffffff;
  box-shadow:
    0 22px 42px rgba(37, 211, 102, 0.28),
    inset 0 1px 0 rgba(255,255,255,.18);
}

.buy-btn:hover {
  transform: translateY(-3px);
  filter: brightness(1.03);
}

.whatsapp-icon {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,.14);
  font-size: 1.15rem;
}

.buy-btn-copy {
  display: grid;
  text-align: left;
}

.buy-btn-copy strong {
  font-size: .95rem;
  line-height: 1.1;
  font-weight: 950;
}

.buy-btn-copy small {
  margin-top: 2px;
  color: rgba(255,255,255,.86);
  font-size: .72rem;
  font-weight: 700;
}

.buy-arrow {
  font-size: 1.15rem;
  font-weight: 950;
}

.secure-note {
  margin: 10px 2px 0;
  text-align: center;
  color: #94a3b8;
  font-size: .74rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .package-card {
    zoom: 0.85;
    min-height: auto;
    padding: 18px;
    border-radius: 24px;
  }

  .package-title {
    font-size: 1.46rem;
  }

  .price-line strong {
    font-size: 2.08rem;
  }

  .discount-pill {
    min-width: 64px;
    height: 64px;
    border-radius: 18px;
  }

  .buy-btn--whatsapp {
    min-height: 58px;
    border-radius: 18px;
    grid-template-columns: 34px 1fr auto;
  }

  .whatsapp-icon {
    width: 34px;
    height: 34px;
  }
}
</style>