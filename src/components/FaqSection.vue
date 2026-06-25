<template>
  <section id="faq" class="faq-section-pro">
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
          <span class="faq-question-text">
            {{ item.question }}
          </span>

          <span class="faq-icon">
            {{ openIndex === index ? "−" : "+" }}
          </span>
        </button>

        <div class="faq-answer-wrap" :class="{ open: openIndex === index }">
          <div class="faq-answer">
            {{ item.answer }}
          </div>
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
    answer:
      "Sí. Puedes elegir únicamente los servicios que realmente necesites y armar una propuesta más personalizada para tu marca.",
  },
  {
    question: "¿La prueba gratis aplica para todos?",
    answer:
      "No siempre. Depende del tipo de negocio, del servicio solicitado y de la disponibilidad en ese momento.",
  },
  {
    question: "¿Puedo combinar Instagram, Facebook y diseño?",
    answer:
      "Sí. Podemos mezclar distintas categorías para construir un plan más completo y alineado a tus objetivos.",
  },
  {
    question: "¿En cuánto tiempo me responden?",
    answer:
      "Normalmente respondemos en menos de media hora una vez que recibimos tu mensaje o solicitud, para darte seguimiento y orientarte.",
  },
  {
    question: "¿Necesito contratar un paquete completo para empezar?",
    answer:
      "No. Podemos iniciar con algo puntual y después escalar a una estrategia más grande conforme avances.",
  },
];

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};
</script>

<style scoped>
.faq-section-pro {
  --faq-surface: var(--color-surface);
  --faq-surface-subtle: var(--color-surface-subtle);
  --faq-border: var(--color-border);
  --faq-text: var(--color-text-primary);
  --faq-text-secondary: var(--color-text-secondary);
  --faq-kicker-bg: rgba(37, 99, 235, 0.08);
  --faq-kicker-color: var(--color-accent);

  margin-top: 42px;
}

.faq-header {
  text-align: center;
  max-width: 860px;
  margin: 0 auto 26px;
}

.faq-kicker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  padding: 8px 14px;
  border-radius: var(--radius-full);
  background: var(--faq-kicker-bg);
  color: var(--faq-kicker-color);
  border: 1px solid rgba(37, 99, 235, 0.12);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.faq-header h2 {
  margin: 0 0 12px;
  color: var(--faq-text);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.06;
  letter-spacing: -0.03em;
}

.faq-header p {
  margin: 0 auto;
  max-width: 760px;
  color: var(--faq-text-secondary);
  font-size: 1rem;
  line-height: 1.7;
}

.faq-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
}

.faq-card {
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid var(--faq-border);
  background: var(--faq-surface);
  box-shadow: var(--shadow-md);
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-base);
}

.faq-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.faq-card.open {
  border-color: rgba(37, 99, 235, 0.2);
  box-shadow: var(--shadow-lg);
}

.faq-question {
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px;
  text-align: left;
}

.faq-question-text {
  color: var(--faq-text);
  font-size: 1rem;
  line-height: 1.45;
  font-weight: 800;
}

.faq-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--faq-surface-subtle);
  color: var(--color-accent);
  font-size: 1.2rem;
  font-weight: 900;
  line-height: 1;
  border: 1px solid var(--faq-border);
  transition:
    background var(--transition-base),
    border-color var(--transition-base),
    color var(--transition-base);
}

.faq-card.open .faq-icon {
  background: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.14);
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
  padding: 0 22px 0;
  margin: 0;
  border-top: 1px solid transparent;
  color: var(--faq-text-secondary);
  font-size: 0.96rem;
  line-height: 1.7;
}

.faq-answer-wrap.open .faq-answer {
  padding-top: 16px;
  padding-bottom: 20px;
  border-top-color: var(--faq-border);
}

@media (max-width: 900px) {
  .faq-header {
    margin-bottom: 22px;
  }

  .faq-header h2 {
    font-size: clamp(1.8rem, 6vw, 2.35rem);
  }

  .faq-header p {
    font-size: 0.96rem;
  }

  .faq-question {
    padding: 18px;
  }

  .faq-answer {
    padding: 0 18px 0;
    font-size: 0.93rem;
  }

  .faq-answer-wrap.open .faq-answer {
    padding-bottom: 18px;
  }
}
</style>
