import { ColorMode } from '@/shared/constants/theme';
import type {
  ColorsConstants,
  FontConstants,
  MediaConstants,
  VariablesConstants,
} from '@/shared/types/styles';

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
