import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export const AvatarWrapper = styled(FlexContainer)`
  position: relative;
  height: 50px;

  & > :first-child {
    position: absolute;
    left: 0;
  }
`;
