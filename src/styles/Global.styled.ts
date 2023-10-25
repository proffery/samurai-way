import { createGlobalStyle } from "styled-components";
import { theme } from "./Theme.styled";
import { font } from "./Font";

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        /* outline: 1px solid red; */
    }

    *:focus-visible {
        outline: 1px solid ${theme.color.text.placeholder};
    }
    
    html {
        scroll-behavior: smooth;
    }
    
    body {
        margin: 0 auto;
        height: 100vh;
        background-color: white;
        ${font({weight: 400, Fmin: 10, Fmax: 22})}
        font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: ${theme.color.text.primary_dark};
    }

    a {
        text-decoration: none;
    }

    main {
        padding: 0 32px;
        gap: 32px;
        background-color: ${theme.color.background.primary};
        scroll-behavior: smooth;
        @media ${theme.media.mobile} {
            padding: 0 20px;
            gap: 20px;
        }
    }

    section {
        display: flex;
        border-radius: 10px;
        background-color: ${theme.color.background.block};
    }

    @media (prefers-reduced-motion: reduce) {
        animation: unset;
    }

    ////////////////SCROLLBAR///////////////
    /* width */
    ::-webkit-scrollbar {
        width: 2px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${theme.color.background.second}; 
    }
`