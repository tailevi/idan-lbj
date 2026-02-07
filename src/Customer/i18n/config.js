import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import he from './locales/he.json';

// Check if i18n is already initialized
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        he: { translation: he }
      },
      lng: localStorage.getItem('customerLanguage') || 'he',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
} else {
  // Merge customer translations into already-initialized i18n
  i18n.addResourceBundle('en', 'translation', en, true, true);
  i18n.addResourceBundle('he', 'translation', he, true, true);
}

export default i18n;
