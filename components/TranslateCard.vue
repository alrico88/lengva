<template lang="pug">
.card.shadow-sm
  .card-body
    form(@submit.prevent="() => handleSubmit()")
      .vstack.gap-3
        .row.align-items-end.g-3
          .col-lg-8.col-md-6.col-12
            h5.fw-bold Translate
            input.form-control.form-control-lg(type="text" v-model="wordToTranslate" placeholder="Enter a word or sentence to translate")
          .col-lg-2.col-md-6.col-12
            h5.fw-bold From
            from-select(v-model:from="fromLanguage")
          .col-lg-2.col-md-12
            .hstack.gap-2
              button.btn.btn-primary.btn-lg.w-100(:disabled="translateBtnDisabled" type="submit") {{ loading ? 'Translating' : 'Translate' }}
              button.btn.btn-secondary.btn-lg(@click.prevent="toggleConfig", :class="{active: showConfig}" title="Settings")
                icon(name="bi:sliders")
        .row(v-show="showConfig")
          .col
            h5.fw-bold Lingva Translate Instance
            .text-muted Enter #[kbd /] for this site's own instance
            input.form-control.form-control-lg(type="text", v-model="instance")
          .col-md-4
            h5.fw-bold Concurrent requests
            .text-muted Set a low number not to overload the instance
            input.form-control.form-control-lg(type="number", v-model.number="concurrency")
</template>

<script lang="ts" setup>
import { useInstanceStore } from "~/stores/instance";

const props = defineProps<{
  loading: boolean;
  wordToTranslate: string;
  fromLanguage: string;
}>();

const { wordToTranslate, fromLanguage } = useVModels(props);

const emit = defineEmits<{
  "go-translate": [];
}>();

const instanceStore = useInstanceStore();
const { instance, concurrency } = storeToRefs(instanceStore);

const showConfig = ref(false);
function toggleConfig() {
  showConfig.value = !showConfig.value;
}

const translateBtnDisabled = computed(
  () => props.loading === true || wordToTranslate.value === ""
);

function handleSubmit() {
  emit("go-translate");
}
</script>
