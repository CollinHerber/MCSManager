// English-only i18n configuration (Web Panel)

import en_us from "@languages/en_US.json";
import i18next from "i18next";

i18next.init({
  interpolation: {
    escapeValue: false
  },
  lng: "en_us",
  fallbackLng: "en_us",
  supportedLngs: ["en_us"],
  resources: {
    en_us: {
      translation: en_us
    }
  }
});

const $t = i18next.t;

export { $t, i18next };
