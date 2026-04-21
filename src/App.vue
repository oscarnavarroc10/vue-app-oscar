<template>
  <div class="background-layer"></div>
  <div class="background-fade"></div>

  <main class="page">
    <!-- NAV -->
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
        <RouterLink to="/faq">Preguntas</RouterLink>
        <RouterLink to="/cart">Carrito</RouterLink>
      </nav>

      <div class="nav-actions">
        <RouterLink
          class="nav-cta nav-cta--secondary"
          to="/social-categories"
        >
          Personalizar
        </RouterLink>

        <RouterLink class="nav-cta nav-cta--cart" to="/cart">
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
        </RouterLink>
      </div>
    </header>

    <section id="top" class="top-spacer"></section>

    <!-- Aquí Vue Router renderiza cada pantalla -->
    <RouterView />
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import logoImpulso from "@/assets/impulso_redes_logo.png";
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
  flex-shrink: 0;
}

.brand-logo {
  height: 84px;
  display: block;
  object-fit: contain;
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

.nav-links a:hover {
  color: #ffffff;
  opacity: 1;
}

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

.top-spacer {
  height: 4px;
}

@media (max-width: 900px) {
  .page {
    padding: 14px 16px 76px;
  }

  .top-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 20px;
  }

  .brand-logo {
    height: 58px;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px 18px;
  }

  .nav-links a {
    font-size: 0.95rem;
  }

  .nav-actions {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav-cta {
    min-height: 44px;
    padding: 0 18px;
    font-size: 0.92rem;
  }
}

@media (max-width: 600px) {
  .top-nav {
    margin-bottom: 14px;
  }

  .brand-logo {
    height: 52px;
  }
}
</style>