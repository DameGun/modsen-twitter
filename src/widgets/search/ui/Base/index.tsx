import { useCallback, useRef, useState } from 'react';

import useDebounce from '@/shared/lib/useDebounce';

import { SearchWrapper } from './styled';

import { SEARCH_WINDOW_CLOSE_DELAY } from '../../constants';
import type { SearchProps } from '../../types';
import { SearchInput } from '../SearchInput';
import { SearchList } from '../SearchList';

export function Search({ defaultValue }: SearchProps) {
  const [value, setValue] = useState(defaultValue ?? '');
  const debounced = useDebounce({ value });
  const [isFocused, setIsFocused] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout>();

  const handleChange = useCallback((value: string) => setValue(value), []);

  const handleOpen = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      if (timeoutId.current) clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => setIsFocused(isOpen), SEARCH_WINDOW_CLOSE_DELAY);
    } else {
      setIsFocused(isOpen);
    }
  }, []);

  return (
    <SearchWrapper $direction='column' $fullWidth>
      <SearchInput
        handleOpen={handleOpen}
        handleChange={handleChange}
        defaultValue={defaultValue}
      />
      {isFocused && <SearchList queryValue={debounced} />}
    </SearchWrapper>
  );
}
