import styled from "styled-components"
import { FlexWrapper } from "../../components/FlexWrapper"
import { Menu } from "./menu/Menu"
import { theme } from "../../styles/Theme.styled"
import { Logo } from "../../components/logo/Logo"

export const Navbar = () => {
    return (
        <StyledNavbar>
            <Logo type={'secondary'}/>
            <Menu type={'secondary'} icons={true} direction={'column'}/>
        </StyledNavbar>
    )
}

const StyledNavbar = styled.nav`
    display: flex;
    flex-direction: column;
    grid-area: 1 / 1 / 3 / 2 ;
    background-color: ${theme.color.background.menu};
    padding: 54px 28px;
    gap: 54px;
    @media ${theme.media.mobile} {
        gap: 27px;
        padding: 27px 18px;
    }
`

