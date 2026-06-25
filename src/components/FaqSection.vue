<template>
  <section class="faq-section">
    <div class="faq-header">
      <span class="faq-kicker">Preguntas frecuentes</span>
      <h2>Resolvemos tus dudas antes de empezar</h2>
      <p>
        Aquí encontrarás respuestas rápidas sobre paquetes, personalización,
        tiempos de respuesta y la forma en que trabajamos contigo.
      </p>
    </div>

    <div class="faq-grid">
      <article
        v-for="(item, index) in faqItems"
        :key="item.question"
        class="faq-card"
        :class="{ open: openIndex === index }"
      >
        <button
          class="faq-question"
          type="button"
          @click="toggleFaq(index)"
          :aria-expanded="openIndex === index"
        >
          <span class="faq-question-text">{{ item.question }}</span>
          <span class="faq-icon">
            <svg v-if="openIndex === index" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
        </button>

        <div class="faq-answer-wrap" :class="{ open: openIndex === index }">
          <div class="faq-answer">{{ item.answer }}</div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const openIndex = ref(0);

const faqItems = [
  {
    question: "¿Puedo contratar solo una parte del paquete?",
    answer: "Sí. Puedes elegir únicamente los servicios que realmente necesites y armar una propuesta más personalizada para tu marca.",
  },
  {
    question: "¿La prueba gratis aplica para todos?",
    answer: "No siempre. Depende del tipo de negocio, del servicio solicitado y de la disponibilidad en ese momento.",
  },
  {
    question: "¿Puedo combinar Instagram, Facebook y diseño?",
    answer: "Sí. Podemos mezclar distintas categorías para construir un plan más completo y alineado a tus objetivos.",
  },
  {
    question: "¿En cuánto tiempo me responden?",
    answer: "Normalmente respondemos en menos de media hora una vez que recibimos tu mensaje o solicitud, para darte seguimiento y orientarte.",
  },
  {
    question: "¿Necesito contratar un paquete completo para empezar?",
    answer: "No. Podemos iniciar con algo puntual y después escalar a una estrategia más grande conforme avances.",
  },
];

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};
</script>

<style scoped>
.faq-section {
  margin-top: var(--space-8, 32px);
}

.faq-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto var(--space-8, 32px);
}

.faq-kicker {
  display: inline-flex;
  margin-bottom: var(--space-3, 12px);
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
}

.faq-header h2 {
  margin: 0 0 var(--space-3, 12px);
  color: var(--color-text, #111827);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: var(--font-extrabold, 800);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.faq-header p {
  margin: 0 auto;
  color: var(--color-text-secondary, #6b7280);
  line-height: 1.7;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4, 16px);
}

.faq-card {
  border-radius: var(--radius-lg, 16px);
  border: 1px solid var(--color-border, #e5e7eb);
  background: var(--color-surface, #fff);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
  overflow: hidden;
  transition: all var(--transition-fast, 150ms ease);
}

.faq-card:hover {
  border-color: var(--color-border-strong, #d1d5db);
}

.faq-card.open {
  border-color: var(--color-primary, #2563eb);
  box-shadow: 0 0 0 3px var(--color-primary-soft, rgba(37,99,235,0.08));
}

.faq-question {
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4, 16px);
  padding: var(--space-5, 20px);
  text-align: left;
}

.faq-question-text {
  color: var(--color-text, #111827);
  font-size: var(--text-base, 1rem);
  line-height: 1.45;
  font-weight: var(--font-semibold, 600);
}

.faq-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full, 9999px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
}

.faq-answer-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.24s ease;
}

.faq-answer-wrap.open {
  grid-template-rows: 1fr;
}

.faq-answer {
  overflow: hidden;
  padding: 0 var(--space-5, 20px) 0;
  margin-top: -2px;
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
  line-height: 1.7;
}

.faq-answer-wrap.open .faq-answer {
  padding-bottom: var(--space-5, 20px);
}

@media (max-width: 768px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }

  .faq-question {
    padding: var(--space-4, 16px);
  }

  .faq-answer {
    padding-left: var(--space-4, 16px);
    padding-right: var(--space-4, 16px);
  }

  .faq-answer-wrap.open .faq-answer {
    padding-bottom: var(--space-4, 16px);
  }
}
</style>
