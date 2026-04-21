<template>
  <section class="custom-package-banner">
    <div class="custom-package-shell">
      <div class="custom-package-glow glow-1"></div>
      <div class="custom-package-glow glow-2"></div>

      <div class="custom-package-copy">
        <span class="custom-package-kicker">Paquete personalizado</span>

        <h2>No todos los negocios necesitan el mismo plan</h2>

        <p class="custom-package-description">
          Si no encontraste un paquete que encaje con tu marca, tu presupuesto o
          tus objetivos, puedes crear una propuesta personalizada eligiendo las
          redes sociales y los servicios que realmente necesitas.
        </p>

        <div class="custom-package-points">
          <div class="custom-point">Elige solo lo que sí te sirve</div>
          <div class="custom-point">Combina varias redes sociales</div>
          <div class="custom-point">Arma un paquete a tu medida</div>
        </div>
      </div>

      <div class="custom-package-side">
        <div class="custom-package-card">
          <div class="custom-card-badge">Más flexible</div>

          <h3>Tu estrategia, a tu manera</h3>

          <p>
            Selecciona Instagram, Facebook, TikTok, diseño, reels o los
            servicios que quieras combinar. Nosotros te ayudamos a estructurar
            un paquete pensado específicamente para tu negocio.
          </p>

          <button class="custom-package-btn" type="button" @click="$emit('customize')">
            Crear paquete personalizado
          </button>

          <span class="custom-package-note">
            Ideal para marcas que quieren algo más específico y estratégico.
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(["customize"]);
</script>

<style scoped>
.custom-package-banner {
  margin-top: 30px;
}

.custom-package-shell {
  position: relative;
  overflow: hidden;

  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 24px;
  align-items: stretch;

  padding: 28px;
  border-radius: 30px;

  background:
    linear-gradient(
      180deg,
      rgba(10, 18, 34, 0.9) 0%,
      rgba(8, 14, 26, 0.94) 100%
    );

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 24px 50px rgba(2, 6, 23, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.custom-package-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(36px);
  pointer-events: none;
  opacity: 0.55;
}

.glow-1 {
  width: 240px;
  height: 240px;
  top: -90px;
  left: -60px;
  background: rgba(124, 58, 237, 0.22);
}

.glow-2 {
  width: 220px;
  height: 220px;
  right: -70px;
  bottom: -90px;
  background: rgba(59, 130, 246, 0.22);
}

.custom-package-copy,
.custom-package-side {
  position: relative;
  z-index: 1;
}

.custom-package-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.custom-package-kicker {
  display: inline-flex;
  width: fit-content;
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

.custom-package-copy h2 {
  margin: 0 0 14px;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  max-width: 720px;
}

.custom-package-description {
  margin: 0;
  max-width: 720px;

  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.75;
}

.custom-package-points {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.custom-point {
  padding: 10px 14px;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;

  border: 1px solid rgba(255, 255, 255, 0.06);

  font-size: 0.9rem;
  font-weight: 700;
}

.custom-package-side {
  display: flex;
  align-items: stretch;
}

.custom-package-card {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;

  padding: 24px;
  border-radius: 24px;

  background:
    linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.72) 0%,
      rgba(17, 24, 39, 0.8) 100%
    );

  border: 1px solid rgba(255, 255, 255, 0.07);

  box-shadow:
    0 18px 34px rgba(2, 6, 23, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.custom-card-badge {
  display: inline-flex;
  width: fit-content;
  padding: 8px 12px;
  border-radius: 999px;

  background: rgba(59, 130, 246, 0.14);
  color: #93c5fd;

  border: 1px solid rgba(59, 130, 246, 0.12);

  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.custom-package-card h3 {
  margin: 0;
  color: #ffffff;
  font-size: 1.4rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.custom-package-card p {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.96rem;
  line-height: 1.7;
}

.custom-package-btn {
  margin-top: 4px;
  min-height: 52px;
  border: none;
  border-radius: 16px;
  padding: 14px 18px;

  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #ffffff;

  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;

  box-shadow: 0 14px 26px rgba(37, 99, 235, 0.24);

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;
}

.custom-package-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.28);
}

.custom-package-note {
  color: #94a3b8;
  font-size: 0.84rem;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .custom-package-shell {
    grid-template-columns: 1fr;
  }

  .custom-package-copy h2 {
    max-width: none;
  }

  .custom-package-description {
    max-width: none;
  }
}

@media (max-width: 700px) {
  .custom-package-shell {
    padding: 22px;
    border-radius: 24px;
  }

  .custom-package-card {
    padding: 20px;
    border-radius: 20px;
  }

  .custom-package-copy h2 {
    font-size: clamp(1.8rem, 6vw, 2.3rem);
  }

  .custom-package-description {
    font-size: 0.96rem;
  }

  .custom-package-points {
    gap: 10px;
  }

  .custom-point {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
</style>