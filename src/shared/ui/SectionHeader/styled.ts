import styled from 'styled-components';

import { FlexContainer } from '../FlexContainer';

export const StyledSectionHeader = styled(FlexContainer)`
  background-color: ${(props) => props.theme.colors.main};
  position: sticky;
  top: 0;
  z-index: ${(props) => props.theme.variables.zIndex.xs};
  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.md};
`;
