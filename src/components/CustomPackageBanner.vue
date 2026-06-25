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

          <button
            class="custom-package-btn"
            type="button"
            @click="$emit('customize')"
          >
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
  --custom-surface: var(--color-surface);
  --custom-surface-subtle: var(--color-surface-subtle);
  --custom-border: var(--color-border);
  --custom-text: var(--color-text-primary);
  --custom-text-secondary: var(--color-text-secondary);
  --custom-text-muted: var(--color-text-muted);

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
    radial-gradient(
      circle at top left,
      rgba(37, 99, 235, 0.08),
      transparent 32%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(96, 165, 250, 0.08),
      transparent 30%
    ),
    var(--custom-surface);
  border: 1px solid var(--custom-border);
  box-shadow: var(--shadow-lg);
}

.custom-package-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(40px);
  pointer-events: none;
  opacity: 0.45;
}

.glow-1 {
  width: 220px;
  height: 220px;
  top: -90px;
  left: -60px;
  background: rgba(96, 165, 250, 0.14);
}

.glow-2 {
  width: 200px;
  height: 200px;
  right: -70px;
  bottom: -90px;
  background: rgba(37, 99, 235, 0.12);
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
  border-radius: var(--radius-full);
  background: rgba(37, 99, 235, 0.08);
  color: var(--color-accent);
  border: 1px solid rgba(37, 99, 235, 0.12);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.custom-package-copy h2 {
  margin: 0 0 14px;
  color: var(--custom-text);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  max-width: 720px;
}

.custom-package-description {
  margin: 0;
  max-width: 720px;
  color: var(--custom-text-secondary);
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
  border-radius: var(--radius-full);
  background: var(--custom-surface-subtle);
  color: var(--custom-text-secondary);
  border: 1px solid var(--custom-border);
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
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid var(--custom-border);
  box-shadow: var(--shadow-md);
}

.custom-card-badge {
  display: inline-flex;
  width: fit-content;
  padding: 8px 12px;
  border-radius: var(--radius-full);
  background: rgba(37, 99, 235, 0.08);
  color: var(--color-accent);
  border: 1px solid rgba(37, 99, 235, 0.12);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.custom-package-card h3 {
  margin: 0;
  color: var(--custom-text);
  font-size: 1.4rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.custom-package-card p {
  margin: 0;
  color: var(--custom-text-secondary);
  font-size: 0.96rem;
  line-height: 1.7;
}

.custom-package-btn {
  margin-top: 4px;
  min-height: 52px;
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 14px 18px;
  background: linear-gradient(135deg, var(--color-accent), #60a5fa);
  color: var(--color-white);
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 14px 26px rgba(37, 99, 235, 0.18);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    filter var(--transition-base);
}

.custom-package-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
  box-shadow: 0 18px 32px rgba(37, 99, 235, 0.22);
}

.custom-package-note {
  color: var(--custom-text-muted);
  font-size: 0.84rem;
  line-height: 1.5;
}

@media (max-width: 980px) {
  .custom-package-shell {
    grid-template-columns: 1fr;
  }

  .custom-package-copy h2,
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
