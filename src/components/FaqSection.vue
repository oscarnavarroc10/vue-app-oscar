<template>
  <section id="faq" class="faq-section">
    <div class="faq-shell">
      <div class="faq-copy">
        <span class="faq-kicker">Preguntas frecuentes</span>

        <h2>
          Dudas normales antes de impulsar tus redes.
          <span>Te las resolvemos claro.</span>
        </h2>

        <p>
          Antes de comprar, es normal querer saber tiempos, seguridad, pruebas,
          redes disponibles y cómo funciona todo.
        </p>

        <div class="faq-highlight-card">
          <span>🎁 Tip rápido</span>
          <strong>No pagues sin conocerlo primero.</strong>

          <p>
            Puedes pedir una prueba gratis para validar la calidad antes de armar
            un paquete más grande.
          </p>

          <a
            :href="freeTrialWhatsAppUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir prueba gratis →
          </a>
        </div>
      </div>

      <div class="faq-list">
        <article
          v-for="(item, index) in faqItems"
          :key="item.question"
          class="faq-card"
          :class="{ open: isOpen(index) }"
        >
          <button
            class="faq-question"
            type="button"
            @click="toggleFaq(index)"
            :aria-expanded="isOpen(index)"
          >
            <span class="faq-question-left">
              <span class="faq-chip">{{ item.tag }}</span>
              <strong>{{ item.question }}</strong>
            </span>

            <span class="faq-icon">
              {{ isOpen(index) ? "−" : "+" }}
            </span>
          </button>

          <div class="faq-answer-wrap" :class="{ open: isOpen(index) }">
            <div class="faq-answer-inner">
              <p class="faq-answer">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const openIndex = ref(0);

const freeTrialPhone = "528122126718";
const freeTrialMessage =
  "Hola, vi su página y quiero solicitar una prueba gratis para conocer el servicio.";

const freeTrialWhatsAppUrl = `https://wa.me/${freeTrialPhone}?text=${encodeURIComponent(
  freeTrialMessage,
)}`;

const faqItems = [
  {
    tag: "Prueba",
    question: "¿Puedo pedir una prueba gratis antes de comprar?",
    answer:
      "Sí. Puedes escribirnos por WhatsApp y pedir una prueba gratis para conocer cómo trabajamos. La disponibilidad puede variar según el servicio, pero la idea es que no compres a ciegas.",
  },
  {
    tag: "Seguridad",
    question: "¿Necesitan mi contraseña?",
    answer:
      "No. Para la mayoría de servicios solo necesitamos el enlace correcto de tu perfil, publicación, video o página. Nunca te vamos a pedir contraseña para levantar seguidores, likes o views, el requisito que si es obligatorio es que al momento de cargar el servicio tu cuenta debe ser pública y no tenerla en privado.",
  },
  {
    tag: "Redes",
    question: "¿Solo manejan Instagram, Facebook, TikTok y X?",
    answer:
      "Esas son las redes principales que tenemos visibles en la página, pero también podemos trabajar Spotify, YouTube, Telegram y WhatsApp bajo pedido especial. Si necesitas una red que no aparece, escríbenos y revisamos si podemos ayudarte.",
  },
  {
    tag: "Paquetes",
    question: "¿Tengo que comprar un paquete completo?",
    answer:
      "No a fuerza. Puedes elegir un paquete ya armado si quieres algo rápido, o crear un plan personalizado con solo los servicios que realmente necesitas.",
  },
  {
    tag: "Tiempos",
    question: "¿Cuánto tarda en empezar el servicio?",
    answer:
      "Depende de la carga del servidor y del tipo de servicio. Algunos empiezan a cargar en cuestión de minutos, otros pueden tardar alrededor de media hora en iniciar, pero por lo regular el proceso es rápido.",
  },
  {
    tag: "Personalizado",
    question: "¿Puedo combinar varias redes en un solo pedido?",
    answer:
      "Sí. Puedes mezclar Instagram, Facebook, TikTok, X y también servicios especiales si aplica. Por ejemplo: seguidores de Instagram, views de TikTok y likes de Facebook en un mismo pedido.",
  },
  {
    tag: "Recomendación",
    question: "¿Cómo sé qué paquete me conviene?",
    answer:
      "Si no estás seguro, mándanos mensaje. Te preguntamos qué quieres lograr y te recomendamos algo según tu objetivo: verte más confiable, empujar un video, crecer una página o reforzar tu marca.",
  },
];

const isOpen = (index) => {
  return openIndex.value === index;
};

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.faq-section {
  margin-top: 44px;
}

.faq-shell {
  display: grid;
  grid-template-columns: minmax(300px, 0.72fr) minmax(0, 1fr);
  gap: 22px;
  align-items: start;
}

.faq-copy {
  position: sticky;
  top: 110px;
  min-width: 0;
}

.faq-kicker {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 14px;
  padding: 8px 13px;
  border-radius: 999px;
  color: #d8b4fe;
  background: rgba(124, 58, 237, 0.16);
  border: 1px solid rgba(168, 85, 247, 0.18);
  font-size: 0.76rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.faq-copy h2 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 3.6vw, 3.1rem);
  line-height: 1;
  letter-spacing: -0.055em;
  font-weight: 950;
}

.faq-copy h2 span {
  display: block;
  margin-top: 4px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.faq-copy > p {
  margin: 14px 0 0;
  color: #cbd5e1;
  font-size: 1rem;
  line-height: 1.65;
}

.faq-highlight-card {
  position: relative;
  overflow: hidden;
  margin-top: 22px;
  padding: 20px;
  border-radius: 26px;
  background:
    radial-gradient(circle at 90% 0%, rgba(236, 72, 153, 0.2), transparent 32%),
    radial-gradient(circle at 0% 100%, rgba(37, 99, 235, 0.18), transparent 34%),
    linear-gradient(180deg, rgba(15, 12, 34, 0.9), rgba(8, 8, 20, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 24px 54px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.faq-highlight-card span {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 12px;
  padding: 7px 11px;
  border-radius: 999px;
  color: #fde68a;
  background: rgba(245, 158, 11, 0.16);
  border: 1px solid rgba(245, 158, 11, 0.18);
  font-size: 0.72rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.faq-highlight-card strong {
  display: block;
  color: #ffffff;
  font-size: 1.35rem;
  line-height: 1.12;
  letter-spacing: -0.035em;
}

.faq-highlight-card p {
  margin: 10px 0 0;
  color: #cbd5e1;
  line-height: 1.55;
  font-size: 0.92rem;
}

.faq-highlight-card a {
  min-height: 46px;
  margin-top: 16px;
  padding: 0 15px;
  width: fit-content;
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  color: #ffffff;
  font-weight: 950;
  background: linear-gradient(135deg, #8b5cf6, #2563eb);
  box-shadow: 0 16px 32px rgba(99, 102, 241, 0.28);
}

.faq-list {
  display: grid;
  gap: 12px;
}

.faq-card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background:
    radial-gradient(circle at 95% 0%, rgba(124, 58, 237, 0.12), transparent 26%),
    linear-gradient(180deg, rgba(15, 12, 34, 0.82), rgba(8, 8, 20, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.075);
  box-shadow:
    0 18px 34px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.045);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.faq-card:hover {
  transform: translateY(-2px);
  border-color: rgba(216, 180, 254, 0.16);
  box-shadow:
    0 24px 42px rgba(0, 0, 0, 0.3),
    0 0 22px rgba(168, 85, 247, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.faq-card.open {
  border-color: rgba(168, 85, 247, 0.22);
}

.faq-question {
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  padding: 18px;
  text-align: left;
}

.faq-question-left {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.faq-chip {
  flex-shrink: 0;
  min-width: 82px;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #c084fc;
  background: rgba(124, 58, 237, 0.14);
  border: 1px solid rgba(168, 85, 247, 0.16);
  font-size: 0.7rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.035em;
}

.faq-question strong {
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.35;
  font-weight: 900;
}

.faq-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 950;
  background: rgba(255, 255, 255, 0.065);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

.faq-answer-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.24s ease;
}

.faq-answer-wrap.open {
  grid-template-rows: 1fr;
}

.faq-answer-inner {
  overflow: hidden;
}

.faq-answer {
  margin: 0;
  padding: 0 18px 18px;
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.68;
}

@media (max-width: 980px) {
  .faq-shell {
    grid-template-columns: 1fr;
  }

  .faq-copy {
    position: relative;
    top: auto;
  }

  .faq-highlight-card {
    margin-top: 18px;
  }
}

@media (max-width: 640px) {
  .faq-section {
    margin-top: 34px;
  }

  .faq-copy h2 {
    font-size: clamp(1.9rem, 9vw, 2.5rem);
  }

  .faq-copy > p {
    font-size: 0.94rem;
  }

  .faq-question {
    padding: 16px;
  }

  .faq-question-left {
    align-items: flex-start;
    flex-direction: column;
    gap: 9px;
  }

  .faq-chip {
    min-width: 0;
  }

  .faq-question strong {
    font-size: 0.95rem;
  }

  .faq-answer {
    padding: 0 16px 16px;
    font-size: 0.9rem;
  }

  .faq-highlight-card a {
    width: 100%;
    justify-content: center;
  }
}
</style>