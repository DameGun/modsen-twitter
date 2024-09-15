import * as yup from 'yup';

import { ValidationErrorsText } from '@/constants/validation';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(ValidationErrorsText.Required)
    .email(ValidationErrorsText.EmailFormat),
  password: yup.string().required(ValidationErrorsText.Required),
});
