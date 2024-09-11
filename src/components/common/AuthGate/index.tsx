import { Navigate, Outlet } from 'react-router-dom';

import { Routes } from '@/constants/routes';
import { useAuthPersist } from '@/hooks/useAuthPersist';

import { Loader } from '../Loader';

interface AuthGateProps {
  isProtectedRoute?: boolean;
}

export function AuthGate({ isProtectedRoute }: AuthGateProps) {
  const { isLoading, isAuthenticated } = useAuthPersist();

  if (isLoading) return <Loader isLoading={isLoading} isLoaderFullScreen />;

  if (!isAuthenticated && isProtectedRoute) return <Navigate to={Routes.Index} replace />;

  if (isAuthenticated && !isProtectedRoute) return <Navigate to={Routes.Feed} replace />;

  return <Outlet />;
}
