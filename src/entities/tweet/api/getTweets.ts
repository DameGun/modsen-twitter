import { limit, orderBy, query, startAfter, where } from 'firebase/firestore';

import { apiSlice } from '@/shared/api';
import { FirestoreCollections } from '@/shared/constants/firebase';
import { getCollectionRef, getData, getDocSnap } from '@/shared/lib/firestore';

import { TWEET_LOAD_LIMIT } from '../constants';
import { mapTweetDoc } from '../lib';
import type { TweetDoc, TweetPaginate, TweetPaginateMeta, TweetType } from '../types';

export const getTweetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query<TweetPaginate, TweetPaginateMeta>({
      queryFn: async ({ startAfterDocId, targetUser }) => {
        try {
          const tweetsRef = getCollectionRef<TweetDoc>(FirestoreCollections.Tweets);

          let baseTweetsQuery = query(
            tweetsRef,
            orderBy('createdAt', 'desc'),
            limit(TWEET_LOAD_LIMIT)
          );

          if (targetUser) {
            baseTweetsQuery = query(baseTweetsQuery, where('author', '==', targetUser.uid));
          }

          if (startAfterDocId) {
            const startAfterDoc = await getDocSnap(FirestoreCollections.Tweets, startAfterDocId);
            baseTweetsQuery = query(baseTweetsQuery, startAfter(startAfterDoc));
          }

          const tweetsCollection = await getData(baseTweetsQuery);
          const tweets: TweetType[] = [];

          if (tweetsCollection) {
            for (const tweet of tweetsCollection) {
              const mappedTweet = await mapTweetDoc(tweet, targetUser);

              if (mappedTweet) tweets.push(mappedTweet);
            }

            const lastDoc = tweetsCollection[tweetsCollection.length - 1];

            return {
              data: {
                tweets,
                hasMore: true,
                lastDocId: lastDoc.uid,
              },
            };
          }

          return {
            data: {
              tweets,
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
      merge: (currentCache, { tweets, lastDocId, hasMore }) => {
        currentCache.lastDocId = lastDocId;
        currentCache.hasMore = hasMore;
        currentCache.tweets.push(...tweets);
      },
      forceRefetch: ({ currentArg, previousArg, endpointState }) => {
        const hasMore = (endpointState && (endpointState.data as TweetPaginate))?.hasMore;

        if (hasMore) {
          return (
            currentArg?.page != previousArg?.page ||
            currentArg?.targetUser != currentArg?.targetUser
          );
        }

        return false;
      },
    }),
  }),
});

export const { useGetTweetsQuery } = getTweetsApiSlice;
