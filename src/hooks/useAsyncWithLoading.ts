import { useMemo, useState } from 'react';

import type { ManualLoadingHandleProps } from '@/types/loader';

type AsyncLoadingFunction<TParams, TReturn> = (...args: TParams[]) => Promise<TReturn | undefined>;

interface AsyncLoadingHookProps<TParams, TReturn> extends ManualLoadingHandleProps {
  call: AsyncLoadingFunction<TParams, TReturn>;
  errorHandler?(error: unknown): void;
}

interface AsyncLoadingHookReturnValue<TParams, TReturn> {
  isLoading: boolean;
  isError: boolean;
  call: AsyncLoadingFunction<TParams, TReturn>;
}

export function useAsyncWithLoading<TParams, TReturn>({
  call,
  errorHandler,
  handleLoading,
}: AsyncLoadingHookProps<TParams, TReturn>): AsyncLoadingHookReturnValue<TParams, TReturn> {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const wrappedFunction = useMemo(() => {
    return async (...args: TParams[]) => {
      setIsError(false);
      setIsLoading(true);
      handleLoading?.(true);

      try {
        const result = await call(...args);
        return result;
      } catch (err) {
        setIsError(true);
        errorHandler?.(err);
      } finally {
        setIsLoading(false);
        handleLoading?.(false);
      }
    };
  }, [call]);

  return { isLoading, isError, call: wrappedFunction };
}
