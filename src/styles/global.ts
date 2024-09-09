import { createGlobalStyle } from 'styled-components';

import { publicSans } from '@/assets/fonts';

export default createGlobalStyle`
    @font-face {
        font-family: 'Public Sans';
        src: url(${publicSans}) format('truetype');
    }
    
    * {
        margin: 0;
        padding: 0;
        font-family: 'Public Sans';
        color: ${(props) => props.theme.colors.textMain};
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style-position: inside;
    }

    #root {
        background-color: ${(props) => props.theme.colors.main};
        display: flex;
        flex-direction: column;
        height: 100vh;

        @media ${(props) => props.theme.media.mobile} {
            padding: 0 ${(props) => props.theme.variables.spacing.sm};
        }
    }
`;
