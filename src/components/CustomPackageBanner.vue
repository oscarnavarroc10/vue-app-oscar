<template>
  <section class="custom-package-banner">
    <div class="custom-package-shell">
      <div class="custom-package-copy">
        <span class="custom-package-kicker">Paquete personalizado</span>
        <h2>No todos los negocios necesitan el mismo plan</h2>
        <p class="custom-package-description">
          Si no encontraste un paquete que encaje con tu marca, tu presupuesto o
          tus objetivos, puedes crear una propuesta personalizada eligiendo las
          redes sociales y los servicios que realmente necesitas.
        </p>
        <div class="custom-package-points">
          <div class="custom-point">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Elige solo lo que sí te sirve
          </div>
          <div class="custom-point">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Combina varias redes sociales
          </div>
          <div class="custom-point">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Arma un paquete a tu medida
          </div>
        </div>
      </div>

      <div class="custom-package-side">
        <div class="custom-package-card">
          <span class="custom-card-badge">Más flexible</span>
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
  margin-top: var(--space-8, 32px);
}

.custom-package-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
  gap: var(--space-6, 24px);
  align-items: stretch;
  padding: var(--space-6, 24px);
  border-radius: var(--radius-xl, 20px);
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
}

.custom-package-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.custom-package-kicker {
  display: inline-flex;
  width: fit-content;
  margin-bottom: var(--space-3, 12px);
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
}

.custom-package-copy h2 {
  margin: 0 0 var(--space-3, 12px);
  color: var(--color-text, #111827);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: var(--font-extrabold, 800);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.custom-package-description {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
  line-height: 1.7;
}

.custom-package-points {
  display: flex;
  flex-direction: column;
  gap: var(--space-2, 8px);
  margin-top: var(--space-5, 20px);
}

.custom-point {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  color: var(--color-text, #111827);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-medium, 500);
}

.custom-point svg {
  color: var(--color-success, #16a34a);
  flex-shrink: 0;
}

.custom-package-side {
  display: flex;
  align-items: stretch;
}

.custom-package-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-3, 12px);
  padding: var(--space-5, 20px);
  border-radius: var(--radius-lg, 16px);
  background: var(--color-surface-alt, #f9fafb);
  border: 1px solid var(--color-border, #e5e7eb);
}

.custom-card-badge {
  display: inline-flex;
  width: fit-content;
  padding: 4px 10px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
}

.custom-package-card h3 {
  margin: 0;
  color: var(--color-text, #111827);
  font-size: var(--text-lg, 1.125rem);
  font-weight: var(--font-bold, 700);
}

.custom-package-card p {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-sm, 0.875rem);
  line-height: 1.7;
}

.custom-package-btn {
  min-height: 46px;
  border: none;
  border-radius: var(--radius-md, 12px);
  padding: 12px 18px;
  background: var(--color-primary, #2563eb);
  color: #fff;
  font-size: var(--text-base, 1rem);
  font-weight: var(--font-semibold, 600);
  cursor: pointer;
  transition: background var(--transition-fast, 150ms ease);
}

.custom-package-btn:hover {
  background: var(--color-primary-hover, #1d4ed8);
}

.custom-package-note {
  color: var(--color-text-muted, #9ca3af);
  font-size: var(--text-xs, 0.75rem);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .custom-package-shell {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .custom-package-shell {
    padding: var(--space-4, 16px);
  }

  .custom-package-card {
    padding: var(--space-4, 16px);
  }
}
</style>
