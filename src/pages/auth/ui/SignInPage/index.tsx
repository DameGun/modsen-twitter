import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { UserLogin } from '@/entities/user/types/auth';
import { GoogleAuthButton, GoogleAuthType, signInEmail } from '@/features/auth';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import { Routes } from '@/shared/constants/routes';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import * as Components from '@/shared/ui';

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
    <>
      <Helmet>
        <title>{DocumentTitle.SignIn}</title>
      </Helmet>
      <Components.Container $size='sm' $isCentered>
        <AuthWrapper onSubmit={handleSubmit(handleFormSubmit)}>
          <Components.Logo />
          <Components.Heading2>Log in to Twitter</Components.Heading2>
          <Components.FormField errorText={errors.email?.message}>
            <Components.CustomInput
              id='email'
              placeholder='Email'
              {...register('email')}
              isInvalid={!!errors.email}
            />
          </Components.FormField>
          <Components.FormField errorText={errors.password?.message}>
            <Components.CustomInput
              id='password'
              placeholder='Password'
              type='password'
              {...register('password')}
              isInvalid={!!errors.password}
            />
          </Components.FormField>
          <GoogleAuthButton type={GoogleAuthType.SignIn} isLoaderFullScreen />
          <Components.StyledButton type='submit' $isDisabled={!isValid} $variant='filled'>
            Log in
          </Components.StyledButton>
          <Components.FlexContainer $gap='sm'>
            <Components.Paragraph>Dont have an account yet?</Components.Paragraph>
            <Components.Paragraph>
              <Components.StyledLink to={Routes.SignUp}>Sign up to twitter</Components.StyledLink>
            </Components.Paragraph>
          </Components.FlexContainer>
        </AuthWrapper>
      </Components.Container>
    </>
  );
}

export const SignInPage = withLoader(BaseSignInPage);
