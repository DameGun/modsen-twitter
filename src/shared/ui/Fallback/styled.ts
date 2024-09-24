import styled from 'styled-components';

import { FlexContainer } from '../FlexContainer';

export const NotFoundWrapper = styled(FlexContainer)`
  padding: ${(props) => props.theme.variables.spacing.lg}
    ${(props) => props.theme.variables.spacing.lg};
`;
