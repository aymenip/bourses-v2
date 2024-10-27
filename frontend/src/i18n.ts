import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en/translation.json";
import ar from "./translations/ar/translation.json";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
        en: {
            translation: en,
        },
        ar: {
            translation: ar,
        },
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ["cookie"]
  },
  });

export default i18n;