import { ColorMode } from '@/app/providers/theme/model/constants';
import type {
  ColorsConstants,
  FontConstants,
  MediaConstants,
  VariablesConstants,
} from '@/app/providers/theme/model/styles';

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
