import { Navigate, Outlet } from 'react-router-dom';

import { Routes } from '@/constants/routes';
import { useAuthPersist } from '@/hooks/useAuthPersist';

import { Loader } from '../Loader';

interface AuthGateProps {
  isProtectedRoute?: boolean;
}

export function AuthGate({ isProtectedRoute }: AuthGateProps) {
  const { isLoading, isAuthenticated } = useAuthPersist();

  if (isLoading) return <Loader isLoading={isLoading} />;

  if (!isAuthenticated && isProtectedRoute) return <Navigate to={Routes.Index} />;

  if (isAuthenticated && !isProtectedRoute) return <Navigate to={Routes.Feed} />;

  return <Outlet />;
}
