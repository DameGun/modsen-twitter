import styled from 'styled-components';

import type { VariablesConstants } from '@/types/styles';

type FlexContainerProps = {
  gap?: keyof VariablesConstants['spacing'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  direction?: React.CSSProperties['flexDirection'];
  fullWidth?: boolean;
  noShrink?: boolean;
};

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap, theme }) => gap && theme.variables.spacing[gap]};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-grow: ${({ fullWidth }) => (fullWidth ? 1 : 0)};
  min-width: 0;
  flex-shrink: ${({ noShrink }) => (noShrink ? 0 : 1)};
`;
