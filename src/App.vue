<template>
  <main class="page">
    <AppNavbar />

    <section id="top" class="top-spacer"></section>

    <RouterView />

    <div class="floating-socials-wrap">
      <FloatingSocials />
    </div>

    <IosInstallPrompt />
  </main>
</template>

<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
import IosInstallPrompt from "@/components/IosInstallPrompt.vue";
import FloatingSocials from "@/components/FloatingSocials.vue";
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  padding: 18px 28px 56px;
}

.top-spacer {
  height: 4px;
}

.floating-socials-wrap {
  position: relative;
  z-index: 12;
}

@media (max-width: 768px) {
  .page {
    padding: 12px 16px 40px;
  }
}
</style>
