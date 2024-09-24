import { Outlet } from 'react-router-dom';

import { FlexContainer } from '@/shared/ui';
import { Search } from '@/widgets/search';

import { LayoutWrapper, LeftColumnWrapper, RightColumnWrapper } from './styled';

import { Sidebar } from '../Sidebar';

export function Layout() {
  return (
    <LayoutWrapper>
      <LeftColumnWrapper $direction='column' $gap='lg'>
        <Sidebar />
      </LeftColumnWrapper>
      <FlexContainer $direction='column'>
        <Outlet />
      </FlexContainer>
      <RightColumnWrapper>
        <Search />
      </RightColumnWrapper>
    </LayoutWrapper>
  );
}
