import * as yup from 'yup';

import { PasswordValidationChecks } from '@/constants/auth';

export const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(50, 'Name must be less than 50 characters')
    .required('Name is a required field'),
  userName: yup
    .string()
    .matches(/[a-zA-Z]?\d?/, 'Username must contain only letters and digits')
    .max(20, 'Username must be less than 20 characters')
    .required('Username is a required field'),
  email: yup.string().email('Please provide a correct email').required('Email is a required field'),
  password: yup
    .string()
    .max(50, 'Password must be less than 50 characters')
    .matches(/[A-Z]+/, PasswordValidationChecks.CAPITAL)
    .matches(/\d+/, PasswordValidationChecks.DIGIT)
    .matches(/.{8,}/, PasswordValidationChecks.LENGTH)
    .required('Password is a required field'),
  dateOfBirth: yup.date().required('Date of birth is a required field'),
});
