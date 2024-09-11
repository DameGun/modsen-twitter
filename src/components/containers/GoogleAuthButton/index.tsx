import { GoogleIcon } from '@/assets/icons';
import { StyledButton, StyledIcon } from '@/components/ui';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { AuthService } from '@/services/firestore/auth';
import { ManualLoadingHandleProps } from '@/types/loader';
import { withLoader } from '@/utils/withLoader';

interface GoogleAuthButtonProps extends ManualLoadingHandleProps {
  type: 'signIn' | 'signUp';
  errorHandler(err: unknown): void;
}

function BaseGoogleAuthButton({ type, errorHandler, handleLoading }: GoogleAuthButtonProps) {
  const { call } = useAsyncWithLoading({
    call: AuthService.signInWithGoogle,
    errorHandler,
    handleLoading,
  });
  return (
    <>
      <StyledButton onClick={call} variant='outline' type='button'>
        <StyledIcon $notInvertColor>
          <GoogleIcon />
        </StyledIcon>
        {type === 'signIn' ? 'Log in with Google' : 'Sign up with Google'}
      </StyledButton>
    </>
  );
}

export const GoogleAuthButton = withLoader(BaseGoogleAuthButton);
