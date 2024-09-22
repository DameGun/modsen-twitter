import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/components/containers';
import { FlexContainer } from '@/components/ui';

import { LayoutWrapper } from './styled';

export function Layout() {
  return (
    <LayoutWrapper>
      <Sidebar />
      <FlexContainer direction='column'>
        <Outlet />
      </FlexContainer>
    </LayoutWrapper>
  );
}
