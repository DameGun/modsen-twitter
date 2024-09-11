import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/components/containers/Sidebar';

import { LayoutWrapper } from './styled';

export function Layout() {
  return (
    <LayoutWrapper>
      <Sidebar />
      <Outlet />
    </LayoutWrapper>
  );
}
