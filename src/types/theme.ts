import { ReactNode } from 'react';

import { ColorMode } from '@/constants/theme';

type ThemeState = {
  mode: ColorMode;
};

type ThemeContextProviderProps = {
  children: ReactNode;
};

export type { ThemeContextProviderProps, ThemeState };
