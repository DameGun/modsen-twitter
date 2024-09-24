import { ChangeEvent, useRef } from 'react';

import { SearchIcon } from '@/shared/assets/icons';
import { StyledIcon } from '@/shared/ui';

import { SearchInputWrapper, StyledSearchInput } from './styled';

import { SearchInputProps } from '../../types';

export function SearchInput({ handleChange, handleOpen, defaultValue }: SearchInputProps) {
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
        <SearchIcon />
      </StyledIcon>
      <StyledSearchInput
        ref={inputRef}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder='Search'
      />
    </SearchInputWrapper>
  );
}
