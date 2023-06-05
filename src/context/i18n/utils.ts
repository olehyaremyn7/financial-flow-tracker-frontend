import { Nullable } from 'src/interfaces';

import { STORED_LANG_KEY } from '../../constants/storage';
import { storage } from '../../utils';
import { SupportedLanguages } from './interface';

export const getSupportedLngs = (): SupportedLanguages[] => Object.values(SupportedLanguages);

export const defineLng = (): SupportedLanguages => {
  const savedLng = storage<Nullable<SupportedLanguages>>(STORED_LANG_KEY);
  const supportedLanguages = getSupportedLngs();

  if (!savedLng) {
    return SupportedLanguages.EN;
  }

  return supportedLanguages.includes(savedLng) ? savedLng : SupportedLanguages.EN;
};

export const setLngToStorage = (language: SupportedLanguages): void => {
  storage(STORED_LANG_KEY, language);
};
