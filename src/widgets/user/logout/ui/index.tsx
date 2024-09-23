import { signOut } from 'firebase/auth';

import { Avatar, selectCurrentUser, UserName } from '@/entities/user';
import { firebaseApi } from '@/shared/api';
import { LogoutIcon } from '@/shared/assets/icons';
import { useAppSelector } from '@/shared/lib/store';
import { FlexContainer, Heading4, StyledButton, StyledIcon } from '@/shared/ui';

import { UserButtonInfoWrapper } from './styled';

export function UserButton() {
  const { avatarUrl, fullName, userName } = useAppSelector(selectCurrentUser);

  const handleLogout = async () => {
    try {
      await signOut(firebaseApi.auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FlexContainer $align='center'>
      <StyledButton>
        <Avatar url={avatarUrl} />
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
