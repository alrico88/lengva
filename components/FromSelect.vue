<template lang="pug">
select.form-select.form-select-lg(v-model="selected" :disabled="pending")
  option(
    v-for="option of options"
    :key="option.code"
    :value="option.code"
  ) {{ option.name }}
</template>

<script setup lang="ts">
import { useInstanceStore } from "~/stores/instance";

const props = defineProps<{
  from: string;
}>();

const instanceStore = useInstanceStore();
const { instance } = storeToRefs(instanceStore);

const selected = useVModel(props, "from");

const { data, pending } = useFetch<{
  languages: {
    code: string;
    name: string;
  }[];
}>("/api/v1/languages", {
  baseURL: instance.value,
});

const options = computed(() => {
  if (!data.value) {
    return [];
  } else {
    return data.value.languages.filter((d) => d.code !== "auto") ?? [];
  }
});
</script>
