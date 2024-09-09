import styled from 'styled-components';

import type { VariablesConstants } from '@/types/styles';

interface ContainerProps {
  size?: keyof VariablesConstants['containerSize'];
}

export const Container = styled.div<ContainerProps>`
  align-self: center;
  width: 100%;
  max-width: ${({ theme, size = 'md' }) => theme.variables.containerSize[size]};
`;
