import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError } from 'firebase/auth';

import { AuthWrapper, GoogleAuthButton, Logo } from '@/components/containers';
import {
  Container,
  CustomInput,
  FormField,
  Heading2,
  Paragraph,
  StyledButton,
  StyledLink,
} from '@/components/ui';
import { AuthResponseErrors } from '@/constants/auth';
import { Routes } from '@/constants/routes';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { AuthService } from '@/services/firestore/auth';
import type { ManualLoadingHandleProps } from '@/types/loader';
import type { UserLogin } from '@/types/user';
import { withLoader } from '@/utils/withLoader';

import { loginValidationSchema } from './validation';

function BaseLoginPage({ handleLoading }: ManualLoadingHandleProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm<UserLogin>({ resolver: yupResolver(loginValidationSchema), mode: 'onChange' });

  const handleError = (err: unknown) => {
    const { code } = err as AuthError;

    if (code === AuthResponseErrors.InvalidCredentials) {
      setError('email', { message: 'Invalid credentials provided' });
    } else {
      setError('email', { message: 'Error happened while trying to login with Google' });
    }
  };

  const { call } = useAsyncWithLoading({
    call: AuthService.signInEmail,
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
        <GoogleAuthButton type='signIn' errorHandler={handleError} isLoaderFullScreen />
        <StyledButton isDisabled={!isValid} variant='filled'>
          Log in
        </StyledButton>
        <Paragraph>
          Dont have an account yet? <StyledLink to={Routes.SignUp}>Sign up to twitter</StyledLink>
        </Paragraph>
      </AuthWrapper>
    </Container>
  );
}

export const LoginPage = withLoader(BaseLoginPage);
