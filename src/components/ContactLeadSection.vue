<template>
  <section id="contacto" class="contact-section">
    <div class="contact-shell">
      <div class="contact-copy">
        <span class="contact-kicker">Contacto</span>

        <h2>
          ¿Listo para impulsar tu marca?
          <span>Te ayudamos a elegir bien.</span>
        </h2>

        <p>
          Cuéntanos qué red quieres mover, qué objetivo tienes y te respondemos
          con una recomendación clara. Sin compromiso, sin vueltas.
        </p>

        <div class="contact-benefits">
          <article>
            <strong>🎁</strong>
            <span>Prueba gratis disponible</span>
          </article>

          <article>
            <strong>⚡</strong>
            <span>Respuesta rápida</span>
          </article>

          <article>
            <strong>🛡️</strong>
            <span>Sin pedir contraseña</span>
          </article>
        </div>

        <div class="platforms-box">
          <span>Redes principales</span>

          <div>
            <strong>Instagram</strong>
            <strong>Facebook</strong>
            <strong>TikTok</strong>
            <strong>X</strong>
          </div>
        </div>
      </div>

      <form
        class="contact-form"
        action="https://formsubmit.co/sasukeamaterasu9@gmail.com"
        method="POST"
      >
        <input
          type="hidden"
          name="_subject"
          value="Nuevo lead desde Impulso Redes"
        />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://impulsocuentas.com/" />

        <div class="form-head">
          <span>🚀 Solicitud rápida</span>
          <h3>Arma tu estrategia</h3>
          <p>Déjanos tus datos y te contactamos para recomendarte el mejor plan.</p>
        </div>

        <div class="form-grid">
          <label class="field">
            <span>Nombre</span>
            <input type="text" name="nombre" placeholder="Ej. Mariana López" required />
          </label>

          <label class="field">
            <span>WhatsApp</span>
            <input type="tel" name="telefono" placeholder="999 123 4567" required />
          </label>

          <label class="field">
            <span>Correo</span>
            <input type="email" name="email" placeholder="tu@correo.com" required />
          </label>

          <label class="field">
            <span>Red de interés</span>
            <select name="servicio" required>
              <option value="" disabled selected>Selecciona una red</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="X">X</option>
              <option value="Paquete personalizado">Paquete personalizado</option>
            </select>
          </label>

          <label class="field field--full">
            <span>¿Qué quieres lograr?</span>
            <textarea
              name="mensaje"
              rows="6"
              placeholder="Ej. Quiero que mi perfil se vea más confiable, subir views en TikTok o armar un paquete para mi negocio."
              required
            ></textarea>
          </label>
        </div>

        <button type="submit" class="submit-btn">
          Enviar solicitud
          <span>→</span>
        </button>

        <p class="form-note">
          Te responderemos por correo o WhatsApp para darte seguimiento.
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

.contact-section {
  margin-top: 44px;
}

.contact-shell {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1fr);
  gap: 24px;
  padding: clamp(22px, 4vw, 34px);
  border-radius: 34px;
  background:
    radial-gradient(circle at 8% 12%, rgba(168, 85, 247, 0.22), transparent 30%),
    radial-gradient(circle at 92% 88%, rgba(37, 99, 235, 0.2), transparent 32%),
    linear-gradient(135deg, rgba(15, 12, 34, 0.94), rgba(8, 8, 20, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.contact-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.contact-kicker {
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

.contact-copy h2 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.06em;
  font-weight: 950;
}

.contact-copy h2 span {
  display: block;
  margin-top: 5px;
  background: linear-gradient(135deg, #a855f7, #ec4899, #38bdf8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.contact-copy p {
  max-width: 620px;
  margin: 16px 0 0;
  color: #cbd5e1;
  font-size: 1rem;
  line-height: 1.65;
}

.contact-benefits {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 22px;
}

.contact-benefits article {
  min-height: 92px;
  padding: 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.065);
}

.contact-benefits strong {
  display: block;
  font-size: 1.35rem;
  margin-bottom: 8px;
}

.contact-benefits span {
  color: #e5e7eb;
  font-size: 0.86rem;
  line-height: 1.35;
  font-weight: 800;
}

.platforms-box {
  margin-top: 18px;
  padding: 16px;
  border-radius: 22px;
  background:
    radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.14), transparent 32%),
    rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.065);
}

.platforms-box > span {
  display: block;
  margin-bottom: 12px;
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.platforms-box div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.platforms-box strong {
  padding: 8px 12px;
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.82rem;
  background: rgba(124, 58, 237, 0.16);
  border: 1px solid rgba(168, 85, 247, 0.14);
}

.contact-form {
  min-width: 0;
  padding: 22px;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.035));
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 24px 54px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(16px);
}

.form-head {
  margin-bottom: 18px;
}

.form-head span {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 10px;
  padding: 7px 11px;
  border-radius: 999px;
  color: #fde68a;
  background: rgba(245, 158, 11, 0.16);
  border: 1px solid rgba(245, 158, 11, 0.18);
  font-size: 0.72rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.form-head h3 {
  margin: 0;
  color: #ffffff;
  font-size: 1.55rem;
  line-height: 1;
  letter-spacing: -0.04em;
}

.form-head p {
  margin: 8px 0 0;
  color: #94a3b8;
  font-size: 0.92rem;
  line-height: 1.5;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.field {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field--full {
  grid-column: 1 / -1;
}

.field span {
  color: #e5e7eb;
  font-size: 0.84rem;
  font-weight: 850;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  min-width: 0;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  padding: 14px 15px;
  background: rgba(7, 10, 24, 0.76);
  color: #ffffff;
  font: inherit;
  outline: none;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
}

.field textarea {
  min-height: 138px;
  resize: vertical;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #94a3b8;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: rgba(168, 85, 247, 0.46);
  box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.12);
  background: rgba(7, 10, 24, 0.9);
}

.submit-btn {
  width: 100%;
  min-height: 54px;
  margin-top: 18px;
  border: none;
  border-radius: 17px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 950;
  background: linear-gradient(135deg, #8b5cf6, #2563eb);
  box-shadow:
    0 18px 38px rgba(99, 102, 241, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    box-shadow 0.18s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow:
    0 24px 46px rgba(99, 102, 241, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

.form-note {
  margin: 12px 0 0;
  color: #94a3b8;
  font-size: 0.82rem;
  line-height: 1.45;
}

@media (max-width: 980px) {
  .contact-shell {
    grid-template-columns: 1fr;
  }

  .contact-benefits {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .contact-section {
    margin-top: 34px;
  }

  .contact-shell {
    padding: 18px;
    border-radius: 26px;
  }

  .contact-copy h2 {
    font-size: clamp(1.9rem, 9vw, 2.6rem);
  }

  .contact-copy p {
    font-size: 0.94rem;
  }

  .contact-benefits {
    grid-template-columns: 1fr;
  }

  .contact-benefits article {
    min-height: auto;
  }

  .contact-form {
    padding: 16px;
    border-radius: 22px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .field--full {
    grid-column: auto;
  }

  .submit-btn {
    min-height: 52px;
  }
}
</style>