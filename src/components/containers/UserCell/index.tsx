import { useNavigate } from 'react-router-dom';

import { FlexContainer, Heading4, Paragraph } from '@/components/ui';
import { Routes } from '@/constants/routes';
import type { UserDoc } from '@/types/user';

import { UserCellWrapper } from './styled';

import { FollowButton } from '../FollowButton';
import { UserAvatar } from '../UserAvatar';
import { UserName } from '../UserName';

type UserCellProps = {
  user: UserDoc;
};

export function UserCell({ user: { uid, avatarUrl, fullName, userName, bio } }: UserCellProps) {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(Routes.Profile(userName));

  return (
    <UserCellWrapper gap='sm' onClick={handleNavigate}>
      <FlexContainer>
        <UserAvatar url={avatarUrl} />
      </FlexContainer>
      <FlexContainer direction='column' fullWidth>
        <FlexContainer justify='space-between'>
          <FlexContainer direction='column'>
            <Heading4>{fullName}</Heading4>
            <UserName userName={userName} />
          </FlexContainer>
          <FollowButton isLoaderFullScreen targetUid={uid} targetUserName={userName} />
        </FlexContainer>
        <Paragraph>{bio}</Paragraph>
      </FlexContainer>
    </UserCellWrapper>
  );
}
