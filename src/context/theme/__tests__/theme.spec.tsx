import { FC } from 'react';

import { STORED_MODE_KEY, STORED_THEME_KEY } from '../../../constants/storage';
import useTheme from '../../../hooks/useTheme';
import { applyLocalStorageMock, applyMatchMediaMock } from '../../../tests/mocks';
import { afterEach, describe, it, render, RenderResult, screen, userEvent } from '../../../tests/utils';
import { DEFAULT_DARK_MODE_THEME, DEFAULT_LIGHT_MODE_THEME } from '../../../themes';
import { ThemeMode, ThemeName } from '../../../themes/interface';
import ThemeProvider from '../index';
import { getStorageThemeSettings, isSystemThemeDark, setStorageThemeSettings } from '../utils';

applyMatchMediaMock();
applyLocalStorageMock();

const Consumer: FC = () => {
  const { theme, themes, changeTheme } = useTheme();
  const [defaultLightTheme, defaultDarkTheme] = themes;

  const applyDefaultLightTheme = (): void => {
    changeTheme(defaultLightTheme);
  };

  const applyDefaultDarkTheme = (): void => {
    changeTheme(defaultDarkTheme);
  };

  return (
    <>
      <p>Applied theme: {theme.name}</p>
      <button type="button" onClick={applyDefaultLightTheme}>
        Default Light Theme
      </button>
      <button type="button" onClick={applyDefaultDarkTheme}>
        Default Dark Theme
      </button>
    </>
  );
};

const renderComponent = (): RenderResult =>
  render(
    <ThemeProvider>
      <Consumer />
    </ThemeProvider>,
  );

const setThemeToMockStorage = (id: string, data: ThemeMode | ThemeName | string): void => {
  window.localStorage.setItem(id, data);
};

const getThemeFromMockStorage = (id: string): string | null => {
  return window.localStorage.getItem(id);
};

const clearMockStorage = (): void => {
  window.localStorage.clear();
};

const defaultDarkThemeButtonSettings = {
  name: /Default Dark Theme/i,
};
const defaultLightThemeButtonSettings = {
  name: /Default Light Theme/i,
};
const findDefaultLightTheme = /Applied theme: Midnight Mint/i;
const findDefaultDarkTheme = /Applied theme: Lavender Horizon/i;
const fakeTheme = 'Fake theme';

describe('Theme context', (): void => {
  afterEach((): void => {
    clearMockStorage();
  });

  it('Should use default light theme if no theme is saved in storage', (): void => {
    renderComponent();

    expect(screen.getByText(findDefaultLightTheme)).toBeInTheDocument();
  });

  it('Should use theme if that theme is saved in storage', (): void => {
    setThemeToMockStorage(STORED_THEME_KEY, ThemeName.LAVENDER_HORIZON);
    setThemeToMockStorage(STORED_MODE_KEY, ThemeMode.DARK);

    renderComponent();

    expect(screen.getByText(findDefaultDarkTheme)).toBeInTheDocument();
  });

  it('Should use default light theme if no theme matches the one stored in storage', (): void => {
    setThemeToMockStorage(STORED_THEME_KEY, fakeTheme);
    setThemeToMockStorage(STORED_MODE_KEY, ThemeMode.DARK);

    renderComponent();

    expect(screen.getByText(findDefaultLightTheme)).toBeInTheDocument();
  });

  describe('changeTheme()', (): void => {
    it('Should change theme', async (): Promise<void> => {
      renderComponent();

      await userEvent.click(screen.getByRole('button', defaultDarkThemeButtonSettings));

      expect(await screen.findByText(findDefaultDarkTheme)).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', defaultLightThemeButtonSettings));

      expect(await screen.findByText(findDefaultLightTheme)).toBeInTheDocument();
    });

    it('Should save theme to storage', async (): Promise<void> => {
      renderComponent();

      await userEvent.click(screen.getByRole('button', defaultDarkThemeButtonSettings));

      expect(getThemeFromMockStorage(STORED_THEME_KEY)).toEqual(ThemeName.LAVENDER_HORIZON);
      expect(getThemeFromMockStorage(STORED_MODE_KEY)).toEqual(ThemeMode.DARK);
    });

    it('Should not change theme if that theme is already selected', async (): Promise<void> => {
      renderComponent();

      expect(screen.getByText(findDefaultLightTheme)).toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', defaultLightThemeButtonSettings));

      expect(await screen.findByText(findDefaultLightTheme)).toBeInTheDocument();
    });
  });

  describe('Utils', (): void => {
    describe('isSystemThemeDark()', (): void => {
      it('Should return false if user is not using dark mode on system', (): void => {
        expect(isSystemThemeDark()).toBeFalsy();
      });
    });

    describe('setStorageThemeSettings()', (): void => {
      it('Should save theme to storage', (): void => {
        setStorageThemeSettings(DEFAULT_DARK_MODE_THEME);

        expect(getThemeFromMockStorage(STORED_THEME_KEY)).toEqual(ThemeName.LAVENDER_HORIZON);
        expect(getThemeFromMockStorage(STORED_MODE_KEY)).toEqual(ThemeMode.DARK);
      });
    });

    describe('getStorageThemeSettings()', (): void => {
      it('Should return default light theme if no theme is saved in storage', (): void => {
        expect(getStorageThemeSettings()).toEqual(DEFAULT_LIGHT_MODE_THEME);
      });

      it('Should return default light theme if no theme matches the one stored in storage', (): void => {
        setThemeToMockStorage(STORED_THEME_KEY, fakeTheme);
        setThemeToMockStorage(STORED_MODE_KEY, ThemeMode.DARK);

        expect(getStorageThemeSettings()).toEqual(DEFAULT_LIGHT_MODE_THEME);
      });

      it('Should return theme if that theme is saved in storage', (): void => {
        setThemeToMockStorage(STORED_THEME_KEY, ThemeName.LAVENDER_HORIZON);
        setThemeToMockStorage(STORED_MODE_KEY, ThemeMode.DARK);

        expect(getStorageThemeSettings()).toEqual(DEFAULT_DARK_MODE_THEME);
      });
    });
  });
});
