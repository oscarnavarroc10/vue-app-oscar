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
  border-radius: 999px;

  background: rgba(124, 58, 237, 0.16);
  color: #ddd6fe;

  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.faq-header h2 {
  margin: 0 0 12px;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.06;
  letter-spacing: -0.03em;
}

.faq-header p {
  margin: 0 auto;
  max-width: 760px;
  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.7;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.faq-card {
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);

  background: linear-gradient(
    180deg,
    rgba(10, 18, 34, 0.88) 0%,
    rgba(8, 14, 26, 0.92) 100%
  );

  box-shadow:
    0 18px 36px rgba(2, 6, 23, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  overflow: hidden;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.faq-card:hover {
  transform: translateY(-2px);
  border-color: rgba(96, 165, 250, 0.18);

  box-shadow:
    0 22px 40px rgba(2, 6, 23, 0.28),
    0 0 18px rgba(59, 130, 246, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.faq-card.open {
  border-color: rgba(96, 165, 250, 0.22);
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
  color: #ffffff;
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

  background: rgba(59, 130, 246, 0.12);
  color: #93c5fd;

  font-size: 1.2rem;
  font-weight: 900;
  line-height: 1;

  border: 1px solid rgba(59, 130, 246, 0.12);
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
  margin-top: -2px;
  margin-bottom: 0;

  color: #94a3b8;
  font-size: 0.96rem;
  line-height: 1.7;
}

.faq-answer-wrap.open .faq-answer {
  padding-bottom: 20px;
}

@media (max-width: 900px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }

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