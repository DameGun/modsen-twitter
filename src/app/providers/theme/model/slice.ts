import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/shared/types/store';

import { ColorMode, THEME_KEY_LOCALSTORAGE } from './constants';
import type { ThemeState } from './theme';

import { getThemeFromLocalStorage } from '../lib';

const initialState: ThemeState = {
  mode: getThemeFromLocalStorage(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) => {
      const newMode = state.mode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light;
      localStorage.setItem(THEME_KEY_LOCALSTORAGE, newMode);
      state.mode = newMode;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const selectCurrentTheme = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
