import { useEffect, useState } from 'react';

import { LOADER_MIN_WAITING_TIME } from '@/constants/loader';

import { Spinner, StyledLoader } from './styled';

interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsVisible(true), LOADER_MIN_WAITING_TIME);

    if (!isLoading) {
      setIsVisible(false);
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  return (
    isVisible && (
      <StyledLoader>
        <Spinner />
      </StyledLoader>
    )
  );
}
