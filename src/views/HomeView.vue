<template>
  <section class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <span class="hero-kicker">Marketing Digital</span>
        <h1>Impulsa tu presencia en redes sociales</h1>
        <p class="hero-description">
          Seguidores, likes, views y paquetes personalizados para
          Instagram, Facebook, TikTok, YouTube y más. Resultados reales
          para tu negocio.
        </p>
        <div class="hero-actions">
          <RouterLink class="hero-btn hero-btn--primary" to="/plans">
            Ver planes
          </RouterLink>
          <RouterLink class="hero-btn hero-btn--ghost" to="/social-categories">
            Personalizar paquete
          </RouterLink>
        </div>
        <div v-if="discountPercentage > 0" class="hero-nudge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Tienes {{ discountPercentage }}% de descuento activo por tener {{ cart.length }} elementos en el carrito</span>
        </div>
      </div>
    </section>

    <!-- Plans -->
    <section id="planes">
      <SocialTabsBuilder
        :services="enabledServices"
        :package-plans="packagePlans"
        :get-plan-items="getPlanItems"
        @choose="choosePlan"
      />
    </section>

    <CustomPackageBanner @customize="goToCustomBuilder" />

    <section id="comentarios">
      <TestimonialsSection />
    </section>

    <section id="faq">
      <FaqSection />
    </section>

    <section id="contacto">
      <ContactLeadSection />
    </section>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { usePlanLogic } from "@/composables/usePlanLogic";
import { useCart } from "@/composables/useCart";
import SocialTabsBuilder from "@/components/SocialTabsBuilder.vue";
import CustomPackageBanner from "@/components/CustomPackageBanner.vue";
import TestimonialsSection from "@/components/TestimonialsSection.vue";
import FaqSection from "@/components/FaqSection.vue";
import ContactLeadSection from "@/components/ContactLeadSection.vue";

const router = useRouter();
const { cart, discountPercentage } = useCart();
const { enabledServices, packagePlans, getPlanItems, choosePlan } = usePlanLogic();

const goToCustomBuilder = () => {
  router.push("/social-categories");
};
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-12, 48px);
}

/* ── Hero ── */
.hero {
  text-align: center;
  padding: var(--space-12, 48px) 0 var(--space-8, 32px);
}

.hero-content {
  max-width: 720px;
  margin: 0 auto;
}

.hero-kicker {
  display: inline-flex;
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
  margin-bottom: var(--space-4, 16px);
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: var(--font-extrabold, 800);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--color-text, #111827);
  margin: 0 0 var(--space-4, 16px);
}

.hero-description {
  font-size: var(--text-lg, 1.125rem);
  color: var(--color-text-secondary, #6b7280);
  line-height: 1.7;
  margin: 0 0 var(--space-6, 24px);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-3, 12px);
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  padding: 0 24px;
  border-radius: var(--radius-md, 12px);
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-base, 1rem);
  transition: all var(--transition-fast, 150ms ease);
}

.hero-btn--primary {
  background: var(--color-primary, #2563eb);
  color: #fff;
}

.hero-btn--primary:hover {
  background: var(--color-primary-hover, #1d4ed8);
}

.hero-btn--ghost {
  background: var(--color-surface, #fff);
  color: var(--color-text, #111827);
  border: 1px solid var(--color-border, #e5e7eb);
}

.hero-btn--ghost:hover {
  background: var(--color-surface-alt, #f3f4f6);
}

.hero-nudge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  margin-top: var(--space-4, 16px);
  padding: var(--space-2, 8px) var(--space-4, 16px);
  border-radius: var(--radius-full, 9999px);
  background: var(--color-success-soft, rgba(22,163,74,0.08));
  color: var(--color-success, #16a34a);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-medium, 500);
}

#planes,
#comentarios,
#faq,
#contacto {
  scroll-margin-top: 80px;
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-8, 32px) 0 var(--space-6, 24px);
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-btn {
    width: 100%;
  }
}
</style>
