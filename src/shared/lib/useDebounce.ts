import { useEffect, useState } from 'react';

import { DEBOUNCE_BASE_DELAY } from '../constants/debounce';

type DebounceProps = {
  value: string;
  delay?: number;
};

export default function useDebounce({ value, delay = DEBOUNCE_BASE_DELAY }: DebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
}
