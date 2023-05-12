<template lang="pug">
.d-flex.flex-column.h-100
  .flex-shrink-0
    .bg-header.py-5
      .container
        .row.mb-2
          .col
            h1.fw-bold #[icon(name="bi:translate")] Multi-translator
        .row
          .col
            translate-card(
              :loading="loading"
              @go-translate="handleTranslate"
            )
    .container.py-4
      .row.mb-4.align-items-center
        .col
          h3.fw-bold Translations
        .col.text-end
          button.btn.btn-light(@click="exportTranslations" :disabled="translations.length === 0") #[icon(name="bi:download")] Export
      .row
        .col.text-center
          translation-error(v-if="error")
          progress-bar(
            v-if="loading"
            :current="counters.loaded"
            :total="counters.total"
          )
      .row
        .col
          .row.justify-content-center(v-if="translations.length === 0 && !loading && !error") 
            .col.text-center
              .card
                .card-body No translations
          .row.row-cols-lg-4.row-cols-md-3.row-cols-sm-2.row-cols-1.g-3
            .col(v-for="translation of translations", :key="translation.name")
              translation(:language="translation.name" :translation="translation.translation")
  footer.mt-auto.py-3
    the-credits
</template>

<script lang="ts" setup>
import pLimit from "p-limit";
import { saveAs } from "file-saver";
import { useInstanceStore } from "./stores/instance";

const instanceStore = useInstanceStore();
const { instance, concurrency } = storeToRefs(instanceStore);

const limit = computed(() => pLimit(concurrency.value));

const counters = reactive({
  total: 0,
  loaded: 0,
});

const loading = ref(false);
const error = ref(false);

const translations = shallowRef<
  {
    code: string;
    name: string;
    translation: string;
  }[]
>([]);

async function handleTranslate(word: string, from: string) {
  try {
    loading.value = true;
    error.value = false;
    counters.loaded = 0;

    translations.value = [];

    const data = await $fetch<{
      languages: {
        code: string;
        name: string;
      }[];
    }>(`/api/v1/languages`, {
      query: {
        source: from,
      },
      baseURL: instance.value,
    });

    const realLanguages = data.languages.filter((d) => d.code !== "auto");

    counters.total = realLanguages.length;

    const promises = realLanguages.map(({ name, code: to }) => {
      return limit.value(async () => {
        const translation = await $fetch<{
          translation: string;
          [name: string]: any;
        }>(`/api/v1/${from}/${to}/${word}`, {
          baseURL: instance.value,
        });

        counters.loaded = counters.loaded + 1;

        return {
          code: to,
          name,
          translation: translation.translation,
        };
      });
    });

    translations.value = await Promise.all(promises);
  } catch (err) {
    console.error(err);

    error.value = true;
  } finally {
    loading.value = false;
  }
}

function exportTranslations() {
  saveAs(new Blob([JSON.stringify(translations.value, null, 2)]), "cosa.json");
}
</script>

<style scoped lang="scss">
.bg-header {
  background-color: #f1e8df;
}
</style>
