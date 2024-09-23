import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  align-self: center;
  display: grid;
  grid-template-columns: 2fr 4fr 1fr;

  & > * {
    min-width: 0;
    max-width: 100%;
  }

  max-width: ${(props) => props.theme.variables.containerSize.lg};
`;
