import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export const SidebarButtonsWrapper = styled(FlexContainer)`
  @media ${(props) => props.theme.media.tablet} {
    align-items: center;
  }

  @media ${(props) => props.theme.media.mobile} {
    align-items: center;
    flex-direction: row;
    gap: ${(props) => props.theme.variables.spacing.md};
  }
`;
