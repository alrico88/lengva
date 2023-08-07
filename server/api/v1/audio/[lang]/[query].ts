import { LangCode, getAudio } from "lingva-scraper";

export default defineEventHandler(async (event) => {
  const { lang, query } = getRouterParams(event);

  return {
    audio: await getAudio(lang as unknown as Exclude<"auto", LangCode>, query),
  };
});
