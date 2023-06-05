import { createContext } from 'react';

import { ThemeContext as ThemeContextInterface } from './interface';

const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);

export default ThemeContext;
