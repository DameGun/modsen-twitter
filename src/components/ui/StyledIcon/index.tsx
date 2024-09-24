import styled, { css } from 'styled-components';

import { ColorMode } from '@/constants/theme';
import type { VariablesConstants } from '@/types/styles';

export type StyledIconProps = {
  $size?: keyof VariablesConstants['iconSize'];
  $notInvertColor?: boolean;
};

export const StyledIcon = styled.span<StyledIconProps>`
  height: ${({ theme, $size = 'md' }) => theme.variables.iconSize[$size]};
  width: ${({ theme, $size = 'md' }) => theme.variables.iconSize[$size]};

  ${({ $notInvertColor, theme }) =>
    !$notInvertColor &&
    theme.mode === ColorMode.Light &&
    css`
      & > svg {
        filter: invert();
      }
    `}
`;
