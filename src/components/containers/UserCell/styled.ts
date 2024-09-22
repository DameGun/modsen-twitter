import styled from 'styled-components';

import { FlexContainer } from '@/components/ui';

export const UserCellWrapper = styled(FlexContainer)`
  padding: ${(props) => props.theme.variables.spacing.md};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.focus};
  }
`;
