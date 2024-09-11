import styled from 'styled-components';

import { FlexContainer } from '@/components/ui';

export const AvatarAndEditWrapper = styled(FlexContainer)`
  position: relative;

  & > :first-child {
    position: absolute;
    left: 0;
  }
`;
