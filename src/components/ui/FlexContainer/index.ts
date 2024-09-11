import styled from 'styled-components';

import { VariablesConstants } from '@/types/styles';

type FlexContainerProps = {
  gap?: keyof VariablesConstants['spacing'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  direction?: React.CSSProperties['flexDirection'];
};

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap, theme }) => gap && theme.variables.spacing[gap]};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
`;
