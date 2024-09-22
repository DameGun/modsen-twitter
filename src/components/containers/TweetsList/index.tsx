import { useEffect, useRef, useState } from 'react';

import { useQueryWithLoading } from '@/hooks/useQueryWithLoading';
import { useGetTweetsQuery } from '@/services/store/tweets/getTweets';
import type { ManualLoadingHandleProps } from '@/types/loader';
import type { UserDoc } from '@/types/user';
import { withLoader } from '@/utils/withLoader';

import { TriggerElement } from './styled';

import { Tweet } from '../Tweet';

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
