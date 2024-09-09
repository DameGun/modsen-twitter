import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.accent};
  transition: ${(props) => props.theme.variables.transition.sm};

  &:hover {
    border-bottom: ${(props) => props.theme.variables.borderWidth.sm} solid;
  }
`;
