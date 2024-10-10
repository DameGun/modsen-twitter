import styled, { css } from 'styled-components';

import { FlexContainer } from '@/shared/ui';

export type StyledImageEditProps = {
  $absolute?: boolean;
};

export const StyledImageEditButtonWrapper = styled(FlexContainer)<StyledImageEditProps>`
  ${(props) =>
    props.$absolute &&
    css`
      position: absolute;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `}
`;
