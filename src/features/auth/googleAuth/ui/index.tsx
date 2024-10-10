import { GoogleIcon } from '@/shared/assets/icons';
import { useQueryWithLoading } from '@/shared/lib/useQueryWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import { Paragraph, StyledButton, StyledIcon } from '@/shared/ui';

import { useSignInWithGoogleMutation } from '../api';
import { GoogleAuthText, GoogleAuthType } from '../constants';

type GoogleAuthButtonProps = ManualLoadingHandleProps & {
  type: GoogleAuthType;
};

function BaseGoogleAuthButton({ type, handleLoading }: GoogleAuthButtonProps) {
  const [signIn, { isLoading, isError }] = useSignInWithGoogleMutation();
  useQueryWithLoading({ isLoading, handleLoading });

  const handleSignIn = async () => await signIn();

  return (
    <>
      <StyledButton onClick={handleSignIn} $variant='outline' data-testid='google-auth-button'>
        <StyledIcon $notInvertColor>
          <GoogleIcon title='Google logo' />
        </StyledIcon>
        {GoogleAuthText[type]}
      </StyledButton>
      {isError && (
        <Paragraph $color='error'>Some error occured while trying to sign up with Google</Paragraph>
      )}
    </>
  );
}

export const GoogleAuthButton = withLoader(BaseGoogleAuthButton);
