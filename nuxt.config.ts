export default defineNuxtConfig({
  ssr: false,
  extends: ["nuxt-umami"],
  app: {
    head: {
      title: "Multi Translator",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#f1e8df" },
        {
          name: "description",
          content:
            "Web app to translate a word or sentence to many languages at once",
        },
        {
          name: "keywords",
          content:
            "translate,multiple,languages,mass,english,french,german,spanish,many languages",
        },
      ],
      htmlAttrs: {
        "data-bs-theme": "light",
      },
    },
  },
  css: ["@/assets/main.scss"],
  modules: [
    "nuxt-icon",
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    "@kevinmarrec/nuxt-pwa",
  ],
  pwa: {
    manifest: {
      name: "Multi Translator",
      description:
        "Web app to translate a word or sentence to many languages at once",
      theme_color: "#f1e8df",
    },
  },
});
