import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export const MediaWrapper = styled(FlexContainer)`
  overflow-x: auto;
  max-width: 100%;
`;

export const MediaWrapperInner = styled(FlexContainer)`
  min-width: auto;
`;
