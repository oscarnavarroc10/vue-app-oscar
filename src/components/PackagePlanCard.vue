<template>
  <article class="package-card">
    <div class="card-glow"></div>
    <div class="card-grid"></div>

    <div class="package-card-header">
      <div class="package-card-topbar">
        <div class="mini-badge">
          {{ displayBadge }}
        </div>

        <div v-if="plan.price" class="price-badge">
          <span class="price-currency">$</span>
          <span class="price-value">{{ formatNumber(plan.price) }}</span>
          <span class="price-label">MXN</span>
        </div>
      </div>

      <h3>{{ plan.name }}</h3>

      <p v-html="formattedDescription"></p>
    </div>

    <ul class="package-list">
      <li
        v-for="item in props.resolvedItems || []"
        :key="item.id"
        class="package-item"
      >
        <span class="item-dot">✦</span>

        <span class="item-text">
          <strong>{{ formatNumber(item.quantity) }}</strong>
          {{ item.name }}
        </span>
      </li>
    </ul>

    <div class="package-footer">
      <button
        ref="chooseBtnRef"
        class="package-btn"
        type="button"
        @click="handlePrimaryAction"
      >
        <span class="package-btn-icon" aria-hidden="true">
          {{ isWhatsAppAction ? "💬" : "🛒" }}
        </span>
        <span>{{ normalizedButtonText }}</span>
      </button>
    </div>
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

const WHATSAPP_NUMBER = "529991519771";

const formatNumber = (num) => {
  return new Intl.NumberFormat("es-MX").format(Number(num || 0));
};

const formattedDescription = computed(() => {
  return props.plan.description?.replace(/\n/g, "<br>") || "";
});

const normalizedButtonText = computed(() => {
  return props.plan.buttonText?.trim() || "Comprar por WhatsApp";
});

const isWhatsAppAction = computed(() => {
  const text = normalizedButtonText.value.toLowerCase();
  return text.includes("whatsapp") || text.includes("whats");
});

const displayBadge = computed(() => {
  if (props.plan.tag) return props.plan.tag;
  if (props.plan.style) return props.plan.style;
  return "Promoción";
});

const buildWhatsAppMessage = () => {
  const includedItems = (props.resolvedItems || [])
    .map((item) => `• ${formatNumber(item.quantity)} ${item.name}`)
    .join("\n");

  const lines = [
    "Hola 👋",
    "",
    "Quiero comprar este paquete de Impulso Redes:",
    "",
    `📦 Paquete: ${props.plan.name}`,
    props.plan.price ? `💸 Precio: $${formatNumber(props.plan.price)} MXN` : "",
    includedItems ? "" : "",
    includedItems ? "✅ Incluye:" : "",
    includedItems || "",
    "",
    "¿Me compartes el siguiente paso para contratarlo? 🚀",
  ].filter(Boolean);

  return lines.join("\n");
};

const openWhatsAppCheckout = () => {
  const message = buildWhatsAppMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
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
  position: relative;
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border-radius: 26px;
  border: 1px solid rgba(96, 165, 250, 0.2);
  background:
    linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.96) 0%,
      rgba(17, 24, 39, 0.93) 100%
    );
  box-shadow:
    0 18px 36px rgba(2, 6, 23, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.package-card:hover {
  transform: translateY(-6px);
  border-color: rgba(96, 165, 250, 0.38);
  box-shadow:
    0 24px 48px rgba(2, 6, 23, 0.36),
    0 0 18px rgba(59, 130, 246, 0.16);
}

.card-glow,
.card-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.card-glow {
  background:
    radial-gradient(circle at 85% 8%, rgba(59, 130, 246, 0.16), transparent 18%),
    radial-gradient(circle at 12% 0%, rgba(168, 85, 247, 0.12), transparent 18%);
}

.card-grid {
  opacity: 0.04;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent 88%);
}

.package-card-header,
.package-list,
.package-footer {
  position: relative;
  z-index: 1;
}

.package-card-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.package-card-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.mini-badge {
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #93c5fd;
  background: rgba(59, 130, 246, 0.14);
  border: 1px solid rgba(59, 130, 246, 0.18);
}

.price-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  padding: 10px 14px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.2),
    rgba(59, 130, 246, 0.28)
  );
  border: 1px solid rgba(96, 165, 250, 0.24);
  box-shadow:
    0 10px 24px rgba(37, 99, 235, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  color: #ffffff;
  flex-shrink: 0;
}

.price-currency {
  font-size: 0.85rem;
  font-weight: 800;
  color: #93c5fd;
}

.price-value {
  font-size: 1.35rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #ffffff;
}

.price-label {
  font-size: 0.68rem;
  font-weight: 800;
  color: #cbd5e1;
  text-transform: uppercase;
}

.package-card-header h3 {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: #ffffff;
  font-weight: 900;
}

.package-card-header p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.55;
  font-weight: 600;
}

.package-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.package-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.item-dot {
  flex-shrink: 0;
  color: #60a5fa;
  font-size: 0.82rem;
}

.item-text {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.35;
}

.item-text strong {
  color: #ffffff;
  font-weight: 900;
  margin-right: 6px;
}

.package-footer {
  margin-top: auto;
  padding-top: 10px;
}

.package-btn {
  width: 100%;
  min-height: 50px;
  border: none;
  border-radius: 15px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(22, 163, 74, 0.22);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.package-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.03);
  box-shadow: 0 16px 28px rgba(22, 163, 74, 0.28);
}

.package-btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* TABLET */
@media (max-width: 900px) {
  .package-card {
    max-width: 100%;
    padding: 16px;
  }

  .package-card-header h3 {
    font-size: 1.18rem;
  }

  .package-card-header p {
    font-size: 0.86rem;
  }

  .item-text {
    font-size: 0.9rem;
  }

  .package-btn {
    min-height: 48px;
    font-size: 0.92rem;
  }
}

/* MOBILE */
@media (max-width: 700px) {
  .package-card {
    width: 86vw;
    min-width: 86vw;
    max-width: 86vw;
    padding: 15px;
    border-radius: 22px;
  }

  .package-card-topbar {
    gap: 10px;
  }

  .price-badge {
    padding: 8px 12px;
    border-radius: 14px;
  }

  .price-value {
    font-size: 1.08rem;
  }

  .price-label {
    font-size: 0.62rem;
  }

  .package-card-header h3 {
    font-size: 1.08rem;
  }

  .package-card-header p {
    font-size: 0.84rem;
    line-height: 1.45;
  }

  .package-item {
    padding: 9px 10px;
    border-radius: 12px;
  }

  .item-text {
    font-size: 0.86rem;
  }

  .package-btn {
    min-height: 46px;
    border-radius: 13px;
    font-size: 0.9rem;
  }
}

/* SMALL IPHONE */
@media (max-width: 480px) {
  .package-card {
    width: 88vw;
    min-width: 88vw;
    max-width: 88vw;
    padding: 14px;
  }

  .mini-badge {
    font-size: 0.68rem;
  }

  .price-badge {
    padding: 7px 10px;
    border-radius: 12px;
  }

  .price-currency {
    font-size: 0.72rem;
  }

  .price-value {
    font-size: 0.96rem;
  }

  .price-label {
    font-size: 0.56rem;
  }

  .package-card-header h3 {
    font-size: 1rem;
  }

  .package-card-header p {
    font-size: 0.8rem;
  }

  .item-text {
    font-size: 0.82rem;
  }

  .package-btn {
    font-size: 0.88rem;
  }
}
</style>