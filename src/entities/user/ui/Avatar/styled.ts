import styled from 'styled-components';

import type { VariablesConstants } from '@/app/providers/theme';

export type UserPhotoWrapperProps = {
  size?: keyof VariablesConstants['iconSize'];
};

export const UserPhotoWrapper = styled.span<UserPhotoWrapperProps>`
  position: relative;
  height: ${({ size = 'lg', theme }) => theme.variables.iconSize[size]};
  width: ${({ size = 'lg', theme }) => theme.variables.iconSize[size]};
`;

export const StyledUserPhoto = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  border: ${(props) => props.theme.variables.borderWidth.lg} solid;
  border-color: ${(props) => props.theme.colors.main};
  border-radius: 50%;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.main};
`;
