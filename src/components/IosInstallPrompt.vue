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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="ios-install-content">
        <div class="ios-install-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="ios-install-text">
          <h4>Instala ImpulsoRedes</h4>
          <p>
            Para tener acceso rápido desde tu iPhone, abre el menú
            <strong>Compartir</strong>
            y luego toca
            <strong>"Agregar a pantalla de inicio"</strong>.
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

const isInStandaloneMode = computed(() =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true
);

const isSafari = computed(() => {
  const ua = window.navigator.userAgent.toLowerCase();
  return (
    ua.includes("safari") &&
    !ua.includes("crios") &&
    !ua.includes("fxios") &&
    !ua.includes("edgios") &&
    !ua.includes("opr")
  );
});

const shouldShow = computed(() =>
  isIos.value && isSafari.value && !isInStandaloneMode.value && !dismissed.value
);

onMounted(() => {
  dismissed.value = localStorage.getItem(STORAGE_KEY) === "true";
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
  border-radius: var(--radius-xl, 20px);
  padding: var(--space-4, 16px);
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  box-shadow: var(--shadow-lg, 0 8px 24px rgba(0,0,0,0.08));
}

.ios-install-close {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--radius-full, 9999px);
  background: var(--color-surface, #fff);
  color: var(--color-text-secondary, #6b7280);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.ios-install-content {
  display: flex;
  gap: var(--space-3, 12px);
  align-items: flex-start;
  padding-right: 30px;
}

.ios-install-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: var(--radius-md, 12px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-soft, rgba(37,99,235,0.08));
  color: var(--color-primary, #2563eb);
}

.ios-install-text h4 {
  margin: 0 0 4px;
  color: var(--color-text, #111827);
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-bold, 700);
}

.ios-install-text p {
  margin: 0;
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-xs, 0.75rem);
  line-height: 1.5;
}

.ios-install-actions {
  margin-top: var(--space-3, 12px);
  display: flex;
  justify-content: flex-end;
}

.ios-install-btn {
  min-height: 34px;
  border: none;
  border-radius: var(--radius-sm, 8px);
  padding: 0 14px;
  background: var(--color-primary, #2563eb);
  color: #fff;
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
  cursor: pointer;
  transition: background var(--transition-fast, 150ms ease);
}

.ios-install-btn:hover {
  background: var(--color-primary-hover, #1d4ed8);
}

.install-fade-enter-active,
.install-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
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
