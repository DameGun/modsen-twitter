import { createGlobalStyle, css } from 'styled-components';

import { openSans } from '@/assets/fonts';
import { StyledModal } from '@/components/ui/Modal/styled';
import { ColorMode } from '@/constants/theme';

export default createGlobalStyle`
    @font-face {
        font-family: 'Open Sans';
        font-display: block;
        src: url(${openSans}) format('truetype');
    }
    
    * {
        margin: 0;
        padding: 0;
        font-family: 'Open Sans';
        color: ${(props) => props.theme.colors.textMain};
        scrollbar-gutter: stable;

        ${(props) =>
          props.theme.mode === ColorMode.Dark &&
          css`
            scrollbar-color: ${(props) => props.theme.colors.secondary}
              ${(props) => props.theme.colors.focus};
          `}
    }

    .disable-transition {
        transition: none !important;
    }

    body {
        background-color: ${(props) => props.theme.colors.main};
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style-position: inside;
    }

    body:has(${StyledModal}) {
        overflow-y: hidden;
    }

    #root {
        display: flex;
        flex-direction: column;
        height: 100vh;

        @media ${(props) => props.theme.media.mobile} {
            padding: 0 ${(props) => props.theme.variables.spacing.sm};
        }
    }
`;
