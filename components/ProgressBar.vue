<template lang="pug">
.vstack.gap-2
  div Loaded {{ current }} of {{ total }} languages
  .progress(role="progressbar")
    .progress-bar(:style="progress")
</template>

<script setup lang="ts">
const props = defineProps<{
  current: number;
  total: number;
}>();

const progress = computed(() => {
  return {
    width: `${(props.current * 100) / props.total}%`,
  };
});
</script>

<style>
.progress-bar {
  background-color: #402e1c !important;
}
</style>
