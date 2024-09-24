import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: grid;
  align-self: center;
  grid-template-columns: 1fr 3fr 1fr;

  max-width: ${(props) => props.theme.variables.containerSize.lg};
`;
