import * as yup from 'yup';

import {
  FULLNAME_LENGTH_CONSTRAINT,
  FULLNAME_VALIDATION_PATTERN,
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
    .required(ValidationErrorsText.Required)
    .matches(FULLNAME_VALIDATION_PATTERN, ValidationErrorsText.OnlyLetters)
    .max(
      FULLNAME_LENGTH_CONSTRAINT,
      ValidationErrorsText.LengthConstraint(FULLNAME_LENGTH_CONSTRAINT)
    ),
  userName: yup
    .string()
    .required(ValidationErrorsText.Required)
    .matches(USERNAME_VALIDATION_PATTERN, ValidationErrorsText.OnlyLettersAndDigits)
    .max(
      USERNAME_LENGTH_CONTSTRAINT,
      ValidationErrorsText.LengthConstraint(USERNAME_LENGTH_CONTSTRAINT)
    ),
  email: yup
    .string()
    .required(ValidationErrorsText.Required)
    .email(ValidationErrorsText.EmailFormat),
  password: yup
    .string()
    .required(ValidationErrorsText.Required)
    .max(
      PASSWORD_LENGTH_CONSTRAINT,
      ValidationErrorsText.LengthConstraint(PASSWORD_LENGTH_CONSTRAINT)
    )
    .matches(PasswordValidationPatterns.ContainCapital, PasswordValidationChecks.Capital)
    .matches(PasswordValidationPatterns.ContainDigit, PasswordValidationChecks.Digit)
    .matches(PasswordValidationPatterns.LengthConstraint, PasswordValidationChecks.Length),
  dateOfBirth: yup.number().required(ValidationErrorsText.Required),
});
