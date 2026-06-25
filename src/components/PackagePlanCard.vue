<template>
  <article class="package-card">
    <div class="package-card-header">
      <div class="package-card-topbar">
        <span class="mini-badge">{{ displayBadge }}</span>

        <div v-if="plan.price" class="price-area">
          <span v-if="plan.oldPrice" class="old-price">
            ${{ formatNumber(plan.oldPrice) }}
          </span>
          <div class="price-badge">
            <span class="price-currency">$</span>
            <span class="price-value">{{ formatNumber(plan.price) }}</span>
            <span class="price-label">MXN</span>
          </div>
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
        <svg class="item-check" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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
        :class="{ 'package-btn--whatsapp': isWhatsAppAction }"
        type="button"
        @click="handlePrimaryAction"
      >
        <svg v-if="isWhatsAppAction" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
          <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>{{ normalizedButtonText }}</span>
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from "vue";
import { WHATSAPP_NUMBER } from "@/config/constants";
import { formatNumber } from "@/utils/format";

const props = defineProps({
  plan: { type: Object, required: true },
  resolvedItems: { type: Array, default: () => [] },
});

const emit = defineEmits(["choose"]);
const chooseBtnRef = ref(null);

const formattedDescription = computed(() =>
  props.plan.description?.replace(/\n/g, "<br>") || ""
);

const normalizedButtonText = computed(() =>
  props.plan.buttonText?.trim() || "Comprar por WhatsApp"
);

const isWhatsAppAction = computed(() => {
  const text = normalizedButtonText.value.toLowerCase();
  return text.includes("whatsapp") || text.includes("whats");
});

const displayBadge = computed(() =>
  props.plan.tag || props.plan.style || "Promoción"
);

const buildWhatsAppMessage = () => {
  const includedItems = (props.resolvedItems || [])
    .map((item) => `- ${formatNumber(item.quantity)} ${item.name}`)
    .join("\n");

  const lines = [
    "Hola",
    "",
    "Quiero comprar este paquete de Impulso Redes:",
    "",
    `Paquete: ${props.plan.name}`,
    props.plan.price ? `Precio: $${formatNumber(props.plan.price)} MXN` : "",
    includedItems ? "" : "",
    includedItems ? "Incluye:" : "",
    includedItems || "",
    "",
    "Me compartes el siguiente paso para contratarlo?",
  ].filter(Boolean);

  return lines.join("\n");
};

const openWhatsAppCheckout = () => {
  const message = buildWhatsAppMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
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
    plan: { ...props.plan, cartType: "plan", quantity: 1 },
    sourceEl: chooseBtnRef.value,
  });
};
</script>

<style scoped>
.package-card {
  position: relative;
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-3, 12px);
  padding: var(--space-5, 20px);
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e5e7eb);
  background: var(--color-surface, #fff);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
  transition: all var(--transition-fast, 150ms ease);
}

.package-card:hover {
  border-color: var(--color-border-strong, #d1d5db);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
  transform: translateY(-2px);
}

.package-card-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 8px);
}

.package-card-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3, 12px);
}

.mini-badge {
  padding: 4px 10px;
  border-radius: var(--radius-full, 9999px);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
  color: var(--color-primary, #2563eb);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
}

.price-area {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.old-price {
  font-size: var(--text-xs, 0.75rem);
  color: var(--color-text-muted, #9ca3af);
  text-decoration: line-through;
}

.price-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 3px;
  padding: 8px 12px;
  border-radius: var(--radius-md, 12px);
  background: var(--color-surface-alt, #f3f4f6);
  border: 1px solid var(--color-border, #e5e7eb);
  flex-shrink: 0;
}

.price-currency {
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-text-secondary, #6b7280);
}

.price-value {
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-extrabold, 800);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-text, #111827);
}

.price-label {
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
  color: var(--color-text-muted, #9ca3af);
  text-transform: uppercase;
}

.package-card-header h3 {
  margin: 0;
  font-size: var(--text-lg, 1.125rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-text, #111827);
  line-height: 1.2;
}

.package-card-header p {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
  line-height: 1.6;
}

.package-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 8px);
  flex: 1;
}

.package-item {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  padding: var(--space-2, 8px) var(--space-3, 12px);
  border-radius: var(--radius-sm, 8px);
  background: var(--color-surface-alt, #f9fafb);
  border: 1px solid var(--color-border-light, #f3f4f6);
}

.item-check {
  flex-shrink: 0;
  color: var(--color-success, #16a34a);
}

.item-text {
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
  line-height: 1.35;
}

.item-text strong {
  color: var(--color-text, #111827);
  font-weight: var(--font-bold, 700);
  margin-right: 4px;
}

.package-footer {
  margin-top: auto;
  padding-top: var(--space-2, 8px);
}

.package-btn {
  width: 100%;
  min-height: 46px;
  border: none;
  border-radius: var(--radius-md, 12px);
  padding: 12px 16px;
  background: var(--color-primary, #2563eb);
  color: #fff;
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
  cursor: pointer;
  transition: background var(--transition-fast, 150ms ease);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 8px);
}

.package-btn:hover {
  background: var(--color-primary-hover, #1d4ed8);
}

.package-btn--whatsapp {
  background: var(--color-success, #16a34a);
}

.package-btn--whatsapp:hover {
  background: #15803d;
}

@media (max-width: 768px) {
  .package-card {
    width: 85vw;
    min-width: 85vw;
    max-width: 85vw;
    padding: var(--space-4, 16px);
  }
}

@media (max-width: 480px) {
  .package-card {
    width: 88vw;
    min-width: 88vw;
    max-width: 88vw;
  }
}
</style>
