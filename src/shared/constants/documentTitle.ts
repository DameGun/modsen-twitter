import { ConnectionType } from './user';

export const DocumentTitle = {
  Feed: 'Feed',
  Profile: (userName: string) => userName,
  Tweet: (userName: string) => `${userName} posted on Twitter`,
  [ConnectionType.Followers]: (fullName: string) => `People followed by ${fullName}`,
  [ConnectionType.Following]: (fullName: string) => `People following ${fullName}`,
  SignIn: 'Sign In',
  SignUp: 'Sign Up',
  Welcome: 'Welcome',
  Default: 'Twitter',
} as const;
