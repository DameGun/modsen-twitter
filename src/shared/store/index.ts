import { configureStore } from '@reduxjs/toolkit';

import themeReducer from '@/app/model/theme';
import userReducer from '@/entities/user/model';

import { apiSlice } from '../api/redux';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
