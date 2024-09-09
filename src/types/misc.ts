type FormatStyledProps<T> = {
  [Key in keyof T as ExtractPropNameFromStyled<Key>]: T[Key];
};

type ExtractPropNameFromStyled<T> = T extends `$${infer PropName}` ? PropName : never;

export type { ExtractPropNameFromStyled, FormatStyledProps };
