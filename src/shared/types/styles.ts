type ExtractPropNameFromStyled<T> = T extends `$${infer PropName}` ? PropName : never;

type FormatStyledProps<T> = {
  [Key in keyof T as ExtractPropNameFromStyled<Key>]: T[Key];
};

export type { FormatStyledProps };
