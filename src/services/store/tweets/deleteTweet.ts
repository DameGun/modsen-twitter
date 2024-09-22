import { deleteDoc } from 'firebase/firestore';

import { FirestoreCollections, StoragePaths } from '@/constants/firebase';
import { ImageRepositoryService } from '@/services/firestore/image';
import { getDataById } from '@/utils/firestore';
import { updateBothTweetsCache } from '@/utils/tweet';

import { apiSlice } from '../api';

const deleteTweetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteTweet: builder.mutation<void, string>({
      queryFn: async (tweetId) => {
        try {
          const result = await getDataById(FirestoreCollections.Tweets, tweetId);

          if (result) {
            const { ref } = result;
            await ImageRepositoryService.deleteImages(StoragePaths.tweetsMediaRoot(tweetId));
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
