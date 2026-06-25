<template>
  <main class="app-shell">
    <AppNavbar
      ref="navbarRef"
      :cart-items-count="cartItemsCount"
      :is-cart-bumping="isCartBumping"
    />

    <div class="app-content">
      <RouterView />
    </div>

    <FloatingSocials />
    <IosInstallPrompt />
  </main>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { RouterView } from "vue-router";
import AppNavbar from "@/components/AppNavbar.vue";
import FloatingSocials from "@/components/FloatingSocials.vue";
import IosInstallPrompt from "@/components/IosInstallPrompt.vue";
import { useCart } from "@/composables/useCart";

const { cart } = useCart();
const navbarRef = ref(null);

const cartItemsCount = computed(() => cart.value.length);
const isCartBumping = ref(false);

watch(
  () => cartItemsCount.value,
  async (newValue, oldValue) => {
    if (oldValue === undefined || newValue === oldValue) return;

    isCartBumping.value = false;
    await nextTick();
    isCartBumping.value = true;

    setTimeout(() => {
      isCartBumping.value = false;
    }, 380);
  },
);
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  font-family: var(--font-sans, 'Inter', system-ui, sans-serif);
  background: var(--color-bg, #f8f9fb);
  color: var(--color-text, #111827);
}

.app-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-6, 24px) var(--space-6, 24px) var(--space-16, 64px);
}

@media (max-width: 768px) {
  .app-content {
    padding: var(--space-4, 16px) var(--space-4, 16px) var(--space-12, 48px);
  }
}
</style>
