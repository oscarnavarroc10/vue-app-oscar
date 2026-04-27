<template>
  <section class="custom-package-banner">
    <div class="custom-shell">
      <div class="custom-bg custom-bg--one"></div>
      <div class="custom-bg custom-bg--two"></div>

      <div class="custom-copy">
        <span class="custom-kicker">Plan personalizado</span>

        <h2>
          ¿No encontraste el plan ideal?
          <span>Arma uno a tu medida.</span>
        </h2>

        <p>
          Elige solo los servicios que necesitas, combina redes sociales y crea
          un paquete pensado para tu marca, tu presupuesto y tus objetivos.
        </p>

        <div class="custom-benefits">
          <span>Instagram</span>
          <span>TikTok</span>
          <span>Facebook</span>
          <span>X</span>
        </div>

        <button class="custom-btn" type="button" @click="$emit('customize')">
          Crear mi paquete personalizado
          <span>→</span>
        </button>
      </div>

      <div class="custom-preview" aria-hidden="true">
        <div class="preview-card preview-card--main">
          <div class="preview-top">
            <span>Tu paquete</span>
            <strong>$---</strong>
          </div>

          <div class="preview-row">
            <span class="preview-dot instagram"></span>
            <p>Seguidores Instagram</p>
            <strong>+1,000</strong>
          </div>

          <div class="preview-row">
            <span class="preview-dot tiktok"></span>
            <p>Views TikTok</p>
            <strong>+10,000</strong>
          </div>

          <div class="preview-row">
            <span class="preview-dot facebook"></span>
            <p>Likes Facebook</p>
            <strong>+2,500</strong>
          </div>

          <div class="preview-progress">
            <span></span>
          </div>
        </div>

        <div class="preview-card preview-card--floating">
          <span>Flexible</span>
          <strong>Solo pagas lo que eliges</strong>
        </div>

        <div class="preview-pill preview-pill--one">⚡ Rápido</div>
        <div class="preview-pill preview-pill--two">🛡️ Seguro</div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(["customize"]);
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.custom-package-banner {
  margin-top: 18px;
}

.custom-shell {
  position: relative;
  overflow: hidden;
  min-height: 360px;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(380px, 1.05fr);
  align-items: center;
  gap: 28px;
  padding: clamp(24px, 4vw, 42px);
  border-radius: 34px;
  background:
    radial-gradient(circle at 80% 18%, rgba(236, 72, 153, 0.14), transparent 28%),
    radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.16), transparent 30%),
    linear-gradient(135deg, rgba(17, 12, 40, 0.96), rgba(8, 8, 20, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.custom-bg {
  position: absolute;
  border-radius: 999px;
  filter: blur(72px);
  opacity: 0.48;
  pointer-events: none;
}

.custom-bg--one {
  width: 320px;
  height: 320px;
  left: -120px;
  top: -120px;
  background: #8b5cf6;
}

.custom-bg--two {
  width: 280px;
  height: 280px;
  right: -90px;
  bottom: -120px;
  background: #ec4899;
}

.custom-copy,
.custom-preview {
  position: relative;
  z-index: 1;
}

.custom-kicker {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 16px;
  padding: 8px 13px;
  border-radius: 999px;
  color: #f0abfc;
  background: rgba(168, 85, 247, 0.14);
  border: 1px solid rgba(216, 180, 254, 0.16);
  font-size: 0.76rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.custom-copy h2 {
  margin: 0;
  max-width: 650px;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3.55rem);
  line-height: 0.98;
  letter-spacing: -0.055em;
  font-weight: 950;
}

.custom-copy h2 span {
  display: block;
  margin-top: 6px;
  background: linear-gradient(135deg, #a855f7, #ec4899, #38bdf8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.custom-copy p {
  max-width: 620px;
  margin: 18px 0 0;
  color: #cbd5e1;
  font-size: 1.02rem;
  line-height: 1.7;
}

.custom-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.custom-benefits span {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 13px;
  border-radius: 999px;
  color: #e5e7eb;
  font-size: 0.84rem;
  font-weight: 850;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.075);
}

.custom-btn {
  margin-top: 26px;
  min-height: 56px;
  padding: 0 20px 0 24px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 950;
  background: linear-gradient(135deg, #8b5cf6, #2563eb);
  box-shadow:
    0 18px 38px rgba(99, 102, 241, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

.custom-btn span {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.13);
}

.custom-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow:
    0 24px 46px rgba(99, 102, 241, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

.custom-preview {
  min-height: 310px;
}

.preview-card {
  position: absolute;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(15, 12, 34, 0.94), rgba(9, 8, 20, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 28px 58px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.preview-card--main {
  width: min(100%, 460px);
  right: 30px;
  top: 18px;
  padding: 22px;
}

.preview-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.preview-top span {
  color: #94a3b8;
  font-size: 0.88rem;
  font-weight: 850;
}

.preview-top strong {
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 950;
}

.preview-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 13px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.preview-row p {
  margin: 0;
  color: #e5e7eb;
  font-size: 0.93rem;
  font-weight: 800;
}

.preview-row strong {
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 950;
}

.preview-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  box-shadow: 0 0 14px currentColor;
}

.preview-dot.instagram {
  background: #ec4899;
  color: #ec4899;
}

.preview-dot.tiktok {
  background: #22d3ee;
  color: #22d3ee;
}

.preview-dot.facebook {
  background: #3b82f6;
  color: #3b82f6;
}

.preview-progress {
  height: 10px;
  overflow: hidden;
  margin-top: 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
}

.preview-progress span {
  display: block;
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #8b5cf6, #ec4899, #38bdf8);
  box-shadow: 0 0 18px rgba(236, 72, 153, 0.35);
}

.preview-card--floating {
  width: 210px;
  left: 10px;
  bottom: 24px;
  padding: 18px;
  transform: rotate(-5deg);
}

.preview-card--floating span {
  display: block;
  margin-bottom: 8px;
  color: #a78bfa;
  font-size: 0.78rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.preview-card--floating strong {
  display: block;
  color: #ffffff;
  font-size: 1.05rem;
  line-height: 1.18;
}

.preview-pill {
  position: absolute;
  z-index: 2;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 950;
  background: rgba(255, 255, 255, 0.075);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(14px);
}

.preview-pill--one {
  top: 0;
  left: 80px;
}

.preview-pill--two {
  right: 0;
  bottom: 28px;
}

@media (max-width: 980px) {
  .custom-shell {
    grid-template-columns: 1fr;
  }

  .custom-preview {
    min-height: 330px;
  }

  .preview-card--main {
    right: 0;
  }

  .preview-card--floating {
    left: 0;
  }
}

@media (max-width: 640px) {
  .custom-shell {
    padding: 22px;
    border-radius: 26px;
  }

  .custom-copy h2 {
    font-size: clamp(1.9rem, 10vw, 2.6rem);
  }

  .custom-copy p {
    font-size: 0.95rem;
  }

  .custom-btn {
    width: 100%;
    justify-content: center;
    min-height: 54px;
    padding: 0 16px;
    font-size: 0.92rem;
  }

  .custom-preview {
    min-height: 300px;
  }

  .preview-card--main {
    width: 100%;
    top: 8px;
    padding: 18px;
    border-radius: 24px;
  }

  .preview-card--floating {
    display: none;
  }

  .preview-pill--one {
    left: 12px;
    top: auto;
    bottom: 4px;
  }

  .preview-pill--two {
    right: 12px;
    bottom: 4px;
  }

  .preview-row p {
    font-size: 0.82rem;
  }

  .preview-row strong {
    font-size: 0.82rem;
  }
}
</style>