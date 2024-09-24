import { Link } from 'react-router-dom';

import { GoogleAuthButton } from '@/features/auth';
import { MailIcon } from '@/shared/assets/icons';
import { backTwitterImg } from '@/shared/assets/images';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import { Routes } from '@/shared/constants/routes';
import { useModifyDocumentTitle } from '@/shared/lib/useModifyDocumentTitle';
import {
  FlexContainer,
  Heading1,
  Heading2,
  Logo,
  Paragraph,
  StyledButton,
  StyledIcon,
  StyledLink,
} from '@/shared/ui';

import { ButtonsGroupWrapper, WelcomePageImageWrapper, WelcomePageWrapper } from './styled';

export function WelcomePage() {
  useModifyDocumentTitle(DocumentTitle.SignIn);

  return (
    <WelcomePageWrapper>
      <WelcomePageImageWrapper>
        <img src={backTwitterImg} />
      </WelcomePageImageWrapper>
      <FlexContainer $direction='column' $justify='center' $gap='lg'>
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
        <FlexContainer $gap='sm'>
          <Paragraph>Already have an account?</Paragraph>
          <Paragraph>
            <StyledLink to={Routes.SignIn}>Log in</StyledLink>
          </Paragraph>
        </FlexContainer>
      </FlexContainer>
    </WelcomePageWrapper>
  );
}
