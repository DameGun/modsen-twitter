import styled, { css } from 'styled-components';

import { Section } from '../Section';

type TabProps = {
  $isActive: boolean;
};

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const Tab = styled(Section)<TabProps>`
  display: flex;
  justify-content: center;
  cursor: pointer;

  & > * {
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }

  ${(props) =>
    props.$isActive &&
    css`
      & > * {
        color: ${(props) => props.theme.colors.textMain};
      }

      border-color: ${(props) => props.theme.colors.accent};
      border-width: ${(props) => props.theme.variables.borderWidth.md};
    `}
`;
