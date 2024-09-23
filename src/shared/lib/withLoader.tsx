import { ComponentType, forwardRef, ForwardRefExoticComponent, useState } from 'react';

import type { ManualLoadingHandleProps } from '@/shared/types/loader';

import { Loader } from '../ui';

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
