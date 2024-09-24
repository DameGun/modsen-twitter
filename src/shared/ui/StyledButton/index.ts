import styled from 'styled-components';

import { ButtonVariants } from '@/shared/constants/theme';
import { commonButtonStyles } from '@/shared/styles/common';

type StyledButtonProps = {
  $isDisabled?: boolean;
  variant?: keyof typeof ButtonVariants;
};

export const StyledButton = styled.button.attrs((props) => ({
  type: props.type ? props.type : 'button',
}))<StyledButtonProps>`
  ${commonButtonStyles};

  ${({ variant = 'primary' }) => ButtonVariants[variant]}

  ${({ $isDisabled, theme }) =>
    $isDisabled &&
    `
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.textSecondary};
        pointer-events: none;
        cursor: default;
    `}
`;
