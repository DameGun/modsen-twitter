import styled from 'styled-components';

import { commonControlWithLabelStyles, commonLabelStyles } from '@/styles/common';

export const StyledSelectWrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSelect = styled.select`
  ${commonControlWithLabelStyles}
`;

export const StyledSelectLabel = styled.label`
  ${commonLabelStyles};

  transform: translateY(-${(props) => props.theme.variables.spacing.md});
  font-size: ${(props) => props.theme.font.size.sm};

  ${StyledSelect}:focus + & {
    color: ${(props) => props.theme.colors.accent};
  }

  ${StyledSelect}:not(:focus) + & {
    color: ${(props) => props.theme.colors.secondary};
  }
`;
