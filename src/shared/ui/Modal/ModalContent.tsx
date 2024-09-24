import { useContext } from 'react';
import { createPortal } from 'react-dom';

import type { ModalContentProps } from '@/shared/types/modal';

import { ModalContext } from './context';
import {
  StyledModal,
  StyledModalContainer,
  StyledModalContainerWrapper,
  StyledModalOverlay,
} from './styled';

export function ModalContent({ children }: ModalContentProps) {
  const { isOpen, handleClose } = useContext(ModalContext);

  return (
    isOpen &&
    createPortal(
      <StyledModal $direction='column' $justify='center' $align='center' className='modal-open'>
        <StyledModalContainerWrapper>
          <StyledModalContainer>
            {Array.isArray(children) ? children.map((child) => child) : children}
          </StyledModalContainer>
        </StyledModalContainerWrapper>
        <StyledModalOverlay onClick={handleClose()} />
      </StyledModal>,
      document.body
    )
  );
}
