import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'fr',
    lng: "fr",
    ns: ['admin', 'errors'], // Liste des namespaces
    defaultNS: 'admin', // Namespace par défaut
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Chemin vers vos fichiers
    },
    interpolation: {
      escapeValue: false, // Pas besoin d'échapper pour React
    },
  });
export default i18n;