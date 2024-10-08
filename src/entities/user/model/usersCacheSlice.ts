import { createAsyncThunk, createReducer, createSelector, PayloadAction } from '@reduxjs/toolkit';

import { FirestoreCollections } from '@/shared/constants/firebase';
import { getDataById } from '@/shared/lib/firestore';
import type { RootState } from '@/shared/types/store';

import type { UserDoc } from '../types';
import type { UsersCacheState } from '../types/state';

const initialState: UsersCacheState = {
  users: [],
};

export const fetchOrAddUserById = createAsyncThunk(
  'usersCache/fetchOrAddUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await getDataById<UserDoc>({
        path: FirestoreCollections.Users,
        id: userId,
      });

      return result?.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const usersCacheSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOrAddUserById.fulfilled, (state, action: PayloadAction<UserDoc | undefined>) => {
      const userToAdd = action.payload;
      if (!userToAdd) return;

      state.users.push(userToAdd);
    })
    .addCase(fetchOrAddUserById.rejected, (_, action) => {
      console.error('Failed to fetch user:', action.error.message);
    });
});

export const selectUsersCache = (state: RootState) => state.usersCache.users;
const selectUserId = (_: RootState, id: string) => id;
export const selectUserFromCacheById = createSelector(
  [selectUsersCache, selectUserId],
  (select, id) => select.find(({ uid }) => uid === id)
);

export default usersCacheSlice;
