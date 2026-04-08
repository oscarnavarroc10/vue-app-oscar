<template>
  <article class="package-card" :class="cardClass">
    <div class="card-bg-orb orb-1"></div>
    <div class="card-bg-orb orb-2"></div>
    <div class="card-top-line"></div>

    <div class="package-card-header">
      <div class="package-top-row">
        <span class="package-tag">{{ displayTag }}</span>
        <span v-if="isPremium" class="premium-crown" aria-label="Premium"
          >👑</span
        >
      </div>

      <h3>{{ plan.name }}</h3>
      <p>{{ plan.description }}</p>
    </div>

    <ul class="package-list">
      <li v-for="item in resolvedItems" :key="item.id">
        <span class="bullet">✦</span>
        <span>
          <strong v-if="showCategory(item.category, item.id)">
            {{ item.category }}:
          </strong>
          {{ item.name }}
        </span>
      </li>
    </ul>

    <div class="package-footer">
      <button class="package-btn" type="button" @click="$emit('choose', plan)">
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
    required: true,
  },
});

defineEmits(["choose"]);

const normalizedName = computed(() => props.plan.name.toLowerCase());

const isFree = computed(() => normalizedName.value.includes("free"));
const isPlus = computed(
  () =>
    normalizedName.value.includes("plus") &&
    !normalizedName.value.includes("pro"),
);
const isPro = computed(() => normalizedName.value.includes("pro"));
const isPremium = computed(() => normalizedName.value.includes("premium"));

const displayTag = computed(() => {
  if (isPremium.value) return "Elite";
  if (isPro.value) return "Más popular";
  if (isPlus.value) return "Crecimiento";
  if (isFree.value) return "Entrada";
  return "Plan";
});

const cardClass = computed(() => {
  if (isPremium.value) return "premium-card";
  if (isPro.value) return "pro-card";
  if (isPlus.value) return "plus-card";
  if (isFree.value) return "free-card";
  return "default-card";
});

const showCategory = (category, id) => {
  const firstWithCategory = props.resolvedItems.find(
    (item) => item.category === category,
  );
  return firstWithCategory?.id === id;
};
</script>

<style scoped>
.package-card {
  position: relative;
  height: 100%;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 28px;
  padding: 24px 22px 22px;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(203, 213, 225, 0.8);
  box-shadow:
    0 20px 45px rgba(15, 23, 42, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.package-card:hover {
  transform: translateY(-6px);
}

.card-bg-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(18px);
  opacity: 0.9;
  pointer-events: none;
}

.orb-1 {
  width: 140px;
  height: 140px;
  top: -30px;
  right: -20px;
}

.orb-2 {
  width: 90px;
  height: 90px;
  bottom: 70px;
  left: -18px;
  opacity: 0.55;
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
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
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
  border: 1px solid transparent;
}

.premium-crown {
  font-size: 1.5rem;
  line-height: 1;
  filter: drop-shadow(0 4px 10px rgba(245, 158, 11, 0.35));
}

.package-card-header h3 {
  margin: 0 0 10px;
  font-size: 1.55rem;
  line-height: 1.1;
  color: #0f172a;
  text-align: center;
}

.package-card-header p {
  margin: 0;
  color: #475569;
  line-height: 1.55;
  text-align: center;
  font-size: 0.95rem;
}

.package-list {
  list-style: none;
  padding: 0;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 13px;
  flex: 1;
}

.package-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #334155;
  line-height: 1.45;
  font-size: 0.95rem;
}

.package-list li strong {
  color: #0f172a;
}

.bullet {
  flex-shrink: 0;
  margin-top: 1px;
  font-size: 0.9rem;
  font-weight: 900;
}

.package-footer {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.package-btn {
  width: 100%;
  min-height: 50px;
  border: none;
  border-radius: 16px;
  padding: 14px 18px;
  font-size: 0.96rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;
}

.package-btn:hover {
  transform: translateY(-1px);
}

.free-card {
  border-color: rgba(16, 185, 129, 0.22);
  box-shadow:
    0 20px 40px rgba(16, 185, 129, 0.08),
    0 10px 24px rgba(15, 23, 42, 0.08);
}

.free-card:hover {
  box-shadow:
    0 28px 50px rgba(16, 185, 129, 0.12),
    0 14px 28px rgba(15, 23, 42, 0.1);
}

.free-card .orb-1 {
  background: rgba(16, 185, 129, 0.18);
}

.free-card .orb-2 {
  background: rgba(52, 211, 153, 0.16);
}

.free-card .card-top-line {
  background: linear-gradient(90deg, #10b981, #6ee7b7);
}

.free-card .package-tag {
  background: rgba(16, 185, 129, 0.1);
  color: #047857;
  border-color: rgba(16, 185, 129, 0.18);
}

.free-card .bullet {
  color: #10b981;
}

.free-card .package-btn {
  background: linear-gradient(135deg, #059669, #10b981);
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(16, 185, 129, 0.22);
}

.plus-card {
  border-color: rgba(59, 130, 246, 0.22);
  box-shadow:
    0 20px 40px rgba(59, 130, 246, 0.08),
    0 10px 24px rgba(15, 23, 42, 0.08);
}

.plus-card:hover {
  box-shadow:
    0 28px 50px rgba(59, 130, 246, 0.14),
    0 14px 28px rgba(15, 23, 42, 0.1);
}

.plus-card .orb-1 {
  background: rgba(59, 130, 246, 0.2);
}

.plus-card .orb-2 {
  background: rgba(96, 165, 250, 0.18);
}

.plus-card .card-top-line {
  background: linear-gradient(90deg, #2563eb, #60a5fa);
}

.plus-card .package-tag {
  background: rgba(59, 130, 246, 0.1);
  color: #1d4ed8;
  border-color: rgba(59, 130, 246, 0.18);
}

.plus-card .bullet {
  color: #2563eb;
}

.plus-card .package-btn {
  background: linear-gradient(135deg, #1d4ed8, #3b82f6);
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.22);
}

.pro-card {
  border-color: rgba(236, 72, 153, 0.25);
  box-shadow:
    0 30px 60px rgba(236, 72, 153, 0.18),
    0 12px 26px rgba(15, 23, 42, 0.1);
}

.pro-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 34px 65px rgba(236, 72, 153, 0.18),
    0 16px 30px rgba(15, 23, 42, 0.12);
}

.pro-card .orb-1 {
  background: rgba(236, 72, 153, 0.2);
}

.pro-card .orb-2 {
  background: rgba(244, 114, 182, 0.16);
}

.pro-card .card-top-line {
  background: linear-gradient(90deg, #db2777, #f472b6);
}

.pro-card .package-tag {
  background: rgba(236, 72, 153, 0.11);
  color: #be185d;
  border-color: rgba(236, 72, 153, 0.18);
}

.pro-card .bullet {
  color: #db2777;
}

.pro-card .package-btn {
  background: linear-gradient(135deg, #db2777, #f472b6);
  color: #ffffff;
  box-shadow: 0 14px 28px rgba(236, 72, 153, 0.24);
}

.premium-card {
  border-color: rgba(168, 85, 247, 0.28);
  box-shadow:
    0 30px 60px rgba(168, 85, 247, 0.16),
    0 12px 26px rgba(15, 23, 42, 0.1);
}

.premium-card:hover {
  box-shadow:
    0 36px 70px rgba(168, 85, 247, 0.2),
    0 16px 30px rgba(15, 23, 42, 0.12);
}

.premium-card .orb-1 {
  background: rgba(168, 85, 247, 0.22);
}

.premium-card .orb-2 {
  background: rgba(245, 158, 11, 0.2);
}

.premium-card .card-top-line {
  background: linear-gradient(90deg, #7c3aed, #f59e0b);
}

.premium-card .package-tag {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.1),
    rgba(245, 158, 11, 0.1)
  );
  color: #7c3aed;
  border-color: rgba(124, 58, 237, 0.16);
}

.premium-card .bullet {
  color: #a855f7;
}

.premium-card .package-btn {
  background: linear-gradient(135deg, #7c3aed, #f59e0b);
  color: #ffffff;
  box-shadow: 0 16px 30px rgba(124, 58, 237, 0.24);
}

.default-card .orb-1 {
  background: rgba(148, 163, 184, 0.16);
}

.default-card .orb-2 {
  background: rgba(203, 213, 225, 0.14);
}

.default-card .card-top-line {
  background: linear-gradient(90deg, #64748b, #cbd5e1);
}

.default-card .package-tag {
  background: rgba(148, 163, 184, 0.1);
  color: #475569;
  border-color: rgba(148, 163, 184, 0.16);
}

.default-card .bullet {
  color: #64748b;
}

.default-card .package-btn {
  background: linear-gradient(135deg, #334155, #64748b);
  color: #ffffff;
}

@media (max-width: 1400px) {
  .package-card {
    min-height: 520px;
  }
}

@media (max-width: 900px) {
  .package-card {
    min-height: auto;
    transform: none;
  }

  .pro-card:hover {
    transform: translateY(-4px);
  }
}
</style>
