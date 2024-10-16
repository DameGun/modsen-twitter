import { selectCurrentUser } from '@/entities/user';
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
import { NavButton } from '@/shared/ui';
import { CreateTweetModal } from '@/widgets/tweet/create/ui';
import { UserButton } from '@/widgets/user/logout/ui';

import { SidebarButtonsWrapper } from './styled';

import { SidebarHeader } from '../SidebarHeader';

export function Sidebar() {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <>
      <SidebarButtonsWrapper $direction='column' $gap='sm'>
        <SidebarHeader />
        <NavButton
          IconComponent={<FeedIcon title='Home' />}
          ActiveIconComponent={<FeedIconFilled title='Home active' />}
          to={Routes.Feed}
        >
          Feed
        </NavButton>
        <NavButton
          IconComponent={<BookmarkIcon title='Bookmarks' />}
          ActiveIconComponent={<BookmarkIconFilled title='Bookmarks active' />}
          to={Routes.Bookmarks}
        >
          Bookmarks
        </NavButton>
        <NavButton
          IconComponent={<ProfileIcon title='Profile' />}
          ActiveIconComponent={<ProfileIconFilled title='Profile active' />}
          to={Routes.Profile(currentUser.userName)}
          state={currentUser}
        >
          Profile
        </NavButton>
      </SidebarButtonsWrapper>
      <CreateTweetModal />
      <UserButton />
    </>
  );
}
