import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import locI18next from 'loc-i18next';

const i18nOptions = {
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  debug: false,
  defaultNS: 'broccoli',
  fallbackLng: 'en',
  lowerCaseLng: true,
  ns: ['broccoli'],
  useCookie: false,
  parseMissingKeyHandler: () => '',
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init(i18nOptions, () => {
    locI18next.init(i18n)('[data-i18n]');
    document.documentElement.setAttribute('lang', i18n.language);
  });

export default i18n;
export const i18nWait = (typeof testWaitI18n !== 'undefined' ? testWaitI18n : true);
