import styled from 'styled-components';

import { commonButtonStyles } from '@/styles/common';

export interface StyledIconButtonProps {
  $isContentCentered?: boolean;
}

export const StyledIconButton = styled.button<StyledIconButtonProps>`
  ${commonButtonStyles};

  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.variables.spacing.sm};
  justify-content: ${({ $isContentCentered }) => $isContentCentered && 'center'};

  background-color: ${(props) => props.theme.colors.main};

  border-color: ${(props) => props.theme.colors.secondary};

  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHover.main};
  }
`;
