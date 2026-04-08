<template>
  <section class="promo-banner">
    <div class="promo-content">
      <span class="promo-pill">Nuevo</span>
      <h2>Solicita tu prueba gratis</h2>
      <p>
        Descubre cómo se vería tu estrategia digital antes de contratar.
        <strong>* Aplica restricciones</strong>
      </p>

      <div class="promo-actions">
        <button class="promo-btn primary">Quiero mi prueba gratis</button>
        <button class="promo-btn secondary">Ver servicios</button>
      </div>
    </div>

    <div class="promo-glow promo-glow-1"></div>
    <div class="promo-glow promo-glow-2"></div>
  </section>
</template>

<style scoped>
.promo-banner {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: 34px;
  margin-bottom: 28px;
  background:
    linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(29, 78, 216, 0.95)),
    radial-gradient(
      circle at top right,
      rgba(255, 255, 255, 0.12),
      transparent 30%
    );
  color: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
}

.promo-content {
  position: relative;
  z-index: 2;
  max-width: 720px;
}

.promo-pill {
  display: inline-flex;
  margin-bottom: 14px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.22);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.promo-banner h2 {
  margin: 0 0 10px;
  font-size: 2.1rem;
  line-height: 1.1;
}

.promo-banner p {
  margin: 0;
  max-width: 640px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.6;
  font-size: 1rem;
}

.promo-actions {
  display: flex;
  gap: 12px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.promo-btn {
  border: none;
  border-radius: 14px;
  padding: 14px 18px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
}

.promo-btn.primary {
  background: #ffffff;
  color: #111827;
}

.promo-btn.secondary {
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.promo-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(10px);
  opacity: 0.5;
}

.promo-glow-1 {
  width: 220px;
  height: 220px;
  background: rgba(168, 85, 247, 0.5);
  top: -40px;
  right: 80px;
}

.promo-glow-2 {
  width: 180px;
  height: 180px;
  background: rgba(34, 197, 94, 0.35);
  bottom: -40px;
  right: 220px;
}

@media (max-width: 900px) {
  .promo-banner {
    padding: 24px;
  }

  .promo-banner h2 {
    font-size: 1.7rem;
  }
}
</style>
