import { addDoc, updateDoc } from 'firebase/firestore';

import { FirestoreCollections } from '@/constants/firebase';
import { ImageRepositoryService } from '@/services/firestore/image';
import type { TweetDoc, TweetType } from '@/types/tweet';
import { getCollectionRef, getDataById } from '@/utils/firestore';
import { mapTweetDoc, updateBothTweetsCache } from '@/utils/tweet';

import { apiSlice } from '../api';

const createTweetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTweet: builder.mutation<TweetType, Partial<TweetDoc>>({
      queryFn: async (tweet) => {
        try {
          const tweetsRef = getCollectionRef<TweetDoc>(FirestoreCollections.Tweets);

          const createdTweetRef = await addDoc<Partial<TweetDoc>, TweetDoc>(tweetsRef, tweet);

          if (tweet.media && tweet.media.length > 0) {
            const tweetMedia = await ImageRepositoryService.uploadImageCollectionById(
              tweet.media,
              createdTweetRef.id
            );

            await updateDoc(createdTweetRef, { media: tweetMedia });
          }

          const createdTweetDoc = await getDataById<TweetDoc>(
            FirestoreCollections.Tweets,
            createdTweetRef.id
          );

          if (createdTweetDoc) {
            const { data } = createdTweetDoc;

            const createdTweet = await mapTweetDoc(data);

            return { data: createdTweet };
          }

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data: createdTweet } = await queryFulfilled;

          updateBothTweetsCache((draft) => {
            draft.tweets.unshift(createdTweet);
          });
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useCreateTweetMutation } = createTweetApiSlice;
