import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Logo } from '@/assets/icons';
import { Loader } from '@/components/common';
import { AuthWrapper, DateOfBirthControl } from '@/components/containers';
import {
  Container,
  CustomInput,
  FormField,
  Heading2,
  Paragraph,
  StyledButton,
  StyledIcon,
  StyledListItem,
} from '@/components/ui';
import { PasswordValidationChecks } from '@/constants/auth';
import { useAuth } from '@/hooks/useAuth';
import type { UserCreate } from '@/types/auth';

import { signUpValidationSchema } from './validation';

export function SignUpPage() {
  const {
    setValue,
    setError,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserCreate>({
    resolver: yupResolver(signUpValidationSchema),
    mode: 'onChange',
  });

  const handleError = (message: string) => {
    setError('email', { message });
  };

  const { isLoading, signUpEmail } = useAuth({ handleError });

  const handleDateOfBirth = (date: Date) => setValue('dateOfBirth', date);

  return (
    <Container size='sm'>
      <Loader isLoading={isLoading} />
      <AuthWrapper onSubmit={handleSubmit(signUpEmail)}>
        <StyledIcon size='xl'>
          <Logo />
        </StyledIcon>
        <Heading2>Create an account</Heading2>
        <FormField errorText={errors.fullName?.message}>
          <CustomInput
            id='fullName'
            placeholder='Full name'
            type='text'
            {...register('fullName')}
            maxLength={50}
            isInvalid={!!errors.fullName}
          />
        </FormField>
        <FormField errorText={errors.userName?.message}>
          <CustomInput
            id='userName'
            placeholder='Username'
            type='text'
            {...register('userName')}
            maxLength={20}
            isInvalid={!!errors.userName}
          />
        </FormField>
        <FormField errorText={errors.email?.message}>
          <CustomInput
            id='email'
            placeholder='Email'
            type='email'
            {...register('email')}
            isInvalid={!!errors.email}
          />
        </FormField>
        <FormField
          errorText={
            errors.password?.message === PasswordValidationChecks.REQUIRED
              ? errors.password?.message
              : undefined
          }
        >
          <CustomInput
            id='password'
            placeholder='Password'
            type='password'
            maxLength={50}
            {...register('password')}
            isInvalid={!!errors.password}
          />
        </FormField>
        <div>
          <Paragraph>Password should:</Paragraph>
          <ul>
            <StyledListItem
              color={
                errors.password?.message === PasswordValidationChecks.CAPITAL ? 'error' : undefined
              }
            >
              contain at least 1 capital letter
            </StyledListItem>
            <StyledListItem
              color={
                errors.password?.message === PasswordValidationChecks.DIGIT ? 'error' : undefined
              }
            >
              contain at least 1 digit
            </StyledListItem>
            <StyledListItem
              color={
                errors.password?.message === PasswordValidationChecks.LENGTH ? 'error' : undefined
              }
            >
              contain minimum 8 characters
            </StyledListItem>
          </ul>
        </div>
        <DateOfBirthControl onChange={handleDateOfBirth} errorText={errors.dateOfBirth?.message} />
        <StyledButton type='submit' isDisabled={!isValid}>
          Next
        </StyledButton>
      </AuthWrapper>
    </Container>
  );
}
