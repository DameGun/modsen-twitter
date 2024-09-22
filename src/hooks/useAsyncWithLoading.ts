import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ManualLoadingHandleProps } from '@/types/loader';

type AsyncLoadingFunction<TParams, TReturn> = (args: TParams) => Promise<TReturn | undefined>;

type AsyncLoadingHookProps<TParams, TReturn> = ManualLoadingHandleProps & {
  call: AsyncLoadingFunction<TParams, TReturn>;
  args?: TParams;
  errorHandler?(error: unknown): void;
  handleResult?(data?: Awaited<TReturn>): void;
  loadInitially?: boolean;
  triggerVariable?: unknown;
};

type AsyncLoadingHookReturnValue<TParams, TReturn> = {
  isLoading: boolean;
  isError: boolean;
  call: AsyncLoadingFunction<TParams, TReturn>;
  resetState: VoidFunction;
  data: TReturn | undefined;
};

export function useAsyncWithLoading<TParams, TReturn>({
  call,
  errorHandler,
  handleLoading,
  handleResult,
  args,
  loadInitially = false,
  triggerVariable,
}: AsyncLoadingHookProps<TParams, TReturn>): AsyncLoadingHookReturnValue<TParams, TReturn> {
  const [isLoading, setIsLoading] = useState(loadInitially);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<TReturn>();
  const memoizedArgs = useMemo(() => args, [JSON.stringify(args)]);
  const memoizedTriggerVariable = useMemo(() => triggerVariable, [JSON.stringify(triggerVariable)]);

  const resetState = useCallback(() => {
    setIsError(false);
    setIsLoading(false);
    setData(undefined);
  }, []);

  const wrappedFunction = useCallback(
    async (callArgs?: TParams) => {
      setIsError(false);
      setIsLoading(true);
      handleLoading?.(true);

      try {
        const result = await call(callArgs!);
        setData(result);
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

  useEffect(() => {
    if (loadInitially) {
      resetState();
      wrappedFunction(memoizedArgs);
    }
  }, [memoizedArgs, memoizedTriggerVariable]);

  return { data, isLoading, isError, call: wrappedFunction, resetState };
}
