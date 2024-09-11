import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { FormatStyledProps } from '@/types/misc';

import { StyledIconButton, StyledIconButtonProps } from './styled';

import { StyledIcon } from '../StyledIcon';

interface IconButtonProps extends FormatStyledProps<StyledIconButtonProps> {
  IconComponent: ReactNode;
  children: string;
  onClick?: VoidFunction;
  invertIconColor?: boolean;
  to?: string;
}

export function IconButton({
  IconComponent,
  children,
  onClick,
  invertIconColor,
  isContentCentered,
  to,
}: IconButtonProps) {
  return (
    <StyledIconButton
      onClick={onClick}
      $isContentCentered={isContentCentered}
      as={to ? Link : 'button'}
      to={to}
      type='button'
    >
      <StyledIcon invertIconColor={invertIconColor}>{IconComponent}</StyledIcon>
      {children}
    </StyledIconButton>
  );
}
