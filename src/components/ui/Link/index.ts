import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { ColorsConstants } from '@/types/styles';

type StyledLinkProps = {
  $color?: keyof ColorsConstants;
};

export const StyledLink = styled(Link)<StyledLinkProps>`
  display: flex;
  gap: ${(props) => props.theme.variables.spacing.xs};

  color: ${({ $color = 'accent', theme }) => theme.colors[$color]};

  border-bottom: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-color: transparent;

  &:hover {
    border-color: ${({ $color = 'accent', theme }) => theme.colors[$color]};
  }
`;
