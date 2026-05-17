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

      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-head">
          <span>🚀 Solicitud rápida</span>
          <h3>Arma tu estrategia</h3>
          <p>Déjanos tus datos y te contactamos para recomendarte el mejor plan.</p>
        </div>

        <input
          v-model="form.website"
          type="text"
          name="website"
          class="honeypot"
          tabindex="-1"
          autocomplete="off"
        />

        <div class="form-grid">
          <label class="field">
            <span>Nombre</span>
            <input
              v-model.trim="form.nombre"
              type="text"
              name="nombre"
              placeholder="Ej. Mariana López"
              autocomplete="name"
              required
            />
          </label>

          <label class="field">
            <span>WhatsApp</span>
            <input
              v-model.trim="form.telefono"
              type="tel"
              name="telefono"
              placeholder="999 123 4567"
              autocomplete="tel"
              required
            />
          </label>

          <label class="field">
            <span>Correo</span>
            <input
              v-model.trim="form.email"
              type="email"
              name="email"
              placeholder="tu@correo.com"
              autocomplete="email"
              required
            />
          </label>

          <label class="field">
            <span>Red de interés</span>
            <select v-model="form.servicio" name="servicio" required>
              <option value="" disabled>Selecciona una red</option>
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
              v-model.trim="form.mensaje"
              name="mensaje"
              rows="6"
              placeholder="Ej. Quiero que mi perfil se vea más confiable, subir views en TikTok o armar un paquete para mi negocio."
              required
            ></textarea>
          </label>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <template v-if="isSubmitting">
            Enviando solicitud
            <span class="btn-spinner"></span>
          </template>

          <template v-else>
            Enviar solicitud
            <span>→</span>
          </template>
        </button>

        <p class="form-note">
          Te responderemos por correo o WhatsApp para darte seguimiento.
        </p>
      </form>
    </div>

    <div v-if="modal.isVisible" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-card" :class="{ 'modal-card--error': modal.type === 'error' }">
        <button class="modal-close" type="button" aria-label="Cerrar" @click="closeModal">
          ×
        </button>

        <div class="modal-icon">
          {{ modal.type === 'success' ? '✅' : '⚠️' }}
        </div>

        <h3>{{ modal.title }}</h3>
        <p>{{ modal.message }}</p>

        <div class="modal-actions">
          <a
            v-if="modal.type === 'error'"
            class="modal-whatsapp"
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contactar por WhatsApp
          </a>

          <button class="modal-secondary" type="button" @click="closeModal">
            {{ modal.type === 'success' ? 'Perfecto' : 'Cerrar' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/sasukeamaterasu9@gmail.com'
const WHATSAPP_NUMBER = '528122126718'
const REQUEST_TIMEOUT_MS = 12000

const isSubmitting = ref(false)

const form = reactive({
  nombre: '',
  telefono: '',
  email: '',
  servicio: '',
  mensaje: '',
  website: '',
})

const modal = reactive({
  isVisible: false,
  type: 'success',
  title: '',
  message: '',
})

const whatsappMessage = computed(() => {
  const lines = [
    'Hola, vengo de Impulso Cuentas.',
    '',
    `Nombre: ${form.nombre || 'No especificado'}`,
    `WhatsApp: ${form.telefono || 'No especificado'}`,
    `Correo: ${form.email || 'No especificado'}`,
    `Red de interés: ${form.servicio || 'No especificado'}`,
    '',
    `Objetivo: ${form.mensaje || 'Quiero información para impulsar mi marca.'}`,
  ]

  return encodeURIComponent(lines.join('\n'))
})

const whatsappUrl = computed(() => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage.value}`
})

const showModal = ({ type, title, message }) => {
  modal.type = type
  modal.title = title
  modal.message = message
  modal.isVisible = true
}

const closeModal = () => {
  modal.isVisible = false
}

const resetForm = () => {
  form.nombre = ''
  form.telefono = ''
  form.email = ''
  form.servicio = ''
  form.mensaje = ''
  form.website = ''
}

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const isValidPhone = (phone) => {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10
}

const validateForm = () => {
  if (!form.nombre || !form.telefono || !form.email || !form.servicio || !form.mensaje) {
    showModal({
      type: 'error',
      title: 'Faltan algunos datos',
      message:
        'Por favor completa todos los campos para poder enviarnos tu solicitud. También puedes contactarnos directo por WhatsApp.',
    })

    return false
  }

  if (!isValidPhone(form.telefono)) {
    showModal({
      type: 'error',
      title: 'WhatsApp no válido',
      message:
        'Revisa que tu número tenga al menos 10 dígitos. Si prefieres, puedes contactarnos directo por WhatsApp.',
    })

    return false
  }

  if (!isValidEmail(form.email)) {
    showModal({
      type: 'error',
      title: 'Correo no válido',
      message:
        'Revisa que tu correo esté escrito correctamente. Si prefieres, puedes contactarnos directo por WhatsApp.',
    })

    return false
  }

  return true
}

const buildPayload = () => {
  const payload = new FormData()

  payload.append('_subject', 'Nuevo lead desde Impulso Cuentas')
  payload.append('_template', 'table')
  payload.append('_captcha', 'false')
  payload.append('nombre', form.nombre)
  payload.append('telefono', form.telefono)
  payload.append('email', form.email)
  payload.append('servicio', form.servicio)
  payload.append('mensaje', form.mensaje)

  return payload
}

const submitForm = async () => {
  if (form.website) return
  if (isSubmitting.value) return
  if (!validateForm()) return

  isSubmitting.value = true

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      body: buildPayload(),
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`FormSubmit failed with status ${response.status}`)
    }

    showModal({
      type: 'success',
      title: 'Solicitud enviada',
      message:
        'Tu mensaje se envió correctamente. Te contactaremos pronto por WhatsApp o correo para ayudarte a elegir el mejor plan.',
    })

    resetForm()
  } catch (error) {
    showModal({
      type: 'error',
      title: 'Servidor saturado por el momento',
      message:
        'No pudimos enviar tu solicitud en este momento. Para recibir atención más rápida, contáctanos directamente por WhatsApp.',
    })
  } finally {
    window.clearTimeout(timeoutId)
    isSubmitting.value = false
  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.contact-section {
  position: relative;
  width: 100%;
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
    radial-gradient(circle at 8% 12%, rgba(168, 85, 247, 0.18), transparent 30%),
    radial-gradient(circle at 92% 88%, rgba(37, 99, 235, 0.16), transparent 32%),
    linear-gradient(135deg, #0f0c22, #080814);
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
  background: #111426;
  border: 1px solid rgba(255, 255, 255, 0.085);
  box-shadow:
    0 24px 54px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

.honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
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
  background: #070a18;
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
  background: #090d22;
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
    box-shadow 0.18s ease,
    opacity 0.18s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow:
    0 24px 46px rgba(99, 102, 241, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}

.btn-spinner {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 3px solid rgba(255, 255, 255, 0.28);
  border-top-color: #ffffff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.form-note {
  margin: 12px 0 0;
  color: #94a3b8;
  font-size: 0.82rem;
  line-height: 1.45;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: grid;
  place-items: center;
  padding: 18px;
  background: rgba(2, 6, 23, 0.76);
  backdrop-filter: blur(12px);
}

.modal-card {
  position: relative;
  width: min(100%, 460px);
  padding: 28px;
  border-radius: 28px;
  text-align: center;
  background:
    radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.22), transparent 36%),
    linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(8, 8, 20, 0.98));
  border: 1px solid rgba(34, 197, 94, 0.22);
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.modal-card--error {
  background:
    radial-gradient(circle at 50% 0%, rgba(236, 72, 153, 0.22), transparent 36%),
    linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(8, 8, 20, 0.98));
  border-color: rgba(236, 72, 153, 0.24);
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.35rem;
  line-height: 1;
  background: rgba(255, 255, 255, 0.08);
}

.modal-icon {
  margin-bottom: 14px;
  font-size: 2.4rem;
}

.modal-card h3 {
  margin: 0;
  color: #ffffff;
  font-size: 1.5rem;
  letter-spacing: -0.04em;
}

.modal-card p {
  margin: 12px 0 0;
  color: #cbd5e1;
  font-size: 0.96rem;
  line-height: 1.6;
}

.modal-actions {
  display: grid;
  gap: 10px;
  margin-top: 22px;
}

.modal-whatsapp,
.modal-secondary {
  min-height: 48px;
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 950;
}

.modal-whatsapp {
  color: #ffffff;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 16px 34px rgba(34, 197, 94, 0.28);
}

.modal-secondary {
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
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
    grid-template-columns: 1fr;
    padding: 18px;
    border-radius: 26px;
    background:
      radial-gradient(circle at 10% 8%, rgba(168, 85, 247, 0.16), transparent 30%),
      linear-gradient(135deg, #0f0c22, #080814);
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
    background: #111426;
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

  .modal-card {
    width: min(100%, 420px);
    padding: 24px 18px;
    border-radius: 24px;
  }
}
</style>