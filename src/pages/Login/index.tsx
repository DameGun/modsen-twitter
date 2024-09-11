import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { GoogleIcon, Logo } from '@/assets/icons';
import { Loader } from '@/components/common';
import { AuthWrapper } from '@/components/containers';
import {
  Container,
  CustomInput,
  FormField,
  Heading2,
  IconButton,
  Paragraph,
  StyledButton,
  StyledIcon,
  StyledLink,
} from '@/components/ui';
import { Routes } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import type { UserLogin } from '@/types/auth';

import { loginValidationSchema } from './validation';

export function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm<UserLogin>({ resolver: yupResolver(loginValidationSchema) });

  const handleError = (message: string) => {
    setError('email', { message });
  };

  const { isLoading, signInEmail, signInWithGoogle } = useAuth({ handleError });

  return (
    <Container size='sm'>
      <Loader isLoading={isLoading} />
      <AuthWrapper onSubmit={handleSubmit(signInEmail)}>
        <StyledIcon size='xl'>
          <Logo />
        </StyledIcon>
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
        <IconButton IconComponent={<GoogleIcon />} isContentCentered onClick={signInWithGoogle}>
          Log in with Google
        </IconButton>
        <StyledButton isDisabled={!isValid}>Log in</StyledButton>
        <Paragraph>
          Dont have an account yet? <StyledLink to={Routes.SignUp}>Sign up to twitter</StyledLink>
        </Paragraph>
      </AuthWrapper>
    </Container>
  );
}
