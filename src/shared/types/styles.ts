type ExtractPropNameFromStyled<T> = T extends `$${infer PropName}` ? PropName : never;

type FormatStyledProps<T> = {
  [Key in keyof T as ExtractPropNameFromStyled<Key>]: T[Key];
};

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

type ColorsConstants = {
  main: string;
  secondary: string;
  white: string;
  accent: string;
  secondaryAlpha: string;
  textMain: string;
  textSecondary: string;
  accentAlpha: string;
  focus: string;
  error: string;
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
  FontConstants,
  FormatStyledProps,
  MediaConstants,
  VariablesConstants,
};
