import { CreateTweetForm } from '@/features/tweet';
import { useModifyDocumentTitle } from '@/shared/lib/useModifyDocumentTitle';
import { TweetsList } from '@/widgets/tweet';

import { CreateTweetFormWrapper } from './styled';

export function FeedPage() {
  useModifyDocumentTitle('Feed');

  return (
    <>
      <CreateTweetFormWrapper>
        <CreateTweetForm isLoaderFullScreen />
      </CreateTweetFormWrapper>
      <TweetsList />
    </>
  );
}
