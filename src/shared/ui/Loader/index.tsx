import { ReactNode, useEffect, useState } from 'react';

import { LOADER_MIN_WAITING_TIME } from '@/shared/constants/loader';
import type { FormatStyledProps } from '@/shared/types/styles';

import { Spinner, StyledLoader, StyledLoaderProps } from './styled';

export type LoaderProps = FormatStyledProps<StyledLoaderProps> & {
  children?: ReactNode;
  isLoading?: boolean;
};

export function Loader({ isLoaderFullScreen, isLoading, children }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsVisible(true), LOADER_MIN_WAITING_TIME);

    if (!isLoading) {
      setIsVisible(false);
      clearTimeout(timeoutId);
    }

    return () => {
      setIsVisible(false);
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  return (
    <>
      {children}
      {isVisible && (
        <StyledLoader $isLoaderFullScreen={isLoaderFullScreen}>
          <Spinner />
        </StyledLoader>
      )}
    </>
  );
}
