<template>
  <Transition name="floating-fade">
    <div
      v-if="showFloating"
      class="floating-socials"
    >
      <div class="floating-brand" aria-hidden="true">
        <span class="floating-brand-text">Síguenos Aquí</span>
      </div>

      <a
        v-for="(item, index) in socialLinks"
        :key="item.name"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        class="floating-btn"
        :class="item.variant"
        :style="{ '--delay': `${index * 90}ms` }"
        :aria-label="`Contactarnos por ${item.name}`"
        :title="item.name"
      >
        <span class="floating-tooltip">
          {{ item.name }}
        </span>

        <span class="floating-btn-icon-wrap">
          <img
            :src="item.icon"
            :alt="item.name"
            class="floating-btn-icon"
          />
        </span>

        <span class="floating-btn-label">
          {{ item.label }}
        </span>
      </a>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import instagramNeon from "../assets/instagram_neon.svg";
import whatsappNeon from "../assets/whatsapp_neon.svg";

const route = useRoute();

const hiddenRoutes = [
  "/cart",
];

const showFloating = computed(() => {
  return !hiddenRoutes.includes(route.path);
});

const socialLinks = [
  {
    name: "Instagram",
    label: "Instagram",
    href: "https://www.instagram.com/impulacuentas_/",
    icon: instagramNeon,
    variant: "instagram",
  },
  {
    name: "WhatsApp",
    label: "WhatsApp",
    href: "https://wa.me/528122126718",
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
  gap: 10px;
}

/* transición al entrar/salir */
.floating-fade-enter-active,
.floating-fade-leave-active {
  transition: all 0.25s ease;
}

.floating-fade-enter-from,
.floating-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}

/* BRAND */
.floating-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  min-height: 52px;
  padding: 8px 14px;

  border-radius: 999px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  background: linear-gradient(
    180deg,
    rgba(7, 12, 24, 0.9) 0%,
    rgba(10, 18, 34, 0.86) 100%
  );

  box-shadow:
    0 14px 28px rgba(2, 6, 23, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  backdrop-filter: blur(16px);
}

.floating-brand-text {
  color: #e2e8f0;
  font-size: 0.86rem;
  font-weight: 800;
}

/* BUTTON */
.floating-btn {
  position: relative;

  display: inline-flex;
  align-items: center;
  gap: 12px;

  min-width: 64px;
  height: 64px;
  padding: 0 16px 0 12px;

  border-radius: 999px;
  text-decoration: none;

  color: white;

  border: 1px solid rgba(255, 255, 255, 0.08);

  background: linear-gradient(
    180deg,
    rgba(7, 12, 24, 0.92) 0%,
    rgba(10, 18, 34, 0.88) 100%
  );

  box-shadow:
    0 16px 34px rgba(2, 6, 23, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  transition: all 0.2s ease;
}

.floating-btn:hover {
  min-width: 190px;
  transform: translateY(-2px);
}

.floating-btn-icon-wrap {
  width: 40px;
  height: 40px;

  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.04);
}

.floating-btn-icon {
  width: 22px;
  height: 22px;
}

.floating-btn-label {
  white-space: nowrap;
  overflow: hidden;
  max-width: 0;
  opacity: 0;

  font-size: 0.95rem;
  font-weight: 800;

  transition: all 0.2s ease;
}

.floating-btn:hover .floating-btn-label {
  max-width: 140px;
  opacity: 1;
}

.floating-tooltip {
  display: none;
}

/* COLORS */
.instagram {
  border-color: rgba(236, 72, 153, 0.2);
}

.whatsapp {
  border-color: rgba(34, 197, 94, 0.2);
}

/* TABLET */
@media (max-width: 900px) {
  .floating-socials {
    right: 14px;
    bottom: 14px;
  }

  .floating-brand {
    display: none;
  }

  .floating-btn {
    width: 56px;
    min-width: 56px;
    height: 56px;
    padding: 0;
    justify-content: center;
  }

  .floating-btn:hover {
    min-width: 56px;
  }

  .floating-btn-label {
    display: none;
  }

  .floating-btn-icon-wrap {
    width: 36px;
    height: 36px;
  }

  .floating-btn-icon {
    width: 20px;
    height: 20px;
  }
}

/* MOBILE */
@media (max-width: 600px) {
  .floating-socials {
    right: 10px;
    bottom: 12px;
    gap: 8px;
  }

  .floating-btn {
    width: 50px;
    min-width: 50px;
    height: 50px;
  }

  .floating-btn-icon-wrap {
    width: 32px;
    height: 32px;
  }

  .floating-btn-icon {
    width: 18px;
    height: 18px;
  }
}
</style>