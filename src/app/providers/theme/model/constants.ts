export enum ColorMode {
  Light = 'Light',
  Dark = 'Dark',
}
export const THEME_KEY_LOCALSTORAGE = 'colorMode';

export const DISABLE_TRANSITION_STYLES = `* {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`;
