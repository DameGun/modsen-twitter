import { SelectHTMLAttributes } from 'react';

import { StyledSelect, StyledSelectLabel, StyledSelectWrapper } from './styled';

type CustomSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder?: string;
  items: number[] | string[];
};

export function CustomSelect({ placeholder, items, ...rest }: CustomSelectProps) {
  return (
    <StyledSelectWrapper>
      <StyledSelect {...rest}>
        {items.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </StyledSelect>
      <StyledSelectLabel htmlFor={rest.name}>{placeholder}</StyledSelectLabel>
    </StyledSelectWrapper>
  );
}
