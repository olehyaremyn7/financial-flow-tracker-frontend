import { Nullable } from '../interfaces';

export interface Theme {
  id: string;
  name: ThemeName;
  mode: ThemeMode;
  mainColor: string;
  secondaryColor: string;
  modeColor: string;
  options?: Nullable<ThemeOptions>;
}

export interface ThemeOptions {
  colors?: ThemeColors;
}

export interface ThemeColors {
  [key: string]: string;
}

export enum ThemeName {
  MIDNIGHT_MINT = 'Midnight Mint',
  LAVENDER_HORIZON = 'Lavender Horizon',
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}
