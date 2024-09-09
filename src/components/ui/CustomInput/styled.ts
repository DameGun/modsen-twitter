import styled, { css } from 'styled-components';

import { commonControlWithLabelStyles, commonLabelStyles } from '@/styles/common';

import { StyledIcon } from '../StyledIcon';

export interface ControlStylesProps {
  $isInvalid?: boolean;
}

export const StyledInputWrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled.input<ControlStylesProps>`
  ${commonControlWithLabelStyles};

  ${({ theme, $isInvalid }) =>
    $isInvalid &&
    css`
      &,
      &:focus {
        border-color: ${theme.colors.error};
      }
    `}

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${(props) => props.theme.colors.focus} inset;
    -webkit-text-fill-color: ${(props) => props.theme.colors.textMain};
  }
`;

export const StyledInputLabel = styled.label<ControlStylesProps>`
  ${commonLabelStyles};

  ${StyledInput}:not(:placeholder-shown) + &, ${StyledInput}:focus + & {
    transform: translateY(-${(props) => props.theme.variables.spacing.md});
    font-size: ${(props) => props.theme.font.size.sm};
    color: ${({ theme, $isInvalid }) => ($isInvalid ? theme.colors.error : theme.colors.accent)};
  }

  ${StyledInput}:not(:focus) + & {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const LengthConstraint = styled.span<ControlStylesProps>`
  position: absolute;
  pointer-events: none;
  right: ${(props) => props.theme.variables.spacing.sm};
  transform: translateY(-${(props) => props.theme.variables.spacing.md});
  font-size: ${(props) => props.theme.font.size.md};
  color: ${(props) => props.theme.colors.secondary};

  ${StyledInput}:focus ~ & {
    color: ${({ theme, $isInvalid }) => ($isInvalid ? theme.colors.error : theme.colors.accent)};
  }

  ${StyledInput}:not(:focus) ~ & {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const VisibilityOption = styled(StyledIcon)<ControlStylesProps>`
  position: absolute;
  right: ${(props) => props.theme.variables.spacing.sm};
  cursor: pointer;

  & > svg {
    fill: ${(props) => props.theme.colors.secondary};
  }

  ${StyledInput}:focus ~ & > svg {
    fill: ${({ theme, $isInvalid }) => ($isInvalid ? theme.colors.error : theme.colors.accent)};
  }

  ${StyledInput}:not(:focus) ~ & > svg {
    fill: ${(props) => props.theme.colors.secondary};
  }
`;
