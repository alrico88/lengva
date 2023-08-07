export const useInstanceStore = defineStore("instanceStore", () => {
  const instance = ref("/");
  const concurrency = ref(10);

  return {
    instance,
    concurrency,
  };
});
