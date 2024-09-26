import styled from 'styled-components';

import { Section } from '@/shared/ui';

export const CreateTweetFormWrapper = styled(Section)`
  @media ${(props) => props.theme.media.mobile} {
    display: none;
  }
`;
