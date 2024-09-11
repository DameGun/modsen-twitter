import styled, { css } from 'styled-components';

import { ColorMode } from '@/constants/theme';
import type { VariablesConstants } from '@/types/styles';

interface StyledIconProps {
  size?: keyof VariablesConstants['iconSize'];
  invertIconColor?: boolean;
}

export const StyledIcon = styled.span<StyledIconProps>`
  height: ${({ theme, size = 'md' }) => theme.variables.iconSize[size]};
  width: ${({ theme, size = 'md' }) => theme.variables.iconSize[size]};

  ${({ invertIconColor, theme }) =>
    invertIconColor &&
    theme.mode === ColorMode.Dark &&
    css`
      & > svg {
        filter: invert();
      }
    `}
`;
