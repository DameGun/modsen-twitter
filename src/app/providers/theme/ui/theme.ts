import type { DefaultTheme } from 'styled-components';

import { ColorMode } from '../model/constants';
import type {
  ColorsConstants,
  CommonColorConstants,
  FontConstants,
  MediaConstants,
  VariablesConstants,
} from '../model/styles';

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

const commonColorsConstants: CommonColorConstants = {
  white: '#ffffff',
  secondaryAlpha: '#70828563',
  accentAlpha: '#72b8eb',
  error: '#b6151f',
};

const darkColorConstants: ColorsConstants = {
  main: '#000000',
  secondary: '#2b2f31',
  textMain: '#e2e2e2',
  textSecondary: '#525355',
  accent: '#1d9bf0',
  focus: '#22232480',
  ...commonColorsConstants,
};

const lightColorConstants: ColorsConstants = {
  main: '#ffffff',
  secondary: '#d8d8d8',
  textMain: '#161b1f',
  textSecondary: '#90979e',
  accent: '#1d9bf0',
  focus: '#e5e5e580',
  ...commonColorsConstants,
};

export const darkTheme: DefaultTheme = {
  mode: ColorMode.Dark,
  font,
  media,
  variables,
  colors: darkColorConstants,
};

export const lightTheme: DefaultTheme = {
  mode: ColorMode.Light,
  font,
  media,
  variables,
  colors: lightColorConstants,
};
