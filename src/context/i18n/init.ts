import i18n, { InitOptions, Resource, TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../../locales/en/index.json';
import ukTranslation from '../../locales/uk/index.json';
import { isEnvVariableTrue } from '../../utils';
import { SupportedLanguages } from './interface';
import { defineLng, getSupportedLngs } from './utils';

const resources: Resource = {
  en: { translation: enTranslation },
  uk: { translation: ukTranslation },
};

const defineI18n = (options?: InitOptions<unknown>): Promise<TFunction<'translation', undefined, 'translation'>> =>
  i18n.use(initReactI18next).init({
    lng: defineLng(),
    fallbackLng: SupportedLanguages.EN,
    supportedLngs: getSupportedLngs(),
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    debug: isEnvVariableTrue(import.meta.env.VITE_I18N_DEBUG),
    ...options,
  });

export default defineI18n;
