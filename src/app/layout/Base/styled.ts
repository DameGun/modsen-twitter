import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export const LayoutWrapper = styled.div`
  align-self: center;
  display: grid;
  grid-template-columns: 1.5fr 3fr 2fr;

  & > * {
    min-width: 0;
    max-width: 100%;
  }

  max-width: ${(props) => props.theme.variables.containerSize.lg};
`;

export const LeftColumnWrapper = styled(FlexContainer)`
  height: 100vh;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.lg};
  border-right: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-color: ${(props) => props.theme.colors.secondary};
`;

export const RightColumnWrapper = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.lg};
  border-left: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-color: ${(props) => props.theme.colors.secondary};
`;
