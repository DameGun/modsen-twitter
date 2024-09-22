import styled, { css } from 'styled-components';

import { FlexContainer, StyledButton } from '@/components/ui';

type StyledTweetLikeProps = {
  $isLiked: boolean;
};

export const StyledTweetLike = styled(StyledButton)<StyledTweetLikeProps>`
  background-color: transparent;

  & > span > svg {
    fill: ${({ $isLiked, theme }) => ($isLiked ? theme.colors.error : theme.colors.textSecondary)};
  }
`;

export const TweetLikeWrapper = styled(FlexContainer)<StyledTweetLikeProps>`
  transition: ${(props) => props.theme.variables.transition.sm};

  ${(props) =>
    props.$isLiked &&
    css`
      & > p {
        color: ${(props) => props.theme.colors.error};
      }
    `}

  &:hover > p {
    color: ${(props) => props.theme.colors.error};
  }

  &:hover ${StyledTweetLike} > span > svg {
    fill: ${(props) => props.theme.colors.error};
  }
`;
