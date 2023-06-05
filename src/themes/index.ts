import { createUID } from '../utils';
import { Theme, ThemeMode, ThemeName } from './interface';

const themes: Theme[] = [
  {
    id: createUID(),
    name: ThemeName.MIDNIGHT_MINT,
    mode: ThemeMode.LIGHT,
    mainColor: '#002855',
    secondaryColor: '#96E8BC',
    modeColor: '#F4F4F8',
  },
  {
    id: createUID(),
    name: ThemeName.LAVENDER_HORIZON,
    mode: ThemeMode.DARK,
    mainColor: '#6A26CD',
    secondaryColor: '#37B9F1',
    modeColor: '#252525',
  },
];

export const DEFAULT_LIGHT_MODE_THEME = themes[0];
export const DEFAULT_DARK_MODE_THEME = themes[1];
export default themes;
