import { FC } from 'react';

import useTheme from '../../../hooks/useTheme';
import { applyMatchMediaMock } from '../../../tests/mocks';
import { describe, it, render, screen } from '../../../tests/utils';
import { DEFAULT_DARK_MODE_THEME } from '../../../themes';
import ThemeProvider from '../index';
import { getStorageThemeSettings, isSystemThemeDark } from '../utils';

const matchMediaMock = vi.fn().mockImplementation(() => ({
  matches: true,
}));

applyMatchMediaMock(null, matchMediaMock);

const Consumer: FC = () => {
  const { theme } = useTheme();

  return <p>Current theme: {theme.name}</p>;
};

describe('Theme dark mode', (): void => {
  it('Default dark theme should be applied if no theme is saved, and user is using dark mode on system', (): void => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Current theme: Lavender Horizon/i)).toBeInTheDocument();
    expect(matchMediaMock).toHaveBeenCalled();
    expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
  });

  describe('Utils', (): void => {
    describe('isSystemThemeDark()', (): void => {
      it('Should return true if user is using dark mode on system', (): void => {
        expect(isSystemThemeDark()).toBeTruthy();
      });
    });

    describe('getStorageThemeSettings()', (): void => {
      it('Should return default dark theme if no theme is saved in storage', (): void => {
        expect(getStorageThemeSettings()).toEqual(DEFAULT_DARK_MODE_THEME);
      });
    });
  });
});
