import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import I18nContext from './context';
import { I18nContext as I18nContextInterface, I18nProviderProps, SupportedLanguages } from './interface';
import { setLngToStorage } from './utils';

const I18nProvider: FC<I18nProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<SupportedLanguages>(i18n.language as SupportedLanguages);
  const i18nContext = useMemo(
    (): I18nContextInterface => ({
      language,
      languages: i18n.languages as SupportedLanguages[],
      changeLanguage: (languageCode: SupportedLanguages): void => {
        if (languageCode !== language) {
          setLanguage(languageCode);
        }
      },
    }),
    [language],
  );

  const changeDocumentLanguage = useCallback((): void => {
    const $htmlTag = document.querySelector('html');

    if ($htmlTag) {
      $htmlTag.lang = language;
    }
  }, [language]);

  useEffect((): void => {
    (async (): Promise<void> => {
      await i18n.changeLanguage(language);
      changeDocumentLanguage();
      setLngToStorage(language);
    })();
  }, [language]);

  return <I18nContext.Provider value={i18nContext}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
