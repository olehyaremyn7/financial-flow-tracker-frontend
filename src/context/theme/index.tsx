import { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import themes from '../../themes/index';
import { Theme } from '../../themes/interface';
import ThemeContext from './context';
import { ThemeContext as ThemeContextInterface, ThemeProviderProps } from './interface';
import { getStorageThemeSettings, setStorageThemeSettings } from './utils';

const ThemeProvider: FC<ThemeProviderProps> = ({ children }): ReactElement => {
  const storedTheme = useMemo((): Theme => getStorageThemeSettings(), []);
  const [theme, setTheme] = useState<Theme>(storedTheme);
  const { name, mode, id } = theme;
  const themeContext = useMemo(
    (): ThemeContextInterface => ({
      theme,
      themes,
      changeTheme: (newTheme: Theme): void => {
        const { id: newThemeId } = newTheme;

        if (newThemeId !== id) {
          setTheme(newTheme);
        }
      },
    }),
    [theme],
  );

  const changeDocumentThemePreferences = useCallback((): void => {
    const $htmlTag = document.querySelector('html');

    if ($htmlTag) {
      $htmlTag.setAttribute('data-theme', name);
      $htmlTag.setAttribute('data-mode', mode);
    }
  }, [theme]);

  useEffect((): void => {
    changeDocumentThemePreferences();
    setStorageThemeSettings(theme);
  }, [theme]);

  return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
