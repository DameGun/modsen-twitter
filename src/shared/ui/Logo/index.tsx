import { LogoIcon } from '@/shared/assets/icons';

import { StyledIcon } from '../StyledIcon';

export function Logo() {
  return (
    <StyledIcon $size='xl' $notInvertColor>
      <LogoIcon title='Logo' />
    </StyledIcon>
  );
}
