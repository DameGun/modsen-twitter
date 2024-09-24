import { useCallback, useState } from 'react';

import type { ManualLoadingHandleProps } from '@/types/loader';

type AsyncLoadingFunction<TParams, TReturn> = (...args: TParams[]) => Promise<TReturn | undefined>;

type AsyncLoadingHookProps<TParams, TReturn> = ManualLoadingHandleProps & {
  call: AsyncLoadingFunction<TParams, TReturn>;
  errorHandler?(error: unknown): void;
  handleResult?(data?: Awaited<TReturn>): void;
};

type AsyncLoadingHookReturnValue<TParams, TReturn> = {
  isLoading: boolean;
  isError: boolean;
  call: AsyncLoadingFunction<TParams, TReturn>;
  resetState: VoidFunction;
};

export function useAsyncWithLoading<TParams, TReturn>({
  call,
  errorHandler,
  handleLoading,
  handleResult,
}: AsyncLoadingHookProps<TParams, TReturn>): AsyncLoadingHookReturnValue<TParams, TReturn> {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const resetState = useCallback(() => {
    setIsError(false);
    setIsLoading(false);
  }, []);

  const wrappedFunction = useCallback(
    async (...args: TParams[]) => {
      setIsError(false);
      setIsLoading(true);
      handleLoading?.(true);

      try {
        const result = await call(...args);
        handleResult?.(result);
        return result;
      } catch (err) {
        setIsError(true);
        errorHandler?.(err);
      } finally {
        setIsLoading(false);
        handleLoading?.(false);
      }
    },
    [call]
  );

  return { isLoading, isError, call: wrappedFunction, resetState };
}
