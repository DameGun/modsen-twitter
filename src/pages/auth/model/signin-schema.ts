import * as yup from 'yup';

import { ValidationErrorsText } from '@/shared/constants/validation';

export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(ValidationErrorsText.Required)
    .email(ValidationErrorsText.EmailFormat),
  password: yup.string().required(ValidationErrorsText.Required),
});
