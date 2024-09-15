import styled from 'styled-components';

export const UserBackgroundPhotoWrapper = styled.span`
  position: relative;
  height: 200px;
  background-color: ${(props) => props.theme.colors.secondary};

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
