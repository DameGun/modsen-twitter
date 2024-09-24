import { TweetType } from '@/entities/tweet/types';

import { ConnectionType } from './user';

export const DocumentTitle = {
  Feed: 'Feed',
  Profile: (userName: string) => userName,
  Tweet: ({ author, content }: TweetType) =>
    author.fullName + content ? ' on Twitter: ' + content : ' posted',
  [ConnectionType.Followers]: (fullName: string) => `People followed by ${fullName}`,
  [ConnectionType.Following]: (fullName: string) => `People following ${fullName}`,
  SignIn: 'Sign In',
  SignUp: 'Sign Up',
  Welcome: 'Welcome',
} as const;
