import { apiSlice } from '@/shared/api';
import { FirestoreCollections } from '@/shared/constants/firebase';
import { getDataById } from '@/shared/lib/firestore';

import { mapTweetDoc } from '../lib/mappings';
import { TweetDoc, TweetType } from '../types';

export const getTweetByIdApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweetById: builder.query<TweetType, string>({
      queryFn: async (id) => {
        try {
          const result = await getDataById<TweetDoc>({ path: FirestoreCollections.Tweets, id });
          let tweet;

          if (result) {
            tweet = await mapTweetDoc(result.data);
          }

          return {
            data: tweet,
          };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetTweetByIdQuery } = getTweetByIdApiSlice;
