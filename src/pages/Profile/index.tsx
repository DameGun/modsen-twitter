import { CalendarIcon } from '@/assets/icons';
import { UserBackgroundPhoto } from '@/components/containers/UserBackgroundPhoto';
import { UserPhoto } from '@/components/containers/UserPhoto';
import { FlexContainer, Heading3, Paragraph, StyledButton, StyledIcon } from '@/components/ui';
import { Section } from '@/components/ui/Section';
import { useAppSelector } from '@/hooks/store';
import { selectCurrentUser } from '@/services/store/user';

import { AvatarAndEditWrapper } from './styled';

export function ProfilePage() {
  const { fullName, photoUrl, userName, createdAt } = useAppSelector(selectCurrentUser)!;

  return (
    <FlexContainer direction='column'>
      <Section>
        <Heading3>{fullName}</Heading3>
      </Section>
      <UserBackgroundPhoto />
      <Section direction='column' gap='md'>
        <AvatarAndEditWrapper align='end' justify='flex-end'>
          <UserPhoto photoUrl={photoUrl} size='xl2' />
          <StyledButton variant='outline'>
            <Paragraph weight='semibold'>Edit profile</Paragraph>
          </StyledButton>
        </AvatarAndEditWrapper>
        <FlexContainer direction='column'>
          <Heading3>{fullName}</Heading3>
          <Paragraph color='textSecondary' weight='semibold'>
            @{userName}
          </Paragraph>
        </FlexContainer>
        <FlexContainer align='center' gap='sm'>
          <StyledIcon $size='sm'>
            <CalendarIcon />
          </StyledIcon>
          <Paragraph color='textSecondary'>Joined {createdAt}</Paragraph>
        </FlexContainer>
      </Section>
    </FlexContainer>
  );
}
