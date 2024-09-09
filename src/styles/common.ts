import { css } from 'styled-components';

export const commonButtonStyles = css`
  padding: ${(props) => props.theme.variables.spacing.sm}
    ${(props) => props.theme.variables.spacing.lg};

  cursor: pointer;

  border: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-radius: ${(props) => props.theme.variables.borderRadius.md};

  font-size: ${(props) => props.theme.font.size.xl};
  font-weight: ${(props) => props.theme.font.weight.semibold};

  transition: ${(props) => props.theme.variables.transition.sm};
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
