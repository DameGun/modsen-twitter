import { Link } from 'react-router-dom';

import { ThemeSwitcher } from '@/app/providers/theme';
import { LogoIcon } from '@/shared/assets/icons';
import { Routes } from '@/shared/constants/routes';

import { SidebarHeaderWrapper } from './styled';

import { StyledButton } from '../StyledButton';
import { StyledIcon } from '../StyledIcon';

export function SidebarHeader() {
  return (
    <SidebarHeaderWrapper $justify='space-between' $align='center'>
      <Link to={Routes.Feed}>
        <StyledButton $variant='icon'>
          <StyledIcon $notInvertColor>
            <LogoIcon title='Logo' />
          </StyledIcon>
        </StyledButton>
      </Link>
      <ThemeSwitcher />
    </SidebarHeaderWrapper>
  );
}
