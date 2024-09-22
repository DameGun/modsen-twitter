export const Routes = {
  Index: '/',
  SignIn: '/signin',
  SignUp: '/signup',
  Feed: '/feed',
  Bookmarks: '/bookmarks',
  Profile: (userName: string) => `/${userName}`,
  Tweet: (userName: string, tweetId: string) => `/${userName}/tweets/${tweetId}`,
  Subscriptions: (userName: string, subscriptionType: string) => `/${userName}/${subscriptionType}`,
} as const;
