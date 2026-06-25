<template>
  <section class="not-found">
    <GlassCard>
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>La página que buscas no existe o fue movida.</p>
        <RouterLink class="not-found-btn" to="/">
          Volver al inicio
        </RouterLink>
      </div>
    </GlassCard>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import GlassCard from "@/components/GlassCard.vue";
</script>

<style scoped>
.not-found {
  max-width: 560px;
  margin: var(--space-16, 64px) auto;
}

.not-found-content {
  text-align: center;
  padding: var(--space-8, 32px) var(--space-6, 24px);
}

.not-found-content h1 {
  font-size: 4rem;
  font-weight: var(--font-extrabold, 800);
  color: var(--color-primary, #2563eb);
  margin: 0 0 var(--space-2, 8px);
  line-height: 1;
}

.not-found-content h2 {
  font-size: var(--text-xl, 1.25rem);
  font-weight: var(--font-semibold, 600);
  color: var(--color-text, #111827);
  margin: 0 0 var(--space-3, 12px);
}

.not-found-content p {
  color: var(--color-text-secondary, #6b7280);
  margin: 0 0 var(--space-6, 24px);
}

.not-found-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 20px;
  border-radius: var(--radius-md, 12px);
  background: var(--color-primary, #2563eb);
  color: #fff;
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
  transition: background var(--transition-fast, 150ms ease);
}

.not-found-btn:hover {
  background: var(--color-primary-hover, #1d4ed8);
}
</style>
