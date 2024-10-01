import { css } from 'styled-components';

export const commonButtonStyles = css`
  padding: ${(props) => props.theme.variables.spacing.sm};

  min-width: 80px;

  cursor: pointer;

  background-color: ${(props) => props.theme.colors.main};

  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.variables.spacing.sm};
  justify-content: center;

  border: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-color: transparent;
  border-radius: ${(props) => props.theme.variables.borderRadius.lg};

  font-size: ${(props) => props.theme.font.size.xl};
  font-weight: ${(props) => props.theme.font.weight.regular};

  transition: ${(props) => props.theme.variables.transition.sm};

  color: ${(props) => props.theme.colors.textMain};

  @media ${(props) => props.theme.media.tablet} {
    & > :nth-child(2) {
      display: none;
    }

    min-width: max-content;
    padding: ${(props) => props.theme.variables.spacing.sm};
  }
`;

export const primaryButtonStyles = css`
  ${commonButtonStyles};
  padding-right: ${(props) => props.theme.variables.spacing.md};

  &:hover {
    background-color: ${(props) => props.theme.colors.focus};
  }
`;

export const filledButtonStyles = css`
  ${commonButtonStyles};

  background-color: ${(props) => props.theme.colors.accent};

  &,
  & > * {
    color: ${(props) => props.theme.colors.white};
  }

  font-weight: ${(props) => props.theme.font.weight.semibold};

  &:hover {
    opacity: 0.8;
  }
`;

export const outlineButtonStyles = css`
  ${commonButtonStyles};

  border-color: ${(props) => props.theme.colors.secondary};
  font-weight: ${(props) => props.theme.font.weight.semibold};

  &:hover {
    background-color: ${(props) => props.theme.colors.focus};
  }
`;

export const iconButtonStyles = css`
  ${commonButtonStyles};
  min-width: 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.focus};
  }
`;

export const commonLabelStyles = css`
  position: absolute;
  pointer-events: none;
  top: ${(props) => props.theme.variables.spacing.md};
  transition: ${(props) => props.theme.variables.transition.sm};
  font-size: ${(props) => props.theme.font.size.md};
  color: ${(props) => props.theme.colors.secondary};
`;

export const commonControlWithLabelStyles = css`
  border: none;
  background-color: ${(props) => props.theme.colors.main};
  font-size: ${(props) => props.theme.font.size.md};
`;
