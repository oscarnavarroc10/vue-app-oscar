<template>
  <section id="comentarios" class="testimonials-section">
    <div class="testimonials-header">
      <span class="testimonials-kicker">Resultados y reseñas</span>

      <h2>Marcas y negocios que ya impulsaron su presencia digital</h2>

      <p>
        Historias de clientes que buscaban crecer en redes sociales, mejorar su
        imagen y conseguir resultados más visibles en menos tiempo.
      </p>
    </div>

    <div class="testimonials-stats">
      <article class="stat-card">
        <strong>+120</strong>
        <span>proyectos impulsados</span>
      </article>

      <article class="stat-card">
        <strong>98%</strong>
        <span>clientes satisfechos</span>
      </article>

      <article class="stat-card">
        <strong>24-48h</strong>
        <span>primer seguimiento</span>
      </article>
    </div>

    <div class="testimonials-grid">
      <article
        v-for="item in testimonials"
        :key="item.name + item.business"
        class="testimonial-card"
      >
        <div class="testimonial-top">
          <span class="platform-chip" :class="item.platformClass">
            {{ item.platform }}
          </span>

          <div class="stars">★★★★★</div>
        </div>

        <p class="testimonial-text">
          “{{ item.text }}”
        </p>

        <div class="testimonial-result">
          <span class="result-label">Resultado destacado</span>
          <strong>{{ item.result }}</strong>
        </div>

        <div class="testimonial-footer">
          <div class="avatar">
            {{ item.initials }}
          </div>

          <div class="testimonial-meta">
            <strong>{{ item.name }}</strong>
            <span>{{ item.business }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: "Emmanuel R.",
    business: "Moda y lifestyle",
    platform: "Instagram",
    platformClass: "platform-instagram",
    initials: "ER",
    result: "Más alcance y mejor presencia visual",
    text:
      "Nos ayudaron a crecer la cuenta y a que el perfil se viera mucho más profesional. En poco tiempo empezamos a notar más movimiento, más interacción y una imagen mucho más sólida para la marca.",
  },
  {
    name: "Café Central",
    business: "Restaurante y cafetería",
    platform: "Instagram + Facebook",
    platformClass: "platform-facebook",
    initials: "CC",
    result: "Más seguidores reales y mejor conversión",
    text:
      "Lo que más nos gustó fue que no nos vendieron algo genérico. Pudimos elegir lo que sí necesitábamos, subir seguidores en nuestras páginas y reforzar la imagen del negocio sin pagar de más.",
  },
  {
    name: "Andrea M.",
    business: "Belleza y cuidado personal",
    platform: "Instagram",
    platformClass: "platform-instagram",
    initials: "AM",
    result: "Perfil más atractivo y más confianza",
    text:
      "Yo quería que mi cuenta se viera más fuerte y con más credibilidad. Se notó muchísimo el cambio en seguidores, imagen y percepción del perfil. Ahora se siente mucho más seria y competitiva.",
  },
  {
    name: "Fit Studio MX",
    business: "Entrenamiento y bienestar",
    platform: "Instagram + TikTok",
    platformClass: "platform-tiktok",
    initials: "FS",
    result: "Más visibilidad y mejor autoridad digital",
    text:
      "Nos ayudaron a levantar la presencia en redes y a que el contenido tuviera más impacto. El crecimiento en seguidores y la mejora visual hicieron que la marca se sintiera mucho más fuerte.",
  },
  {
    name: "Oscar N.",
    business: "Salud y bienestar",
    platform: "Instagram",
    platformClass: "platform-instagram",
    initials: "ON",
    result: "Mejor percepción de marca y más confianza",
    text:
      "La diferencia se notó rápido. Tener más seguidores y una mejor presentación del perfil hizo que todo se viera más profesional. Fue justo el impulso que necesitábamos para arrancar mejor.",
  },
  {
    name: "Urban Food Lab",
    business: "Comida y delivery",
    platform: "Facebook",
    platformClass: "platform-facebook",
    initials: "UF",
    result: "Más presencia en la página del negocio",
    text:
      "Queríamos reforzar la página y que se viera con más movimiento. Nos ayudaron a subir seguidores, mejorar la imagen y dejar una presencia más confiable para nuevos clientes.",
  },
];
</script>

<style scoped>
.testimonials-section {
  margin-top: 42px;
}

.testimonials-header {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 28px;
}

.testimonials-kicker {
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

.testimonials-header h2 {
  margin: 0 0 12px;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.06;
  letter-spacing: -0.03em;
}

.testimonials-header p {
  margin: 0 auto;
  max-width: 760px;
  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.7;
}

.testimonials-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: 20px 22px;
  border-radius: 22px;

  background: linear-gradient(
    180deg,
    rgba(10, 18, 34, 0.86) 0%,
    rgba(8, 14, 26, 0.92) 100%
  );

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 18px 36px rgba(2, 6, 23, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.stat-card strong {
  color: #ffffff;
  font-size: 1.8rem;
  line-height: 1;
  font-weight: 900;
}

.stat-card span {
  color: #94a3b8;
  font-size: 0.95rem;
  font-weight: 600;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.testimonial-card {
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 18px;

  min-height: 320px;
  padding: 22px;

  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);

  background:
    linear-gradient(
      180deg,
      rgba(10, 18, 34, 0.9) 0%,
      rgba(8, 14, 26, 0.94) 100%
    );

  box-shadow:
    0 18px 36px rgba(2, 6, 23, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.testimonial-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;

  background:
    radial-gradient(circle at 85% 10%, rgba(59, 130, 246, 0.1), transparent 24%),
    radial-gradient(circle at 10% 0%, rgba(168, 85, 247, 0.08), transparent 20%);
}

.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: rgba(96, 165, 250, 0.16);

  box-shadow:
    0 24px 42px rgba(2, 6, 23, 0.28),
    0 0 18px rgba(59, 130, 246, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.testimonial-top,
.testimonial-text,
.testimonial-result,
.testimonial-footer {
  position: relative;
  z-index: 1;
}

.testimonial-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.platform-chip {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 14px;
  border-radius: 999px;

  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.01em;

  border: 1px solid transparent;
}

.platform-instagram {
  background: linear-gradient(
    135deg,
    rgba(245, 133, 41, 0.14),
    rgba(221, 42, 123, 0.18),
    rgba(129, 52, 175, 0.14)
  );
  color: #f9a8d4;
  border-color: rgba(221, 42, 123, 0.14);
}

.platform-facebook {
  background: linear-gradient(
    135deg,
    rgba(24, 119, 242, 0.14),
    rgba(96, 165, 250, 0.18)
  );
  color: #93c5fd;
  border-color: rgba(59, 130, 246, 0.14);
}

.platform-tiktok {
  background: linear-gradient(
    135deg,
    rgba(37, 244, 238, 0.12),
    rgba(17, 24, 39, 0.14),
    rgba(254, 44, 85, 0.14)
  );
  color: #e2e8f0;
  border-color: rgba(148, 163, 184, 0.12);
}

.stars {
  color: #fbbf24;
  font-size: 1rem;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.testimonial-text {
  margin: 0;
  color: #e2e8f0;
  font-size: 0.98rem;
  line-height: 1.75;
}

.testimonial-result {
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 14px 16px;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.result-label {
  color: #93c5fd;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.testimonial-result strong {
  color: #ffffff;
  font-size: 0.98rem;
  line-height: 1.45;
  font-weight: 800;
}

.testimonial-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #ffffff;

  font-weight: 900;
  font-size: 0.95rem;

  box-shadow: 0 12px 20px rgba(59, 130, 246, 0.18);
}

.testimonial-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.testimonial-meta strong {
  color: #ffffff;
  font-size: 0.96rem;
  line-height: 1.2;
}

.testimonial-meta span {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.3;
}

@media (max-width: 1100px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .testimonials-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .testimonials-header {
    margin-bottom: 22px;
  }

  .testimonials-header h2 {
    font-size: clamp(1.8rem, 6vw, 2.35rem);
  }

  .testimonials-header p {
    font-size: 0.96rem;
  }

  .testimonials-stats {
    grid-template-columns: 1fr;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .testimonial-card {
    min-height: auto;
  }
}
</style>