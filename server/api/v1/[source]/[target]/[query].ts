import { LangCode, getTranslationText } from "lingva-scraper";

export default defineEventHandler(async (event) => {
  const { source, target, query } = getRouterParams(event);

  return {
    translation: await getTranslationText(
      source as Exclude<"zh_HANT", LangCode>,
      target as Exclude<"zh_HANT", LangCode>,
      decodeURIComponent(query)
    ),
  };
});
