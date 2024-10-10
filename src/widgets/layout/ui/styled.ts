import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export const LayoutWrapper = styled.div`
  align-self: center;
  display: grid;
  grid-template-columns: 1.5fr 3fr 2fr;
  grid-template-areas: 'left middle right';
  width: 100%;

  & > * {
    min-width: 0;
    max-width: 100%;
  }

  max-width: ${(props) => props.theme.variables.containerSize.lg};

  @media ${(props) => props.theme.media.tablet} {
    grid-template-columns: 1fr 4fr;
    max-width: ${(props) => props.theme.variables.containerSize.md};
    grid-template-areas: 'left middle';
  }

  @media ${(props) => props.theme.media.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
    grid-template-areas:
      'right'
      'middle'
      'left';
  }
`;

export const LeftColumnWrapper = styled(FlexContainer)`
  grid-area: left;
  height: 100vh;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.lg};

  @media ${(props) => props.theme.media.mobile} {
    background-color: ${(props) => props.theme.colors.main};
    top: unset;
    bottom: 0;
    height: max-content;
    flex-direction: row;
    align-items: center;
    z-index: ${(props) => props.theme.variables.zIndex.lg};
    gap: 0;
    justify-content: space-around;
    padding: ${(props) => props.theme.variables.spacing.sm} 0;
    border-top: ${(props) => props.theme.variables.borderWidth.sm} solid;
    border-color: ${(props) => props.theme.colors.secondary};
  }
`;

export const RightColumnWrapper = styled.div`
  grid-area: right;
  height: 100vh;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.lg};
  z-index: ${(props) => props.theme.variables.zIndex.lg};

  @media ${(props) => props.theme.media.tablet} {
    display: none;
  }

  @media ${(props) => props.theme.media.mobile} {
    display: block;
    height: max-content;
    background-color: ${(props) => props.theme.colors.main};
    border-bottom: ${(props) => props.theme.variables.borderWidth.sm} solid;
    border-color: ${(props) => props.theme.colors.secondary};
  }
`;

export const MiddleColumn = styled(FlexContainer)`
  grid-area: middle;
  border: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-color: ${(props) => props.theme.colors.secondary};

  @media ${(props) => props.theme.media.mobile} {
    border: none;
  }
`;
