import { useNavigate } from 'react-router-dom';

import { Avatar, UserName } from '@/entities/user/';
import { UserDoc } from '@/entities/user/types';
import { Routes } from '@/shared/constants/routes';
import { FlexContainer, Heading4, Paragraph } from '@/shared/ui';

import { UserCellWrapper } from './styled';

import { FollowButton } from '../../follow';

type UserCellProps = {
  user: UserDoc;
  variant?: 'full' | 'short';
};

export function UserCell({
  user: { uid, avatarUrl, fullName, userName, bio },
  variant = 'full',
}: UserCellProps) {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(Routes.Profile(userName));

  return (
    <UserCellWrapper $gap='sm' onClick={handleNavigate}>
      <FlexContainer>
        <Avatar url={avatarUrl} />
      </FlexContainer>
      <FlexContainer $direction='column' $fullWidth>
        <FlexContainer $justify='space-between'>
          <FlexContainer $direction='column'>
            <Heading4>{fullName}</Heading4>
            <UserName userName={userName} />
          </FlexContainer>
          {variant === 'full' && (
            <FollowButton isLoaderFullScreen targetUid={uid} targetUserName={userName} />
          )}
        </FlexContainer>
        {variant === 'full' && <Paragraph>{bio}</Paragraph>}
      </FlexContainer>
    </UserCellWrapper>
  );
}
