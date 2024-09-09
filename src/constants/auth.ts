enum PasswordValidationChecks {
  CAPITAL = 'CAPITAL',
  DIGIT = 'DIGIT',
  LENGTH = 'LENGTH',
  REQUIRED = 'Password field is required',
}

enum AuthResponseErrors {
  INVALID_CREDENTIALS = 'auth/invalid-credential',
  EMAIL_IN_USE = 'auth/email-already-in-use',
}

export { AuthResponseErrors, PasswordValidationChecks };
