<template>
  <section id="comentarios" class="testimonials-section">
    <div class="testimonials-hero">
      <div class="hero-copy">
        <span class="section-kicker">Comentarios reales</span>

        <h2>
          Historias de gente que quería verse más fuerte en redes
          <span>sin complicarse.</span>
        </h2>

        <p>
          Negocios, creadores y marcas que empezaron con una prueba o un paquete
          pequeño y después armaron algo más a su medida.
        </p>
      </div>

      <div class="rating-card">
        <div class="rating-stars">★★★★★</div>
        <strong>4.9/5</strong>
        <span>Calificación promedio</span>
      </div>
    </div>

    <div class="testimonials-grid">
      <article
        v-for="item in testimonials"
        :key="item.name + item.city"
        class="testimonial-card"
        :class="item.featured ? 'testimonial-card--featured' : ''"
      >
        <div class="card-top">
          <div class="avatar" :class="item.avatarClass">
            {{ item.initials }}
          </div>

          <div class="person">
            <strong>{{ item.name }}</strong>
            <span>{{ item.city }} · {{ item.business }}</span>
          </div>

          <span class="platform-chip" :class="item.platformClass">
            {{ item.platform }}
          </span>
        </div>

        <p class="testimonial-text">“{{ item.text }}”</p>

        <div class="result-pill">
          <span>{{ item.resultLabel }}</span>
          <strong>{{ item.result }}</strong>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: "Mariana López",
    city: "Mérida",
    business: "Uñas y belleza",
    platform: "Instagram",
    platformClass: "platform-instagram",
    initials: "ML",
    avatarClass: "avatar-pink",
    resultLabel: "Lo que notó",
    result: "Más confianza al ver su perfil",
    featured: true,
    text:
      "La neta al principio pedí poquito porque quería calar. Sí se notó el movimiento y mi perfil ya no se veía tan vacío. Me gustó que no me pidieron contraseña ni nada raro.",
  },
  {
    name: "Carlos Medina",
    city: "Monterrey",
    business: "Comida a domicilio",
    platform: "Facebook",
    platformClass: "platform-facebook",
    initials: "CM",
    avatarClass: "avatar-blue",
    resultLabel: "Resultado",
    result: "Página con más presencia",
    text:
      "Tenemos una página de Facebook del negocio y se veía medio abandonada. Con el paquete empezó a verse con más vida y la gente sí nos empezó a tomar más en serio.",
  },
  {
    name: "Anónimo",
    city: "CDMX",
    business: "Creadora de contenido",
    platform: "TikTok",
    platformClass: "platform-tiktok",
    initials: "VT",
    avatarClass: "avatar-cyan",
    resultLabel: "Lo mejor",
    result: "Más vistas en videos clave",
    text:
      "Yo quería empujar unos videos que ya traían buena pinta. Me ayudó a que agarraran más views y se vieran más activos. No fue magia, pero sí fue el empujón que necesitaba.",
  },
  {
    name: "Diego Ramírez",
    city: "Guadalajara",
    business: "Tienda de ropa",
    platform: "Instagram",
    platformClass: "platform-instagram",
    initials: "DR",
    avatarClass: "avatar-purple",
    resultLabel: "Impacto",
    result: "Mejor primera impresión",
    text:
      "Subimos seguidores y likes en publicaciones nuevas. Lo que más me gustó fue que el perfil empezó a verse más confiable para gente que apenas nos encontraba.",
  },
  {
    name: "Fernanda Castillo",
    city: "Cancún",
    business: "Spa y skincare",
    platform: "Instagram",
    platformClass: "platform-instagram",
    initials: "FC",
    avatarClass: "avatar-orange",
    resultLabel: "Experiencia",
    result: "Proceso rápido por WhatsApp",
    text:
      "Les escribí por WhatsApp, me explicaron qué convenía y no sentí que me quisieran vender de más. Empecé con una prueba y luego armé un paquete más completo.",
  },
  {
    name: "Jorge Herrera",
    city: "Querétaro",
    business: "Marca personal",
    platform: "X",
    platformClass: "platform-x",
    initials: "JH",
    avatarClass: "avatar-slate",
    resultLabel: "Cambio visible",
    result: "Más interacción en publicaciones",
    text:
      "Uso X para mover mi marca personal y necesitaba que mis publicaciones no se vieran tan solas. Me sirvió para darle más tracción a algunos posts importantes.",
  },
];
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.testimonials-section {
  margin-top: 44px;
}

.testimonials-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 22px;
  align-items: end;
  margin-bottom: 20px;
}

.hero-copy {
  min-width: 0;
}

.section-kicker {
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

.testimonials-hero h2 {
  max-width: 820px;
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1;
  letter-spacing: -0.055em;
  font-weight: 950;
}

.testimonials-hero h2 span {
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.testimonials-hero p {
  max-width: 720px;
  margin: 14px 0 0;
  color: #cbd5e1;
  font-size: 1rem;
  line-height: 1.65;
}

.rating-card {
  position: relative;
  overflow: hidden;
  min-height: 150px;
  padding: 20px;
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:
    radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.22), transparent 34%),
    linear-gradient(180deg, rgba(15, 12, 34, 0.9), rgba(8, 8, 20, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 24px 54px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.rating-stars {
  color: #fbbf24;
  letter-spacing: 0.08em;
  font-size: 1rem;
}

.rating-card strong {
  margin-top: 10px;
  color: #ffffff;
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 950;
}

.rating-card span {
  margin-top: 6px;
  color: #94a3b8;
  font-weight: 750;
}

.social-proof-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  overflow: hidden;
  margin-bottom: 18px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

.social-proof-strip article {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
}

.social-proof-strip article:last-child {
  border-right: none;
}

.social-proof-strip strong {
  color: #ffffff;
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 950;
}

.social-proof-strip span {
  color: #94a3b8;
  font-size: 0.88rem;
  font-weight: 700;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.testimonial-card {
  position: relative;
  overflow: hidden;
  min-height: 286px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 26px;
  background:
    radial-gradient(circle at 90% 0%, rgba(124, 58, 237, 0.16), transparent 28%),
    linear-gradient(180deg, rgba(15, 12, 34, 0.86), rgba(8, 8, 20, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 22px 44px rgba(0, 0, 0, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: rgba(216, 180, 254, 0.18);
  box-shadow:
    0 28px 54px rgba(0, 0, 0, 0.34),
    0 0 26px rgba(168, 85, 247, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.testimonial-card--featured {
  background:
    radial-gradient(circle at 90% 0%, rgba(236, 72, 153, 0.18), transparent 28%),
    radial-gradient(circle at 10% 100%, rgba(37, 99, 235, 0.14), transparent 30%),
    linear-gradient(180deg, rgba(25, 12, 42, 0.9), rgba(8, 8, 20, 0.96));
  border-color: rgba(236, 72, 153, 0.16);
}

.card-top {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 17px;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-weight: 950;
  box-shadow:
    0 18px 28px rgba(0, 0, 0, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.avatar-pink {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
}

.avatar-blue {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
}

.avatar-cyan {
  background: linear-gradient(135deg, #14b8a6, #2563eb);
}

.avatar-purple {
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
}

.avatar-orange {
  background: linear-gradient(135deg, #f97316, #ec4899);
}

.avatar-slate {
  background: linear-gradient(135deg, #334155, #020617);
}

.person {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.person strong {
  color: #ffffff;
  line-height: 1.15;
  font-size: 0.98rem;
  font-weight: 900;
}

.person span {
  color: #94a3b8;
  font-size: 0.82rem;
  line-height: 1.25;
}

.platform-chip {
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 900;
  white-space: nowrap;
  border: 1px solid transparent;
}

.platform-instagram {
  color: #f9a8d4;
  background: rgba(236, 72, 153, 0.12);
  border-color: rgba(236, 72, 153, 0.14);
}

.platform-facebook {
  color: #93c5fd;
  background: rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.14);
}

.platform-tiktok {
  color: #e2e8f0;
  background: rgba(20, 184, 166, 0.12);
  border-color: rgba(20, 184, 166, 0.14);
}

.platform-x {
  color: #cbd5e1;
  background: rgba(148, 163, 184, 0.1);
  border-color: rgba(148, 163, 184, 0.14);
}

.testimonial-text {
  margin: 0;
  color: #e5e7eb;
  font-size: 0.96rem;
  line-height: 1.68;
}

.result-pill {
  margin-top: auto;
  padding: 14px 15px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.result-pill span {
  color: #c084fc;
  font-size: 0.72rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.result-pill strong {
  color: #ffffff;
  font-size: 0.95rem;
  line-height: 1.35;
}

@media (max-width: 1100px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .testimonials-hero {
    grid-template-columns: 1fr;
  }

  .rating-card {
    max-width: 360px;
  }
}

@media (max-width: 760px) {
  .testimonials-section {
    margin-top: 32px;
  }

  .testimonials-hero h2 {
    font-size: clamp(1.9rem, 9vw, 2.55rem);
  }

  .testimonials-hero p {
    font-size: 0.94rem;
  }

  .rating-card {
    max-width: none;
    min-height: 126px;
    border-radius: 22px;
  }

  .social-proof-strip {
    grid-template-columns: 1fr;
  }

  .social-proof-strip article {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }

  .social-proof-strip article:last-child {
    border-bottom: none;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .testimonial-card {
    min-height: auto;
    border-radius: 22px;
    padding: 18px;
  }

  .card-top {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .platform-chip {
    grid-column: 1 / -1;
    width: fit-content;
  }
}
</style>