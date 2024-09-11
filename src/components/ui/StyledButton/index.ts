import styled from 'styled-components';

import { commonButtonStyles } from '@/styles/common';

interface StyledButtonProps {
  isDisabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  ${commonButtonStyles};

  color: ${(props) => props.theme.colors.textMain};

  border-color: ${(props) => props.theme.colors.secondary};

  background-color: ${(props) => props.theme.colors.accent};

  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHover.accent};
  }

  ${({ isDisabled, theme }) =>
    isDisabled &&
    `
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.textSecondary};
        pointer-events: none;
        cursor: default;
    `}
`;
