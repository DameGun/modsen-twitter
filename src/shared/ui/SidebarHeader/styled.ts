import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export const SidebarHeaderWrapper = styled(FlexContainer)`
  @media ${(props) => props.theme.media.tablet} {
    flex-direction: column;
  }

  @media ${(props) => props.theme.media.tablet} {
    & > :first-child {
      display: none;
    }
  }
`;
