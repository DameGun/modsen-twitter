import { LogoIcon } from '@/assets/icons';
import { StyledIcon } from '@/components/ui';

export function Logo() {
  return (
    <StyledIcon $size='xl' $notInvertColor>
      <LogoIcon />
    </StyledIcon>
  );
}
