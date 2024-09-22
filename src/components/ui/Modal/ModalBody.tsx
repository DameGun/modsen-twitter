import type { ModalBodyProps } from '@/types/modal';

import { ModalContext } from './context';
import { StyledModalBody } from './styled';

export const ModalBody = ({ children }: ModalBodyProps) => (
  <ModalContext.Consumer>
    {(context) => (
      <StyledModalBody>
        {typeof children === 'function' ? children(context) : children}
      </StyledModalBody>
    )}
  </ModalContext.Consumer>
);
