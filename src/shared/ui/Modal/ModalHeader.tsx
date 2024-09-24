import { useContext } from 'react';

import { CloseIcon } from '@/shared/assets/icons';
import type { ModalHeaderProps } from '@/shared/types/modal';

import { ModalContext } from './context';
import { StyledModalHeader } from './styled';

import { FlexContainer } from '../FlexContainer';
import { StyledButton } from '../StyledButton';
import { StyledIcon } from '../StyledIcon';
import { Paragraph } from '../Text';

export function ModalHeader({ children, showSubmitButton, handleSubmit }: ModalHeaderProps) {
  const { handleClose, isFormValid } = useContext(ModalContext);

  return (
    <StyledModalHeader $align='center' $justify='space-between'>
      <FlexContainer $align='center' $gap='sm'>
        <StyledButton onClick={handleClose()} variant='icon'>
          <StyledIcon $size='sm'>
            <CloseIcon />
          </StyledIcon>
        </StyledButton>
        {children}
      </FlexContainer>
      {showSubmitButton && (
        <StyledButton
          variant='filled'
          type='submit'
          $isDisabled={!isFormValid}
          onClick={handleSubmit}
        >
          <Paragraph>Save</Paragraph>
        </StyledButton>
      )}
    </StyledModalHeader>
  );
}
