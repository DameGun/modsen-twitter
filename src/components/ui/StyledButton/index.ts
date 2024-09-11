import styled from 'styled-components';

import { ButtonVariants } from '@/constants/theme';
import { commonButtonStyles } from '@/styles/common';

interface StyledButtonProps {
  isDisabled?: boolean;
  variant?: keyof typeof ButtonVariants;
}

export const StyledButton = styled.button<StyledButtonProps>`
  ${commonButtonStyles};

  ${({ variant = 'primary' }) => ButtonVariants[variant]}

  ${({ isDisabled, theme }) =>
    isDisabled &&
    `
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.textSecondary};
        pointer-events: none;
        cursor: default;
    `}
`;
