import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';

import { ColorMode } from '@/app/providers/theme/model/constants';
import { useAppSelector } from '@/shared/lib/store';
import type { PropsWithChildren } from '@/shared/types/common';

import GlobalStyles from './global';
import { darkTheme, lightTheme } from './theme';

import { disableTransitionOnThemeChange } from '../lib';
import { selectCurrentTheme } from '../model/slice';

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
