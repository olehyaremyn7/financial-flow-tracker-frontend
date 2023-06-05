import { ReactNode } from 'react';

import { Theme } from '../../themes/interface';

export interface ThemeContext {
  theme: Theme;
  themes: Theme[];
  changeTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
