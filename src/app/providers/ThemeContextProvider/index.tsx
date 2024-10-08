import { useEffect } from 'react';

import { ThemeProvider } from 'styled-components';

import { selectCurrentTheme } from '@/app/model/theme';
import GlobalStyles from '@/app/styles/global';
import { darkTheme, lightTheme } from '@/app/styles/theme';
import { ColorMode } from '@/shared/constants/theme';
import { useAppSelector } from '@/shared/lib/store';
import { disableTransitionOnThemeChange } from '@/shared/lib/theme';
import type { PropsWithChildren } from '@/shared/types/common';

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
