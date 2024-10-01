import { addDoc, updateDoc } from 'firebase/firestore';

import { apiSlice, uploadImageCollectionById } from '@/shared/api';
import { FirestoreCollections } from '@/shared/constants/firebase';
import { getCollectionRef, getDataById } from '@/shared/lib/firestore';

import { mapTweetDoc, updateBothTweetsCache } from '../lib';
import type { TweetDoc, TweetType } from '../types';

const createTweetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTweet: builder.mutation<TweetType, Partial<TweetDoc>>({
      queryFn: async (tweet) => {
        try {
          const tweetsRef = getCollectionRef<TweetDoc>(FirestoreCollections.Tweets);

          const createdTweetRef = await addDoc<Partial<TweetDoc>, TweetDoc>(tweetsRef, tweet);

          if (tweet.media && tweet.media.length > 0) {
            const tweetMedia = await uploadImageCollectionById(tweet.media, createdTweetRef.id);

            await updateDoc(createdTweetRef, { media: tweetMedia });
          }

          const createdTweetDoc = await getDataById<TweetDoc>({
            path: FirestoreCollections.Tweets,
            id: createdTweetRef.id,
          });

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
            draft.collection.unshift(createdTweet);
          });
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useCreateTweetMutation } = createTweetApiSlice;
