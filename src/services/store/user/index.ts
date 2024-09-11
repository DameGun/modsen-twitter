import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/types/store';
import type { UserDoc, UserState } from '@/types/user';

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserDoc>) => {
      const user = action.payload;
      const parsedCreatedAt = new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      state.currentUser = { ...user, createdAt: parsedCreatedAt };
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
