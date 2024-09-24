import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { UserLogin } from '@/entities/user/types';
import { GoogleAuthButton, signInEmail } from '@/features/auth';
import { Routes } from '@/shared/constants/routes';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import {
  Container,
  CustomInput,
  FlexContainer,
  FormField,
  Heading2,
  Logo,
  Paragraph,
  StyledButton,
  StyledLink,
} from '@/shared/ui';

import { signInValidationSchema } from '../../model/signin-schema';
import { AuthWrapper } from '../AuthWrapper';

function BaseSignInPage({ handleLoading }: ManualLoadingHandleProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm<UserLogin>({ resolver: yupResolver(signInValidationSchema), mode: 'onChange' });

  const handleError = (err: unknown) => {
    const { code } = err as AuthError;

    if (code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      setError('email', { message: 'Invalid credentials provided' });
    }
  };

  const { call } = useAsyncWithLoading({
    call: signInEmail,
    errorHandler: handleError,
    handleLoading,
  });

  const handleFormSubmit = async (data: UserLogin) => await call(data);

  return (
    <Container size='sm' isCentered>
      <AuthWrapper onSubmit={handleSubmit(handleFormSubmit)}>
        <Logo />
        <Heading2>Log in to Twitter</Heading2>
        <FormField errorText={errors.email?.message}>
          <CustomInput
            id='email'
            placeholder='Email'
            {...register('email')}
            isInvalid={!!errors.email}
          />
        </FormField>
        <FormField errorText={errors.password?.message}>
          <CustomInput
            id='password'
            placeholder='Password'
            type='password'
            {...register('password')}
            isInvalid={!!errors.password}
          />
        </FormField>
        <GoogleAuthButton type='signIn' isLoaderFullScreen />
        <StyledButton type='submit' $isDisabled={!isValid} variant='filled'>
          Log in
        </StyledButton>
        <FlexContainer $gap='sm'>
          <Paragraph>Dont have an account yet?</Paragraph>
          <Paragraph>
            <StyledLink to={Routes.SignUp}>Sign up to twitter</StyledLink>
          </Paragraph>
        </FlexContainer>
      </AuthWrapper>
    </Container>
  );
}

export const SignInPage = withLoader(BaseSignInPage);
