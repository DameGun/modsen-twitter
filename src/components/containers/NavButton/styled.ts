import styled, { css } from 'styled-components';

import { StyledButton } from '@/components/ui';

export type StyledNavButtonProps = {
  $isActive: boolean;
};

export const StyledNavButton = styled(StyledButton)<StyledNavButtonProps>`
  width: max-content;

  ${({ $isActive }) =>
    $isActive &&
    css`
      font-weight: ${(props) => props.theme.font.weight.bold};
    `}
`;
