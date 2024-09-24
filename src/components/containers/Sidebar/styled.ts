import styled from 'styled-components';

export const SidebarWrapper = styled.nav`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.variables.spacing.lg};
  width: 200px;

  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.lg};
  border-right: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-color: ${(props) => props.theme.colors.secondary};
`;
