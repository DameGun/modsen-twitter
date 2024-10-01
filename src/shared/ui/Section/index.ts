import styled from 'styled-components';

import { FlexContainer } from '../FlexContainer';

export const Section = styled(FlexContainer)`
  border-bottom: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.main};
  padding: ${(props) => props.theme.variables.spacing.md};
  height: max-content;
`;
