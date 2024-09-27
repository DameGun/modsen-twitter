import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from '@/shared/ui';
import { Search } from '@/widgets/search';

import { LayoutWrapper, LeftColumnWrapper, MiddleColumn, RightColumnWrapper } from './styled';

import { Sidebar } from '../Sidebar';

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
