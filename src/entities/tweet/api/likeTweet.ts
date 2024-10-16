import { updateDoc } from 'firebase/firestore';

import { selectUserFromCacheById } from '@/entities/user';
import { apiSlice } from '@/shared/api';
import { FirestoreCollections } from '@/shared/constants/firebase';
import { getDataById } from '@/shared/lib/firestore';
import type { RootState } from '@/shared/types/store';

import { setOrRemoveLike, updateBothTweetsCache, updateCurrentDisplayedTweetLikes } from '../lib';
import type { TweetDoc } from '../types';

const likeTweetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    likeTweet: builder.mutation<TweetDoc, string>({
      queryFn: async (tweetId, { getState }) => {
        try {
          const result = await getDataById<TweetDoc>({
            path: FirestoreCollections.Tweets,
            id: tweetId,
          });

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
      onQueryStarted: async (_, { queryFulfilled, dispatch, getState }) => {
        try {
          const { data: updatedTweet } = await queryFulfilled;
          const state = getState() as RootState;
          const currentUserId = state.user.currentUser!.uid;
          const author = selectUserFromCacheById(state, updatedTweet.author);

          if (!author) return;

          updateBothTweetsCache(dispatch, author, (draft) => {
            const tweet = draft.collection.find(({ uid }) => uid === updatedTweet.uid);

            if (tweet) setOrRemoveLike(tweet, updatedTweet.likes, currentUserId);
          });

          updateCurrentDisplayedTweetLikes(dispatch, updatedTweet, currentUserId);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLikeTweetMutation } = likeTweetApiSlice;
