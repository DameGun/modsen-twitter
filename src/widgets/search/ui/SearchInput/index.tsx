import { ChangeEvent, useRef } from 'react';

import { SearchIcon } from '@/shared/assets/icons';
import { StyledIcon } from '@/shared/ui';

import { SearchInputWrapper, StyledSearchInput } from './styled';

type SearchInputProps = {
  handleChange(value: string): void;
  handleOpen(isOpen: boolean): void;
  value: string;
};

export function SearchInput({ handleChange, handleOpen, value }: SearchInputProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      handleOpen(true);
    }
  };

  const handleBlur = () => handleOpen(false);

  return (
    <SearchInputWrapper $noShrink $gap='sm' onClick={handleFocus} onBlur={handleBlur}>
      <StyledIcon $size='sm'>
        <SearchIcon title='Search' />
      </StyledIcon>
      <StyledSearchInput ref={inputRef} value={value} onChange={onChange} placeholder='Search' />
    </SearchInputWrapper>
  );
}
