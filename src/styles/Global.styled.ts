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
        outline: 2px solid gray
    }
    
    html {
        scroll-behavior: smooth;
    }
    
    body {
        margin: 0 auto;
        height: 100vh;
        background-color: white;
        ${font({Fmin: 10, Fmax: 18})}
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
        padding: 0;
        background-color: ${theme.color.background.primary};
    }


    @media (prefers-reduced-motion: reduce) {
        animation: unset;
    }
`