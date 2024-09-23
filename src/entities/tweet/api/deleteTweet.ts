import { deleteDoc } from 'firebase/firestore';

import { apiSlice, deleteImages } from '@/shared/api';
import { FirestoreCollections, StoragePaths } from '@/shared/constants/firebase';
import { getDataById } from '@/shared/lib/firestore';

import { updateBothTweetsCache } from '../lib';

const deleteTweetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteTweet: builder.mutation<void, string>({
      queryFn: async (tweetId) => {
        try {
          const result = await getDataById({ path: FirestoreCollections.Tweets, id: tweetId });

          if (result) {
            const { ref } = result;
            await deleteImages(StoragePaths.tweetsMediaRoot(tweetId));
            await deleteDoc(ref);
          }

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      onQueryStarted: async (tweetId, { queryFulfilled }) => {
        try {
          await queryFulfilled;

          updateBothTweetsCache((draft) => {
            const tweetIndex = draft.tweets.findIndex(({ uid }) => uid === tweetId);
            draft.tweets.splice(tweetIndex, 1);
          });
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useDeleteTweetMutation } = deleteTweetApiSlice;
