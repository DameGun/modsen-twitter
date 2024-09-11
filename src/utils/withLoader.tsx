import { ComponentType, useState } from 'react';

import { Loader } from '@/components/common';
import type { ManualLoadingHandleProps } from '@/types/loader';

export function withLoader<TProps extends ManualLoadingHandleProps>(
  WrappedComponent: ComponentType<TProps>
) {
  const ComponentWithLoader = (props: TProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <Loader isLoading={isLoading} isLoaderFullScreen={props.isLoaderFullScreen}>
        <WrappedComponent {...props} handleLoading={setIsLoading} />
      </Loader>
    );
  };

  return ComponentWithLoader;
}
