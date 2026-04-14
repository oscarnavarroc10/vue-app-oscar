<template>
  <article class="package-card" :class="cardClass">
    <div class="card-bg-orb orb-1"></div>
    <div class="card-bg-orb orb-2"></div>
    <div class="card-top-line"></div>

    <div class="package-card-header">
      <h3>{{ plan.name }}</h3>
      <p v-html="formattedDescription"></p>
    </div>

    <ul class="package-list">
      <li
        v-for="item in props.resolvedItems || []"
        :key="item.id"
        class="package-item"
      >
        <span class="item-quantity">
          {{ formatNumber(item.quantity) }}
        </span>

        <span class="item-name">
          {{ item.name }}
        </span>
      </li>
    </ul>

    <div class="package-footer">
      <button class="package-btn" @click="$emit('choose', plan)">
        {{ plan.buttonText }}
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  plan: {
    type: Object,
    required: true,
  },
  resolvedItems: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["choose"]);

const formatNumber = (num) => {
  return new Intl.NumberFormat("es-MX").format(num);
};

const formattedDescription = computed(() => {
  return props.plan.description?.replace(/\n/g, "<br>") || "";
});

const cardClass = computed(() => {
  return props.plan.style ? `${props.plan.style}-card` : "default-card";
});
</script>

<style scoped>
.package-card {
  position: relative;
  min-height: 520px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px 22px 22px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.92),
      rgba(15, 23, 42, 0.82)
    );
  backdrop-filter: blur(18px);
  box-shadow:
    0 18px 45px rgba(2, 6, 23, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;
}

.package-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 28px 60px rgba(2, 6, 23, 0.4),
    0 10px 24px rgba(59, 130, 246, 0.16);
}

.card-bg-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(22px);
  opacity: 0.8;
  pointer-events: none;
}

.orb-1 {
  width: 150px;
  height: 150px;
  top: -42px;
  right: -26px;
}

.orb-2 {
  width: 100px;
  height: 100px;
  bottom: 82px;
  left: -22px;
  opacity: 0.45;
}

.card-top-line {
  position: absolute;
  top: 0;
  left: 18px;
  right: 18px;
  height: 4px;
  border-radius: 999px;
}

.package-card-header,
.package-list,
.package-footer {
  position: relative;
  z-index: 1;
}

.package-top-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 34px;
  margin-bottom: 4px;
}

.package-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
}

.package-card-header h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
  line-height: 1.08;
  text-align: justify;
  text-align: center;
  color: #f8fafc;
  letter-spacing: -0.02em;
}

.package-card-header p {
  margin: 0;
  text-align: justify;
  color: #cbd5e1;
  line-height: 1.6;
  font-size: 0.96rem;
}

.package-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.package-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(30, 41, 59, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.item-quantity {
  flex-shrink: 0;
  min-width: 84px;
  text-align: center;
  padding: 8px 10px;
  border-radius: 10px;
  font-weight: 900;
  font-size: 0.95rem;
  background: rgba(34, 197, 94, 0.14);
  color: #86efac;
  border: 1px solid rgba(34, 197, 94, 0.24);
}

.item-name {
  flex: 1;
  text-align: right;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1.35;
}

.package-footer {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 4px;
}

.package-btn {
  width: 100%;
  min-height: 52px;
  border: none;
  border-radius: 16px;
  padding: 14px 18px;
  font-size: 0.98rem;
  font-weight: 800;
  cursor: pointer;
  color: #ffffff;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;
}

.package-btn:hover {
  transform: translateY(-1px);
}

/* default */
.default-card {
  border-color: rgba(59, 130, 246, 0.18);
}

.default-card .orb-1 {
  background: rgba(59, 130, 246, 0.22);
}

.default-card .orb-2 {
  background: rgba(147, 197, 253, 0.18);
}

.default-card .card-top-line {
  background: linear-gradient(90deg, #2563eb, #60a5fa);
}

.default-card .package-btn {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.24);
}

/* plus */
.plus-card {
  border-color: rgba(16, 185, 129, 0.2);
}

.plus-card .orb-1 {
  background: rgba(16, 185, 129, 0.24);
}

.plus-card .orb-2 {
  background: rgba(52, 211, 153, 0.18);
}

.plus-card .card-top-line {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.plus-card .package-tag {
  background: rgba(16, 185, 129, 0.12);
  color: #86efac;
  border-color: rgba(16, 185, 129, 0.2);
}

.plus-card .package-btn {
  background: linear-gradient(135deg, #059669, #10b981);
  box-shadow: 0 12px 24px rgba(16, 185, 129, 0.24);
}

/* pro */
.pro-card {
  border-color: rgba(236, 72, 153, 0.22);
}

.pro-card .orb-1 {
  background: rgba(236, 72, 153, 0.24);
}

.pro-card .orb-2 {
  background: rgba(244, 114, 182, 0.16);
}

.pro-card .card-top-line {
  background: linear-gradient(90deg, #db2777, #f472b6);
}

.pro-card .package-tag {
  background: rgba(236, 72, 153, 0.12);
  color: #f9a8d4;
  border-color: rgba(236, 72, 153, 0.22);
}

.pro-card .package-btn {
  background: linear-gradient(135deg, #db2777, #f472b6);
  box-shadow: 0 12px 24px rgba(236, 72, 153, 0.24);
}

/* premium */
.premium-card {
  border-color: rgba(168, 85, 247, 0.24);
}

.premium-card .orb-1 {
  background: rgba(168, 85, 247, 0.24);
}

.premium-card .orb-2 {
  background: rgba(245, 158, 11, 0.18);
}

.premium-card .card-top-line {
  background: linear-gradient(90deg, #7c3aed, #f59e0b);
}

.premium-card .package-tag {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.14),
    rgba(245, 158, 11, 0.14)
  );
  color: #e9d5ff;
  border-color: rgba(168, 85, 247, 0.24);
}

.premium-card .package-btn {
  background: linear-gradient(135deg, #7c3aed, #f59e0b);
  box-shadow: 0 12px 24px rgba(124, 58, 237, 0.26);
}

@media (max-width: 900px) {
  .package-card {
    min-height: auto;
    padding: 20px 18px 18px;
  }

  .package-card-header h3 {
    font-size: 1.35rem;
  }

  .package-item {
    padding: 10px 12px;
  }

  .item-quantity {
    min-width: 74px;
    font-size: 0.9rem;
  }

  .item-name {
    font-size: 0.94rem;
  }
}
</style>