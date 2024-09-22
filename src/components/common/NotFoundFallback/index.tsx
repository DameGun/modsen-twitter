import { Heading2, Paragraph } from '@/components/ui';

import { NotFoundWrapper } from './styled';

type NotFoundFallbackProps = {
  mainText: string;
  secondaryText?: string;
};

export function NotFoundFallback({ mainText, secondaryText }: NotFoundFallbackProps) {
  return (
    <NotFoundWrapper direction='column' gap='sm'>
      <Heading2>{mainText}</Heading2>
      <Paragraph color='textSecondary'>{secondaryText}</Paragraph>
    </NotFoundWrapper>
  );
}
