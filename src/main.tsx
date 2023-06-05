import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import I18nProvider from './context/i18n';
import defineI18n from './context/i18n/init';
import ThemeProvider from './context/theme';
import store from './redux';
import router from './router';

if (import.meta.env.DEV) {
  const { default: axe } = await import('@axe-core/react');

  await axe(React, ReactDOM, 1000);
}

defineI18n();

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <I18nProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </I18nProvider>
    </Provider>
  </QueryClientProvider>,
);
