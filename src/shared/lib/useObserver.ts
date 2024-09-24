import { RefObject, useEffect } from 'react';

import { PaginateResult } from '../types/observer';

type ObserverHookProps<T> = {
  elementRef: RefObject<Element>;
  fetchNext(lastDocId?: string): void;
  data?: PaginateResult<T>;
};

export function useObserver<T>({ elementRef, fetchNext, data }: ObserverHookProps<T>) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && data && data.hasMore) {
        fetchNext(data.lastDocId);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [data]);
}
