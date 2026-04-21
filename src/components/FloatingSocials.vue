<template>
  <div class="floating-socials">
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
</template>

<script setup>
import logoImpulso from "../assets/impulso_redes_logo.png";
import instagramNeon from "../assets/instagram_neon.svg";
import facebookNeon from "../assets/facebook_neon.svg";
import whatsappNeon from "../assets/whatsapp_neon.svg";
import twitterNeon from "../assets/twitter_neon.svg";

const socialLinks = [
  {
    name: "Instagram",
    label: "Instagram",
    href: "https://instagram.com/",
    icon: instagramNeon,
    variant: "instagram",
  },
  {
    name: "Facebook",
    label: "Facebook",
    href: "https://facebook.com/",
    icon: facebookNeon,
    variant: "facebook",
  },
  {
    name: "WhatsApp",
    label: "WhatsApp",
    href: "https://wa.me/5219999999999",
    icon: whatsappNeon,
    variant: "whatsapp",
  },
  {
    name: "X",
    label: "X / Twitter",
    href: "https://x.com/",
    icon: twitterNeon,
    variant: "x",
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

.floating-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  min-height: 52px;
  padding: 8px 14px 8px 10px;

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
  -webkit-backdrop-filter: blur(16px);

  pointer-events: none;

  animation: dockEnter 0.6s ease both;
}

.floating-brand-logo {
  width: 34px;
  height: 34px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.2));
}

.floating-brand-text {
  color: #e2e8f0;
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.floating-btn {
  position: relative;
  overflow: visible;

  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;

  min-width: 64px;
  height: 64px;
  padding: 0 16px 0 12px;

  border-radius: 999px;
  text-decoration: none;

  color: #ffffff;

  border: 1px solid rgba(255, 255, 255, 0.08);

  background: linear-gradient(
    180deg,
    rgba(7, 12, 24, 0.92) 0%,
    rgba(10, 18, 34, 0.88) 100%
  );

  box-shadow:
    0 16px 34px rgba(2, 6, 23, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    min-width 0.24s ease,
    border-color 0.2s ease,
    background 0.2s ease;

  opacity: 0;
  transform: translateX(22px) scale(0.94);
  animation: socialEnter 0.5s ease forwards;
  animation-delay: var(--delay);
}

.floating-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.floating-btn:hover {
  min-width: 198px;
  transform: translateY(-2px);

  box-shadow:
    0 20px 40px rgba(2, 6, 23, 0.34),
    0 0 20px rgba(59, 130, 246, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.floating-btn:hover::before {
  opacity: 1;
}

.floating-tooltip {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%) translateX(6px);

  padding: 8px 12px;
  border-radius: 12px;

  white-space: nowrap;
  pointer-events: none;

  font-size: 0.82rem;
  font-weight: 800;
  color: #e2e8f0;

  background: rgba(7, 12, 24, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 12px 24px rgba(2, 6, 23, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    visibility 0.18s ease;
}

.floating-tooltip::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -5px;
  width: 10px;
  height: 10px;
  transform: translateY(-50%) rotate(45deg);

  background: rgba(7, 12, 24, 0.94);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.floating-btn:hover .floating-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(0);
}

.floating-btn-icon-wrap {
  position: relative;
  z-index: 1;

  flex-shrink: 0;

  width: 40px;
  height: 40px;

  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.floating-btn-icon {
  width: 23px;
  height: 23px;
  object-fit: contain;
  display: block;
}

.floating-btn-label {
  position: relative;
  z-index: 1;

  white-space: nowrap;
  overflow: hidden;

  max-width: 0;
  opacity: 0;

  font-size: 0.96rem;
  font-weight: 800;
  letter-spacing: 0.01em;

  transition:
    max-width 0.22s ease,
    opacity 0.18s ease,
    transform 0.18s ease;

  transform: translateX(-4px);
}

.floating-btn:hover .floating-btn-label {
  max-width: 150px;
  opacity: 1;
  transform: translateX(0);
}

.instagram {
  border-color: rgba(236, 72, 153, 0.18);
}

.instagram::before {
  background:
    radial-gradient(circle at 18% 50%, rgba(245, 133, 41, 0.18), transparent 28%),
    radial-gradient(circle at 82% 50%, rgba(129, 52, 175, 0.18), transparent 30%),
    linear-gradient(135deg, rgba(245, 133, 41, 0.08), rgba(221, 42, 123, 0.12), rgba(129, 52, 175, 0.08));
}

.instagram:hover {
  border-color: rgba(236, 72, 153, 0.28);
}

.facebook {
  border-color: rgba(59, 130, 246, 0.18);
}

.facebook::before {
  background:
    radial-gradient(circle at 20% 50%, rgba(24, 119, 242, 0.18), transparent 28%),
    linear-gradient(135deg, rgba(24, 119, 242, 0.08), rgba(96, 165, 250, 0.12));
}

.facebook:hover {
  border-color: rgba(59, 130, 246, 0.28);
}

.whatsapp {
  border-color: rgba(34, 197, 94, 0.18);
}

.whatsapp::before {
  background:
    radial-gradient(circle at 20% 50%, rgba(37, 211, 102, 0.18), transparent 28%),
    linear-gradient(135deg, rgba(37, 211, 102, 0.08), rgba(74, 222, 128, 0.12));
}

.whatsapp:hover {
  border-color: rgba(34, 197, 94, 0.28);
}

.x {
  border-color: rgba(148, 163, 184, 0.14);
}

.x::before {
  background:
    radial-gradient(circle at 20% 50%, rgba(148, 163, 184, 0.12), transparent 28%),
    linear-gradient(135deg, rgba(71, 85, 105, 0.08), rgba(148, 163, 184, 0.08));
}

.x:hover {
  border-color: rgba(148, 163, 184, 0.24);
}

@keyframes socialEnter {
  0% {
    opacity: 0;
    transform: translateX(22px) scale(0.94);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes dockEnter {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.96);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 900px) {
  .floating-socials {
    right: 14px;
    bottom: 14px;
    gap: 9px;
  }

  .floating-brand {
    min-height: 46px;
    padding: 7px 12px 7px 9px;
  }

  .floating-brand-logo {
    width: 30px;
    height: 30px;
  }

  .floating-brand-text {
    font-size: 0.8rem;
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
    transform: translateY(-2px) scale(1.03);
  }

  .floating-btn-icon-wrap {
    width: 36px;
    height: 36px;
  }

  .floating-btn-icon {
    width: 20px;
    height: 20px;
  }

  .floating-btn-label {
    display: none;
  }

  .floating-tooltip {
    right: calc(100% + 10px);
    font-size: 0.76rem;
    padding: 7px 10px;
  }
}

@media (max-width: 600px) {
  .floating-socials {
    right: 12px;
    bottom: 12px;
  }

  .floating-brand {
    display: none;
  }

  .floating-btn {
    width: 52px;
    min-width: 52px;
    height: 52px;
  }

  .floating-btn:hover {
    min-width: 52px;
  }

  .floating-btn-icon-wrap {
    width: 34px;
    height: 34px;
  }

  .floating-btn-icon {
    width: 18px;
    height: 18px;
  }

  .floating-tooltip {
    display: none;
  }
}
</style>