<template>
  <header class="top-nav">
    <RouterLink class="brand" to="/" aria-label="Impulso Redes">
      <img :src="logoImpulso" alt="Impulso Redes Logo" class="brand-logo" />
    </RouterLink>

    <nav class="nav-links">
      <RouterLink to="/plans">Planes</RouterLink>
      <RouterLink to="/#comentarios">Comentarios</RouterLink>
      <RouterLink to="/faq">Preguntas</RouterLink>
      <RouterLink to="/#contacto">Contacto</RouterLink>
      <a
        class="nav-free-trial"
        :href="freeTrialWhatsAppUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        🎁 Prueba gratis
      </a>
    </nav>

    <div class="nav-actions">
      <RouterLink class="nav-cta nav-cta--secondary" to="/social-categories">
        Personalizar
      </RouterLink>

      <RouterLink
        ref="cartButtonRef"
        class="nav-cta nav-cta--cart"
        to="/cart"
        :class="{ 'nav-cta--cart-bump': isCartBumping }"
        data-cart-target="true"
      >
        <span class="nav-cart-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M3 4h2l2.2 10.2a1 1 0 0 0 .98.8H17a1 1 0 0 0 .97-.76L20 7H7"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="10" cy="19" r="1.6" fill="currentColor" />
            <circle cx="17" cy="19" r="1.6" fill="currentColor" />
          </svg>
        </span>

        <span>Carrito</span>

        <span v-if="cartItemsCount > 0" class="nav-cart-badge">
          {{ cartItemsCount }}
        </span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import logoImpulso from "@/assets/impulso_redes_logo.png";
import { useCart } from "@/composables/useCart";
import { FREE_TRIAL_PHONE, FREE_TRIAL_MESSAGE } from "@/config/constants";

const { cart } = useCart();

const cartItemsCount = computed(() => cart.value.length);

const cartButtonRef = ref(null);
const isCartBumping = ref(false);

watch(
  () => cartItemsCount.value,
  async (newValue, oldValue) => {
    if (oldValue === undefined) return;
    if (newValue === oldValue) return;

    isCartBumping.value = false;
    await nextTick();
    isCartBumping.value = true;

    setTimeout(() => {
      isCartBumping.value = false;
    }, 380);

    const el = cartButtonRef.value?.$el || cartButtonRef.value;
    if (el?.animate) {
      el.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.08)" },
          { transform: "scale(0.98)" },
          { transform: "scale(1)" },
        ],
        {
          duration: 320,
          easing: "ease",
        },
      );
    }
  },
);

const freeTrialWhatsAppUrl = `https://wa.me/${FREE_TRIAL_PHONE}?text=${encodeURIComponent(
  FREE_TRIAL_MESSAGE,
)}`;
</script>

<style scoped>
.top-nav {
  position: sticky;
  top: 12px;
  z-index: 30;
  max-width: 1400px;
  margin: 0 auto 18px;
  padding: 12px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 44px;
  min-width: 180px;
  overflow: visible;
}

.brand-logo {
  height: 44px;
  width: auto;
  display: block;
  object-fit: contain;
  transform: translateY(6px) scale(3.5);
  transform-origin: left center;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  flex: 1;
  flex-wrap: wrap;
}

.nav-links a {
  color: var(--color-text-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  transition: color var(--transition-base);
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--color-accent);
}

.nav-free-trial {
  padding: 6px 12px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  transition: transform var(--transition-fast);
}

.nav-free-trial:hover {
  transform: scale(1.05);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.nav-cta {
  position: relative;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  transition: all var(--transition-base);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.nav-cta--secondary {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.nav-cta--secondary:hover {
  background: var(--color-surface-subtle);
  border-color: var(--color-accent);
}

.nav-cta--cart {
  background: var(--color-accent);
  color: white;
  border: none;
}

.nav-cta--cart:hover {
  background: var(--color-accent-hover);
  transform: scale(1.02);
}

.nav-cart-icon {
  display: inline-flex;
  width: 18px;
  height: 18px;
}

.nav-cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: var(--radius-full);
  background: var(--color-success);
  color: white;
  font-size: 11px;
  font-weight: var(--font-bold);
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes cart-bump {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.nav-cta--cart-bump {
  animation: cart-bump 0.38s ease;
}

@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }
}

@media (max-width: 768px) {
  .top-nav {
    padding: 10px 16px;
    gap: 12px;
  }

  .brand {
    min-width: 150px;
  }

  .nav-cta {
    padding: 6px 12px;
    font-size: var(--text-xs);
  }

  .nav-cta span:not(.nav-cart-icon):not(.nav-cart-badge) {
    display: none;
  }
}
</style>
