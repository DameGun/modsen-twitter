import { NotFoundFallback } from '@/components/common';
import { FlexContainer, Heading3, Section, SectionHeader } from '@/components/ui';
import { NotFoundTextMain, NotFoundTextSecondary } from '@/constants/notFound';

import { UserAvatar } from '../UserAvatar';
import { UserAvatarWrapper } from '../UserAvatarWrapper';
import { UserBackgroundImage } from '../UserBackgroundImage';

type ProfileNotFoundProps = {
  userName: string;
};

export function ProfileNotFound({ userName }: ProfileNotFoundProps) {
  return (
    <>
      <SectionHeader isNavigatable headerText='Profile' />
      <UserBackgroundImage />
      <Section direction='column' gap='md'>
        <UserAvatarWrapper align='end' justify='flex-end'>
          <UserAvatar size='xl2' />
        </UserAvatarWrapper>
        <FlexContainer direction='column'>
          <Heading3>{userName}</Heading3>
        </FlexContainer>
      </Section>
      <NotFoundFallback
        mainText={NotFoundTextMain.Profile}
        secondaryText={NotFoundTextSecondary.Profile}
      />
    </>
  );
}
