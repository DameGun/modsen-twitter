import { useEffect } from 'react';

import type { ManualLoadingHandleProps } from '@/shared/types/loader';

type QueryWithLoadingProps = ManualLoadingHandleProps & {
  isLoading: boolean;
  error?: unknown;
};

export function useQueryWithLoading({
  isLoading,
  error,
  handleLoading,
  handleError,
}: QueryWithLoadingProps) {
  useEffect(() => {
    handleLoading?.(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      handleError?.(error);
    }
  }, [error]);
}
