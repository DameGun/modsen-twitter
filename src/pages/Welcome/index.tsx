import { Link } from 'react-router-dom';

import { MailIcon } from '@/assets/icons';
import { backTwitterImg } from '@/assets/images';
import { GoogleAuthButton, Logo } from '@/components/containers';
import {
  FlexContainer,
  Heading1,
  Heading2,
  Paragraph,
  StyledButton,
  StyledIcon,
  StyledLink,
} from '@/components/ui';
import { Routes } from '@/constants/routes';

import { ButtonsGroupWrapper, WelcomePageImageWrapper, WelcomePageWrapper } from './styled';

export function WelcomePage() {
  return (
    <WelcomePageWrapper>
      <WelcomePageImageWrapper>
        <img src={backTwitterImg} />
      </WelcomePageImageWrapper>
      <FlexContainer direction='column' justify='center' gap='lg'>
        <Logo />
        <Heading1>Happening now</Heading1>
        <Heading2>Join twitter today</Heading2>
        <ButtonsGroupWrapper>
          <GoogleAuthButton type='signUp' isLoaderFullScreen />
          <Link to={Routes.SignUp}>
            <StyledButton variant='outline'>
              <StyledIcon>
                <MailIcon />
              </StyledIcon>
              Sign up with email
            </StyledButton>
          </Link>
        </ButtonsGroupWrapper>
        <Paragraph>
          By singing up you agree to the Terms of Service and Privacy Policy, including Cookie Use.
        </Paragraph>
        <FlexContainer gap='sm'>
          <Paragraph>Already have an account?</Paragraph>
          <Paragraph>
            <StyledLink to={Routes.SignIn}>Log in</StyledLink>
          </Paragraph>
        </FlexContainer>
      </FlexContainer>
    </WelcomePageWrapper>
  );
}
