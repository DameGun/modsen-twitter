import { useLocation } from 'react-router-dom';

import { Tweet } from '@/components/containers';
import { SectionHeader } from '@/components/ui';
import type { TweetType } from '@/types/tweet';

export function TweetPage() {
  const { state } = useLocation();

  return (
    <>
      <SectionHeader isNavigatable headerText='Tweet' />
      <Tweet tweet={state as TweetType} />
    </>
  );
}
