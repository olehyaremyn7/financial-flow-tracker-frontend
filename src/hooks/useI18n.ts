import { useContext } from 'react';

import I18nContext from '../context/i18n/context';
import { I18nContext as I18nContextInterface } from '../context/i18n/interface';

const useI18n = (): I18nContextInterface => useContext<I18nContextInterface>(I18nContext);

export default useI18n;
