import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export const SearchWrapper = styled(FlexContainer)`
  position: relative;
  z-index: ${(props) => props.theme.variables.zIndex.xl};
`;
