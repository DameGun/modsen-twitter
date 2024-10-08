import {
  ColorMode,
  DISABLE_TRANSITION_STYLES,
  THEME_KEY_LOCALSTORAGE,
} from '@/shared/constants/theme';

export function getThemeFromLocalStorage() {
  return (localStorage.getItem(THEME_KEY_LOCALSTORAGE) ?? ColorMode.Light) as ColorMode;
}

export function disableTransitionOnThemeChange() {
  const css = document.createElement('style');
  css.appendChild(document.createTextNode(DISABLE_TRANSITION_STYLES));
  document.head.appendChild(css);
  (() => window.getComputedStyle(css).opacity)();
  document.head.removeChild(css);
}
