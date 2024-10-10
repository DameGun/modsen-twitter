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

type CommonColorConstants = {
  white: string;
  secondaryAlpha: string;
  accentAlpha: string;
  error: string;
};

type ColorsConstants = CommonColorConstants & {
  main: string;
  secondary: string;
  accent: string;
  textMain: string;
  textSecondary: string;
  focus: string;
};

type MediaConstants = {
  mobile: string;
  tablet: string;
};

type VariablesConstants = {
  iconSize: StylesOptions<'xs' | 'xl' | 'xl2'>;
  spacing: StylesOptions<'xs' | 'xl'>;
  containerSize: StylesOptions<'xs'>;
  borderWidth: StylesOptions;
  borderRadius: StylesOptions;
  transition: StylesOptions;
  zIndex: StylesOptions<'xs' | 'xl'>;
  imageHeight: string;
};

export type {
  ColorsConstants,
  CommonColorConstants,
  FontConstants,
  MediaConstants,
  VariablesConstants,
};
