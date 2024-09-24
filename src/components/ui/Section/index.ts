import styled from 'styled-components';

import { FlexContainer } from '../FlexContainer';

export const Section = styled(FlexContainer)`
  border-bottom: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.md};

  height: max-content;
`;
