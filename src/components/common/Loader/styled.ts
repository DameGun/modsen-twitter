import styled, { keyframes } from 'styled-components';

import { SPINNER_ANIMATION_DURATION } from '@/constants/loader';

export const StyledLoader = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryAlpha};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: ${(props) => props.theme.variables.zIndex.lg};
`;

const SpinnerAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
  height: ${(props) => props.theme.variables.iconSize.lg};
  width: ${(props) => props.theme.variables.iconSize.lg};
  border: ${(props) => props.theme.variables.borderWidth.lg} solid
    ${(props) => props.theme.colors.accent};
  border-top-color: ${(props) => props.theme.colors.secondary};
  border-radius: 50%;
  animation: ${SpinnerAnimation} ${SPINNER_ANIMATION_DURATION} linear infinite;
`;
