import styled from 'styled-components';

export const AuthWrapper = styled.form`
  display: flex;
  flex-direction: column;

  gap: ${(props) => props.theme.variables.spacing.md};
  margin-top: ${(props) => props.theme.variables.spacing.xl};

  & > :first-child {
    align-self: center;
  }
`;
