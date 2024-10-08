import styled from 'styled-components';

import { FlexContainer } from '../FlexContainer';

export const StickyContainer = styled(FlexContainer)`
  position: sticky;
  top: 0;
  z-index: ${(props) => props.theme.variables.zIndex.xs};
`;
