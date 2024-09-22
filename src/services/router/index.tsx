import { createBrowserRouter } from 'react-router-dom';

import { AuthGate, NotFoundFallback } from '@/components/common';
import { Layout } from '@/components/common/Layout';
import { Routes } from '@/constants/routes';
import {
  FeedPage,
  LoginPage,
  ProfilePage,
  SignUpPage,
  SubscriptionsPage,
  TweetPage,
  WelcomePage,
} from '@/pages';

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
        element: <LoginPage isLoaderFullScreen />,
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
            path: Routes.Subscriptions(':userName', ':connectionType'),
            element: <SubscriptionsPage />,
          },
          {
            path: Routes.Profile(':userName'),
            element: <ProfilePage />,
          },
          {
            path: '*',
            element: (
              <NotFoundFallback
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
