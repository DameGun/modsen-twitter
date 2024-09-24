import { GoogleIcon } from '@/shared/assets/icons';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import { Paragraph, StyledButton, StyledIcon } from '@/shared/ui';

import { signInWithGoogle } from '../api';

type GoogleAuthButtonProps = ManualLoadingHandleProps & {
  type: 'signIn' | 'signUp';
};

function BaseGoogleAuthButton({ type, handleLoading }: GoogleAuthButtonProps) {
  const { call, isError } = useAsyncWithLoading({
    call: signInWithGoogle,
    handleLoading,
  });

  return (
    <>
      <StyledButton onClick={call} variant='outline'>
        <StyledIcon $notInvertColor>
          <GoogleIcon />
        </StyledIcon>
        {type === 'signIn' ? 'Log in with Google' : 'Sign up with Google'}
      </StyledButton>
      {isError && (
        <Paragraph color='error'>Some error occured while trying to sign up with Google</Paragraph>
      )}
    </>
  );
}

export const GoogleAuthButton = withLoader(BaseGoogleAuthButton);
