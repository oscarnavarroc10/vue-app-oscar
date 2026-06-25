<template>
  <span class="platform-pill" :style="pillStyle">
    <img
      v-if="showIcon && icon"
      :src="icon"
      :alt="category"
      class="pill-icon"
    />
    {{ category }}
  </span>
</template>

<script setup>
import { computed } from "vue";
import { usePlatformTheme } from "@/composables/usePlatformTheme";

const props = defineProps({
  category: { type: String, required: true },
  showIcon: { type: Boolean, default: false },
});

const { colors, icon } = usePlatformTheme(props.category);

const pillStyle = computed(() => ({
  background: colors.bg,
  color: colors.text,
  borderColor: colors.accent + "33",
}));
</script>

<style scoped>
.platform-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  white-space: nowrap;
}
.pill-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}
</style>
