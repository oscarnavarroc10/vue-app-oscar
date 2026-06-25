<template>
  <article class="package-card">
    <div class="package-card-header">
      <div class="package-card-topbar">
        <div class="mini-badge">
          {{ displayBadge }}
        </div>

        <div v-if="plan.price" class="price-badge">
          <div class="price-main">
            <span class="price-currency">$</span>
            <span class="price-value">{{ formatNumber(plan.price) }}</span>
            <span class="price-label">MXN</span>
          </div>

          <span v-if="hasOldPrice" class="old-price">
            ${{ formatNumber(plan.oldPrice) }}
          </span>
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

      <form
        v-if="showProfilePrompt"
        class="profile-form"
        @submit.prevent="confirmSelection"
      >
        <label class="profile-label" :for="profileInputId">
          Perfil o URL (opcional)
        </label>
        <input
          :id="profileInputId"
          ref="profileInputRef"
          v-model.trim="profileValue"
          class="profile-input"
          type="text"
          placeholder="https://instagram.com/tu_perfil"
        />

        <div class="profile-actions">
          <button class="profile-action profile-action--confirm" type="submit">
            Confirmar
          </button>
          <button
            class="profile-action profile-action--cancel"
            type="button"
            @click="cancelSelection"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </article>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { formatNumber } from "@/utils/format.js";

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
const showProfilePrompt = ref(false);
const profileValue = ref("");
const profileInputRef = ref(null);

const WHATSAPP_NUMBER = "529991519771";

const profileInputId = computed(
  () => `plan-profile-url-${props.plan.id || props.plan.name}`,
);

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

const hasOldPrice = computed(() => {
  return Number(props.plan.oldPrice || 0) > Number(props.plan.price || 0);
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
      navigator.userAgent,
    );

  if (isMobile) {
    window.location.href = url;
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
};

const confirmSelection = () => {
  emit("choose", {
    plan: {
      ...props.plan,
      cartType: "plan",
      quantity: 1,
      profile: profileValue.value,
    },
    profile: profileValue.value,
    sourceEl: chooseBtnRef.value,
  });

  profileValue.value = "";
  showProfilePrompt.value = false;
};

const cancelSelection = () => {
  profileValue.value = "";
  showProfilePrompt.value = false;
};

const handlePrimaryAction = async () => {
  if (isWhatsAppAction.value) {
    openWhatsAppCheckout();
    return;
  }

  showProfilePrompt.value = true;
  await nextTick();
  profileInputRef.value?.focus();
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.package-card {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  font-family: var(--font-sans);
}

.package-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-lg);
}

.package-card-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.package-card-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
}

.mini-badge {
  width: fit-content;
  padding: 6px var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  letter-spacing: 0.02em;
  color: var(--color-accent);
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
}

.price-badge {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-2);
  padding: 10px 14px;
  border-radius: var(--radius-lg);
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.price-main {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
}

.price-currency {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--color-text-secondary);
}

.price-value {
  font-size: var(--text-xl);
  font-weight: var(--font-extrabold);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--color-text-primary);
}

.price-label {
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.old-price {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.package-card-header h3 {
  margin: 0;
  font-size: var(--text-2xl);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  font-weight: var(--font-extrabold);
}

.package-card-header p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
  font-weight: var(--font-medium);
}

.package-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
}

.package-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-border-subtle);
}

.item-dot {
  flex-shrink: 0;
  color: var(--color-success);
  font-size: var(--text-sm);
}

.item-text {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.4;
}

.item-text strong {
  color: var(--color-text-primary);
  font-weight: var(--font-bold);
  margin-right: 6px;
}

.package-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.package-btn,
.profile-action {
  min-height: 48px;
  border-radius: var(--radius-md);
  padding: 12px var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    background var(--transition-fast),
    border-color var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  cursor: pointer;
  font-family: var(--font-sans);
}

.package-btn {
  width: 100%;
  border: 1px solid var(--color-success);
  background: var(--color-success);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

.package-btn:hover,
.profile-action--confirm:hover {
  transform: translateY(-1px);
  background: var(--color-success-hover);
  border-color: var(--color-success-hover);
}

.package-btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-subtle);
}

.profile-label {
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
}

.profile-input {
  width: 100%;
  min-height: 44px;
  padding: 0 var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  font-family: var(--font-sans);
  outline: none;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.profile-input:focus {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
}

.profile-actions {
  display: flex;
  gap: var(--space-2);
}

.profile-action {
  flex: 1;
  border: 1px solid var(--color-border);
}

.profile-action--confirm {
  background: var(--color-success);
  border-color: var(--color-success);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);
}

.profile-action--cancel {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

.profile-action--cancel:hover {
  transform: translateY(-1px);
  background: var(--color-surface-subtle);
  border-color: var(--color-text-muted);
}

@media (max-width: 900px) {
  .package-card {
    max-width: 100%;
    padding: var(--space-4);
  }

  .package-card-header h3 {
    font-size: var(--text-xl);
  }
}

@media (max-width: 700px) {
  .package-card {
    width: 86vw;
    min-width: 86vw;
    max-width: 86vw;
    padding: 15px;
    border-radius: var(--radius-xl);
  }

  .price-badge {
    padding: 8px 12px;
  }

  .price-value {
    font-size: var(--text-lg);
  }

  .package-card-header h3 {
    font-size: var(--text-xl);
  }
}

@media (max-width: 480px) {
  .package-card {
    width: 88vw;
    min-width: 88vw;
    max-width: 88vw;
    padding: 14px;
  }

  .package-card-topbar,
  .profile-actions {
    flex-direction: column;
  }

  .mini-badge,
  .old-price,
  .price-label {
    font-size: var(--text-xs);
  }

  .package-card-header h3 {
    font-size: var(--text-lg);
  }
}
</style>
