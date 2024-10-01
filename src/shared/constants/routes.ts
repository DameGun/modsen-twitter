export const Routes = {
  Index: '/',
  SignIn: '/signin',
  SignUp: '/signup',
  Feed: '/feed',
  Bookmarks: '/bookmarks',
  Profile: (userName: string) => `/${userName}`,
  Tweet: (userName: string, tweetId: string) => `/${userName}/tweets/${tweetId}`,
  Connections: (userName: string, connectionType: string) => `/${userName}/${connectionType}`,
  Search: `/search`,
} as const;
