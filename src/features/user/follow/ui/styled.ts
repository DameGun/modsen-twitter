import styled, { css } from 'styled-components';

import { StyledButton } from '@/shared/ui';

type StyledFollowButtonProps = {
  $isFollowed: boolean;
};

export const StyledFollowButton = styled(StyledButton)<StyledFollowButtonProps>`
  &:hover {
    ${({ $isFollowed, theme }) =>
      $isFollowed &&
      css`
        border-color: ${theme.colors.error};

        & > * {
          color: ${theme.colors.error};
        }
      `}
  }
`;
