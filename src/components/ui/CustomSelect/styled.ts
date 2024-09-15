import styled from 'styled-components';

import { commonControlWithLabelStyles, commonLabelStyles } from '@/styles/common';

export const StyledSelectWrapper = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;

  padding: ${(props) => props.theme.variables.spacing.sm};

  border: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-radius: ${(props) => props.theme.variables.borderRadius.sm};

  border-color: ${(props) => props.theme.colors.secondary};

  &:focus-within {
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

export const StyledSelect = styled.select`
  ${commonControlWithLabelStyles};
  padding-top: ${(props) => props.theme.variables.spacing.md};

  &:focus {
    outline: none;
  }
`;

export const StyledSelectLabel = styled.label`
  ${commonLabelStyles};

  transform: translateY(-${(props) => props.theme.variables.spacing.sm});
  font-size: ${(props) => props.theme.font.size.sm};

  ${StyledSelect}:focus + & {
    color: ${(props) => props.theme.colors.accent};
  }

  ${StyledSelect}:not(:focus) + & {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
