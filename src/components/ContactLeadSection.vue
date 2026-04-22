<template>
  <section id="contacto" class="contact-lead-section">
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
        action="https://formsubmit.co/oscarnavarroc10@gmail.com"
        method="POST"
      >
        <input
          type="hidden"
          name="_subject"
          value="Nuevo lead desde Impulso Redes"
        />
        <input
          type="hidden"
          name="_captcha"
          value="false"
        />
        <input
          type="hidden"
          name="_template"
          value="table"
        />
        <input
          type="hidden"
          name="_next"
          value="https://impulsoredes.com.mx/"
        />

        <div class="form-grid">
          <label class="field">
            <span>Nombre</span>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              required
            />
          </label>

          <label class="field">
            <span>Teléfono</span>
            <input
              type="tel"
              name="telefono"
              placeholder="999 123 4567"
              required
            />
          </label>

          <label class="field">
            <span>Correo</span>
            <input
              type="email"
              name="email"
              placeholder="tu@correo.com"
              required
            />
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
              rows="6"
              placeholder="Cuéntanos qué buscas, qué red social quieres impulsar y cualquier duda que tengas."
              required
            ></textarea>
          </label>
        </div>

        <button type="submit" class="submit-btn">
          Enviar mensaje
        </button>

        <p class="form-note">
          Al enviar este formulario, recibiremos tu solicitud por correo para
          darte seguimiento.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.contact-lead-section {
  margin-top: 40px;
}

.contact-lead-shell {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 24px;

  padding: 28px;
  border-radius: 28px;

  background: linear-gradient(
    180deg,
    rgba(10, 18, 34, 0.88) 0%,
    rgba(8, 14, 26, 0.92) 100%
  );

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 20px 44px rgba(2, 6, 23, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(14px);
}

.contact-lead-copy,
.contact-form,
.form-grid,
.field {
  min-width: 0;
}

.contact-lead-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-kicker {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 14px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.16);
  color: #ddd6fe;
  font-size: 0.8rem;
  font-weight: 800;
}

.contact-lead-copy h2 {
  margin: 0 0 12px;
  color: white;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
}

.contact-description {
  margin: 0;
  color: #94a3b8;
  line-height: 1.7;
}

.contact-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.highlight-chip {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  font-size: 0.88rem;
  font-weight: 700;
}

.contact-form {
  padding: 22px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field--full {
  grid-column: 1 / -1;
}

.field span {
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 700;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  max-width: 100%;
  min-width: 0;

  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  padding: 14px 16px;

  background: rgba(15, 23, 42, 0.78);
  color: white;
  font: inherit;
  outline: none;
}

.field textarea {
  resize: vertical;
  min-height: 150px;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #94a3b8;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: rgba(96, 165, 250, 0.45);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
}

.submit-btn {
  width: 100%;
  margin-top: 18px;
  min-height: 54px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  font-weight: 900;
  cursor: pointer;
}

.form-note {
  margin-top: 12px;
  color: #94a3b8;
  font-size: 0.85rem;
}

/* TABLET */
@media (max-width: 980px) {
  .contact-lead-shell {
    grid-template-columns: 1fr;
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .contact-lead-shell {
    padding: 18px;
    border-radius: 22px;
    gap: 18px;
  }

  .contact-form {
    padding: 16px;
    border-radius: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .contact-lead-copy h2 {
    font-size: 1.7rem;
    line-height: 1.15;
  }

  .contact-description {
    font-size: 0.95rem;
  }

  .highlight-chip {
    font-size: 0.82rem;
    padding: 8px 12px;
  }

  .field input,
  .field select,
  .field textarea {
    padding: 13px 14px;
    border-radius: 14px;
  }

  .submit-btn {
    min-height: 50px;
  }
}

/* SMALL IPHONE */
@media (max-width: 480px) {
  .contact-lead-shell {
    padding: 14px;
  }

  .contact-form {
    padding: 14px;
  }

  .contact-lead-copy h2 {
    font-size: 1.45rem;
  }
}
</style>