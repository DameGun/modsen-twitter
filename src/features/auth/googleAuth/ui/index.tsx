import { GoogleIcon } from '@/shared/assets/icons';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import { Paragraph, StyledButton, StyledIcon } from '@/shared/ui';

import { signInWithGoogle } from '../api';
import { GoogleAuthType } from '../constants';

type GoogleAuthButtonProps = ManualLoadingHandleProps & {
  type: GoogleAuthType;
};

function BaseGoogleAuthButton({ type, handleLoading }: GoogleAuthButtonProps) {
  const { call, isError } = useAsyncWithLoading({
    call: signInWithGoogle,
    handleLoading,
  });

  return (
    <>
      <StyledButton onClick={call} $variant='outline' data-testid='google-auth-button'>
        <StyledIcon $notInvertColor>
          <GoogleIcon title='Google logo' />
        </StyledIcon>
        {type === GoogleAuthType.SignIn ? 'Log in with Google' : 'Sign up with Google'}
      </StyledButton>
      {isError && (
        <Paragraph $color='error'>Some error occured while trying to sign up with Google</Paragraph>
      )}
    </>
  );
}

export const GoogleAuthButton = withLoader(BaseGoogleAuthButton);
