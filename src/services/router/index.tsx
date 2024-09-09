import { createBrowserRouter } from 'react-router-dom';

import { AuthGate } from '@/components/common';
import { Routes } from '@/constants/routes';
import { FeedPage, LoginPage, SignUpPage, WelcomePage } from '@/pages';

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
        element: <LoginPage />,
      },
      {
        path: Routes.SignUp,
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <AuthGate isProtectedRoute />,
    children: [
      {
        index: true,
        path: Routes.Feed,
        element: <FeedPage />,
      },
    ],
  },
]);
