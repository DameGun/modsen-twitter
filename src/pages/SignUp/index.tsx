import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError } from 'firebase/auth';

import { AuthWrapper, DateOfBirthControl, Logo } from '@/components/containers';
import {
  Container,
  CustomInput,
  FormField,
  Heading2,
  Paragraph,
  StyledButton,
  StyledListItem,
} from '@/components/ui';
import { AuthResponseErrors } from '@/constants/auth';
import { PasswordValidationChecks, ValidationErrorsText } from '@/constants/validation';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { AuthService } from '@/services/firestore/auth';
import type { ManualLoadingHandleProps } from '@/types/loader';
import type { UserCreate } from '@/types/user';
import { withLoader } from '@/utils/withLoader';

import { signUpValidationSchema } from './validation';

export function BaseSignUpPage({ handleLoading }: ManualLoadingHandleProps) {
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

  const handleError = (err: unknown) => {
    const { code } = err as AuthError;

    if (code === AuthResponseErrors.EmailInUse) {
      setError('email', { message: 'Email is already in use' });
    }
  };

  const handleDateOfBirth = (date: Date) => setValue('dateOfBirth', date);

  const { call } = useAsyncWithLoading({
    call: AuthService.signUpEmail,
    errorHandler: handleError,
    handleLoading,
  });

  const handleFormSubmit = async (data: UserCreate) => await call(data);

  return (
    <Container size='sm' isCentered>
      <AuthWrapper onSubmit={handleSubmit(handleFormSubmit)}>
        <Logo />
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
            errors.password?.message === ValidationErrorsText.Required
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
                errors.password?.message === PasswordValidationChecks.Capital ? 'error' : undefined
              }
            >
              contain at least 1 capital letter
            </StyledListItem>
            <StyledListItem
              color={
                errors.password?.message === PasswordValidationChecks.Digit ? 'error' : undefined
              }
            >
              contain at least 1 digit
            </StyledListItem>
            <StyledListItem
              color={
                errors.password?.message === PasswordValidationChecks.Length ? 'error' : undefined
              }
            >
              contain minimum 8 characters
            </StyledListItem>
          </ul>
        </div>
        <DateOfBirthControl onChange={handleDateOfBirth} errorText={errors.dateOfBirth?.message} />
        <StyledButton type='submit' isDisabled={!isValid} variant='filled'>
          Next
        </StyledButton>
      </AuthWrapper>
    </Container>
  );
}

export const SignUpPage = withLoader(BaseSignUpPage);
