import styled from 'styled-components';
import { css } from 'styled-components';

import { FlexContainer } from '@/components/ui';

type StyledTweetMediaWrapperProps = {
  $itemsCount: number;
};

export const TweetWrapper = styled(FlexContainer)`
  padding: ${(props) => props.theme.variables.spacing.sm};

  border-bottom: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-color: ${(props) => props.theme.colors.secondary};

  transition: ${(props) => props.theme.variables.transition.sm};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.focus};
  }
`;

export const TweetMediaWrapper = styled.div<StyledTweetMediaWrapperProps>`
  display: grid;
  position: relative;
  width: 100%;

  grid-gap: ${(props) => props.theme.variables.borderWidth.md};
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: ${(props) => props.theme.variables.imageHeight};
  grid-auto-flow: dense;

  border: ${(props) => props.theme.variables.borderWidth.sm} solid
    ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.variables.borderRadius.md};

  scrollbar-gutter: unset;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${(props) =>
    props.$itemsCount === 1 &&
    css`
      & > img {
        grid-column: span 2;
      }

      grid-auto-rows: 100%;
    `}

  ${(props) =>
    props.$itemsCount === 2 &&
    css`
      & > img {
        grid-row: span 2;
      }
    `}

    ${(props) =>
    props.$itemsCount === 3 &&
    css`
      :nth-child(3) {
        grid-column: span 2;
      }
    `}
`;
