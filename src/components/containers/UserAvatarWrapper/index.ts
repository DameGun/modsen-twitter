import styled from 'styled-components';

import { FlexContainer } from '@/components/ui';

export const UserAvatarWrapper = styled(FlexContainer)`
  position: relative;
  height: 50px;

  & > :first-child {
    position: absolute;
    left: 0;
  }
`;
