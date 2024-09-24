import { createSlice } from '@reduxjs/toolkit';

import { ColorMode, THEME_KEY_LOCALSTORAGE } from '@/constants/theme';
import type { RootState } from '@/types/store';
import type { ThemeState } from '@/types/theme';
import { getThemeFromLocalStorage } from '@/utils/theme';

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
