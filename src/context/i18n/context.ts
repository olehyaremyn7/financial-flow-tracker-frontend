import { createContext } from 'react';

import { I18nContext as I18nContextInterface } from './interface';

const I18nContext = createContext<I18nContextInterface>({} as I18nContextInterface);

export default I18nContext;
