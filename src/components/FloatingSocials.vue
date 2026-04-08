<template>
  <div class="floating-socials">
    <a
      href="https://instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      class="floating-btn instagram"
      aria-label="Contactarnos por Instagram"
      title="Instagram"
    >
      IG
    </a>

    <a
      href="https://facebook.com/"
      target="_blank"
      rel="noopener noreferrer"
      class="floating-btn facebook"
      aria-label="Contactarnos por Facebook"
      title="Facebook"
    >
      FB
    </a>

    <a
      href="https://wa.me/5219999999999"
      target="_blank"
      rel="noopener noreferrer"
      class="floating-btn whatsapp"
      aria-label="Contactarnos por WhatsApp"
      title="WhatsApp"
    >
      WA
    </a>

    <a
      href="https://x.com/"
      target="_blank"
      rel="noopener noreferrer"
      class="floating-btn x"
      aria-label="Contactarnos por X"
      title="X"
    >
      X
    </a>
  </div>
</template>

<style scoped>
.floating-socials {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.floating-btn {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 800;
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.22);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.floating-btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.28);
}

.instagram {
  background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af);
}

.facebook {
  background: #1877f2;
}

.whatsapp {
  background: #25d366;
}

.x {
  background: #111827;
}

@media (max-width: 900px) {
  .floating-socials {
    right: 14px;
    bottom: 14px;
  }

  .floating-btn {
    width: 52px;
    height: 52px;
  }
}
</style>
