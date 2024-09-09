import { ReactNode } from 'react';

import { ColorMode } from '@/constants/theme';

interface ThemeState {
  mode: ColorMode;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

export type { ThemeContextProviderProps, ThemeState };
