export const FULLNAME_LENGTH_CONSTRAINT = 50;
export const USERNAME_LENGTH_CONTSTRAINT = 20;
export const PASSWORD_LENGTH_CONSTRAINT = 50;
export const BIO_LENGTH_CONSTRAINT = 150;

export const ValidationErrorsText = {
  Required: 'This is a required field',
  LengthConstraint: (length: number) => `Must be less than ${length} characters`,
  EmailFormat: 'Incorrect email format',
  OnlyLettersAndDigits: 'Must contain only letters and digits',
  OnlyLetters: 'Must container only letters',
} as const;

export enum PasswordValidationChecks {
  Capital = 'CAPITAL',
  Digit = 'DIGIT',
  Length = 'LENGTH',
}

export const PasswordValidationPatterns = {
  ContainCapital: /[A-Z]+/,
  ContainDigit: /\d+/,
  LengthConstraint: /.{8,}/,
} as const;

export const FULLNAME_VALIDATION_PATTERN = /^[\p{L}\s]{1,}$/u;
export const USERNAME_VALIDATION_PATTERN = /^[a-zA-Z\d]{1,}$/;
