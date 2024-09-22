import { updateDoc } from 'firebase/firestore';

import { FirestoreCollections } from '@/constants/firebase';
import type { RootState } from '@/types/store';
import type { TweetDoc } from '@/types/tweet';
import { getDataById } from '@/utils/firestore';
import { updateBothTweetsCache } from '@/utils/tweet';

import { apiSlice } from '../api';

const likeTweetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    likeTweet: builder.mutation<TweetDoc, string>({
      queryFn: async (tweetId, { getState }) => {
        try {
          const result = await getDataById<TweetDoc>(FirestoreCollections.Tweets, tweetId);

          if (result) {
            const { data, ref } = result;
            const { user } = getState() as RootState;
            const isAlreadyLiked = data.likes.findIndex((uid) => uid === user.currentUser!.uid);

            if (isAlreadyLiked !== -1) {
              data.likes.splice(isAlreadyLiked, 1);
            } else {
              data.likes.push(user.currentUser!.uid);
            }

            await updateDoc(ref, data);

            return { data };
          }

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      onQueryStarted: async (_, { queryFulfilled, getState }) => {
        try {
          const { data: updatedTweet } = await queryFulfilled;
          const { user } = getState() as RootState;

          updateBothTweetsCache((draft) => {
            const tweet = draft.tweets.find(({ uid }) => uid === updatedTweet.uid);

            if (tweet) {
              tweet.isLiked = updatedTweet.likes.includes(user.currentUser!.uid);
              tweet.likesCount = updatedTweet.likes.length;
            }
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLikeTweetMutation } = likeTweetApiSlice;
