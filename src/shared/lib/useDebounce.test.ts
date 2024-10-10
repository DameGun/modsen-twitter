import { act, renderHook } from '@testing-library/react';

import useDebounce from '@/shared/lib/useDebounce';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce({ value: 'initial' }));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value change', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce({ value, delay: 500 }), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'changed' });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('changed');
  });
});
