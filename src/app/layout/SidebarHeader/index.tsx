import { Link } from 'react-router-dom';

import { ColorMode } from '@/app/providers/theme/model/constants';
import { changeTheme, selectCurrentTheme } from '@/app/providers/theme/model/slice';
import { DarkModeIcon, LightModeIcon, LogoIcon } from '@/shared/assets/icons';
import { Routes } from '@/shared/constants/routes';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { StyledButton, StyledIcon } from '@/shared/ui';

import { SidebarHeaderWrapper } from './styled';

export function SidebarHeader() {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  const handleTheme = () => dispatch(changeTheme());

  return (
    <SidebarHeaderWrapper $justify='space-between' $align='center'>
      <Link to={Routes.Feed}>
        <StyledButton $variant='icon'>
          <StyledIcon $notInvertColor>
            <LogoIcon title='Logo' />
          </StyledIcon>
        </StyledButton>
      </Link>
      <StyledButton
        role='switch'
        aria-roledescription={currentTheme}
        $variant='icon'
        onClick={handleTheme}
      >
        <StyledIcon>
          {currentTheme === ColorMode.Dark ? (
            <LightModeIcon title='Light mode' />
          ) : (
            <DarkModeIcon title='Dark mode' />
          )}
        </StyledIcon>
      </StyledButton>
    </SidebarHeaderWrapper>
  );
}
