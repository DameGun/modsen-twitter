import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});
