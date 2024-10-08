import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useGetTweetByIdQuery } from '@/entities/tweet';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import { useQueryWithLoading } from '@/shared/lib/useQueryWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import { ManualLoadingHandleProps } from '@/shared/types/loader';
import { SectionHeader } from '@/shared/ui';
import { Tweet } from '@/widgets/tweet';

function BaseTweetPage({ handleLoading }: ManualLoadingHandleProps) {
  const { tweetId, userName } = useParams();
  const { data, isFetching } = useGetTweetByIdQuery(tweetId!);
  useQueryWithLoading({ isLoading: isFetching, handleLoading });

  return (
    <>
      <Helmet>
        <title>{DocumentTitle.Tweet(userName!)}</title>
      </Helmet>
      <SectionHeader isNavigatable headerText='Tweet' />
      {data && <Tweet tweet={data} />}
    </>
  );
}

export const TweetPage = withLoader(BaseTweetPage);
