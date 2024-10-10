import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { GoogleAuthButton, GoogleAuthType } from '@/features/auth';
import { MailIcon } from '@/shared/assets/icons';
import { backTwitterImg } from '@/shared/assets/images';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import { Routes } from '@/shared/constants/routes';
import { FlexContainer } from '@/shared/ui/FlexContainer';
import { StyledLink } from '@/shared/ui/Link';
import { Logo } from '@/shared/ui/Logo';
import { StyledButton } from '@/shared/ui/StyledButton';
import { StyledIcon } from '@/shared/ui/StyledIcon';
import { Heading1, Heading2, Paragraph } from '@/shared/ui/Text';

import { ButtonsGroupWrapper, WelcomePageImageWrapper, WelcomePageWrapper } from './styled';

export function WelcomePage() {
  return (
    <>
      <Helmet>
        <title>{DocumentTitle.Welcome}</title>
      </Helmet>
      <WelcomePageWrapper>
        <WelcomePageImageWrapper>
          <img src={backTwitterImg} alt='Twitter banner' />
        </WelcomePageImageWrapper>
        <FlexContainer $direction='column' $justify='center' $gap='lg'>
          <Logo />
          <Heading1>Happening now</Heading1>
          <Heading2>Join twitter today</Heading2>
          <ButtonsGroupWrapper>
            <GoogleAuthButton type={GoogleAuthType.SignUp} isLoaderFullScreen />
            <Link to={Routes.SignUp}>
              <StyledButton $variant='outline'>
                <StyledIcon>
                  <MailIcon title='Email' />
                </StyledIcon>
                Sign up with email
              </StyledButton>
            </Link>
          </ButtonsGroupWrapper>
          <Paragraph>
            By singing up you agree to the Terms of Service and Privacy Policy, including Cookie
            Use.
          </Paragraph>
          <FlexContainer $gap='sm'>
            <Paragraph>Already have an account?</Paragraph>
            <Paragraph>
              <StyledLink to={Routes.SignIn}>Log in</StyledLink>
            </Paragraph>
          </FlexContainer>
        </FlexContainer>
      </WelcomePageWrapper>
    </>
  );
}
