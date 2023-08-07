import { languageList } from "lingva-scraper";

export default defineEventHandler((event) => {
  const { source, target } = getQuery(event);

  if (source && target) {
    throw new Error("use source or target, not both");
  }

  let langs = languageList.all;

  if (source) {
    langs = languageList.source;
  } else {
    langs = languageList.target;
  }

  return {
    languages: Object.entries(langs).map(([key, val]) => {
      return {
        code: key,
        name: val,
      };
    }),
  };
});
