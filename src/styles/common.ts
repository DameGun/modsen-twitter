import { css } from 'styled-components';

export const commonButtonStyles = css`
  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.sm};

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
  color: white;
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

export const commonLabelStyles = css`
  position: absolute;
  pointer-events: none;
  left: ${(props) => props.theme.variables.spacing.sm};
  transition: ${(props) => props.theme.variables.transition.sm};
  font-size: ${(props) => props.theme.font.size.md};
`;

export const commonControlWithLabelStyles = css`
  padding: ${(props) => props.theme.variables.spacing.md}
    ${(props) => props.theme.variables.spacing.sm};
  padding-top: ${(props) => props.theme.variables.spacing.lg};

  border: ${(props) => props.theme.variables.borderWidth.sm} solid;
  width: 100%;
  border-radius: ${(props) => props.theme.variables.borderRadius.sm};

  border-color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.main};

  font-size: ${(props) => props.theme.font.size.md};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;
