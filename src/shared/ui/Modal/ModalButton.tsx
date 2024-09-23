import type { ModalButtonProps } from '@/shared/types/modal';

import { ModalContext } from './context';

export function ModalButton({ children }: ModalButtonProps) {
  return (
    <ModalContext.Consumer>
      {(context) => (typeof children === 'function' ? children(context) : children)}
    </ModalContext.Consumer>
  );
}
