export const useInstanceStore = defineStore("instanceStore", () => {
  const instance = ref("https://lingva.ml");
  const concurrency = ref(10);

  return {
    instance,
    concurrency,
  };
});
