import { Heading3, StyledButton } from '@/components/ui';
import { useAppSelector } from '@/hooks/store';
import { selectCurrentUser } from '@/services/store/user';

import { UserButtonInfoWrapper } from './styled';

import { UserAvatar } from '../UserAvatar';
import { UserName } from '../UserName';

export function UserButton() {
  const { avatarUrl, fullName, userName } = useAppSelector(selectCurrentUser)!;

  return (
    <StyledButton>
      <UserAvatar url={avatarUrl} />
      <UserButtonInfoWrapper>
        <Heading3>{fullName}</Heading3>
        <UserName userName={userName} />
      </UserButtonInfoWrapper>
    </StyledButton>
  );
}
