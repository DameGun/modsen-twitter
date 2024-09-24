import { Link } from 'react-router-dom';

import { DarkModeIcon, LightModeIcon, LogoIcon } from '@/assets/icons';
import { FlexContainer, StyledButton, StyledIcon } from '@/components/ui';
import { Routes } from '@/constants/routes';
import { ColorMode } from '@/constants/theme';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { changeTheme, selectCurrentTheme } from '@/services/store/theme';

export function SidebarHeader() {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  const handleTheme = () => dispatch(changeTheme());

  return (
    <FlexContainer justify='space-between' align='center'>
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
    </FlexContainer>
  );
}
