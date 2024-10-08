import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { store } from '@/shared/store';
import type { PropsWithChildren } from '@/shared/types/common';

import { ThemeContextProvider } from './theme';

export function Providers({ children }: PropsWithChildren) {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </Provider>
    </HelmetProvider>
  );
}
