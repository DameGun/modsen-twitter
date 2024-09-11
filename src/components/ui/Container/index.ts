import styled from 'styled-components';

import type { VariablesConstants } from '@/types/styles';

import { FlexContainer } from '../FlexContainer';

type ContainerProps = {
  size?: keyof VariablesConstants['containerSize'];
  isCentered?: boolean;
};

export const Container = styled(FlexContainer)<ContainerProps>`
  align-self: ${({ isCentered }) => isCentered && 'center'};
  width: 100%;
  max-width: ${({ theme, size = 'md' }) => theme.variables.containerSize[size]};

  & > * {
    flex-grow: 1;
  }
`;
