<template>
  <section class="plans-view">
    <GlassCard>
      <div class="plans-header">
        <div>
          <button class="back-btn" type="button" @click="goHome">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m0 0l7 7m-7-7l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Volver
          </button>
          <h2>Planes por red social</h2>
          <p class="plans-subtitle">
            Explora nuestros paquetes recomendados y agrega el que mejor se adapte a tu negocio.
          </p>
        </div>
        <span class="count-chip">{{ enabledServices.length }} categorías</span>
      </div>

      <SocialTabsBuilder
        :services="enabledServices"
        :package-plans="packagePlans"
        :get-plan-items="getPlanItems"
        @choose="choosePlan"
      />
    </GlassCard>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { usePlanLogic } from "@/composables/usePlanLogic";
import GlassCard from "@/components/GlassCard.vue";
import SocialTabsBuilder from "@/components/SocialTabsBuilder.vue";

const router = useRouter();
const { enabledServices, packagePlans, getPlanItems, choosePlan } = usePlanLogic();

const goHome = () => router.push("/");
</script>

<style scoped>
.plans-view {
  max-width: 1280px;
  margin: 0 auto;
}

.plans-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-4, 16px);
  margin-bottom: var(--space-6, 24px);
}

.plans-header h2 {
  margin: 0;
  font-size: var(--text-2xl, 1.5rem);
  font-weight: var(--font-bold, 700);
  color: var(--color-text, #111827);
}

.plans-subtitle {
  margin: var(--space-1, 4px) 0 0;
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  border: 1px solid var(--color-border, #e5e7eb);
  padding: 8px 16px;
  border-radius: var(--radius-md, 12px);
  background: var(--color-surface, #fff);
  color: var(--color-text, #111827);
  font-weight: var(--font-medium, 500);
  font-size: var(--text-sm, 0.875rem);
  margin-bottom: var(--space-3, 12px);
  transition: background var(--transition-fast, 150ms ease);
}

.back-btn:hover {
  background: var(--color-surface-alt, #f3f4f6);
}

.count-chip {
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-sm, 0.875rem);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .plans-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
