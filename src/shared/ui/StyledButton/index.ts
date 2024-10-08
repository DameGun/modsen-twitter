import styled from 'styled-components';

import {
  commonButtonStyles,
  filledButtonStyles,
  iconButtonStyles,
  outlineButtonStyles,
  primaryButtonStyles,
} from '@/shared/styles/common';

const ButtonVariants = {
  primary: primaryButtonStyles,
  filled: filledButtonStyles,
  outline: outlineButtonStyles,
  icon: iconButtonStyles,
} as const;

type StyledButtonProps = {
  $isDisabled?: boolean;
  $variant?: keyof typeof ButtonVariants;
};

export const StyledButton = styled.button.attrs((props) => ({
  type: props.type ? props.type : 'button',
}))<StyledButtonProps>`
  ${commonButtonStyles};

  ${({ $variant = 'primary' }) => ButtonVariants[$variant]}

  ${({ $isDisabled, theme }) =>
    $isDisabled &&
    `
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.textSecondary};
        pointer-events: none;
        cursor: default;
    `}
`;
