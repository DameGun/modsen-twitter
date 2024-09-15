import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';

import { ColorMode } from '@/constants/theme';
import { useAppSelector } from '@/hooks/store';
import { selectCurrentTheme } from '@/services/store/theme';
import GlobalStyles from '@/styles/global';
import { darkTheme, lightTheme } from '@/styles/theme';
import type { ThemeContextProviderProps } from '@/types/theme';
import { disableTransitionOnThemeChange } from '@/utils/theme';

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
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
