import type { DefaultTheme } from 'styled-components';

import { ColorMode } from '@/shared/constants/theme';
import type { FontConstants, MediaConstants, VariablesConstants } from '@/shared/types/styles';

const font: FontConstants = {
  size: {
    sm: '13px',
    md: '15px',
    lg: '17px',
    xl: '20px',
    xl2: '42px',
    xl3: '84px',
  },
  weight: {
    thin: 100,
    light: 200,
    regular: 400,
    semibold: 600,
    bold: 700,
  },
};

const media: MediaConstants = {
  mobile: '(max-width: 500px)',
  tablet: '(max-width: 900px)',
};

const variables: VariablesConstants = {
  iconSize: {
    xs: '20px',
    sm: '24px',
    md: '28px',
    lg: '40px',
    xl: '50px',
    xl2: '100px',
  },
  spacing: {
    xs: '5px',
    sm: '10px',
    md: '20px',
    lg: '30px',
    xl: '40px',
  },
  containerSize: {
    xs: '300px',
    sm: '500px',
    md: '700px',
    lg: '1300px;',
  },
  borderWidth: {
    sm: '1px',
    md: '2px',
    lg: '4px',
  },
  borderRadius: {
    sm: '5px',
    md: '20px',
    lg: '50px',
  },
  transition: {
    sm: '0.2s',
    md: '0.5s',
    lg: '0.8s',
  },
  zIndex: {
    xs: 50,
    sm: 100,
    md: 200,
    lg: 400,
    xl: 600,
  },
  imageHeight: '150px',
};

export const darkTheme: DefaultTheme = {
  mode: ColorMode.Dark,
  font,
  media,
  variables,
  colors: {
    main: '#000000',
    white: '#ffffff',
    secondary: '#2b2f31',
    secondaryAlpha: '#70828563',
    textMain: '#e2e2e2',
    textSecondary: '#525355',
    accent: '#1d9bf0',
    accentAlpha: '#72b8eb',
    focus: '#22232480',
    error: '#b6151f',
  },
};

export const lightTheme: DefaultTheme = {
  mode: ColorMode.Light,
  font,
  media,
  variables,
  colors: {
    main: '#ffffff',
    white: '#ffffff',
    secondary: '#d8d8d8',
    secondaryAlpha: '#70828563',
    textMain: '#161b1f',
    textSecondary: '#90979e',
    accent: '#1d9bf0',
    accentAlpha: '#72b8eb',
    focus: '#e5e5e580',
    error: '#b6151f',
  },
};
