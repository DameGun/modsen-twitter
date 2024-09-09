import { useState } from 'react';

import { GoogleIcon, Logo, MailIcon } from '@/assets/icons';
import { backTwitterImg } from '@/assets/images';
import { Loader } from '@/components/common';
import { Heading1, Heading2, IconButton, Paragraph, StyledIcon, StyledLink } from '@/components/ui';
import { Routes } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';

import {
  ButtonsGroupWrapper,
  RightColumnWrapper,
  WelcomePageImage,
  WelcomePageWrapper,
} from './styled';

export function WelcomePage() {
  const [error, setError] = useState(false);

  const handleError = () => setError(true);

  const { isLoading, signInWithGoogle } = useAuth({ handleError });

  return (
    <WelcomePageWrapper>
      <Loader isLoading={isLoading} />
      <WelcomePageImage src={backTwitterImg} />
      <RightColumnWrapper>
        <StyledIcon size='xl'>
          <Logo />
        </StyledIcon>
        <Heading1>Happening now</Heading1>
        <Heading2>Join twitter today</Heading2>
        <ButtonsGroupWrapper>
          <IconButton IconComponent={<GoogleIcon />} onClick={signInWithGoogle}>
            Sign up with Google
          </IconButton>
          <IconButton IconComponent={<MailIcon />} to={Routes.SignUp} invertIconColor>
            Sign up with email
          </IconButton>
        </ButtonsGroupWrapper>
        {error && (
          <Paragraph color='error'>
            Some error occured while trying to sign up with Google
          </Paragraph>
        )}
        <Paragraph>
          By singing up you agree to the Terms of Service and Privacy Policy, including Cookie Use.
        </Paragraph>
        <Paragraph>
          Already have an account? <StyledLink to={Routes.SignIn}>Log in</StyledLink>
        </Paragraph>
      </RightColumnWrapper>
    </WelcomePageWrapper>
  );
}
