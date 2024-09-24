import { signOut } from 'firebase/auth';

import {
  BookmarkIcon,
  BookmarkIconFilled,
  FeedIcon,
  FeedIconFilled,
  ProfileIcon,
  ProfileIconFilled,
} from '@/assets/icons';
import { FlexContainer, StyledButton } from '@/components/ui';
import { Routes } from '@/constants/routes';
import { useAppSelector } from '@/hooks/store';
import { auth } from '@/services/firebase';
import { selectCurrentUser } from '@/services/store/user';

import { SidebarWrapper } from './styled';

import { NavButton } from '../NavButton';
import { SidebarHeader } from '../SidebarHeader';
import { UserButton } from '../UserButton';

export function Sidebar() {
  const currentUser = useAppSelector(selectCurrentUser)!;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarWrapper>
      <FlexContainer direction='column' gap='sm'>
        <SidebarHeader />
        <NavButton
          IconComponent={<FeedIcon />}
          ActiveIconComponent={<FeedIconFilled />}
          to={Routes.Feed}
        >
          Feed
        </NavButton>
        <NavButton
          IconComponent={<BookmarkIcon />}
          ActiveIconComponent={<BookmarkIconFilled />}
          to={Routes.Bookmarks}
        >
          Bookmarks
        </NavButton>
        <NavButton
          IconComponent={<ProfileIcon />}
          ActiveIconComponent={<ProfileIconFilled />}
          to={Routes.Profile(currentUser.userName)}
        >
          Profile
        </NavButton>
      </FlexContainer>
      <StyledButton onClick={handleLogout} variant='filled'>
        Logout
      </StyledButton>
      <UserButton />
    </SidebarWrapper>
  );
}
