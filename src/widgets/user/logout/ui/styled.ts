import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export const UserButtonWrapper = styled(FlexContainer)`
  @media ${(props) => props.theme.media.tablet} {
    flex-direction: column;
  }

  @media ${(props) => props.theme.media.mobile} {
    & > :first-child {
      display: none;
    }
  }
`;

export const UserButtonInfoWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: start;
  white-space: nowrap;
  overflow: hidden;
  width: 70%;
  text-overflow: ellipsis;
`;
