import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/shared/types/store';

import type { UserDoc } from '../types';
import { UserState } from '../types/state';

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserDoc>) => {
      state.currentUser = action.payload;
    },
    updateCurrentUser: (state, action: PayloadAction<Partial<UserDoc>>) => {
      const updatedUser = action.payload;
      const oldUserData = state.currentUser;

      const newUser: UserDoc = Object.assign({}, oldUserData, updatedUser);

      state.currentUser = newUser;
    },
  },
});

export const { setCurrentUser, updateCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser!;

export default userSlice.reducer;
