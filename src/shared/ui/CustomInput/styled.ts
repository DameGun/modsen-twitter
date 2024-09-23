import styled, { css } from 'styled-components';

import { commonControlWithLabelStyles, commonLabelStyles } from '@/shared/styles/common';

import { StyledIcon } from '../StyledIcon';

export type ControlStylesProps = {
  $isInvalid?: boolean;
  $variant?: 'primary' | 'unstyled';
};

export const StyledInputWrapper = styled.span<ControlStylesProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  padding: ${(props) => props.theme.variables.spacing.sm};

  ${({ $variant = 'primary' }) =>
    $variant === 'primary' &&
    css`
      border: ${(props) => props.theme.variables.borderWidth.sm} solid;
      border-radius: ${(props) => props.theme.variables.borderRadius.sm};

      border-color: ${(props) => props.theme.colors.secondary};
    `};

  &:focus-within {
    border-color: ${({ theme, $isInvalid }) =>
      $isInvalid ? theme.colors.error : theme.colors.accent};
  }

  ${({ theme, $isInvalid }) =>
    $isInvalid &&
    css`
      border-color: ${theme.colors.error};
    `}

  &:focus-within > *:not(:nth-child(2)) {
    color: ${({ theme, $isInvalid }) => ($isInvalid ? theme.colors.error : theme.colors.accent)};
  }
`;

export const StyledInputInfoWrapper = styled.span`
  background-color: ${(props) => props.theme.colors.main};
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const StyledInput = styled.input`
  ${commonControlWithLabelStyles};
  resize: none;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${(props) => props.theme.colors.main} inset;
    -webkit-text-fill-color: ${(props) => props.theme.colors.textMain};
  }
`;

export const StyledInputLabel = styled.label<ControlStylesProps>`
  ${commonLabelStyles};

  ${({ $variant = 'primary' }) =>
    $variant === 'primary' &&
    css`
      ${StyledInput}:not(:placeholder-shown) + &, ${StyledInput}:focus + & {
        transform: translateY(-${(props) => props.theme.variables.spacing.sm});
        font-size: ${(props) => props.theme.font.size.sm};
      }
    `}

  ${({ $variant = 'primary' }) =>
    $variant === 'unstyled' &&
    css`
      transform: translateY(-${(props) => props.theme.variables.spacing.sm});
    `}
`;

export const VisibilityOption = styled(StyledIcon)<ControlStylesProps>`
  position: absolute;
  top: ${(props) => props.theme.variables.spacing.md};
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

export const LengthConstraint = styled.span`
  width: 100%;
  text-align: end;
  align-self: flex-end;
  pointer-events: none;
  font-size: ${(props) => props.theme.font.size.sm};
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.secondary};
  min-height: 20px;
`;
