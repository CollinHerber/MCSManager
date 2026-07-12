// English-only i18n configuration (Frontend)

import { createI18n, type I18n } from "vue-i18n";
import en_us from "../../../languages/en_US.json";

const ENGLISH = "en_us";

export const SUPPORTED_LANGS = [{ label: "English", value: ENGLISH }];
export const LANGUAGE_KEY = "LANGUAGE";

let i18n: I18n;

export function toStandardLang(_lang?: string) {
  return ENGLISH;
}

async function initI18n(_lang: string) {
  i18n = createI18n({
    allowComposition: true,
    globalInjection: true,
    locale: ENGLISH,
    fallbackLocale: ENGLISH,
    messages: {
      [ENGLISH]: en_us
    }
  });
}

export function getI18nInstance() {
  return i18n;
}

const setLanguage = (_lang: string, reload = true) => {
  localStorage.setItem(LANGUAGE_KEY, ENGLISH);
  i18n.global.locale = ENGLISH;
  if (reload) window.location.reload();
};

const getCurrentLang = (): string => ENGLISH;
const getInitLanguage = (): string => ENGLISH;

const $t = (...args: any[]): string => {
  return (i18n.global.t as Function)(...args);
};
const t = $t;

(window as any).setLang = setLanguage;

export { $t, getCurrentLang, getInitLanguage, initI18n, setLanguage, t };
