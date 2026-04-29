<template>
  <div class="app-shell">
    <div
      class="background-layer"
      :style="{ '--bg-image': `url(${bgMain})` }"
    ></div>

    <div class="background-vignette"></div>
    <div class="background-noise"></div>
    <div class="background-grid"></div>
    <div class="background-glow background-glow--one"></div>
    <div class="background-glow background-glow--two"></div>

    <main class="page">
      <header class="top-nav">
        <RouterLink class="brand" to="/" aria-label="Inicio">
          <img :src="logoImpulso" alt="Logo" class="brand-logo" />
        </RouterLink>

        <nav
          class="nav-links"
          :class="{ 'nav-links--open': isMobileMenuOpen }"
          aria-label="Navegación principal"
        >
          <RouterLink to="/plans" @click="closeMenu">Planes</RouterLink>
          <RouterLink to="/#comentarios" @click="closeMenu">Comentarios</RouterLink>
          <RouterLink to="/faq" @click="closeMenu">Preguntas</RouterLink>
          <RouterLink to="/#contacto" @click="closeMenu">Contacto</RouterLink>
        </nav>

        <div class="nav-actions">
          <div class="lang-switch">
            <button type="button">ES</button>
            <span>/</span>
            <button type="button">EN</button>
          </div>

          <RouterLink
            ref="cartButtonRef"
            class="cart-button"
            to="/cart"
            :class="{ 'cart-button--bump': isCartBumping }"
            data-cart-target="true"
            aria-label="Ver carrito"
            @click="closeMenu"
          >
            <span class="cart-icon" aria-hidden="true">
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

            <span class="cart-text">Carrito</span>

            <span v-if="cartItemsCount > 0" class="cart-badge">
              {{ cartItemsCount }}
            </span>
          </RouterLink>

          <button
            class="mobile-menu-btn"
            type="button"
            @click="toggleMenu"
            aria-label="Abrir menú"
            :class="{ 'mobile-menu-btn--open': isMobileMenuOpen }"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <section id="top" class="top-spacer"></section>

      <RouterView />

      <div class="floating-socials-wrap">
        <FloatingSocials />
      </div>

      <IosInstallPrompt />
    </main>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";

import IosInstallPrompt from "@/components/IosInstallPrompt.vue";
import FloatingSocials from "@/components/FloatingSocials.vue";

import logoImpulso from "@/assets/impulso_redes_logo.png";
import bgMain from "@/assets/Background.png";

import { useCart } from "@/composables/useCart";

const { cart } = useCart();

const cartItemsCount = computed(() => cart.value.length);

const cartButtonRef = ref(null);
const isCartBumping = ref(false);
const isMobileMenuOpen = ref(false);

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

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
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
  background: #05030d;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  background: #05030d;
  color: #ffffff;
}

:global(a) {
  text-decoration: none;
}

.app-shell {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #05030d;
}

.background-layer,
.background-vignette,
.background-noise,
.background-grid,
.background-glow {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.background-layer {
  z-index: 0;
  background:
    linear-gradient(
      180deg,
      rgba(5, 3, 13, 0.58) 0%,
      rgba(5, 3, 13, 0.78) 45%,
      rgba(5, 3, 13, 0.92) 100%
    ),
    radial-gradient(
      circle at 18% 18%,
      rgba(99, 102, 241, 0.24),
      transparent 30%
    ),
    radial-gradient(
      circle at 82% 14%,
      rgba(236, 72, 153, 0.18),
      transparent 28%
    ),
    var(--bg-image);

  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  transform: scale(1.04);
  filter: saturate(1.08) contrast(1.03);
}

.background-vignette {
  z-index: 0;
  background:
    radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 0, 0, 0.22) 48%,
      rgba(0, 0, 0, 0.76) 100%
    );
}

.background-noise {
  z-index: 0;
  opacity: 0.035;
  mix-blend-mode: soft-light;
  background-image:
    repeating-radial-gradient(
      circle at 17% 32%,
      rgba(255, 255, 255, 0.5) 0 1px,
      transparent 1px 4px
    );
}

.background-grid {
  z-index: 0;
  opacity: 0.045;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(circle at center, black 0%, transparent 76%);
}

.background-glow {
  z-index: 0;
  width: 420px;
  height: 420px;
  border-radius: 999px;
  filter: blur(90px);
  opacity: 0.32;
}

.background-glow--one {
  top: 10%;
  left: -140px;
  background: #a855f7;
  animation: floatGlowOne 14s ease-in-out infinite;
}

.background-glow--two {
  right: -160px;
  bottom: 8%;
  background: #2563eb;
  animation: floatGlowTwo 16s ease-in-out infinite;
}

.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 18px 28px 56px;
  zoom: 0.85;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

/* HEADER */

.top-nav {
  position: sticky;
  top: 16px;
  z-index: 60;
  max-width: 1480px;
  min-height: 78px;
  margin: 0 auto 24px;
  padding: 12px 14px 12px 22px;
  display: grid;
  grid-template-columns: minmax(180px, auto) minmax(360px, 1fr) auto;
  align-items: center;
  gap: 18px;
  border-radius: 30px;
  background:
    radial-gradient(circle at 0% 50%, rgba(56, 189, 248, 0.16), transparent 30%),
    radial-gradient(circle at 100% 50%, rgba(236, 72, 153, 0.14), transparent 30%),
    linear-gradient(180deg, rgba(10, 9, 24, 0.86), rgba(6, 7, 18, 0.72));
  border: 1px solid rgba(255, 255, 255, 0.105);
  box-shadow:
    0 26px 64px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.075);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.top-nav::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(
    120deg,
    rgba(56, 189, 248, 0.58),
    rgba(139, 92, 246, 0.12),
    rgba(236, 72, 153, 0.48)
  );
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.top-nav::after {
  content: "";
  position: absolute;
  left: 42px;
  right: 42px;
  bottom: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(56, 189, 248, 0.85),
    rgba(168, 85, 247, 0.9),
    rgba(236, 72, 153, 0.85),
    transparent
  );
  opacity: 0.78;
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.7);
}

.brand {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.brand-logo {
  width: 150px;
  max-height: 64px;
  transform: scale(3.6);
  object-fit: contain;
  display: block;
  filter:
    drop-shadow(0 0 14px rgba(56, 189, 248, 0.18))
    drop-shadow(0 0 22px rgba(168, 85, 247, 0.08));
}

.nav-links {
  position: relative;
  z-index: 2;
  justify-self: center;
  min-height: 50px;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
  border: 1px solid rgba(255, 255, 255, 0.065);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.055),
    0 14px 30px rgba(0, 0, 0, 0.18);
}

.nav-links a {
  position: relative;
  min-height: 40px;
  padding: 0 18px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.88rem;
  font-weight: 950;
  letter-spacing: -0.01em;
  transition:
    color 0.18s ease,
    background 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #ffffff;
  transform: translateY(-1px);
  background:
    radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.2), transparent 58%),
    rgba(255, 255, 255, 0.075);
  box-shadow:
    0 10px 22px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.nav-links a.router-link-active::after {
  content: "";
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 5px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, #38bdf8, #a855f7, #ec4899);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.75);
}

.nav-actions {
  position: relative;
  z-index: 2;
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.lang-switch {
  min-height: 42px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.lang-switch button {
  border: none;
  cursor: pointer;
  color: #e5e7eb;
  background: transparent;
  font: inherit;
  font-size: 0.76rem;
  font-weight: 950;
}

.cart-button {
  position: relative;
  min-height: 52px;
  padding: 0 19px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 0.96rem;
  font-weight: 950;
  background:
    radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.22), transparent 32%),
    linear-gradient(135deg, #2563eb, #7c3aed 52%, #d946ef);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 18px 34px rgba(124, 58, 237, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

.cart-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.06);
  box-shadow:
    0 24px 44px rgba(124, 58, 237, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.cart-button--bump {
  animation: cart-bump 0.35s ease;
}

.cart-icon {
  width: 21px;
  height: 21px;
}

.cart-icon svg {
  width: 100%;
  height: 100%;
}

.cart-badge {
  position: absolute;
  top: -9px;
  right: -9px;
  min-width: 25px;
  height: 25px;
  padding: 0 7px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ec4899, #c084fc);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 950;
  box-shadow: 0 10px 22px rgba(236, 72, 153, 0.36);
}

.mobile-menu-btn {
  display: none;
}

.top-spacer {
  height: 4px;
}

.floating-socials-wrap {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 35;
}

/* ANIMATIONS */

@keyframes cart-bump {
  0% { transform: scale(1); }
  35% { transform: scale(1.08); }
  70% { transform: scale(0.98); }
  100% { transform: scale(1); }
}

@keyframes floatGlowOne {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(40px, 24px, 0) scale(1.08);
  }
}

@keyframes floatGlowTwo {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(-36px, -28px, 0) scale(1.1);
  }
}

/* TABLET / MOBILE */

@media (max-width: 980px) {
  .page {
    padding: 12px 12px 40px;
    zoom: 1;
  }

  .background-layer {
    background-position: center top;
    transform: scale(1.08);
    filter: saturate(1.03) contrast(1.02);
  }

  .background-noise {
    opacity: 0.03;
  }

  .background-glow {
    opacity: 0.24;
  }

  .top-nav {
    top: 10px;
    min-height: 66px;
    padding: 9px;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    border-radius: 24px;
  }

  .brand-logo {
    width: 116px;
    max-height: 50px;
  }

  .nav-actions {
    gap: 8px;
  }

  .lang-switch {
    display: none;
  }

  .cart-button {
    min-width: 48px;
    min-height: 48px;
    padding: 0 13px;
    justify-content: center;
    border-radius: 17px;
  }

  .cart-text {
    display: none;
  }

  .cart-icon {
    width: 21px;
    height: 21px;
  }

  .mobile-menu-btn {
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 17px;
    display: grid;
    place-items: center;
    gap: 4px;
    cursor: pointer;
    background:
      radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.16), transparent 60%),
      rgba(255, 255, 255, 0.065);
    border: 1px solid rgba(255, 255, 255, 0.075);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 12px 24px rgba(0, 0, 0, 0.2);
  }

  .mobile-menu-btn span {
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: #ffffff;
    transition: transform 0.18s ease, opacity 0.18s ease;
  }

  .mobile-menu-btn--open span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  .mobile-menu-btn--open span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-btn--open span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  .nav-links {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    z-index: 80;
    display: none;
    padding: 10px;
    border-radius: 22px;
    background:
      radial-gradient(circle at 10% 0%, rgba(56, 189, 248, 0.12), transparent 34%),
      radial-gradient(circle at 90% 0%, rgba(236, 72, 153, 0.12), transparent 34%),
      rgba(8, 8, 20, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.09);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow:
      0 24px 50px rgba(0, 0, 0, 0.38),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .nav-links--open {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .nav-links a {
    justify-content: center;
    min-height: 46px;
    padding: 0 12px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(255, 255, 255, 0.055);
    font-size: 0.84rem;
  }

  .nav-links a.router-link-active::after {
    left: 28px;
    right: 28px;
    bottom: 6px;
  }

  .floating-socials-wrap {
    display: none;
  }
}

@media (max-width: 420px) {
  .top-nav {
    border-radius: 22px;
  }

  .brand-logo {
    width: 104px;
  }

  .mobile-menu-btn,
  .cart-button {
    width: 44px;
    min-width: 44px;
    height: 44px;
    min-height: 44px;
    border-radius: 15px;
  }

  .cart-badge {
    top: -8px;
    right: -8px;
  }
}
</style>