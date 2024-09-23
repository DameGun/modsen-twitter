import { useEffect, useRef, useState } from 'react';

import { useGetTweetsQuery } from '@/entities/tweet';
import type { UserDoc } from '@/entities/user/types';
import { useQueryWithLoading } from '@/shared/lib/useQueryWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import { Tweet } from '@/widgets/tweet';

import { TriggerElement } from './styled';

type TweetsList = ManualLoadingHandleProps & {
  targetUser?: UserDoc;
};

function BaseTweetsList({ targetUser, handleLoading }: TweetsList) {
  const [page, setPage] = useState(1);
  const [lastDocId, setLastDocId] = useState<string | undefined>();
  const { data, isFetching } = useGetTweetsQuery({ page, targetUser, startAfterDocId: lastDocId });
  const bottomElement = useRef<HTMLDivElement>(null);
  useQueryWithLoading({ isLoading: isFetching, handleLoading });

  useEffect(() => {
    if (data && data.hasMore) {
      setLastDocId(data.lastDocId);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (bottomElement.current) {
      observer.observe(bottomElement.current);
    }

    return () => observer.disconnect();
  }, [lastDocId]);

  return (
    data &&
    data.tweets &&
    data.tweets.length > 0 && (
      <>
        {data.tweets.map((tweet) => (
          <Tweet key={tweet.uid} tweet={tweet} />
        ))}
        <TriggerElement ref={bottomElement} />
      </>
    )
  );
}

export const TweetsList = withLoader(BaseTweetsList);
