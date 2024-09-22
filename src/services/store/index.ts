import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './api';
import themeReducer from './theme';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
