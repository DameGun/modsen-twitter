import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { StyledIcon } from '@/components/ui';

import { StyledNavButton } from './styled';

type NavButtonProps = {
  IconComponent: ReactNode;
  ActiveIconComponent: ReactNode;
  children: ReactNode;
  to: string;
  state?: unknown;
};

export function NavButton({
  IconComponent,
  ActiveIconComponent,
  children,
  to,
  state,
}: NavButtonProps) {
  return (
    <NavLink to={to} state={state} preventScrollReset>
      {({ isActive }) => (
        <StyledNavButton $isActive={isActive}>
          <StyledIcon>{isActive ? ActiveIconComponent : IconComponent}</StyledIcon>
          {children}
        </StyledNavButton>
      )}
    </NavLink>
  );
}
