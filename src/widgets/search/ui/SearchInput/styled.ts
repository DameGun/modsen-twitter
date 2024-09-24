import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export const SearchInputWrapper = styled(FlexContainer)`
  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.md};
  background-color: ${(props) => props.theme.colors.secondary};
  border: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-radius: ${(props) => props.theme.variables.borderRadius.md};
  border-color: transparent;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.accent};
    background-color: ${(props) => props.theme.colors.main};
  }
`;

export const StyledSearchInput = styled.input`
  all: unset;
`;
