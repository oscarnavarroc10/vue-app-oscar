<template>
  <section class="plans-banner">
    <div class="plans-banner-content">
      <span class="plans-banner-pill">Personalizado</span>
      <h2>Personaliza tu plan y selecciona lo que necesites</h2>
      <p>
        Arma tu propuesta a la medida eligiendo categorías y servicios
        específicos según tus objetivos.
      </p>

      <button
        class="plans-banner-btn"
        type="button"
        @click="$emit('customize')"
      >
        Personalizar ahora
      </button>
    </div>

    <div class="plans-banner-orb orb-1"></div>
    <div class="plans-banner-orb orb-2"></div>
    <div class="plans-banner-orb orb-3"></div>
  </section>
</template>

<script setup>
defineEmits(["customize"]);
</script>

<style scoped>
.plans-banner {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: 24px 28px;
  margin-bottom: 28px;
  min-height: 180px;
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.88),
    rgba(255, 255, 255, 0.72)
  );
  backdrop-filter: blur(14px);
  border: 1px solid rgba(203, 213, 225, 0.75);
  box-shadow:
    0 24px 50px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

.plans-banner-content {
  position: relative;
  z-index: 2;
  max-width: 760px;
}

.plans-banner-pill {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(236, 72, 153, 0.08);
  border: 1px solid rgba(236, 72, 153, 0.14);
  color: #be185d;
  font-size: 0.85rem;
  font-weight: 800;
}

.plans-banner h2 {
  margin: 0 0 10px;
  font-size: 2rem;
  line-height: 1.08;
  color: #0f172a;
}

.plans-banner p {
  margin: 0 0 18px;
  max-width: 620px;
  color: #475569;
  line-height: 1.6;
}

.plans-banner-btn {
  border: none;
  border-radius: 16px;
  padding: 14px 18px;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  color: #ffffff;
  background: linear-gradient(135deg, #db2777, #f472b6);
  box-shadow: 0 14px 28px rgba(236, 72, 153, 0.22);
}

.plans-banner-btn:hover {
  transform: translateY(-1px);
}

.plans-banner-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(18px);
  pointer-events: none;
  opacity: 0.7;
}

.orb-1 {
  width: 180px;
  height: 180px;
  top: -30px;
  right: 70px;
  background: rgba(168, 85, 247, 0.16);
}

.orb-2 {
  width: 140px;
  height: 140px;
  bottom: -20px;
  right: 220px;
  background: rgba(59, 130, 246, 0.12);
}

.orb-3 {
  width: 120px;
  height: 120px;
  top: 35px;
  right: 260px;
  background: rgba(236, 72, 153, 0.12);
}

@media (max-width: 900px) {
  .plans-banner {
    padding: 22px;
    min-height: auto;
  }

  .plans-banner h2 {
    font-size: 1.6rem;
  }
}
</style>
