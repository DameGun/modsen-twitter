import { GoogleIcon } from '@/assets/icons';
import { Paragraph, StyledButton, StyledIcon } from '@/components/ui';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { AuthService } from '@/services/firestore/auth';
import type { ManualLoadingHandleProps } from '@/types/loader';
import { withLoader } from '@/utils/withLoader';

type GoogleAuthButtonProps = ManualLoadingHandleProps & {
  type: 'signIn' | 'signUp';
};

function BaseGoogleAuthButton({ type, handleLoading }: GoogleAuthButtonProps) {
  const { call, isError } = useAsyncWithLoading({
    call: AuthService.signInWithGoogle,
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
