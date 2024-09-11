import { filledButtonStyles, outlineButtonStyles, primaryButtonStyles } from '@/styles/common';

enum ColorMode {
  Light = 'Light',
  Dark = 'Dark',
}
const THEME_KEY_LOCALSTORAGE = 'colorMode';

const ButtonVariants = {
  primary: primaryButtonStyles,
  filled: filledButtonStyles,
  outline: outlineButtonStyles,
} as const;

export { ButtonVariants, ColorMode, THEME_KEY_LOCALSTORAGE };
