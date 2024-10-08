import { Helmet } from 'react-helmet-async';

import { CreateTweetForm } from '@/features/tweet';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import { TweetsList } from '@/widgets/tweet';

import { CreateTweetFormWrapper } from './styled';

export function FeedPage() {
  return (
    <>
      <Helmet>
        <title>{DocumentTitle.Feed}</title>
      </Helmet>
      <CreateTweetFormWrapper>
        <CreateTweetForm isLoaderFullScreen />
      </CreateTweetFormWrapper>
      <TweetsList />
    </>
  );
}
