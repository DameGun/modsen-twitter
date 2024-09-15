export const Routes = {
  Index: '/',
  SignIn: '/signin',
  SignUp: '/signup',
  Feed: '/feed',
  Bookmarks: '/bookmarks',
  Profile: (userName: string) => `/${userName}`,
} as const;
