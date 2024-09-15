import { ComponentType, forwardRef, ForwardRefExoticComponent, useState } from 'react';

import { Loader } from '@/components/common';
import type { ManualLoadingHandleProps } from '@/types/loader';

export function withLoader<TProps extends ManualLoadingHandleProps>(
  WrappedComponent: ComponentType<TProps> | ForwardRefExoticComponent<TProps>
) {
  const ComponentWithLoader = forwardRef<HTMLElement, TProps>(function BaseComponent(props, ref) {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <Loader isLoading={isLoading} {...props}>
        <WrappedComponent ref={ref} {...(props as TProps)} handleLoading={setIsLoading} />
      </Loader>
    );
  });

  return ComponentWithLoader;
}
