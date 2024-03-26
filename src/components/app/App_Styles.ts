import styled, { css } from 'styled-components'
import { theme } from 'styles/Theme.styled'

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
    padding: 0;
    transition: all ease-in-out .2s;
    main {
      grid-area: 2 / 2 / 3 / 6 ;
    }
    nav {
      grid-area: 1 / 1 / 3 / 2 ;
    }
    header {
      grid-area: 1 / 2 / 2 / 6 ;
    }
    footer {
      grid-area: 3 / 1 / 4 / 6 ;
    }
    ${props => props.collapsed === 'false' ? css<Container>`
      grid-template-columns: 5px repeat(4, 1fr);
      main {
        grid-area: 2 / 1 / 3 / 6 ;
        padding-left: min(45px, 12vw);
        height: 100%;
      }
      nav {
        grid-area: 1 / 1 / 3 / 1 ;
        width: 32px;
        padding: min(45px, 16vw) 4px;
      }
      header {
        grid-area: 1 / 1 / 2 / 6 ;
        padding-left: min(45px, 12vw);
      }
    `: undefined}
    @media ${theme.media.mobile} {
      grid-template-rows: 80px 93vh 1fr;
    }
  `
const LoginWrapper = styled.div`
    max-width: 1440px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0;
    main {
      height: 80vh;
    }
  `

export const S = {
    AppWrapper,
    LoginWrapper
}