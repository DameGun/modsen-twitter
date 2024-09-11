import * as yup from 'yup';

import {
  FULLNAME_LENGTH_CONSTRAINT,
  PASSWORD_LENGTH_CONSTRAINT,
  PasswordValidationChecks,
  PasswordValidationPatterns,
  USERNAME_LENGTH_CONTSTRAINT,
  USERNAME_VALIDATION_PATTERN,
  ValidationErrorsText,
} from '@/constants/validation';

export const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(FULLNAME_LENGTH_CONSTRAINT, ValidationErrorsText.Required)
    .required(ValidationErrorsText.Required),
  userName: yup
    .string()
    .matches(USERNAME_VALIDATION_PATTERN, ValidationErrorsText.OnlyLettersAndDigits)
    .max(
      USERNAME_LENGTH_CONTSTRAINT,
      ValidationErrorsText.LengthConstraint(USERNAME_LENGTH_CONTSTRAINT)
    )
    .required(ValidationErrorsText.Required),
  email: yup
    .string()
    .email(ValidationErrorsText.EmailFormat)
    .required(ValidationErrorsText.Required),
  password: yup
    .string()
    .max(
      PASSWORD_LENGTH_CONSTRAINT,
      ValidationErrorsText.LengthConstraint(PASSWORD_LENGTH_CONSTRAINT)
    )
    .matches(PasswordValidationPatterns.ContainCapital, PasswordValidationChecks.Capital)
    .matches(PasswordValidationPatterns.ContainDigit, PasswordValidationChecks.Digit)
    .matches(PasswordValidationPatterns.LengthConstraint, PasswordValidationChecks.Length)
    .required(ValidationErrorsText.Required),
  dateOfBirth: yup.date().required(ValidationErrorsText.Required),
});
