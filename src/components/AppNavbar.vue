<template>
  <header class="app-navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-inner">
      <RouterLink class="brand" to="/" aria-label="Impulso Redes">
        <img
          :src="logoImpulso"
          alt="Impulso Redes Logo"
          class="brand-logo"
        />
      </RouterLink>

      <nav class="nav-links" :class="{ open: mobileMenuOpen }">
        <RouterLink to="/plans" @click="mobileMenuOpen = false">Planes</RouterLink>
        <RouterLink to="/#comentarios" @click="mobileMenuOpen = false">Comentarios</RouterLink>
        <RouterLink to="/#faq" @click="mobileMenuOpen = false">Preguntas</RouterLink>
        <RouterLink to="/#contacto" @click="mobileMenuOpen = false">Contacto</RouterLink>
        <a
          class="nav-free-trial"
          :href="freeTrialWhatsAppUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prueba gratis
        </a>
      </nav>

      <div class="nav-actions">
        <RouterLink class="nav-btn nav-btn--ghost" to="/social-categories">
          Personalizar
        </RouterLink>

        <RouterLink
          ref="cartButtonRef"
          class="nav-btn nav-btn--primary"
          to="/cart"
          :class="{ bumping: isCartBumping }"
          data-cart-target="true"
        >
          <svg class="nav-cart-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          <span>Carrito</span>
          <span v-if="cartItemsCount > 0" class="nav-cart-badge">
            {{ cartItemsCount }}
          </span>
        </RouterLink>

        <button
          class="mobile-toggle"
          type="button"
          aria-label="Abrir menú"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import logoImpulso from "@/assets/impulso_redes_logo.png";
import { WHATSAPP_NUMBER, FREE_TRIAL_MESSAGE } from "@/config/constants";

defineProps({
  cartItemsCount: { type: Number, default: 0 },
  isCartBumping: { type: Boolean, default: false },
});

const cartButtonRef = ref(null);
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

const freeTrialWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(FREE_TRIAL_MESSAGE)}`;

const onScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));

defineExpose({ cartButtonRef });
</script>

<style scoped>
.app-navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-nav, 100);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-base, 200ms ease),
              box-shadow var(--transition-base, 200ms ease);
}

.app-navbar.scrolled {
  border-bottom-color: var(--color-border, #e5e7eb);
  box-shadow: var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.04));
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6, 24px);
  height: 64px;
  display: flex;
  align-items: center;
  gap: var(--space-6, 24px);
}

.brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  height: 40px;
}

.brand-logo {
  height: 36px;
  width: auto;
  object-fit: contain;
  transform: scale(3.2);
  transform-origin: left center;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-6, 24px);
  flex: 1;
  justify-content: center;
}

.nav-links a {
  color: var(--color-text-secondary, #6b7280);
  font-weight: var(--font-medium, 500);
  font-size: var(--text-sm, 0.875rem);
  transition: color var(--transition-fast, 150ms ease);
  white-space: nowrap;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--color-text, #111827);
}

.nav-free-trial {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  font-weight: var(--font-semibold, 600) !important;
  font-size: var(--text-sm, 0.875rem) !important;
  color: var(--color-success, #16a34a) !important;
  background: var(--color-success-soft, rgba(22,163,74,0.08));
  transition: background var(--transition-fast, 150ms ease);
}

.nav-free-trial:hover {
  background: rgba(22, 163, 74, 0.14);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  flex-shrink: 0;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2, 8px);
  height: 38px;
  padding: 0 16px;
  border-radius: var(--radius-md, 12px);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
  transition: all var(--transition-fast, 150ms ease);
  white-space: nowrap;
  border: none;
  position: relative;
}

.nav-btn--ghost {
  color: var(--color-text-secondary, #6b7280);
  background: transparent;
  border: 1px solid var(--color-border, #e5e7eb);
}

.nav-btn--ghost:hover {
  background: var(--color-surface-alt, #f3f4f6);
  color: var(--color-text, #111827);
}

.nav-btn--primary {
  color: var(--color-primary-text, #fff);
  background: var(--color-primary, #2563eb);
}

.nav-btn--primary:hover {
  background: var(--color-primary-hover, #1d4ed8);
}

.nav-btn.bumping {
  animation: cart-bump 0.35s ease;
}

@keyframes cart-bump {
  0%   { transform: scale(1);    }
  35%  { transform: scale(1.06); }
  70%  { transform: scale(0.97); }
  100% { transform: scale(1);    }
}

.nav-cart-svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.nav-cart-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: var(--radius-full, 9999px);
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-bold, 700);
  line-height: 1;
}

.mobile-toggle {
  display: none;
  width: 38px;
  height: 38px;
  padding: 0;
  background: none;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-md, 12px);
  color: var(--color-text, #111827);
  align-items: center;
  justify-content: center;
}

.mobile-toggle svg {
  width: 20px;
  height: 20px;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .nav-links {
    gap: var(--space-4, 16px);
  }
}

@media (max-width: 768px) {
  .navbar-inner {
    height: 56px;
    padding: 0 var(--space-4, 16px);
  }

  .brand-logo {
    height: 30px;
    transform: scale(3.4);
  }

  .mobile-toggle {
    display: inline-flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--color-surface, #fff);
    border-bottom: 1px solid var(--color-border, #e5e7eb);
    padding: var(--space-4, 16px);
    gap: var(--space-3, 12px);
    box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
  }

  .nav-links.open {
    display: flex;
  }

  .nav-btn--ghost {
    display: none;
  }
}

@media (max-width: 480px) {
  .brand-logo {
    height: 26px;
    transform: scale(3.8);
  }

  .nav-btn span {
    display: none;
  }

  .nav-btn--primary {
    padding: 0 10px;
  }
}
</style>
