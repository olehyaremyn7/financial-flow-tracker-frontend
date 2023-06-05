import { STORED_MODE_KEY, STORED_THEME_KEY } from '../../constants/storage';
import { Nullable } from '../../interfaces';
import themes, { DEFAULT_DARK_MODE_THEME, DEFAULT_LIGHT_MODE_THEME } from '../../themes';
import { Theme, ThemeMode, ThemeName } from '../../themes/interface';
import { storage } from '../../utils';

export const isSystemThemeDark = (): boolean => window.matchMedia('(prefers-color-scheme: dark)').matches;

export const getStorageThemeSettings = (): Theme => {
  const savedName = storage<Nullable<ThemeName>>(STORED_THEME_KEY);
  const savedMode = storage<Nullable<ThemeMode>>(STORED_MODE_KEY);
  const isStoredSettingsExist = !savedName || !savedMode;

  if (isStoredSettingsExist && isSystemThemeDark()) {
    return DEFAULT_DARK_MODE_THEME;
  }

  if (isStoredSettingsExist) {
    return DEFAULT_LIGHT_MODE_THEME;
  }

  return themes.find(({ name, mode }) => name === savedName && mode === savedMode) ?? DEFAULT_LIGHT_MODE_THEME;
};

export const setStorageThemeSettings = ({ name, mode }: Theme): void => {
  storage(STORED_THEME_KEY, name);
  storage(STORED_MODE_KEY, mode);
};
