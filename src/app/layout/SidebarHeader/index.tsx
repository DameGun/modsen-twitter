import { Link } from 'react-router-dom';

import { changeTheme, selectCurrentTheme } from '@/app/model/theme';
import { DarkModeIcon, LightModeIcon, LogoIcon } from '@/shared/assets/icons';
import { Routes } from '@/shared/constants/routes';
import { ColorMode } from '@/shared/constants/theme';
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
        <StyledButton variant='icon'>
          <StyledIcon $notInvertColor>
            <LogoIcon />
          </StyledIcon>
        </StyledButton>
      </Link>
      <StyledButton variant='icon' onClick={handleTheme}>
        <StyledIcon>
          {currentTheme === ColorMode.Dark ? <LightModeIcon /> : <DarkModeIcon />}
        </StyledIcon>
      </StyledButton>
    </SidebarHeaderWrapper>
  );
}
