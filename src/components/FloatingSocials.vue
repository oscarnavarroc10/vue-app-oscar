<template>
  <Transition name="floating-fade">
    <div v-if="showFloating" class="floating-socials">
      <div class="floating-brand">
        <span class="floating-brand-text">Síguenos</span>
      </div>

      <a
        v-for="(item, index) in socialLinks"
        :key="item.name"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        class="floating-btn"
        :class="item.variant"
        :style="{ '--delay': index * 90 + 'ms' }"
        :aria-label="'Contactarnos por ' + item.name"
        :title="item.name"
      >
        <span class="floating-btn-icon-wrap">
          <img :src="item.icon" :alt="item.name" class="floating-btn-icon" />
        </span>
        <span class="floating-btn-label">{{ item.label }}</span>
      </a>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/config/constants";

import instagramNeon from "@/assets/instagram_neon.svg";
import whatsappNeon from "@/assets/whatsapp_neon.svg";

const route = useRoute();

const hiddenRoutes = ["/cart"];

const showFloating = computed(() => !hiddenRoutes.includes(route.path));

const socialLinks = [
  {
    name: "Instagram",
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: instagramNeon,
    variant: "instagram",
  },
  {
    name: "WhatsApp",
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: whatsappNeon,
    variant: "whatsapp",
  },
];
</script>

<style scoped>
.floating-socials {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2, 8px);
}

.floating-fade-enter-active,
.floating-fade-leave-active {
  transition: all 0.25s ease;
}

.floating-fade-enter-from,
.floating-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}

.floating-brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  min-height: 40px;
  padding: 6px 14px;
  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--color-border, #e5e7eb);
  background: var(--color-surface, #fff);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
}

.floating-brand-text {
  color: var(--color-text-secondary, #6b7280);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
}

.floating-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2, 8px);
  min-width: 52px;
  height: 52px;
  padding: 0 14px 0 10px;
  border-radius: var(--radius-full, 9999px);
  text-decoration: none;
  color: var(--color-text, #111827);
  border: 1px solid var(--color-border, #e5e7eb);
  background: var(--color-surface, #fff);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.06));
  transition: all var(--transition-fast, 150ms ease);
}

.floating-btn:hover {
  min-width: 160px;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg, 0 8px 24px rgba(0,0,0,0.08));
}

.floating-btn-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full, 9999px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-alt, #f3f4f6);
}

.floating-btn-icon {
  width: 20px;
  height: 20px;
}

.floating-btn-label {
  white-space: nowrap;
  overflow: hidden;
  max-width: 0;
  opacity: 0;
  font-size: var(--text-sm, 0.875rem);
  font-weight: var(--font-semibold, 600);
  transition: all 0.2s ease;
}

.floating-btn:hover .floating-btn-label {
  max-width: 120px;
  opacity: 1;
}

.instagram {
  border-color: rgba(236, 72, 153, 0.2);
}

.whatsapp {
  border-color: rgba(34, 197, 94, 0.2);
}

@media (max-width: 768px) {
  .floating-socials {
    right: 12px;
    bottom: 12px;
  }

  .floating-brand {
    display: none;
  }

  .floating-btn {
    width: 48px;
    min-width: 48px;
    height: 48px;
    padding: 0;
    justify-content: center;
  }

  .floating-btn:hover {
    min-width: 48px;
  }

  .floating-btn-label {
    display: none;
  }
}
</style>
