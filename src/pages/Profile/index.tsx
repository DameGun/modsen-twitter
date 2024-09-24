import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CalendarIcon } from '@/assets/icons';
import {
  EditProfile,
  UserAvatar,
  UserAvatarWrapper,
  UserBackgroundImage,
  UserName,
} from '@/components/containers';
import { FlexContainer, Heading2, Heading3, Paragraph, Section, StyledIcon } from '@/components/ui';
import { useAppSelector } from '@/hooks/store';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { UsersRepositoryService } from '@/services/firestore/users';
import { selectCurrentUser } from '@/services/store/user';
import type { ManualLoadingHandleProps } from '@/types/loader';
import type { UserDoc } from '@/types/user';
import { mapUserWithDate } from '@/utils/user';
import { withLoader } from '@/utils/withLoader';

import { ProfileErrorWrapper } from './styled';

function BaseProfilePage({ handleLoading }: ManualLoadingHandleProps) {
  const currentAuthenticatedUser = useAppSelector(selectCurrentUser)!;
  const { userName } = useParams();
  const [displayedUser, setDisplayedUser] = useState<UserDoc | undefined>();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const { call, isError, resetState } = useAsyncWithLoading({
    call: UsersRepositoryService.getUserByUserName,
    handleLoading,
  });

  const getAndSetUser = async (userName: string) => {
    const user = await call(userName);

    if (user) setDisplayedUser(mapUserWithDate(user));
    else setDisplayedUser(undefined);
  };

  useEffect(() => {
    if (userName) {
      if (currentAuthenticatedUser.userName === userName) {
        setDisplayedUser(mapUserWithDate(currentAuthenticatedUser));
        setIsCurrentUser(true);
      } else {
        getAndSetUser(userName);
      }
    }

    return () => resetState();
  }, [userName, currentAuthenticatedUser]);

  return (
    <FlexContainer direction='column'>
      <Section>
        <Heading3>Profile</Heading3>
      </Section>
      <UserBackgroundImage url={displayedUser?.backgroundImageUrl} />
      <Section direction='column' gap='md'>
        <UserAvatarWrapper align='end' justify='flex-end'>
          <UserAvatar url={displayedUser?.avatarUrl} size='xl2' />
          {isCurrentUser && <EditProfile />}
        </UserAvatarWrapper>
        <FlexContainer direction='column'>
          <Heading3>{displayedUser ? displayedUser.fullName : userName}</Heading3>
          {displayedUser?.userName && <UserName userName={displayedUser?.userName} />}
        </FlexContainer>
        {displayedUser && (
          <>
            {displayedUser.bio && <Paragraph>{displayedUser.bio}</Paragraph>}
            <FlexContainer align='center' gap='sm'>
              <StyledIcon $size='sm'>
                <CalendarIcon />
              </StyledIcon>
              <Paragraph color='textSecondary'>Joined {displayedUser.createdAt}</Paragraph>
            </FlexContainer>
          </>
        )}
      </Section>
      {isError && (
        <ProfileErrorWrapper direction='column' gap='sm'>
          <Heading2>This account doesnt exist</Heading2>
          <Paragraph color='textSecondary'>Try searching for another.</Paragraph>
        </ProfileErrorWrapper>
      )}
    </FlexContainer>
  );
}

export const ProfilePage = withLoader(BaseProfilePage);
