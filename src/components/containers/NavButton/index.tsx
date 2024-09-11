import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { StyledIcon } from '@/components/ui';

import { StyledNavButton } from './styled';

interface NavButtonProps {
  IconComponent: ReactNode;
  ActiveIconComponent: ReactNode;
  children: ReactNode;
  to: string;
}

export function NavButton({ IconComponent, ActiveIconComponent, children, to }: NavButtonProps) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <StyledNavButton $isActive={isActive}>
          <StyledIcon>{isActive ? ActiveIconComponent : IconComponent}</StyledIcon>
          {children}
        </StyledNavButton>
      )}
    </NavLink>
  );
}
