import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { STORED_LANG_KEY } from 'src/constants/storage';
import { applyLocalStorageMock } from 'src/tests/mocks';

import useI18n from '../../../hooks/useI18n';
import enTranslation from '../../../locales/en/index.json';
import ukTranslation from '../../../locales/uk/index.json';
import { beforeEach, describe, it, render, RenderResult, screen, userEvent } from '../../../tests/utils';
import defineI18n from '../init';
import { SupportedLanguages } from '../interface';
import { defineLng, getSupportedLngs, setLngToStorage } from '../utils';

applyLocalStorageMock();

const Consumer: FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useI18n();

  const applyEnLang = (): void => {
    changeLanguage(SupportedLanguages.EN);
  };

  const applyUkLang = (): void => {
    changeLanguage(SupportedLanguages.UK);
  };

  return (
    <>
      <h1 data-testid="translation">{t('specs.context')}</h1>
      <p>Applied language: {language}</p>
      <button type="button" onClick={applyEnLang}>
        {SupportedLanguages.EN} language
      </button>
      <button type="button" onClick={applyUkLang}>
        {SupportedLanguages.UK} language
      </button>
    </>
  );
};

const renderComponent = (): RenderResult => render(<Consumer />);

const setLanguageToMockStorage = (id: string, data: SupportedLanguages | string): void => {
  window.localStorage.setItem(id, data);
};

const getLanguageFromMockStorage = (id: string): SupportedLanguages | string | null => {
  return window.localStorage.getItem(id);
};

const clearMockStorage = (): void => {
  window.localStorage.clear();
};

const enLangButtonSettings = {
  name: /en language/i,
};
const ukLangButtonSettings = {
  name: /uk language/i,
};
const findEnLanguage = /Applied language: en/i;
const findUkLanguage = /Applied language: uk/i;
const unknownLanguage = 'unknown language';

describe('i18n context', (): void => {
  const translationId = 'translation';
  const engTranslation = enTranslation.specs.context;
  const ukrTranslation = ukTranslation.specs.context;

  beforeEach((): void => {
    clearMockStorage();
  });

  it('Should use default language if no language is saved in storage', (): void => {
    renderComponent();

    expect(screen.getByText(findEnLanguage)).toBeInTheDocument();
    expect(screen.getByTestId(translationId)).toHaveTextContent(engTranslation);
  });

  it('Should use language if that language is saved in storage and supported', (): void => {
    setLanguageToMockStorage(STORED_LANG_KEY, SupportedLanguages.UK);

    defineI18n();
    renderComponent();

    expect(screen.getByText(findUkLanguage)).toBeInTheDocument();
    expect(screen.getByTestId(translationId)).toHaveTextContent(ukrTranslation);
  });

  it('Should use default language if no language matches the one stored in storage', (): void => {
    setLanguageToMockStorage(STORED_LANG_KEY, unknownLanguage);

    defineI18n();
    renderComponent();

    expect(screen.getByText(findEnLanguage)).toBeInTheDocument();
    expect(screen.getByTestId(translationId)).toHaveTextContent(engTranslation);
  });

  describe('changeLanguage()', (): void => {
    it('Should change language', async (): Promise<void> => {
      renderComponent();

      await userEvent.click(screen.getByRole('button', ukLangButtonSettings));

      expect(await screen.findByText(findUkLanguage)).toBeInTheDocument();
      expect(await screen.findByTestId(translationId)).toHaveTextContent(ukrTranslation);

      await userEvent.click(screen.getByRole('button', enLangButtonSettings));

      expect(await screen.findByText(findEnLanguage)).toBeInTheDocument();
      expect(await screen.findByTestId(translationId)).toHaveTextContent(engTranslation);
    });

    it('Should save language to storage', async (): Promise<void> => {
      renderComponent();

      await userEvent.click(screen.getByRole('button', ukLangButtonSettings));

      expect(getLanguageFromMockStorage(STORED_LANG_KEY)).toEqual(SupportedLanguages.UK);
    });

    it('Should not change language if that language is already selected', async (): Promise<void> => {
      defineI18n();
      renderComponent();

      expect(await screen.findByText(findEnLanguage)).toBeInTheDocument();
      expect(await screen.findByTestId(translationId)).toHaveTextContent(engTranslation);

      await userEvent.click(screen.getByRole('button', enLangButtonSettings));

      expect(await screen.findByText(findEnLanguage)).toBeInTheDocument();
      expect(await screen.findByTestId(translationId)).toHaveTextContent(engTranslation);
    });
  });

  describe('Utils', (): void => {
    describe('setLngToStorage()', (): void => {
      it('Should save language to storage', (): void => {
        setLngToStorage(SupportedLanguages.UK);

        expect(getLanguageFromMockStorage(STORED_LANG_KEY)).toEqual(SupportedLanguages.UK);
      });
    });

    describe('defineLng()', (): void => {
      it('Should return default language if no language is saved in storage', (): void => {
        expect(defineLng()).toEqual(SupportedLanguages.EN);
      });

      it('Should return language if that language is saved in storage and supported', (): void => {
        setLanguageToMockStorage(STORED_LANG_KEY, SupportedLanguages.UK);

        expect(defineLng()).toEqual(SupportedLanguages.UK);
      });

      it('Should return default language if no language matches the one stored in storage', (): void => {
        setLanguageToMockStorage(STORED_LANG_KEY, unknownLanguage);

        expect(defineLng()).toEqual(SupportedLanguages.EN);
      });
    });

    describe('getSupportedLngs()', (): void => {
      it('Should return an array of supported languages', (): void => {
        expect(getSupportedLngs()).toEqual(Object.values(SupportedLanguages));
      });
    });
  });
});
