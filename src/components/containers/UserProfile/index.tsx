import { CalendarIcon } from '@/assets/icons';
import {
  FlexContainer,
  Heading3,
  Paragraph,
  Section,
  SectionHeader,
  StyledIcon,
  StyledLink,
} from '@/components/ui';
import { Routes } from '@/constants/routes';
import { ConnectionType } from '@/constants/user';
import type { UserDoc } from '@/types/user';
import { parseUserRegisterDate } from '@/utils/user';

import { EditProfile } from '../EditProfile';
import { FollowButton } from '../FollowButton';
import { TweetsList } from '../TweetsList';
import { UserAvatar } from '../UserAvatar';
import { UserAvatarWrapper } from '../UserAvatarWrapper';
import { UserBackgroundImage } from '../UserBackgroundImage';
import { UserName } from '../UserName';

type UserProfileProps = {
  user: UserDoc;
  isCurrentUser: boolean;
};

export function UserProfile({ user, isCurrentUser }: UserProfileProps) {
  return (
    <>
      <SectionHeader isNavigatable headerText={user.fullName} />
      <UserBackgroundImage url={user?.backgroundImageUrl} />
      <Section direction='column' gap='md'>
        <UserAvatarWrapper align='end' justify='flex-end'>
          <UserAvatar url={user?.avatarUrl} size='xl2' />
          {isCurrentUser ? (
            <EditProfile />
          ) : (
            <FollowButton isLoaderFullScreen targetUid={user.uid} targetUserName={user.userName} />
          )}
        </UserAvatarWrapper>
        <FlexContainer direction='column'>
          <Heading3>{user.fullName}</Heading3>
          <UserName userName={user.userName} />
        </FlexContainer>
        <FlexContainer direction='column' gap='md'>
          {user.bio && <Paragraph>{user.bio}</Paragraph>}
          <FlexContainer align='center' gap='sm'>
            <StyledIcon $size='sm'>
              <CalendarIcon />
            </StyledIcon>
            <Paragraph color='textSecondary'>
              Joined {parseUserRegisterDate(user.createdAt)}
            </Paragraph>
          </FlexContainer>
          <FlexContainer gap='sm' align='center'>
            <StyledLink
              to={Routes.Subscriptions(user.userName, ConnectionType.Followers)}
              state={user}
              $color='textMain'
            >
              <Paragraph>{user.followers.length}</Paragraph>
              <Paragraph color='textSecondary'>Followers</Paragraph>
            </StyledLink>
            <StyledLink
              to={Routes.Subscriptions(user.userName, ConnectionType.Following)}
              state={user}
              $color='textMain'
            >
              <Paragraph>{user.following.length}</Paragraph>
              <Paragraph color='textSecondary'>Following</Paragraph>
            </StyledLink>
          </FlexContainer>
        </FlexContainer>
      </Section>
      <TweetsList targetUser={user} />
    </>
  );
}
