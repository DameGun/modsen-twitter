import { useParams } from 'react-router-dom';

import { useGetTweetByIdQuery } from '@/entities/tweet';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import { useModifyDocumentTitle } from '@/shared/lib/useModifyDocumentTitle';
import { useQueryWithLoading } from '@/shared/lib/useQueryWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import { ManualLoadingHandleProps } from '@/shared/types/loader';
import { SectionHeader } from '@/shared/ui';
import { Tweet } from '@/widgets/tweet';

function BaseTweetPage({ handleLoading }: ManualLoadingHandleProps) {
  const { tweetId, userName } = useParams();
  const { data, isFetching } = useGetTweetByIdQuery(tweetId!);
  useQueryWithLoading({ isLoading: isFetching, handleLoading });
  useModifyDocumentTitle(DocumentTitle.Tweet(userName!));

  return (
    <>
      <SectionHeader isNavigatable headerText='Tweet' />
      {data && <Tweet tweet={data} />}
    </>
  );
}

export const TweetPage = withLoader(BaseTweetPage);
