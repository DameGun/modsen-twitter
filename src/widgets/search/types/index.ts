type SearchInputProps = {
  handleChange(value: string): void;
  handleOpen(isOpen: boolean): void;
  defaultValue?: string;
};

type SearchProps = Pick<SearchInputProps, 'defaultValue'>;

export type { SearchInputProps, SearchProps };
