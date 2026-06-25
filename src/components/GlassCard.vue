<template>
  <div class="glass-card" :class="[`glass-card--${variant}`, { 'glass-card--flush': flush }]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (v) => ["default", "raised", "flat"].includes(v),
  },
  flush: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.glass-card {
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-xl, 20px);
  padding: var(--space-6, 24px);
}

.glass-card--default {
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.06));
}

.glass-card--raised {
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
}

.glass-card--flat {
  box-shadow: none;
  border-color: var(--color-border-subtle, #f0f0f2);
}

.glass-card--flush {
  padding: 0;
}

@media (max-width: 768px) {
  .glass-card {
    padding: var(--space-4, 16px);
    border-radius: var(--radius-lg, 16px);
  }
}
</style>
