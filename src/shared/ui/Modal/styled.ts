import styled, { css } from 'styled-components';

import type { StyledModalContentProps } from '@/shared/types/modal';

import { FlexContainer } from '../FlexContainer';

export const StyledModal = styled(FlexContainer)`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: ${(props) => props.theme.variables.zIndex.lg};
`;

export const StyledModalContainer = styled.div`
  background-color: ${(props) => props.theme.colors.main};
  overflow-y: auto;
  scrollbar-gutter: unset;
  overflow-x: hidden;
  height: 100%;
`;

export const StyledModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.secondaryAlpha};
  z-index: ${(props) => props.theme.variables.zIndex.lg};
`;

export const StyledModalBody = styled.div`
  padding: ${(props) => props.theme.variables.spacing.md};
`;

export const StyledModalHeader = styled(FlexContainer)`
  padding: ${(props) => props.theme.variables.spacing.sm};
  position: sticky;
  background-color: ${(props) => props.theme.colors.main};
  top: 0;

  z-index: ${(props) => props.theme.variables.zIndex.lg};
  white-space: pre-wrap;
  text-align: left;
`;

export const StyledModalContainerWrapper = styled.div<StyledModalContentProps>`
  min-height: 20%;
  max-height: 70%;

  border-radius: ${(props) => props.theme.variables.borderRadius.md};

  overflow: hidden;
  scrollbar-gutter: unset;

  z-index: ${(props) => props.theme.variables.zIndex.xl};

  @media ${(props) => props.theme.media.mobile} {
    ${({ $isMobileFullscreen }) =>
      $isMobileFullscreen &&
      css`
        max-height: 100vh;
        height: 100%;
        width: 100vw;
        border-radius: 0;
      `}
  }
`;
