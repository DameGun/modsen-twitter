import { Outlet } from 'react-router-dom';

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
        <Outlet />
      </MiddleColumn>
      <RightColumnWrapper>
        <Search />
      </RightColumnWrapper>
    </LayoutWrapper>
  );
}
