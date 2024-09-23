import { FallbackTextMain, FallbackTextSecondary } from '@/shared/constants/fallback';
import { Fallback, FlexContainer, Heading3, Section, SectionHeader } from '@/shared/ui';

import { Avatar } from '../Avatar';
import { AvatarWrapper } from '../AvatarWrapper';
import { BackgroundImage } from '../Background';

type ProfileNotFoundProps = {
  userName: string;
};

export function NotFound({ userName }: ProfileNotFoundProps) {
  return (
    <>
      <SectionHeader isNavigatable headerText='Profile' />
      <BackgroundImage />
      <Section $direction='column' $gap='md'>
        <AvatarWrapper $align='end' $justify='flex-end'>
          <Avatar size='xl2' />
        </AvatarWrapper>
        <FlexContainer $direction='column'>
          <Heading3>{userName}</Heading3>
        </FlexContainer>
      </Section>
      <Fallback mainText={FallbackTextMain.Profile} secondaryText={FallbackTextSecondary.Profile} />
    </>
  );
}
