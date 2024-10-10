import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { Sidebar } from '@/shared/ui/Sidebar';

import { LayoutWrapper, LeftColumnWrapper, MiddleColumn, RightColumnWrapper } from './styled';

import { Search } from '../../search';

export function Layout() {
  return (
    <LayoutWrapper>
      <LeftColumnWrapper $direction='column' $gap='lg'>
        <Sidebar />
      </LeftColumnWrapper>
      <MiddleColumn $direction='column'>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </MiddleColumn>
      <RightColumnWrapper>
        <Search />
      </RightColumnWrapper>
    </LayoutWrapper>
  );
}
