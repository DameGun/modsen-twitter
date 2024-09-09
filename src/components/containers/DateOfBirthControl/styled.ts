import styled from 'styled-components';

export const DateOfBirthWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.3fr 0.3fr;
  column-gap: ${(props) => props.theme.variables.spacing.sm};
`;
