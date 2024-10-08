import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { GoogleAuthButton, GoogleAuthType } from '@/features/auth';
import { MailIcon } from '@/shared/assets/icons';
import { backTwitterImg } from '@/shared/assets/images';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import { Routes } from '@/shared/constants/routes';
import * as Components from '@/shared/ui';

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
        <Components.FlexContainer $direction='column' $justify='center' $gap='lg'>
          <Components.Logo />
          <Components.Heading1>Happening now</Components.Heading1>
          <Components.Heading2>Join twitter today</Components.Heading2>
          <ButtonsGroupWrapper>
            <GoogleAuthButton type={GoogleAuthType.SignUp} isLoaderFullScreen />
            <Link to={Routes.SignUp}>
              <Components.StyledButton $variant='outline'>
                <Components.StyledIcon>
                  <MailIcon title='Email' />
                </Components.StyledIcon>
                Sign up with email
              </Components.StyledButton>
            </Link>
          </ButtonsGroupWrapper>
          <Components.Paragraph>
            By singing up you agree to the Terms of Service and Privacy Policy, including Cookie
            Use.
          </Components.Paragraph>
          <Components.FlexContainer $gap='sm'>
            <Components.Paragraph>Already have an account?</Components.Paragraph>
            <Components.Paragraph>
              <Components.StyledLink to={Routes.SignIn}>Log in</Components.StyledLink>
            </Components.Paragraph>
          </Components.FlexContainer>
        </Components.FlexContainer>
      </WelcomePageWrapper>
    </>
  );
}
