import { Avatar, AvatarWrapper, BackgroundImage, UserName } from '@/entities/user';
import { parseUserRegisterDate } from '@/entities/user/lib';
import { UserDoc } from '@/entities/user/types';
import { FollowButton } from '@/features/user';
import { CalendarIcon } from '@/shared/assets/icons';
import { Routes } from '@/shared/constants/routes';
import { ConnectionType } from '@/shared/constants/user';
import {
  FlexContainer,
  Heading3,
  Paragraph,
  Section,
  SectionHeader,
  StyledIcon,
  StyledLink,
} from '@/shared/ui';
import { TweetsList } from '@/widgets/tweet';

import { EditProfile } from '../../edit/ui/EditProfile';

type UserProfileProps = {
  user: UserDoc;
  isCurrentUser: boolean;
};

export function UserProfile({ user, isCurrentUser }: UserProfileProps) {
  return (
    <>
      <SectionHeader isNavigatable headerText={user.fullName} />
      <BackgroundImage url={user?.backgroundImageUrl} />
      <Section $direction='column' $gap='md'>
        <AvatarWrapper $align='end' $justify='flex-end'>
          <Avatar url={user?.avatarUrl} size='xl2' />
          {isCurrentUser ? (
            <EditProfile />
          ) : (
            <FollowButton isLoaderFullScreen targetUid={user.uid} targetUserName={user.userName} />
          )}
        </AvatarWrapper>
        <FlexContainer $direction='column'>
          <Heading3>{user.fullName}</Heading3>
          <UserName userName={user.userName} />
        </FlexContainer>
        <FlexContainer $direction='column' $gap='md'>
          {user.bio && <Paragraph>{user.bio}</Paragraph>}
          <FlexContainer $align='center' $gap='sm'>
            <StyledIcon $size='sm'>
              <CalendarIcon />
            </StyledIcon>
            <Paragraph color='textSecondary'>
              Joined {parseUserRegisterDate(user.createdAt)}
            </Paragraph>
          </FlexContainer>
          <FlexContainer $gap='sm' $align='center'>
            <StyledLink
              to={Routes.Connections(user.userName, ConnectionType.Followers)}
              state={user}
              $color='textMain'
            >
              <Paragraph>{user.followers.length}</Paragraph>
              <Paragraph color='textSecondary'>Followers</Paragraph>
            </StyledLink>
            <StyledLink
              to={Routes.Connections(user.userName, ConnectionType.Following)}
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
