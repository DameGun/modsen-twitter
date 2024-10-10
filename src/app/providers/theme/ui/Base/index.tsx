import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';

import { useAppSelector } from '@/shared/lib/store';
import type { PropsWithChildren } from '@/shared/types/common';

import { disableTransitionOnThemeChange } from '../../lib';
import { ColorMode, selectCurrentTheme } from '../../model';
import GlobalStyles from '../global';
import { darkTheme, lightTheme } from '../theme';

export function ThemeContextProvider({ children }: PropsWithChildren) {
  const currentTheme = useAppSelector(selectCurrentTheme);

  useEffect(() => {
    disableTransitionOnThemeChange();
  }, [currentTheme]);

  return (
    <ThemeProvider theme={currentTheme === ColorMode.Light ? lightTheme : darkTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
