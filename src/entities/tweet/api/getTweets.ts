import { query, where } from 'firebase/firestore';

import { apiSlice } from '@/shared/api';
import { FirestoreCollections } from '@/shared/constants/firebase';
import { getPaginatedQuery } from '@/shared/lib/firestore';
import { PaginateMeta, PaginateResult } from '@/shared/types/observer';

import { mapTweetDoc } from '../lib';
import type { TweetDoc, TweetType } from '../types';

export const getTweetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query<PaginateResult<TweetType>, PaginateMeta>({
      queryFn: async ({ startAfterDocId, targetUser }) => {
        try {
          const [result, lastDocId] = await getPaginatedQuery<TweetDoc>(
            FirestoreCollections.Tweets,
            true,
            startAfterDocId,
            (baseQuery) => {
              if (targetUser) {
                return query(baseQuery, where('author', '==', targetUser.uid));
              }

              return baseQuery;
            }
          );

          const collection: TweetType[] = [];

          if (result) {
            for (const tweet of result) {
              const mappedTweet = await mapTweetDoc(tweet, targetUser);

              if (mappedTweet) collection.push(mappedTweet);
            }

            return {
              data: {
                collection,
                hasMore: true,
                lastDocId,
              },
            };
          }

          return {
            data: {
              collection,
              hasMore: false,
            },
          };
        } catch (err) {
          return { error: err };
        }
      },
      serializeQueryArgs: ({ endpointName, queryArgs: { targetUser } }) => {
        return endpointName + (targetUser ? targetUser.uid : '');
      },
      merge: (currentCache, { collection, lastDocId, hasMore }) => {
        currentCache.lastDocId = lastDocId;
        currentCache.hasMore = hasMore;
        currentCache.collection.push(...collection);
      },
      forceRefetch: ({ currentArg, previousArg, endpointState }) => {
        const hasMore = (endpointState && (endpointState.data as PaginateResult<TweetType>))
          ?.hasMore;

        if (hasMore) {
          return (
            currentArg?.startAfterDocId != previousArg?.startAfterDocId ||
            currentArg?.targetUser != currentArg?.targetUser
          );
        }

        return false;
      },
    }),
  }),
});

export const { useGetTweetsQuery } = getTweetsApiSlice;
