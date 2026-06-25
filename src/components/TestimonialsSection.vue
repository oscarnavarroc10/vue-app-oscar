<template>
  <section class="testimonials-section">
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
          <BasePlatformPill :platform="item.platform.split(' + ')[0]" />
          <div class="stars" aria-label="5 estrellas">
            <svg v-for="n in 5" :key="n" width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>

        <p class="testimonial-text">"{{ item.text }}"</p>

        <div class="testimonial-result">
          <span class="result-label">Resultado destacado</span>
          <strong>{{ item.result }}</strong>
        </div>

        <div class="testimonial-footer">
          <div class="avatar">{{ item.initials }}</div>
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
import BasePlatformPill from "@/components/BasePlatformPill.vue";

const testimonials = [
  {
    name: "Emmanuel R.",
    business: "Moda y lifestyle",
    platform: "Instagram",
    initials: "ER",
    result: "Más alcance y mejor presencia visual",
    text: "Nos ayudaron a crecer la cuenta y a que el perfil se viera mucho más profesional. En poco tiempo empezamos a notar más movimiento, más interacción y una imagen mucho más sólida para la marca.",
  },
  {
    name: "Café Central",
    business: "Restaurante y cafetería",
    platform: "Instagram + Facebook",
    initials: "CC",
    result: "Más seguidores reales y mejor conversión",
    text: "Lo que más nos gustó fue que no nos vendieron algo genérico. Pudimos elegir lo que sí necesitábamos, subir seguidores en nuestras páginas y reforzar la imagen del negocio sin pagar de más.",
  },
  {
    name: "Andrea M.",
    business: "Belleza y cuidado personal",
    platform: "Instagram",
    initials: "AM",
    result: "Perfil más atractivo y más confianza",
    text: "Yo quería que mi cuenta se viera más fuerte y con más credibilidad. Se notó muchísimo el cambio en seguidores, imagen y percepción del perfil. Ahora se siente mucho más seria y competitiva.",
  },
  {
    name: "Fit Studio MX",
    business: "Entrenamiento y bienestar",
    platform: "Instagram + TikTok",
    initials: "FS",
    result: "Más visibilidad y mejor autoridad digital",
    text: "Nos ayudaron a levantar la presencia en redes y a que el contenido tuviera más impacto. El crecimiento en seguidores y la mejora visual hicieron que la marca se sintiera mucho más fuerte.",
  },
  {
    name: "Oscar N.",
    business: "Salud y bienestar",
    platform: "Instagram",
    initials: "ON",
    result: "Mejor percepción de marca y más confianza",
    text: "La diferencia se notó rápido. Tener más seguidores y una mejor presentación del perfil hizo que todo se viera más profesional. Fue justo el impulso que necesitábamos para arrancar mejor.",
  },
  {
    name: "Urban Food Lab",
    business: "Comida y delivery",
    platform: "Facebook",
    initials: "UF",
    result: "Más presencia en la página del negocio",
    text: "Queríamos reforzar la página y que se viera con más movimiento. Nos ayudaron a subir seguidores, mejorar la imagen y dejar una presencia más confiable para nuevos clientes.",
  },
];
</script>

<style scoped>
.testimonials-section {
  margin-top: var(--space-8, 32px);
}

.testimonials-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto var(--space-8, 32px);
}

.testimonials-kicker {
  display: inline-flex;
  margin-bottom: var(--space-3, 12px);
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
}

.testimonials-header h2 {
  margin: 0 0 var(--space-3, 12px);
  color: var(--color-text, #111827);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: var(--font-extrabold, 800);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.testimonials-header p {
  margin: 0 auto;
  color: var(--color-text-secondary, #6b7280);
  line-height: 1.7;
}

.testimonials-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4, 16px);
  margin-bottom: var(--space-6, 24px);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1, 4px);
  padding: var(--space-5, 20px);
  border-radius: var(--radius-lg, 16px);
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
  text-align: center;
}

.stat-card strong {
  color: var(--color-primary, #2563eb);
  font-size: var(--text-2xl, 1.5rem);
  font-weight: var(--font-extrabold, 800);
}

.stat-card span {
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4, 16px);
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4, 16px);
  min-height: 280px;
  padding: var(--space-5, 20px);
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e5e7eb);
  background: var(--color-surface, #fff);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
  transition: all var(--transition-fast, 150ms ease);
}

.testimonial-card:hover {
  border-color: var(--color-border-strong, #d1d5db);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
  transform: translateY(-2px);
}

.testimonial-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3, 12px);
}

.stars {
  display: flex;
  gap: 2px;
}

.testimonial-text {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
  line-height: 1.7;
}

.testimonial-result {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: var(--space-3, 12px) var(--space-4, 16px);
  border-radius: var(--radius-sm, 8px);
  background: var(--color-surface-alt, #f9fafb);
  border: 1px solid var(--color-border-light, #f3f4f6);
}

.result-label {
  color: var(--color-primary, #2563eb);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.testimonial-result strong {
  color: var(--color-text, #111827);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
}

.testimonial-footer {
  display: flex;
  align-items: center;
  gap: var(--space-3, 12px);
  margin-top: auto;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full, 9999px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-weight: var(--font-bold, 700);
  font-size: var(--text-sm, 0.875rem);
}

.testimonial-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.testimonial-meta strong {
  color: var(--color-text, #111827);
  font-size: var(--text-sm, 0.875rem);
}

.testimonial-meta span {
  color: var(--color-text-muted, #9ca3af);
  font-size: var(--text-xs, 0.75rem);
}

@media (max-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
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
