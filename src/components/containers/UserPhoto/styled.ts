import styled from 'styled-components';

import type { VariablesConstants } from '@/types/styles';

export type UserPhotoWrapperProps = {
  size?: keyof VariablesConstants['iconSize'];
};

export const UserPhotoWrapper = styled.img<UserPhotoWrapperProps>`
  height: ${({ size = 'lg', theme }) => theme.variables.iconSize[size]};
  width: ${({ size = 'lg', theme }) => theme.variables.iconSize[size]};

  border: ${(props) => props.theme.variables.borderWidth.lg} solid;
  border-color: ${(props) => props.theme.colors.main};
  border-radius: 50%;
`;
