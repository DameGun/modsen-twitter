import { Outlet } from 'react-router-dom';

import { FlexContainer } from '@/shared/ui';

import { LayoutWrapper } from './styled';

import { Sidebar } from '../Sidebar';

export function Layout() {
  return (
    <LayoutWrapper>
      <Sidebar />
      <FlexContainer $direction='column'>
        <Outlet />
      </FlexContainer>
    </LayoutWrapper>
  );
}
