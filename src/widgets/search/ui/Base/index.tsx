import { useCallback, useRef, useState } from 'react';

import useDebounce from '@/shared/lib/useDebounce';

import { SearchWrapper } from './styled';

import { SEARCH_WINDOW_CLOSE_DELAY } from '../../constants';
import { SearchInput } from '../SearchInput';
import { SearchList } from '../SearchList';

export function Search() {
  const [value, setValue] = useState('');
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

  const handleClear = useCallback(() => setValue(''), []);

  return (
    <SearchWrapper $direction='column' $fullWidth>
      <SearchInput value={value} handleOpen={handleOpen} handleChange={handleChange} />
      {isFocused && <SearchList queryValue={debounced} handleClear={handleClear} />}
    </SearchWrapper>
  );
}
