import {
  BookmarkIcon,
  BookmarkIconFilled,
  FeedIcon,
  FeedIconFilled,
  ProfileIcon,
  ProfileIconFilled,
} from '@/assets/icons';
import { FlexContainer } from '@/components/ui';
import { Routes } from '@/constants/routes';
import { useAppSelector } from '@/hooks/store';
import { selectCurrentUser } from '@/services/store/user';

import { SidebarWrapper } from './styled';

import { CreateTweetModal } from '../CreateTweetModal';
import { NavButton } from '../NavButton';
import { SidebarHeader } from '../SidebarHeader';
import { UserButton } from '../UserButton';

export function Sidebar() {
  const currentUser = useAppSelector(selectCurrentUser);

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
          state={currentUser}
        >
          Profile
        </NavButton>
      </FlexContainer>
      <CreateTweetModal />
      <UserButton />
    </SidebarWrapper>
  );
}
