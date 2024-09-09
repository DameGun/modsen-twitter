import styled from 'styled-components';

export const WelcomePageWrapper = styled.div`
  display: flex;
  height: 100vh;
  gap: ${(props) => props.theme.variables.spacing.xl};
`;

export const WelcomePageImage = styled.img`
  height: 100%;
`;
export const RightColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${(props) => props.theme.variables.spacing.lg};
`;

export const ButtonsGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: ${(props) => props.theme.variables.spacing.md};
`;
