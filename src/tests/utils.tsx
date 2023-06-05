import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { afterEach, beforeEach } from 'vitest';

import I18nProvider from '../context/i18n';
import defineI18n from '../context/i18n/init';
import store from '../redux';

beforeEach((): void => {
  defineI18n();
});

afterEach((): void => {
  cleanup();
});

const Providers = ({ children }: { children: ReactNode }): ReactElement => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <I18nProvider>{children}</I18nProvider>
      </Provider>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
export * from 'vitest';
