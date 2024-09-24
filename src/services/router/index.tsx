import { createBrowserRouter } from 'react-router-dom';

import { AuthGate } from '@/components/common';
import { Layout } from '@/components/common/Layout';
import { Routes } from '@/constants/routes';
import { FeedPage, LoginPage, ProfilePage, SignUpPage, WelcomePage } from '@/pages';

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
            path: Routes.Profile(':userName'),
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);
