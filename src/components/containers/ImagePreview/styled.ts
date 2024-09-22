import styled from 'styled-components';

export const ImagePreviewWrapper = styled.div`
  height: ${(props) => props.theme.variables.imageHeight};
  width: ${(props) => props.theme.variables.imageHeight};
  position: relative;
  border: ${(props) => props.theme.variables.borderWidth.sm} solid
    ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.variables.borderRadius.md};
  overflow: hidden;
  scrollbar-gutter: unset;

  & > :first-child {
    position: absolute;
    right: ${(props) => props.theme.variables.spacing.xs};
    top: ${(props) => props.theme.variables.spacing.xs};
  }

  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
