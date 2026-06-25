<template>
  <section class="contact-lead-section">
    <div class="contact-lead-shell">
      <div class="contact-lead-copy">
        <span class="contact-kicker">Contacto</span>
        <h2>Cuéntanos qué necesitas y te contactamos</h2>
        <p class="contact-description">
          Déjanos tu nombre, teléfono y mensaje. Te respondemos por correo o te
          contactamos para ayudarte a armar el plan ideal para tu marca.
        </p>
        <div class="contact-highlights">
          <div class="highlight-chip">Respuesta personalizada</div>
          <div class="highlight-chip">Sin compromiso</div>
          <div class="highlight-chip">Atención por correo o WhatsApp</div>
        </div>
      </div>

      <form
        class="contact-form"
        :action="formAction"
        method="POST"
      >
        <input type="hidden" name="_subject" value="Nuevo lead desde Impulso Redes" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://impulsoredes.com.mx/" />

        <div class="form-grid">
          <label class="field">
            <span>Nombre</span>
            <input type="text" name="nombre" placeholder="Tu nombre" required />
          </label>
          <label class="field">
            <span>Teléfono</span>
            <input type="tel" name="telefono" placeholder="999 123 4567" required />
          </label>
          <label class="field">
            <span>Correo</span>
            <input type="email" name="email" placeholder="tu@correo.com" required />
          </label>
          <label class="field">
            <span>Servicio de interés</span>
            <select name="servicio" required>
              <option value="" disabled selected>Selecciona una opción</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
              <option value="Spotify">Spotify</option>
              <option value="Telegram">Telegram</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Paquete personalizado">Paquete personalizado</option>
            </select>
          </label>
          <label class="field field--full">
            <span>Mensaje</span>
            <textarea
              name="mensaje"
              rows="5"
              placeholder="Cuéntanos qué buscas, qué red social quieres impulsar y cualquier duda que tengas."
              required
            ></textarea>
          </label>
        </div>

        <button type="submit" class="submit-btn">Enviar mensaje</button>
        <p class="form-note">
          Al enviar este formulario, recibiremos tu solicitud por correo para darte seguimiento.
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { CONTACT_EMAIL } from "@/config/constants";

const formAction = `https://formsubmit.co/${CONTACT_EMAIL}`;
</script>

<style scoped>
.contact-lead-section {
  margin-top: var(--space-8, 32px);
}

.contact-lead-shell {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: var(--space-6, 24px);
  padding: var(--space-6, 24px);
  border-radius: var(--radius-xl, 20px);
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
}

.contact-lead-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.contact-kicker {
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

.contact-lead-copy h2 {
  margin: 0 0 var(--space-3, 12px);
  color: var(--color-text, #111827);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: var(--font-extrabold, 800);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.contact-description {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
  line-height: 1.7;
}

.contact-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2, 8px);
  margin-top: var(--space-5, 20px);
}

.highlight-chip {
  padding: 8px 14px;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-surface-alt, #f3f4f6);
  border: 1px solid var(--color-border, #e5e7eb);
  color: var(--color-text, #111827);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-medium, 500);
}

.contact-form {
  padding: var(--space-5, 20px);
  border-radius: var(--radius-lg, 16px);
  background: var(--color-surface-alt, #f9fafb);
  border: 1px solid var(--color-border, #e5e7eb);
  min-width: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4, 16px);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.field--full {
  grid-column: 1 / -1;
}

.field span {
  color: var(--color-text, #111827);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-medium, 500);
}

.field input,
.field select,
.field textarea {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-md, 12px);
  padding: 12px 14px;
  background: var(--color-surface, #fff);
  color: var(--color-text, #111827);
  font: inherit;
  font-size: var(--text-sm, 0.875rem);
  outline: none;
  transition: border-color var(--transition-fast, 150ms ease), box-shadow var(--transition-fast, 150ms ease);
}

.field textarea {
  resize: vertical;
  min-height: 120px;
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--color-text-muted, #9ca3af);
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--color-primary, #2563eb);
  box-shadow: 0 0 0 3px var(--color-primary-soft, rgba(37,99,235,0.08));
}

.submit-btn {
  width: 100%;
  margin-top: var(--space-4, 16px);
  min-height: 48px;
  border: none;
  border-radius: var(--radius-md, 12px);
  background: var(--color-primary, #2563eb);
  color: #fff;
  font-weight: var(--font-semibold, 600);
  font-size: var(--text-base, 1rem);
  cursor: pointer;
  transition: background var(--transition-fast, 150ms ease);
}

.submit-btn:hover {
  background: var(--color-primary-hover, #1d4ed8);
}

.form-note {
  margin: var(--space-3, 12px) 0 0;
  color: var(--color-text-muted, #9ca3af);
  font-size: var(--text-xs, 0.75rem);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .contact-lead-shell {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contact-lead-shell {
    padding: var(--space-4, 16px);
  }

  .contact-form {
    padding: var(--space-4, 16px);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .contact-lead-copy h2 {
    font-size: 1.5rem;
  }
}
</style>
