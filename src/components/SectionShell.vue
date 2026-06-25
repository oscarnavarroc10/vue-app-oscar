<template>
  <div class="section-shell">
    <slot />
  </div>
</template>

<style scoped>
.section-shell {
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
}
@media (max-width: 768px) {
  .section-shell {
    padding: var(--space-4);
    border-radius: var(--radius-xl);
  }
}
</style>
