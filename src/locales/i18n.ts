import type { App } from "vue";
import { createI18n } from "vue-i18n";
import messages from "./lang";
import type { LocaleKey } from "./lang";
import Langs, { langList } from "./lang";

function getLang() {
  let lang = localStorage.getItem("lang") || navigator.language;
  if (!Langs[lang]) {
    for (let key of lang.split("-")) {
      if (Langs[key]) {
        lang = key;
        break;
      }
      key = key.toLowerCase();
      if (Langs[key]) {
        lang = key;
        break;
      }
      key = key.toUpperCase();
      if (Langs[key]) {
        lang = key;
        break;
      }
    }
    lang = "en";
  }
  return lang;
}
export const lang = getLang();
const i18n = createI18n({
  locale: lang,
  fallbackLocale: "en",
  messages,
});

export function setupI18n(app: App) {
  app.use(i18n);
}

export function t(key: string) {
  return i18n.global.t(key);
}

export function setLocale(locale: LocaleKey) {
  i18n.global.locale = locale;
}
export { langList };
