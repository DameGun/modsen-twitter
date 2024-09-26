import { NotFoundWrapper } from './styled';

import { Heading2, Paragraph } from '../Text';

type Fallback = {
  mainText: string;
  secondaryText?: string;
};

export function Fallback({ mainText, secondaryText }: Fallback) {
  return (
    <NotFoundWrapper $direction='column' $gap='sm'>
      <Heading2>{mainText}</Heading2>
      <Paragraph $color='textSecondary'>{secondaryText}</Paragraph>
    </NotFoundWrapper>
  );
}
