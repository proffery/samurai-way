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
    }

    *:focus-visible {
        outline: 1px solid ${theme.color.text.placeholder};
    }
    
    html {
        scroll-behavior: smooth;
    }
    
    body {
        margin: 0 auto;
        min-height: 100vh;
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
        color: ${theme.color.text.primary};
    }

    main {
        padding: 0 min(30px, 2vw);
        gap: min(30px, 2vw);
        background-color: ${theme.color.background.primary};
        scroll-behavior: smooth;
        overflow-y: auto;
    }


    @media (prefers-reduced-motion: reduce) {
        animation: unset;
    }

    ////////////////SCROLLBAR///////////////
    /* width */
    ::-webkit-scrollbar {
        width: 4px;
        border: 1px solid transparent;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${theme.color.text.placeholder}; 
    }
`