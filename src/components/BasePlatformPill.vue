<template>
  <span class="platform-pill" :style="pillStyle">
    <img
      v-if="icon"
      :src="icon"
      :alt="category"
      class="platform-pill-icon"
      aria-hidden="true"
    />
    <span class="platform-pill-label">{{ category }}</span>
  </span>
</template>

<script setup>
import { computed } from "vue";
import { usePlatformTheme } from "@/composables/usePlatformTheme";

const props = defineProps({
  category: { type: String, required: true },
  size: { type: String, default: "md" },
});

const { getPlatform } = usePlatformTheme();

const platform = computed(() => getPlatform(props.category));

const icon = computed(() => platform.value.icon);

const pillStyle = computed(() => ({
  "--pill-color": platform.value.color,
  "--pill-bg": platform.value.softBg,
}));
</script>

<style scoped>
.platform-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--radius-full, 9999px);
  background: var(--pill-bg);
  color: var(--pill-color);
  font-size: var(--text-xs, 0.75rem);
  font-weight: var(--font-semibold, 600);
  white-space: nowrap;
  border: 1px solid color-mix(in srgb, var(--pill-color) 15%, transparent);
}

.platform-pill-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
}

.platform-pill-label {
  line-height: 1;
}
</style>
