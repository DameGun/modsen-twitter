import { DarkModeIcon, LightModeIcon } from '@/shared/assets/icons';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { StyledButton } from '@/shared/ui/StyledButton';
import { StyledIcon } from '@/shared/ui/StyledIcon';

import { changeTheme, ColorMode, selectCurrentTheme } from '../../model';

export function ThemeSwitcher() {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  const handleTheme = () => dispatch(changeTheme());

  return (
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
  );
}
