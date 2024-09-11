import { Heading3, Paragraph, StyledButton } from '@/components/ui';
import { useAppSelector } from '@/hooks/store';
import { selectCurrentUser } from '@/services/store/user';

import { UserButtonInfoWrapper } from './styled';

import { UserPhoto } from '../UserPhoto';

export function UserButton() {
  const currentUser = useAppSelector(selectCurrentUser)!;

  return (
    <StyledButton>
      <UserPhoto photoUrl={currentUser.photoUrl} />
      <UserButtonInfoWrapper>
        <Heading3>{currentUser.fullName}</Heading3>
        <Paragraph color='textSecondary' weight='semibold'>
          @{currentUser.userName}
        </Paragraph>
      </UserButtonInfoWrapper>
    </StyledButton>
  );
}
