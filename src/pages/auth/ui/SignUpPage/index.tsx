import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import type { UserCreate } from '@/entities/user/types';
import { signUpEmail } from '@/features/auth';
import { DateOfBirthControl } from '@/features/user';
import {
  FULLNAME_LENGTH_CONSTRAINT,
  PASSWORD_LENGTH_CONSTRAINT,
  PasswordValidationChecks,
  USERNAME_LENGTH_CONTSTRAINT,
  ValidationErrorsText,
} from '@/shared/constants/validation';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import {
  Container,
  CustomInput,
  FormField,
  Heading2,
  Logo,
  Paragraph,
  StyledButton,
  StyledListItem,
} from '@/shared/ui';

import { signUpValidationSchema } from '../../model/signup-schema';
import { AuthWrapper } from '../AuthWrapper';

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

    if (code === AuthErrorCodes.EMAIL_EXISTS) {
      setError('email', { message: 'Email is already in use' });
    }
  };

  const { call } = useAsyncWithLoading({
    call: signUpEmail,
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
            maxLength={FULLNAME_LENGTH_CONSTRAINT}
            isInvalid={!!errors.fullName}
          />
        </FormField>
        <FormField errorText={errors.userName?.message}>
          <CustomInput
            id='userName'
            placeholder='Username'
            type='text'
            {...register('userName')}
            maxLength={USERNAME_LENGTH_CONTSTRAINT}
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
            maxLength={PASSWORD_LENGTH_CONSTRAINT}
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
        <DateOfBirthControl onChange={setValue} errorText={errors.dateOfBirth?.message} />
        <StyledButton type='submit' isDisabled={!isValid} variant='filled'>
          Next
        </StyledButton>
      </AuthWrapper>
    </Container>
  );
}

export const SignUpPage = withLoader(BaseSignUpPage);
