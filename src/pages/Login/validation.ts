import * as yup from 'yup';

import { ValidationErrorsText } from '@/constants/validation';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email(ValidationErrorsText.EmailFormat)
    .required(ValidationErrorsText.Required),
  password: yup.string().required(ValidationErrorsText.Required),
});
