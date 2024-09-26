import styled from 'styled-components';

import { StyledButton } from '@/shared/ui';

export const CreateTweetModalWrapper = styled.div`
  min-width: ${(props) => props.theme.variables.containerSize.sm};

  @media ${(props) => props.theme.media.mobile} {
    min-width: 0;
  }
`;

export const CreateTweetButton = styled(StyledButton)`
  & > :nth-child(1) {
    display: none;
  }

  @media ${(props) => props.theme.media.tablet} {
    & > :nth-child(1) {
      display: block;
    }

    & > :nth-child(2) {
      display: none;
    }
  }

  @media ${(props) => props.theme.media.mobile} {
    transition: none;
    position: absolute;
    right: ${(props) => props.theme.variables.spacing.sm};
    transform: translateY(-150%);
  }
`;
