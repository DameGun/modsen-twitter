import { Avatar, AvatarWrapper, BackgroundImage, UserName } from '@/entities/user';
import { parseUserRegisterDate } from '@/entities/user/lib';
import { UserDoc } from '@/entities/user/types';
import { FollowButton } from '@/features/user';
import { CalendarIcon } from '@/shared/assets/icons';
import { Routes } from '@/shared/constants/routes';
import { ConnectionType } from '@/shared/constants/user';
import * as Components from '@/shared/ui';
import { TweetsList } from '@/widgets/tweet';

import { EditProfile } from '../../edit/ui/EditProfile';

type UserProfileProps = {
  user: UserDoc;
  isCurrentUser: boolean;
};

export function UserProfile({ user, isCurrentUser }: UserProfileProps) {
  return (
    <>
      <Components.SectionHeader isNavigatable headerText={user.fullName} />
      <BackgroundImage url={user?.backgroundImageUrl} />
      <Components.Section $direction='column' $gap='md'>
        <AvatarWrapper $align='end' $justify='flex-end'>
          <Avatar url={user?.avatarUrl} size='xl2' />
          {isCurrentUser ? (
            <EditProfile />
          ) : (
            <FollowButton isLoaderFullScreen targetUid={user.uid} targetUserName={user.userName} />
          )}
        </AvatarWrapper>
        <Components.FlexContainer $direction='column'>
          <Components.Heading3>{user.fullName}</Components.Heading3>
          <UserName userName={user.userName} />
        </Components.FlexContainer>
        <Components.FlexContainer $direction='column' $gap='md'>
          {user.bio && <Components.Paragraph>{user.bio}</Components.Paragraph>}
          <Components.FlexContainer $align='center' $gap='sm'>
            <Components.StyledIcon $size='sm'>
              <CalendarIcon title='Calendar' />
            </Components.StyledIcon>
            <Components.Paragraph $color='textSecondary'>
              Joined {parseUserRegisterDate(user.createdAt)}
            </Components.Paragraph>
          </Components.FlexContainer>
          <Components.FlexContainer $gap='sm' $align='center'>
            <Components.StyledLink
              to={Routes.Connections(user.userName, ConnectionType.Followers)}
              state={user}
              $color='textMain'
            >
              <Components.Paragraph>{user.followers.length}</Components.Paragraph>
              <Components.Paragraph $color='textSecondary'>Followers</Components.Paragraph>
            </Components.StyledLink>
            <Components.StyledLink
              to={Routes.Connections(user.userName, ConnectionType.Following)}
              state={user}
              $color='textMain'
            >
              <Components.Paragraph>{user.following.length}</Components.Paragraph>
              <Components.Paragraph $color='textSecondary'>Following</Components.Paragraph>
            </Components.StyledLink>
          </Components.FlexContainer>
        </Components.FlexContainer>
      </Components.Section>
      <TweetsList targetUser={user} />
    </>
  );
}
