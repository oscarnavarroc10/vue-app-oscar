<template>
  <article class="package-card">
    <div class="card-glow"></div>

    <div class="package-card-header">
      <div class="mini-badge">Promoción</div>

      <h3>{{ plan.name }}</h3>

      <p v-html="formattedDescription"></p>
    </div>

    <ul class="package-list">
      <li
        v-for="item in props.resolvedItems || []"
        :key="item.id"
        class="package-item"
      >
        <span class="item-dot">✦</span>

        <span class="item-text">
          <strong>{{ formatNumber(item.quantity) }}</strong>
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
  return new Intl.NumberFormat("es-MX").format(Number(num || 0));
};

const formattedDescription = computed(() => {
  return props.plan.description?.replace(/\n/g, "<br>") || "";
});
</script>

<style scoped>
.package-card {
  position: relative;
  width: 100%;
  max-width: 300px;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 18px 18px 18px;

  border-radius: 26px;
  border: 1px solid rgba(96, 165, 250, 0.22);

  background:
    linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.94) 0%,
      rgba(17, 24, 39, 0.92) 100%
    );

  box-shadow:
    0 18px 36px rgba(2, 6, 23, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.package-card:hover {
  transform: translateY(-6px);

  border-color: rgba(96, 165, 250, 0.4);

  box-shadow:
    0 24px 48px rgba(2, 6, 23, 0.36),
    0 0 18px rgba(59, 130, 246, 0.16);
}

.card-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 85% 8%, rgba(59, 130, 246, 0.16), transparent 18%),
    radial-gradient(circle at 12% 0%, rgba(168, 85, 247, 0.12), transparent 18%);
}

.package-card-header,
.package-list,
.package-footer {
  position: relative;
  z-index: 1;
}

.package-card-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mini-badge {
  width: fit-content;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.02em;

  color: #93c5fd;
  background: rgba(59, 130, 246, 0.14);
  border: 1px solid rgba(59, 130, 246, 0.18);
}

.package-card-header h3 {
  margin: 0;

  font-size: 1.35rem;
  line-height: 1.08;
  letter-spacing: -0.02em;

  color: #ffffff;
  font-weight: 900;
}

.package-card-header p {
  margin: 0;

  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.55;
  font-weight: 600;
}

.package-list {
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;

  flex: 1;
}

.package-item {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 12px;

  border-radius: 14px;

  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.item-dot {
  flex-shrink: 0;
  color: #60a5fa;
  font-size: 0.82rem;
}

.item-text {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.35;
}

.item-text strong {
  color: #ffffff;
  font-weight: 900;
  margin-right: 6px;
}

.package-footer {
  margin-top: auto;
  padding-top: 10px;
}

.package-btn {
  width: 100%;
  min-height: 50px;

  border: none;
  border-radius: 15px;

  padding: 14px 16px;

  background: linear-gradient(135deg, #2563eb, #3b82f6);

  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 900;

  cursor: pointer;

  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.22);

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease;
}

.package-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.03);
  box-shadow: 0 16px 28px rgba(37, 99, 235, 0.28);
}

@media (max-width: 900px) {
  .package-card {
    max-width: 100%;
    padding: 16px;
  }

  .package-card-header h3 {
    font-size: 1.18rem;
  }

  .package-card-header p {
    font-size: 0.86rem;
  }

  .item-text {
    font-size: 0.9rem;
  }

  .package-btn {
    min-height: 48px;
    font-size: 0.92rem;
  }
}
</style>