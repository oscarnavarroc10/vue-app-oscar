<template>
  <section class="landing-section">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Impulsa tus redes sociales hoy</h1>
        <p class="hero-subtitle">
          Seguidores, likes y vistas para Instagram, TikTok, YouTube y más.
          Elige el plan ideal para tu marca.
        </p>
        <div class="hero-actions">
          <a href="#planes" class="hero-btn hero-btn--primary">Ver planes</a>
          <RouterLink
            to="/social-categories"
            class="hero-btn hero-btn--secondary"
          >
            Crear paquete
          </RouterLink>
        </div>
      </div>
    </section>

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
import { useRouter } from "vue-router";
import { usePlanLogic } from "@/composables/usePlanLogic";
import SocialTabsBuilder from "@/components/SocialTabsBuilder.vue";
import CustomPackageBanner from "@/components/CustomPackageBanner.vue";
import TestimonialsSection from "@/components/TestimonialsSection.vue";
import FaqSection from "@/components/FaqSection.vue";
import ContactLeadSection from "@/components/ContactLeadSection.vue";

const router = useRouter();
const { enabledServices, packagePlans, getPlanItems, choosePlan } =
  usePlanLogic();

const goToCustomBuilder = () => {
  router.push("/social-categories");
};
</script>

<style scoped>
.landing-section {
  max-width: 1400px;
  margin: 0 auto;
}

.hero-section {
  padding: 60px 20px 80px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  color: var(--color-text-primary);
  margin: 0 0 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin: 0 0 32px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  padding: 14px 28px;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  transition: all var(--transition-base);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.hero-btn--primary {
  background: var(--color-accent);
  color: white;
  border: none;
}

.hero-btn--primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero-btn--secondary {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.hero-btn--secondary:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

#planes,
#comentarios,
#faq,
#contacto {
  scroll-margin-top: 96px;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 16px 60px;
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-subtitle {
    font-size: var(--text-base);
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-btn {
    width: 100%;
    justify-content: center;
  }

  #planes,
  #comentarios,
  #faq,
  #contacto {
    scroll-margin-top: 84px;
  }
}
</style>
