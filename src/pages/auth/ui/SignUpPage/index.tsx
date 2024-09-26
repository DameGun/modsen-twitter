import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { UserCreate } from '@/entities/user/types/auth';
import { signUpEmail } from '@/features/auth';
import { DateOfBirthControl } from '@/features/user';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import {
  FULLNAME_LENGTH_CONSTRAINT,
  PASSWORD_LENGTH_CONSTRAINT,
  PasswordValidationChecks,
  USERNAME_LENGTH_CONTSTRAINT,
  ValidationErrorsText,
} from '@/shared/constants/validation';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { useModifyDocumentTitle } from '@/shared/lib/useModifyDocumentTitle';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import * as Components from '@/shared/ui';

import { signUpValidationSchema } from '../../model/signup-schema';
import { AuthWrapper } from '../AuthWrapper';

export function BaseSignUpPage({ handleLoading }: ManualLoadingHandleProps) {
  useModifyDocumentTitle(DocumentTitle.SignUp);
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
    <Components.Container $size='sm' $isCentered>
      <AuthWrapper onSubmit={handleSubmit(handleFormSubmit)}>
        <Components.Logo />
        <Components.Heading2>Create an account</Components.Heading2>
        <Components.FormField errorText={errors.fullName?.message}>
          <Components.CustomInput
            id='fullName'
            placeholder='Full name'
            type='text'
            {...register('fullName')}
            maxLength={FULLNAME_LENGTH_CONSTRAINT}
            isInvalid={!!errors.fullName}
          />
        </Components.FormField>
        <Components.FormField errorText={errors.userName?.message}>
          <Components.CustomInput
            id='userName'
            placeholder='Username'
            type='text'
            {...register('userName')}
            maxLength={USERNAME_LENGTH_CONTSTRAINT}
            isInvalid={!!errors.userName}
          />
        </Components.FormField>
        <Components.FormField errorText={errors.email?.message}>
          <Components.CustomInput
            id='email'
            placeholder='Email'
            type='email'
            {...register('email')}
            isInvalid={!!errors.email}
          />
        </Components.FormField>
        <Components.FormField
          errorText={
            errors.password?.message === ValidationErrorsText.Required
              ? errors.password?.message
              : undefined
          }
        >
          <Components.CustomInput
            id='password'
            placeholder='Password'
            type='password'
            maxLength={PASSWORD_LENGTH_CONSTRAINT}
            {...register('password')}
            isInvalid={!!errors.password}
          />
        </Components.FormField>
        <div>
          <Components.Paragraph>Password should:</Components.Paragraph>
          <ul>
            <Components.StyledListItem
              $color={
                errors.password?.message === PasswordValidationChecks.Capital ? 'error' : undefined
              }
            >
              contain at least 1 capital letter
            </Components.StyledListItem>
            <Components.StyledListItem
              $color={
                errors.password?.message === PasswordValidationChecks.Digit ? 'error' : undefined
              }
            >
              contain at least 1 digit
            </Components.StyledListItem>
            <Components.StyledListItem
              $color={
                errors.password?.message === PasswordValidationChecks.Length ? 'error' : undefined
              }
            >
              contain minimum 8 characters
            </Components.StyledListItem>
          </ul>
        </div>
        <DateOfBirthControl onChange={setValue} errorText={errors.dateOfBirth?.message} />
        <Components.StyledButton type='submit' $isDisabled={!isValid} $variant='filled'>
          Next
        </Components.StyledButton>
      </AuthWrapper>
    </Components.Container>
  );
}

export const SignUpPage = withLoader(BaseSignUpPage);
