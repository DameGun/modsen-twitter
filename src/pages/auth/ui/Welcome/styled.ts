import styled from 'styled-components';

export const WelcomePageWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 1fr;
  column-gap: ${(props) => props.theme.variables.spacing.xl};

  @media ${(props) => props.theme.media.tablet} {
    grid-template-columns: 1fr;
    padding: ${(props) => props.theme.variables.spacing.xl};
    height: max-content;
  }
`;

export const WelcomePageImageWrapper = styled.span`
  height: 100%;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media ${(props) => props.theme.media.tablet} {
    display: none;
  }
`;

export const ButtonsGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: ${(props) => props.theme.variables.spacing.md};

  & > a > button {
    width: 100%;
  }
`;
