export enum GoogleAuthType {
  SignIn,
  SignUp,
}

export const GoogleAuthText = {
  [GoogleAuthType.SignIn]: 'Log in with Google',
  [GoogleAuthType.SignUp]: 'Sign up with Google',
} as const;
