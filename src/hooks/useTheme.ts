import { useContext } from 'react';

import ThemeContext from '../context/theme/context';
import { ThemeContext as ThemeContextInterface } from '../context/theme/interface';

const useTheme = (): ThemeContextInterface => useContext<ThemeContextInterface>(ThemeContext);

export default useTheme;
