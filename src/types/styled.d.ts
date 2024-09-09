import { ColorMode } from '@/constants/theme';

import type { ColorsConstants, FontConstants, MediaConstants, VariablesConstants } from './styles';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ColorMode;
    colors: ColorsConstants;
    media: MediaConstants;
    font: FontConstants;
    variables: VariablesConstants;
  }
}
