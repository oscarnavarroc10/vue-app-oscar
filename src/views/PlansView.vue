<template>
  <section class="plans-view">
    <SectionShell>
      <div class="section-header plans-header">
        <div>
          <button class="back-btn" type="button" @click="goHome">
            ← Volver a home
          </button>

          <h2>Planes por red social</h2>

          <p class="section-subtitle">
            Explora nuestros paquetes recomendados y agrega el que mejor se
            adapte a tu negocio.
          </p>
        </div>

        <div class="selected-chip">{{ enabledServices.length }} categorías</div>
      </div>

      <SocialTabsBuilder
        :services="enabledServices"
        :package-plans="packagePlans"
        :get-plan-items="getPlanItems"
        @choose="choosePlan"
      />
    </SectionShell>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { usePlanLogic } from "@/composables/usePlanLogic";
import SectionShell from "@/components/SectionShell.vue";
import SocialTabsBuilder from "@/components/SocialTabsBuilder.vue";

const router = useRouter();
const { enabledServices, packagePlans, getPlanItems, choosePlan } =
  usePlanLogic();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.plans-view {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 14px;
  margin-bottom: 18px;
}

.plans-header h2 {
  margin: 0;
  color: var(--color-text-primary);
  line-height: 1.2;
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
}

.section-subtitle {
  color: var(--color-text-secondary);
  margin: 8px 0 0;
  font-size: var(--text-base);
}

.back-btn {
  border: 1px solid var(--color-border);
  padding: 8px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
  margin-bottom: 12px;
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background: var(--color-surface);
  transition: all var(--transition-base);
  font-size: var(--text-sm);
}

.back-btn:hover {
  border-color: var(--color-accent);
  background: var(--color-surface-subtle);
}

.selected-chip {
  padding: 8px 14px;
  border-radius: var(--radius-full);
  background: rgba(37, 99, 235, 0.08);
  color: var(--color-accent);
  font-weight: var(--font-semibold);
  border: 1px solid rgba(37, 99, 235, 0.2);
  font-size: var(--text-sm);
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .back-btn {
    width: 100%;
  }

  .plans-header h2 {
    font-size: var(--text-2xl);
  }
}
</style>
