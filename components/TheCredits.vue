<template lang="pug">
.container.text-center
  .row
    .col
      ul.list-inline.mb-0
        li.list-inline-item #[icon(name="bi:person")] Created by #[nuxt-link(to="https://alrico.es" v-bind="linkAttrs") Alberto Rico]
        li.list-inline-item #[icon(name="bi:github")] Code on #[nuxt-link(:to="repoLink" v-bind="linkAttrs") Github]
        li.list-inline-item #[icon(name="bi:translate")] Translations provided by #[nuxt-link(:to="lingvaLink" v-bind="linkAttrs") Lingva Translate]

</template>

<script setup>
const lingvaLink = "https://github.com/thedaviddelta/lingva-translate";
const repoLink = "https://github.com/alrico88/lengva";

const linkAttrs = {
  target: "_blank",
};
</script>
