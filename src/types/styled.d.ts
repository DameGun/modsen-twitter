import type { ColorsConstants, FontConstants, MediaConstants } from './styles';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsConstants;
    media: MediaConstants;
    font: FontConstants;
  }
}
