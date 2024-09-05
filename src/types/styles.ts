type FontConstants = {
  size: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  weight: {
    thin: number;
    light: number;
    regular: number;
    semibold: number;
  };
};

type ColorsConstants = {
  main: string;
  secondary: string;
  textMain: string;
  textSecondary: string;
  accent: string;
  accentAlpha: string;
  focus: string;
};

type MediaConstants = {
  mobile: string;
  tablet: string;
};

export type { ColorsConstants, FontConstants, MediaConstants };
