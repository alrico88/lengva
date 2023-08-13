export default defineNuxtConfig({
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
        {
          name: "google-site-verification",
          content: "nc0pKffQdhm679g_eXEQhjK-NzBM8ZbyFQLR9ZMeJtc",
        },
      ],
      htmlAttrs: {
        "data-bs-theme": "light",
      },
    },
  },
  css: [
    "@/assets/main.scss",
    "@fontsource/source-sans-pro/index.css",
    "@fontsource/source-sans-pro/600.css",
    "@fontsource/source-sans-pro/700.css",
  ],
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
    "nuxt-simple-sitemap",
  ],
  pwa: {
    manifest: {
      name: "Multi Translator",
      description:
        "Web app to translate a word or sentence to many languages at once",
      theme_color: "#f1e8df",
    },
  },
  routeRules: {
    "/": {
      static: true,
    },
  },
  appConfig: {
    umami: {
      id: "",
      host: "",
      ignoreLocalhost: true,
    },
  },
});
