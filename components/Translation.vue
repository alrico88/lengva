<template lang="pug">
.card
  .card-body
    .card-title {{ language }}
    .lead.fw-bold {{ translation }}
</template>

<script setup lang="ts">
const props = defineProps<{
  language: string;
  translation: string;
}>();
</script>
