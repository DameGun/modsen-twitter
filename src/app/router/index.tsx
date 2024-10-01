import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/app/layout';
import {
  ConnectionsPage,
  FeedPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  TweetPage,
  WelcomePage,
} from '@/pages';
import { Routes } from '@/shared/constants/routes';
import { AuthGate, Fallback } from '@/shared/ui';

export const router = createBrowserRouter([
  {
    element: <AuthGate />,
    children: [
      {
        index: true,
        path: Routes.Index,
        element: <WelcomePage />,
      },
      {
        path: Routes.SignIn,
        element: <SignInPage isLoaderFullScreen />,
      },
      {
        path: Routes.SignUp,
        element: <SignUpPage isLoaderFullScreen />,
      },
    ],
  },
  {
    element: <AuthGate isProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: Routes.Feed,
            element: <FeedPage />,
          },
          {
            path: Routes.Tweet(':userName', ':tweetId'),
            element: <TweetPage />,
          },
          {
            path: Routes.Connections(':userName', ':connectionType'),
            element: <ConnectionsPage />,
          },
          {
            path: Routes.Profile(':userName'),
            element: <ProfilePage />,
          },
          {
            path: '*',
            element: (
              <Fallback
                mainText='This page doesnt exists.'
                secondaryText='Try search for something else.'
              />
            ),
          },
        ],
      },
    ],
  },
]);
