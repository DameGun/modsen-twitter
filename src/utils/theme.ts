import { ColorMode, THEME_KEY_LOCALSTORAGE } from '@/constants/theme';

export function getThemeFromLocalStorage() {
  return (localStorage.getItem(THEME_KEY_LOCALSTORAGE) ?? 'Light') as ColorMode;
}
