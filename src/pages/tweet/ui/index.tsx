import { useLocation } from 'react-router-dom';

import { TweetType } from '@/entities/tweet/types';
import { SectionHeader } from '@/shared/ui';
import { Tweet } from '@/widgets/tweet';

export function TweetPage() {
  const { state } = useLocation();

  return (
    <>
      <SectionHeader isNavigatable headerText='Tweet' />
      <Tweet tweet={state as TweetType} />
    </>
  );
}
