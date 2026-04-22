<template>
  <div class="background-layer"></div>
  <div class="background-fade"></div>

  <main class="page">
    <header class="top-nav">
      <RouterLink class="brand" to="/" aria-label="Impulso Redes">
        <img
          :src="logoImpulso"
          alt="Impulso Redes Logo"
          class="brand-logo"
        />
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
        <RouterLink
          class="nav-cta nav-cta--secondary"
          to="/social-categories"
        >
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

    <section id="top" class="top-spacer"></section>

    <RouterView />

    <div class="floating-socials-wrap">
      <FloatingSocials />
    </div>
  </main>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import logoImpulso from "@/assets/impulso_redes_logo.png";
import FloatingSocials from "@/components/FloatingSocials.vue";
import { useCart } from "@/composables/useCart";

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

const freeTrialPhone = "529992649728";

const freeTrialMessage =
  "Hola, vi su página y me interesa solicitar una prueba gratis para conocer el servicio.";

const freeTrialWhatsAppUrl = `https://wa.me/${freeTrialPhone}?text=${encodeURIComponent(
  freeTrialMessage
)}`;
</script>

<style scoped>
* {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
}

:global(a) {
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.nav-links a {
  text-decoration: none;
}

.nav-free-trial {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.95rem;
  color: #ffffff;
  background: linear-gradient(135deg, #16a34a, #22c55e);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 10px 24px rgba(34, 197, 94, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
  white-space: nowrap;
}

.nav-free-trial:hover {
  transform: translateY(-2px);
  filter: brightness(1.04);
  box-shadow:
    0 14px 28px rgba(34, 197, 94, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.nav-free-trial:active {
  transform: translateY(0);
}

.nav-links a:not(.nav-free-trial) {
  color: rgba(255, 255, 255, 0.88);
  font-weight: 700;
  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.nav-links a:not(.nav-free-trial):hover {
  color: #ffffff;
  transform: translateY(-1px);
}

.background-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: url("./assets/background.png") center top / cover no-repeat;
}

.background-fade {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    to bottom,
    rgba(3, 7, 18, 0.14) 0%,
    rgba(3, 7, 18, 0.3) 22%,
    rgba(3, 7, 18, 0.6) 46%,
    rgba(15, 23, 42, 0.96) 100%
  );
}

.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 18px 28px 56px;
  font-family:
    Inter,
    system-ui,
    sans-serif;
}

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
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    180deg,
    rgba(7, 12, 24, 0.82) 0%,
    rgba(7, 12, 24, 0.72) 100%
  );
  box-shadow:
    0 18px 36px rgba(2, 6, 23, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 42px;
  overflow: visible;
}

.brand-logo {
  height: 42px;
  width: auto;
  display: block;
  object-fit: contain;
  transform: scale(2.15);
  transform-origin: left center;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  flex: 1;
}

.nav-links a {
  color: #e2e8f0;
  font-weight: 800;
  font-size: 1rem;
  transition:
    color 0.18s ease,
    opacity 0.18s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #ffffff;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.nav-cta {
  flex-shrink: 0;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 0.95rem;
  border: none;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  box-shadow: 0 12px 24px rgba(99, 102, 241, 0.22);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.nav-cta:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
  box-shadow: 0 16px 28px rgba(99, 102, 241, 0.26);
}

.nav-cta--secondary {
  background: rgba(255, 255, 255, 0.06);
  box-shadow:
    0 12px 24px rgba(2, 6, 23, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-cta--cart {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.nav-cta--cart-bump {
  animation: cart-bump 0.35s ease;
}

@keyframes cart-bump {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.08);
  }
  70% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}

.nav-cart-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
}

.nav-cart-icon svg {
  width: 18px;
  height: 18px;
  display: block;
}

.nav-cart-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1;
}

.top-spacer {
  height: 4px;
}

.floating-socials-wrap {
  position: relative;
  z-index: 12;
}

@media (max-width: 900px) {
  .nav-links {
    gap: 12px;
  }

  .nav-free-trial {
    min-height: 38px;
    padding: 0 14px;
    font-size: 0.88rem;
  }
}

@media (max-width: 900px) {
  .page {
    padding: 14px 16px 76px;
  }

  .top-nav {
    padding: 16px;
    border-radius: 22px;
    gap: 14px;
  }

.brand {
  height: 38px;
}

.brand-logo {
  height: 38px;
  transform: scale(2.2);
}

  .nav-links {
    gap: 14px;
  }

  .nav-actions {
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .top-nav {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    gap: 16px;
    margin-bottom: 14px;
  }

.brand {
  width: 100%;
  justify-content: center;
  height: 34px;
}

.brand-logo {
  height: 34px;
  transform: scale(2.35);
  transform-origin: center center;
}

  .nav-links {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 18px;
    justify-items: center;
  }

  .nav-links a {
    font-size: 0.95rem;
    text-align: center;
    line-height: 1.2;
  }

  .nav-actions {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .nav-cta {
    width: 100%;
    min-height: 46px;
    padding: 0 14px;
    font-size: 0.92rem;
  }

  .nav-cta--cart {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 10px 10px 76px;
  }

  .top-nav {
    padding: 14px 12px;
  }

.brand {
  height: 30px;
}

.brand-logo {
  height: 30px;
  transform: scale(2.45);
}

  .nav-links a {
    font-size: 0.9rem;
  }

  .nav-cta {
    min-height: 44px;
    font-size: 0.88rem;
  }

  .nav-cart-icon {
    width: 16px;
    height: 16px;
  }

  .nav-cart-icon svg {
    width: 16px;
    height: 16px;
  }
}
</style>