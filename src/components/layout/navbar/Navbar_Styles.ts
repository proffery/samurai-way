import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

const Navbar = styled.nav`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: ${theme.color.background.menu};
    padding: 54px 32px;
    gap: 54px;
    z-index: 1000;
    transition: all ease-out .2s;
    &:hover {
        box-shadow: ${theme.shadow.navbar};
        background-image: ${theme.gradient.banner};
    }
    @media ${theme.media.mobile} {
        gap: 40px;
        padding: 60px 20px;
    }
`
export const S = { Navbar }