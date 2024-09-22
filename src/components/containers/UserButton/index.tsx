import { signOut } from 'firebase/auth';

import { LogoutIcon } from '@/assets/icons';
import { FlexContainer, Heading4, StyledButton, StyledIcon } from '@/components/ui';
import { useAppSelector } from '@/hooks/store';
import { auth } from '@/services/firebase';
import { selectCurrentUser } from '@/services/store/user';

import { UserButtonInfoWrapper } from './styled';

import { UserAvatar } from '../UserAvatar';
import { UserName } from '../UserName';

export function UserButton() {
  const { avatarUrl, fullName, userName } = useAppSelector(selectCurrentUser);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FlexContainer align='center'>
      <StyledButton>
        <UserAvatar url={avatarUrl} />
        <UserButtonInfoWrapper>
          <Heading4>{fullName}</Heading4>
          <UserName userName={userName} />
        </UserButtonInfoWrapper>
      </StyledButton>
      <StyledButton variant='icon' onClick={handleLogout}>
        <StyledIcon $size='sm'>
          <LogoutIcon />
        </StyledIcon>
      </StyledButton>
    </FlexContainer>
  );
}
