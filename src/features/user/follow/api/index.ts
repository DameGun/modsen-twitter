import { updateCurrentUser } from '@/entities/user';
import { UserDoc } from '@/entities/user/types';
import { apiSlice } from '@/shared/api';
import { RootState } from '@/shared/types/store';

import { manageUserSubscription } from './subscription';

const followUserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<void, string>({
      queryFn: async (targetUid, { dispatch, getState }) => {
        try {
          const state = getState() as RootState;
          const { uid, following: previousFollowing } = state.user.currentUser!;

          const currentUserFollowings = [...previousFollowing, targetUid];
          const targetUserFollowers = (targetUser: UserDoc) => [...targetUser.followers, uid];

          const updatedUser = await manageUserSubscription(
            { uid, targetUid, previousFollowing },
            currentUserFollowings,
            targetUserFollowers
          );

          dispatch(updateCurrentUser(updatedUser));

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
    }),
    unfollowUser: builder.mutation<void, string>({
      queryFn: async (targetUid, { dispatch, getState }) => {
        try {
          const state = getState() as RootState;
          const { uid, following: previousFollowing } = state.user.currentUser!;

          const currentUserFollowings = previousFollowing.filter((userId) => userId !== targetUid);
          const targetUserFollowers = (targetUser: UserDoc) =>
            targetUser.followers.filter((userId) => userId !== uid);

          const updatedUser = await manageUserSubscription(
            { uid, targetUid, previousFollowing },
            currentUserFollowings,
            targetUserFollowers
          );

          dispatch(updateCurrentUser(updatedUser));

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useFollowUserMutation, useUnfollowUserMutation } = followUserApiSlice;
