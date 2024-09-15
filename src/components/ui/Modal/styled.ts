import styled from 'styled-components';

import { FlexContainer } from '../FlexContainer';

export const StyledModal = styled(FlexContainer)`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`;

export const StyledModalContainer = styled.div`
  background-color: ${(props) => props.theme.colors.main};
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

export const StyledModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.secondaryAlpha};
  z-index: ${(props) => props.theme.variables.zIndex.md};
`;

export const StyledModalBody = styled.div`
  margin-top: ${(props) => props.theme.variables.spacing.md};
  padding: ${(props) => props.theme.variables.spacing.sm};
`;

export const StyledModalHeader = styled(FlexContainer)`
  padding: ${(props) => props.theme.variables.spacing.sm};
  position: sticky;
  background-color: ${(props) => props.theme.colors.main};
  top: 0;

  z-index: ${(props) => props.theme.variables.zIndex.lg};
`;

export const StyledModalContainerWrapper = styled.div`
  min-width: 20%;
  max-width: 80%;

  min-height: 20%;
  max-height: 70%;

  border-radius: ${(props) => props.theme.variables.borderRadius.md};

  overflow: hidden;
  scrollbar-gutter: unset;

  z-index: ${(props) => props.theme.variables.zIndex.lg};
`;
