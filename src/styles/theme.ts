import type { DefaultTheme } from 'styled-components';

import type { FontConstants, MediaConstants } from '@/types/styles';

const font: FontConstants = {
  size: {
    sm: '13px',
    md: '15px',
    lg: '17px',
    xl: '20px',
  },
  weight: {
    thin: 100,
    light: 200,
    regular: 400,
    semibold: 600,
  },
};

const media: MediaConstants = {
  mobile: '(min-width: 500px)',
  tablet: '(min-width: 900px)',
};

export const darkTheme: DefaultTheme = {
  font,
  media,
  colors: {
    main: '#000000',
    secondary: '#2b2f31',
    textMain: '#e2e2e2',
    textSecondary: '#525355',
    accent: '#1d9bf0',
    accentAlpha: '#72b8eb',
    focus: '#708285',
  },
};

export const lightTheme: DefaultTheme = {
  font,
  media,
  colors: {
    main: '#ffffff',
    secondary: '#f1f3f4',
    textMain: '#7c7d81',
    textSecondary: '#90979e',
    accent: '#1d9bf0',
    accentAlpha: '#72b8eb',
    focus: '#e5e5e5',
  },
};
