<template>
  <transition name="install-fade">
    <div
      v-if="shouldShow"
      class="ios-install-prompt"
      role="dialog"
      aria-live="polite"
      aria-label="Instalar ImpulsoRedes"
    >
      <button
        type="button"
        class="ios-install-close"
        @click="dismissPrompt"
        aria-label="Cerrar"
      >
        ×
      </button>

      <div class="ios-install-content">
        <div class="ios-install-icon">📲</div>

        <div class="ios-install-text">
          <h4>Instala ImpulsoRedes</h4>
          <p>
            Para tener acceso rápido desde tu iPhone, abre el menú
            <strong>Compartir</strong>
            <span class="share-icon">⎋</span>
            y luego toca
            <strong>“Agregar a pantalla de inicio”</strong>.
          </p>
        </div>
      </div>

      <div class="ios-install-actions">
        <button type="button" class="ios-install-btn" @click="dismissPrompt">
          Entendido
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const dismissed = ref(false);
const STORAGE_KEY = "impulsoredes-ios-install-prompt-dismissed";

const isIos = computed(() => {
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
});

const isInStandaloneMode = computed(() => {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
});

const isSafari = computed(() => {
  const ua = window.navigator.userAgent.toLowerCase();
  const isSafariBrowser =
    ua.includes("safari") &&
    !ua.includes("crios") &&
    !ua.includes("fxios") &&
    !ua.includes("edgios") &&
    !ua.includes("opr");
  return isSafariBrowser;
});

const shouldShow = computed(() => {
  return (
    isIos.value &&
    isSafari.value &&
    !isInStandaloneMode.value &&
    !dismissed.value
  );
});

onMounted(() => {
  const wasDismissed = localStorage.getItem(STORAGE_KEY) === "true";
  dismissed.value = wasDismissed;
});

const dismissPrompt = () => {
  dismissed.value = true;
  localStorage.setItem(STORAGE_KEY, "true");
};
</script>

<style scoped>
.ios-install-prompt {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 18px;
  z-index: 9999;
  border-radius: 22px;
  padding: 16px 16px 14px;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.96) 0%,
    rgba(17, 24, 39, 0.96) 100%
  );
  border: 1px solid rgba(96, 165, 250, 0.22);
  box-shadow:
    0 18px 40px rgba(2, 6, 23, 0.45),
    0 0 22px rgba(59, 130, 246, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.ios-install-close {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
}

.ios-install-content {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding-right: 30px;
}

.ios-install-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #2563eb, #22c55e);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.22);
}

.ios-install-text h4 {
  margin: 0 0 6px;
  color: #fff;
  font-size: 0.98rem;
  font-weight: 900;
}

.ios-install-text p {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.84rem;
  line-height: 1.45;
}

.share-icon {
  display: inline-block;
  margin: 0 4px;
  color: #93c5fd;
  font-weight: 900;
}

.ios-install-actions {
  margin-top: 14px;
  display: flex;
  justify-content: flex-end;
}

.ios-install-btn {
  min-height: 38px;
  border: none;
  border-radius: 12px;
  padding: 0 14px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #fff;
  font-size: 0.84rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 10px 18px rgba(37, 99, 235, 0.22);
}

.install-fade-enter-active,
.install-fade-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.install-fade-enter-from,
.install-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (min-width: 768px) {
  .ios-install-prompt {
    left: auto;
    right: 24px;
    bottom: 24px;
    width: 360px;
  }
}
</style>
