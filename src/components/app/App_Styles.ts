import styled, { css } from "styled-components"
import { theme } from "styles/Theme.styled"

type Container = {
    collapsed: string
}
const AppWrapper = styled.div<Container>`
    display: grid;
    grid-template-rows: 104px 93vh 1fr;
    grid-template-columns: repeat(5, 1fr);
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    transition: all ease-in-out 0.2s;
    main {
        grid-area: 2 / 2 / 3 / 6;
    }
    nav {
        grid-area: 1 / 1 / 3 / 2;
    }
    header {
        grid-area: 1 / 2 / 2 / 6;
    }
    footer {
        grid-area: 3 / 1 / 4 / 6;
    }
    ${(props) =>
        props.collapsed === "false"
            ? css<Container>`
                  grid-template-columns: 30px repeat(4, 1fr);
                  main {
                      height: 100%;
                  }
                  nav {
                      width: 30px;
                      padding: 54px 0;
                  }
              `
            : undefined}
    @media ${theme.media.mobile} {
        grid-template-rows: 80px 93vh 1fr;
    }
`
const LoginWrapper = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 0;
    main {
        height: 100vh;
    }
`

export const S = {
    AppWrapper,
    LoginWrapper,
}
