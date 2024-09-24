import { useLocation } from 'react-router-dom';

import { TweetType } from '@/entities/tweet/types';
import { useModifyDocumentTitle } from '@/shared/lib/useModifyDocumentTitle';
import { SectionHeader } from '@/shared/ui';
import { Tweet } from '@/widgets/tweet';

export function TweetPage() {
  const { state } = useLocation();
  useModifyDocumentTitle(
    (state as TweetType).author.fullName + ' on Twitter: ' + (state as TweetType).content
  );

  return (
    <>
      <SectionHeader isNavigatable headerText='Tweet' />
      <Tweet tweet={state as TweetType} />
    </>
  );
}
