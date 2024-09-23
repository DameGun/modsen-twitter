import { selectCurrentUser } from '@/entities/user/model';
import {
  BookmarkIcon,
  BookmarkIconFilled,
  FeedIcon,
  FeedIconFilled,
  ProfileIcon,
  ProfileIconFilled,
} from '@/shared/assets/icons';
import { Routes } from '@/shared/constants/routes';
import { useAppSelector } from '@/shared/lib/store';
import { FlexContainer, NavButton } from '@/shared/ui';
import { CreateTweetModal } from '@/widgets/tweet/create/ui';
import { UserButton } from '@/widgets/user/logout/ui';

import { SidebarWrapper } from './styled';

import { SidebarHeader } from '../SidebarHeader';

export function Sidebar() {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <SidebarWrapper>
      <FlexContainer $direction='column' $gap='sm'>
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
