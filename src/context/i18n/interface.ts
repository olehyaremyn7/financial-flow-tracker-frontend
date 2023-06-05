import { ReactNode } from 'react';

export interface I18nContext {
  language: SupportedLanguages;
  languages: SupportedLanguages[];
  changeLanguage: (language: SupportedLanguages) => void;
}

export interface I18nProviderProps {
  children: ReactNode;
}

export enum SupportedLanguages {
  EN = 'en',
  UK = 'uk',
}
