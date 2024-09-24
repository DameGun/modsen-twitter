import * as yup from 'yup';

import {
  BIO_LENGTH_CONSTRAINT,
  FULLNAME_LENGTH_CONSTRAINT,
  FULLNAME_VALIDATION_PATTERN,
  ValidationErrorsText,
} from '@/constants/validation';

export const editProfileValidationSchema = yup.object().shape({
  avatarUrl: yup.string().optional(),
  backgroundImageUrl: yup.string().optional(),
  fullName: yup
    .string()
    .max(
      FULLNAME_LENGTH_CONSTRAINT,
      ValidationErrorsText.LengthConstraint(FULLNAME_LENGTH_CONSTRAINT)
    )
    .required(ValidationErrorsText.Required)
    .matches(FULLNAME_VALIDATION_PATTERN, ValidationErrorsText.OnlyLetters),
  bio: yup
    .string()
    .max(BIO_LENGTH_CONSTRAINT, ValidationErrorsText.LengthConstraint(BIO_LENGTH_CONSTRAINT))
    .optional(),
  dateOfBirth: yup.number().optional(),
});
