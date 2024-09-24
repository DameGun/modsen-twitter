import {
  filledButtonStyles,
  iconButtonStyles,
  outlineButtonStyles,
  primaryButtonStyles,
} from '@/styles/common';

export enum ColorMode {
  Light = 'Light',
  Dark = 'Dark',
}
export const THEME_KEY_LOCALSTORAGE = 'colorMode';

export const ButtonVariants = {
  primary: primaryButtonStyles,
  filled: filledButtonStyles,
  outline: outlineButtonStyles,
  icon: iconButtonStyles,
} as const;

export const DISABLE_TRANSITION_STYLES = `* {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`;
