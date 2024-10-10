import { useRef, useState } from 'react';

import { useGetTweetsQuery } from '@/entities/tweet';
import type { UserDoc } from '@/entities/user/types';
import { useObserver } from '@/shared/lib/useObserver';
import { useQueryWithLoading } from '@/shared/lib/useQueryWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import { TriggerElement } from '@/shared/ui';

import { Tweet } from '../../base';

type TweetsList = ManualLoadingHandleProps & {
  targetUser?: UserDoc;
};

function BaseTweetsList({ targetUser, handleLoading }: TweetsList) {
  const [lastDocId, setLastDocId] = useState<string | undefined>();
  const { data, isFetching } = useGetTweetsQuery({ targetUser, startAfterDocId: lastDocId });
  const bottomElement = useRef<HTMLDivElement>(null);
  useQueryWithLoading({ isLoading: isFetching, handleLoading });

  const fetchNext = (lastDocId?: string) => setLastDocId(lastDocId);

  useObserver({ elementRef: bottomElement, fetchNext, data });

  return (
    data &&
    data.collection &&
    data.collection.length > 0 && (
      <>
        {data.collection.map((tweet) => (
          <Tweet key={tweet.uid} tweet={tweet} />
        ))}
        <TriggerElement ref={bottomElement} />
      </>
    )
  );
}

export const TweetsList = withLoader(BaseTweetsList);
