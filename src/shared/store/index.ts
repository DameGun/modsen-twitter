import { configureStore } from '@reduxjs/toolkit';

import { themeReducer } from '@/app/providers/theme';
import { userReducer, usersCacheReducer } from '@/entities/user';

import { apiSlice } from '../api/redux';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer,
    user: userReducer,
    usersCache: usersCacheReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
