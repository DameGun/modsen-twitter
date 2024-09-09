type BaseStylesOptions = {
  sm: string | number;
  md: string | number;
  lg: string | number;
};

type StylesOptions<T extends string = ''> = [T] extends ['']
  ? BaseStylesOptions
  : BaseStylesOptions & {
      [K in T]: string | number;
    };

type FontConstants = {
  size: StylesOptions<'xl' | 'xl2' | 'xl3'>;
  weight: {
    thin: number;
    light: number;
    regular: number;
    semibold: number;
    bold: number;
  };
};

type MainColors = {
  main: string;
  secondary: string;
  accent: string;
};

type ColorsConstants = MainColors & {
  secondaryAlpha: string;
  textMain: string;
  textSecondary: string;
  accentAlpha: string;
  focus: string;
  error: string;
  buttonHover: MainColors;
};

type MediaConstants = {
  mobile: string;
  tablet: string;
};

type VariablesConstants = {
  iconSize: StylesOptions<'xl'>;
  spacing: StylesOptions<'xl'>;
  containerSize: StylesOptions;
  borderWidth: StylesOptions;
  borderRadius: StylesOptions;
  transition: StylesOptions;
  zIndex: StylesOptions;
};

export type { ColorsConstants, FontConstants, MainColors, MediaConstants, VariablesConstants };
