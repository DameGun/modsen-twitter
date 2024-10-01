import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/shared/types/store';

import type { UserDoc } from '../types';
import type { UsersCacheState } from '../types/state';

const initialState: UsersCacheState = {
  users: [],
};

const usersCacheSlice = createSlice({
  name: 'usersCache',
  initialState,
  reducers: {
    addToUsersCache: (state, action: PayloadAction<UserDoc>) => {
      const userToAdd = action.payload;
      const isExists = state.users.find((user) => user.uid === userToAdd.uid);

      if (!isExists) {
        state.users.push(userToAdd);
      }
    },
  },
});

export const { addToUsersCache } = usersCacheSlice.actions;

export const selectUsersCache = (state: RootState) => state.usersCache.users;

export default usersCacheSlice.reducer;
